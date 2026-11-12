import {buildSurvey} from './survey-view.mjs?v=survey-2';
import {BOUNDS,groundHeight,creekWater,LODGE} from './explore-rules.mjs';
import {makeDamPlan,previewDam,commitDam,extendDam,CRESTS} from './dam-placement.mjs';
export function createDamPlanner({getState,setState,notify,onToggle}){
 const el=id=>document.getElementById(id),canvas=el('dam-map'),ctx=canvas.getContext('2d');
 let open=false,preview=null,candidate=null,active='a';
 function clearFeedback(){for(const id of ['dam-status','dam-error']){el(id).textContent='';el(id).hidden=true;}}
 function report(text,error=false){clearFeedback();const target=el(error?'dam-error':'dam-status');target.textContent=text;target.hidden=false;}
 const fail=text=>report(text,true);
 const value=id=>Number(el(id).value);
 function point(prefix){return {x:value(prefix+'-x'),z:value(prefix+'-z')};}
 function draw(){
  const s=getState(),scale=canvas.width/48,w=canvas.width;ctx.fillStyle='#253f39';ctx.fillRect(0,0,w,w);
  const actual=creekWater(s),future=preview?creekWater(preview.state):actual;
  for(let z=-24;z<24;z++)for(let x=-24;x<24;x++){
   const key=x+','+z;if(!s.explored[key])continue;
   const a=actual.wet.get(key),b=future.wet.get(key),h=groundHeight(x+.5,z+.5,s);
   ctx.fillStyle=b!==undefined&&(a===undefined||b>a+.02)?'#dfbd69':a!==undefined&&(b===undefined||b<a-.02)?'#bb8f6d':a!==undefined?'#5798a4':h>.9?'#9daa7c':'#b1b38a';ctx.fillRect((x+24)*scale,(z+24)*scale,scale+.3,scale+.3);
  }
  const surveying=el('dam-survey').checked;el('dam-survey-legend').hidden=!surveying;
  if(surveying){
   const survey=buildSurvey(s,preview?.state);el('dam-survey-legend').textContent=survey.summary;
   const stroke=(segments,color,width,dash)=>{ctx.strokeStyle=color;ctx.lineWidth=width;ctx.setLineDash(dash);ctx.beginPath();for(const p of segments){ctx.moveTo((p.a.x+24)*scale,(p.a.z+24)*scale);ctx.lineTo((p.b.x+24)*scale,(p.b.z+24)*scale);}ctx.stroke();};
   ctx.save();stroke(survey.contours,'#3c4833',1,[]);stroke(survey.actualShore,'#effaff',3,[]);stroke(survey.targetShore,'#683b12',2,[7,4]);ctx.setLineDash([]);
   const labelled=new Set(),labels=[];ctx.font='bold 16px system-ui';
   for(const p of survey.contours){if(labelled.has(p.height))continue;const x=((p.a.x+p.b.x)/2+24)*scale,z=((p.a.z+p.b.z)/2+24)*scale;if(x<18||x>w-30||z<15||z>w-15||labels.some(q=>Math.hypot(q.x-x,q.z-z)<46))continue;labelled.add(p.height);labels.push({x,z});ctx.fillStyle='#fbf7ea';ctx.fillRect(x-3,z-16,44,20);ctx.fillStyle='#233f32';ctx.fillText(p.height.toFixed(1),x,z);}
   ctx.restore();
  }
  ctx.strokeStyle='#7b6043';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(15*scale,34*scale);ctx.lineTo(33*scale,34*scale);ctx.stroke();
  const dam=s.placedDam||candidate;
  if(dam)for(const [i,p]of dam.sections.entries()){
   ctx.strokeStyle=s.placedDam?(p.level?'#704529':'#cc815f'):'#f7f2dc';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo((p.a.x+24)*scale,(p.a.z+24)*scale);ctx.lineTo((p.b.x+24)*scale,(p.b.z+24)*scale);ctx.stroke();
   ctx.fillStyle='#233f32';ctx.font='bold 13px system-ui';ctx.fillText(i+1,((p.a.x+p.b.x)/2+24)*scale,((p.a.z+p.b.z)/2+24)*scale-8);
  }
  for(const [label,p]of [['A',s.placedDam?.sections[0].a||point('dam-a')],['B',s.placedDam?.sections.at(-1).b||point('dam-b')]]){
   ctx.fillStyle='#fff7da';ctx.beginPath();ctx.arc((p.x+24)*scale,(p.z+24)*scale,7,0,Math.PI*2);ctx.fill();ctx.fillStyle='#183e34';ctx.font='bold 14px system-ui';ctx.fillText(label,(p.x+24)*scale-5,(p.z+24)*scale+5);
  }
  if(s.known?.lodge){const x=(LODGE.x+24)*scale,z=(LODGE.z+24)*scale;ctx.fillStyle='#fbf7ea';ctx.beginPath();ctx.arc(x,z,5,0,Math.PI*2);ctx.fill();ctx.font='bold 16px system-ui';ctx.fillStyle='#233f32';ctx.fillText('Lodge',x+8,z-8);}
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc((s.x+24)*scale,(s.z+24)*scale,4,0,Math.PI*2);ctx.fill();
 }
 function refresh(){
  const s=getState();candidate=null;preview=null;
  const existing=s.placedDam;
  el('dam-coordinates').hidden=!!existing;el('dam-commit').hidden=!!existing;el('dam-project-controls').hidden=!existing;
  let error='';
  if(!existing){const result=makeDamPlan(s,point('dam-a'),point('dam-b'),value('dam-height'));error=result.error||'';candidate=result.dam||null;}
  const dam=existing||candidate;if(dam)preview=previewDam(s,dam);
  el('dam-commit').disabled=!candidate;
  el('dam-preview-note').textContent=error||`${dam.sections.length} sections · ${preview.woodNeeded} more wood${s.construction?' + '+preview.mudNeeded+' mud':''} + ${preview.workNeeded} effort needed for target heights. Completed target preview: ${preview.newlyWet} newly wet cells, ${preview.deeper} deeper, ${preview.shallower} shallower cells.`+(preview.limited?' A lower escape route limits the target pond. Extend the span or inspect the banks.':'');
  el('dam-section-settings').replaceChildren();
  if(existing)existing.sections.forEach((p,i)=>{
   const row=document.createElement('label');row.textContent=`${i+1}: built ${p.level?CRESTS[p.level].toFixed(2):'gap'} · ${p.wood} wood${s.construction?' + '+p.mud+' mud · '+(p.frame>p.level?'unpacked frame':'packed crest'):''} here · target `;
   const select=document.createElement('select');select.setAttribute('aria-label','Section '+(i+1)+' target height');
   for(let level=1;level<=3;level++){const o=document.createElement('option');o.value=level;o.textContent=CRESTS[level].toFixed(2);select.append(o);}select.value=p.target;
   select.onchange=()=>{const next=structuredClone(getState());next.placedDam.sections[i].target=Number(select.value);setState(next);refresh();report('Section '+(i+1)+' target updated. Deliver materials and build nearby to change the actual crest.');};row.append(select);el('dam-section-settings').append(row);
  });
  draw();
 }
 function toggle(value=!open){open=value;el('dam-planner').hidden=!open;onToggle(open);if(open){clearFeedback();const s=getState(),z=Math.max(-16,Math.min(6,Math.round(s.z)));el('dam-a-x').value=-6;el('dam-b-x').value=6;el('dam-a-z').value=z;el('dam-b-z').value=z;refresh();el('dam-close').focus();}}
 for(const id of ['dam-a-x','dam-a-z','dam-b-x','dam-b-z','dam-height'])el(id).addEventListener('input',()=>{clearFeedback();refresh();});
 for(const end of ['a','b'])el('dam-set-'+end).onclick=()=>{active=end;el('dam-pick-note').textContent='Tap the map to move bank '+end.toUpperCase()+'.';report('Tap the survey to set bank '+end.toUpperCase()+'.');};
 canvas.addEventListener('pointerdown',event=>{
  if(getState().placedDam)return;clearFeedback();const bounds=canvas.getBoundingClientRect();el('dam-'+active+'-x').value=Math.round((event.clientX-bounds.left)/bounds.width*48-24);el('dam-'+active+'-z').value=Math.round((event.clientY-bounds.top)/bounds.height*48-24);active=active==='a'?'b':'a';el('dam-pick-note').textContent='Next map click moves bank '+active.toUpperCase()+'.';refresh();
 });
 el('dam-commit').onclick=()=>{if(!candidate)return;const result=commitDam(getState(),candidate);if(result.error){fail(result.error);return;}setState(result.state);toggle(false);notify(getState().construction?'Stakes placed. Deliver wood and build a framework; then deliver sealing mud and pack it. Follow the section markers.':'Stakes placed — construction has not begun. Pick up wood, approach an amber section marker, then press E to deliver and E again to build.',{persistent:true});};
 for(const end of ['a','b'])el('dam-extend-'+end).onclick=()=>{const result=extendDam(getState(),end);if(result.error)fail(result.error);else{setState(result.state);report('Span extended with an unbuilt section. Existing construction stays in place.');}refresh();};
 el('dam-remove-plan').onclick=()=>{const s=getState();if(s.placedDam.sections.some(p=>p.level||p.wood||p.frame||p.mud)){fail('Remove built sections and recover unspent materials locally before clearing the project.');return;}const next=structuredClone(s);next.placedDam=null;setState(next);report('Empty project removed. Previously spent wood is not refunded.');refresh();};
 el('dam-survey').addEventListener('change',draw);
 el('dam-close').onclick=()=>toggle(false);
 el('dam-planner').addEventListener('keydown',event=>{if(event.key==='Escape'){event.stopPropagation();toggle(false);return;}if(event.key==='Tab'){const controls=[...el('dam-planner').querySelectorAll('button,input,select')].filter(e=>!e.disabled&&!e.closest('[hidden]'));if(event.shiftKey&&document.activeElement===controls[0]){event.preventDefault();controls.at(-1).focus();}else if(!event.shiftKey&&document.activeElement===controls.at(-1)){event.preventDefault();controls[0].focus();}}});
 return {toggle,get open(){return open;},get previewState(){return open&&el('dam-show-preview').checked?preview?.state:null;},refresh};
}
