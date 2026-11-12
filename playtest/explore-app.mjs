import {familyOutlook,familyActivity,journeyStatus,journeyHint,journeyFeedback} from './journey-rules.mjs';
import {damWorkSites,nextDamWork} from './dam-work.mjs';
import {createDamPlanner} from './dam-planner.mjs';
import {CRESTS} from './dam-placement.mjs';
import {createExploreScene} from './explore-scene.mjs';
import {BOUNDS,LODGE,CHANNELS,movementMode,groundHeight,waterDepth} from './explore-rules.mjs';
import {freshHabitat,freshDamLab,habitatMove,habitatOptions,primaryHabitatAction,habitatAction,loadHabitat,PATCHES,DAM,localPlace,homeStatus,channelStatus,weather,DAY_WORK} from './habitat-rules.mjs';

const el=id=>document.getElementById(id),lab=new URLSearchParams(location.search).get('mode')==='dam-lab',saveKey=lab?'beaverbrook-dam-lab-v1':'beaverbrook-creekside-habitat-v2';
const newRun=()=>lab?freshDamLab():freshHabitat({flexible:true});
let state,storage=true;
try{state=loadHabitat(localStorage.getItem(saveKey))||newRun();}catch{state=newRun();storage=false;}
state.flexible=true;state.placedDam??=null;
let messageExpires=Infinity;
let selectedWork=null,workSites=[],markerButtons=new Map();
let planning=false,paused=true,mapOpen=false,yaw=0,distance=6.5,lastTime=0,lastSave=0,lastHud=0,mapDirty=true;
let stick={x:0,y:0},stickPointer=null,lookPointer=null,lookStart=null,lookDirection=0;
const keys=new Set(),scene=createExploreScene(el('view'));
el('renderer').textContent=scene.mode;
const planner=createDamPlanner({getState:()=>state,setState:next=>{const justPlaced=!state.placedDam&&next.placedDam;state=next;if(justPlaced)selectedWork=nextDamWork(state)?.id||null;mapDirty=true;persist();updateHud();},notify:message,onToggle:value=>{planning=value;stopInput();for(const child of el('play').children)if(!['dam-planner','menu'].includes(child.id))child.inert=value;if(!value)el('view').focus();}});
el('dam-button').onclick=()=>{if(!paused){toggleMap(false);planner.toggle();}};
function persist(){try{localStorage.setItem(saveKey,JSON.stringify(state));storage=true;}catch{storage=false;}}
function stopInput(){keys.clear();stick={x:0,y:0};stickPointer=null;lookPointer=null;lookDirection=0;el('stick-knob').style.transform='';}
function message(text){el('message').hidden=false;el('message').textContent=text+(storage?'':' Saving is unavailable in this browser.');messageExpires=!lab&&state.journey.broughtHome?performance.now()+12000:Infinity;}
function setPause(value){if(value&&planning)planner.toggle(false);paused=value;stopInput();for(const child of el('play').children)if(child.id!=='menu')child.inert=paused;el('menu').hidden=!paused;el('menu-title').textContent=lab?'Placement lab':journeyStatus(state).title;el('resume').textContent='Return to the creek';if(!paused)el('view').focus();else el('resume').focus();persist();}
function toggleMap(value=!mapOpen){mapOpen=value;stopInput();el('map-panel').hidden=!value;el('map-button').setAttribute('aria-expanded',value);if(value)drawMap();else el('view').focus();}
function recenter(){yaw=-state.yaw;}
function faceWork(kind){const target=nextDamWork(state,kind);if(!target)return;selectedWork=target.id;yaw=Math.atan2(state.x-target.x,state.z-target.z);message(target.name+': '+target.detail);updateHud();}
el('face-family').onclick=()=>faceWork('family');el('face-new').onclick=()=>faceWork('new');
function updateWorkMarkers(){
 el('work-markers').hidden=paused||mapOpen||planning;
 const projected=scene.projectWorkSites(workSites,state),ids=new Set(projected.map(p=>p.id));
 for(const [id,button]of markerButtons)if(!ids.has(id)){button.remove();markerButtons.delete(id);}
 const expanded=projected.find(p=>p.id===selectedWork)||projected.find(p=>p.local)||projected.filter(p=>p.needsWork).sort((a,b)=>a.distance-b.distance)[0];
 for(const site of projected){
  if(!site.needsWork&&site.id!==expanded?.id){markerButtons.get(site.id)?.remove();markerButtons.delete(site.id);continue;}let button=markerButtons.get(site.id);
  if(!button){button=document.createElement('button');button.dataset.siteId=site.id;button.onclick=()=>{const current=damWorkSites(state).find(p=>p.id===site.id);if(!current)return;selectedWork=site.id;if(current.action)interact(current.action);else{message(current.name+': '+current.detail);yaw=Math.atan2(state.x-current.x,state.z-current.z);updateHud();}};el('work-markers').append(button);markerButtons.set(site.id,button);}
  const full=site.id===expanded?.id;button.className='work-marker '+(full?'expanded ':'')+(site.phase==='complete'?'complete':site.phase==='build'||site.phase==='deliver'?'ready':'');
  button.textContent=full?site.name+' · '+site.prompt:site.index===undefined?'Family dam':String(site.index+1);
  button.setAttribute('aria-label',site.name+' — '+site.prompt);button.title=site.detail;button.style.left=site.screenX+'%';button.style.top=site.screenY+'%';
 }
}
function drawMap(){
 const canvas=el('map'),ctx=canvas.getContext('2d'),size=canvas.width,scale=size/(BOUNDS*2);
 ctx.fillStyle='#253f39';ctx.fillRect(0,0,size,size);
 for(const cell of Object.keys(state.explored)){
  const [x,z]=cell.split(',').map(Number),h=groundHeight(x+.5,z+.5,state),live=Math.hypot(x+.5-state.x,z+.5-state.z)<7;
  ctx.fillStyle=waterDepth(x+.5,z+.5,state)>.02?(live?'#68a6af':'#446b70'):h>1.5?(live?'#86916c':'#53634e'):(live?'#b3bb8c':'#778465');
  ctx.fillRect((x+BOUNDS)*scale,(z+BOUNDS)*scale,scale+.2,scale+.2);
 }
 function mark(point,color,label,dx=10,dy=-10){const x=(point.x+BOUNDS)*scale,z=(point.z+BOUNDS)*scale;ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,z,5,0,Math.PI*2);ctx.fill();ctx.font='bold 18px system-ui';ctx.fillText(label,x+dx,z+dy);}
 mark(LODGE,'#f4ddb1','Lodge');
 mark(DAM,'#d6b585','Family dam');
 if(state.placedDam)for(const p of state.placedDam.sections){ctx.strokeStyle=p.level?'#e6c191':'#d18970';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo((p.a.x+24)*scale,(p.a.z+24)*scale);ctx.lineTo((p.b.x+24)*scale,(p.b.z+24)*scale);ctx.stroke();}
 for(const p of PATCHES)if(state.known[p.id])mark(p,'#e6d6a3',p.name.replace('Bank ','').replace(' stand',''));
 for(const p of CHANNELS)if(state.known[p.id])mark(p,'#bde2e0',p.name,10,24);
 for(const point of state.loose)if(Math.hypot(point.x-state.x,point.z-state.z)<7)mark(point,'#d9b080','Branch');
 mark(state,'#ffffff','You');
 ctx.strokeStyle='#fff';ctx.beginPath();const px=(state.x+BOUNDS)*scale,pz=(state.z+BOUNDS)*scale;ctx.moveTo(px,pz);ctx.lineTo(px+Math.sin(state.yaw)*12,pz-Math.cos(state.yaw)*12);ctx.stroke();
 el('map-legend').textContent='Lighter ground is nearby. Darker ground is remembered. '+Object.keys(state.explored).length+' ground cells explored.';
 mapDirty=false;
}
let actionSignature='';
function updateHud(){
 const mode=movementMode(state.x,state.z,state),home=homeStatus(state),place=localPlace(state),family=familyOutlook(state),chapter=journeyStatus(state);
 el('chapter-title').textContent=chapter.title;el('chapter-goal').textContent=chapter.goal;el('forecast').textContent=chapter.forecast;el('family-state').textContent=family.text+' '+home.foodNights+(home.foodNights===1?' supper stored.':' suppers stored.');el('family-state').dataset.mood=family.mood;
 el('family-activity').textContent=familyActivity(state);
 el('energy').value=DAY_WORK-state.effort;el('energy').setAttribute('aria-valuetext',(DAY_WORK-state.effort)+' of '+DAY_WORK+' energy remaining');
 el('mode').textContent=mode[0].toUpperCase()+mode.slice(1);
 el('load').textContent=state.cargo?`${state.cargo.wood} wood + ${state.cargo.food} food in tow`:'Free paws';
 el('stock').textContent=`Day ${state.day} · ${weather(state)==='dry'?'low water':'steady flow'}`;
 el('colony').textContent=`Lodge: ${state.food} food (${home.foodNights} nights), ${state.wood} wood · Dam: ${state.damWood} wood delivered`;
 el('home-state').textContent=home.protected?'Lodge approach submerged':'Shallow approach · costs 2 effort after rest';
 workSites=damWorkSites(state);const workHere=workSites.find(p=>p.local),target=workSites.find(p=>p.id===selectedWork);
 el('play').classList.toggle('has-work-goal',!!target);el('face-new').hidden=!state.placedDam;el('face-new').textContent=workSites.some(p=>p.id!=='family'&&p.needsWork)?'Find next section':'Inspect new dam';el('work-direction').hidden=!target;el('work-direction').textContent=target?target.name+' · '+Math.ceil(target.distance)+' units away · '+target.prompt:'';
 el('work-help').hidden=!workHere;el('work-help').textContent=workHere?workHere.prompt+' — '+workHere.detail:'';
 const options=habitatOptions(state),primary=primaryHabitatAction(state);
 el('interact').disabled=!primary||paused||mapOpen||planning;el('interact').textContent=primary?primary.label+' · E':workHere?.needsWork?workHere.prompt:options.length?'Choose nearby work':'Explore the creek';
 el('drop').hidden=!state.cargo;
 const signature=JSON.stringify([place?.point.id,options]);
 if(signature!==actionSignature){
  actionSignature=signature;el('local-actions').replaceChildren();
  for(const a of options.filter(a=>a.id!=='drop')){
   const button=document.createElement('button');button.textContent=a.label+(a.cost?` · ${a.cost} effort`:'');button.disabled=!a.enabled;button.title=a.reason;
   button.onclick=()=>interact(a.id);el('local-actions').append(button);
  }
 }
 el('nearby').hidden=!place&&!options.some(a=>a.id==='pickup')||mapOpen;
 el('place-name').textContent=place?.point.name||'Supplies on the bank';
 let detail='';
 if(place?.type==='patch'){const p=place.point;detail=`${state.patches[p.id].stock}/${p.max} growth · ${p.description}${waterDepth(p.x,p.z,state)>.25?' Roots submerged: regrowth pauses.':''}`;}
 if(place?.type==='lodge')detail='Store mixed loads, carry stored wood onward, or rest to advance growth and weather. Rest consumes 2 food. A shortage uses 4 effort tomorrow; feeding the next rest restores recovery.';
 if(place?.type==='dam')detail=`${['Leaky established dam','Sealed low dam','Raised dam'][state.dam]}. Retaining water can turn shallow cuts into swimming routes. Opening a notch returns no wood.`;
 if(place?.type==='customDam'){const section=state.placedDam.sections[place.index];detail=`Built: ${section.level?CRESTS[section.level].toFixed(2):'open gap'} · target ${CRESTS[section.target].toFixed(2)} · ${section.wood} wood delivered here. Plan dam opens heights and extension controls. Work affects only this nearby section.`;}
 if(place?.type==='channel'){const c=channelStatus(state,place.point.id);detail=`Depth ${c.depth.toFixed(2)} · ${c.swimmable?'swimmable with a load':'too shallow for swimming'}. Digging changes this route; dry flow can expose a shallow cut.`;}
 let story='';
 if(place?.type==='patch'){const p=place.point;story=state.patches[p.id].stock===0?'Only cut stems remain here. Leave time for new growth, or try another stand.':p.description;}
 if(place?.type==='lodge')story='Rest here when you are ready for tomorrow. The family eats from your supply, and the creek can change overnight.';
 if(place?.type==='dam')story=state.dam===0?'Water slips through the gaps. Holding more water could help the lodge and your hauling routes.':'The pond reaches farther along the banks. Consider what a higher or lower pond would change.';
 if(place?.type==='customDam')story='These stakes mark your chosen crossing. Build nearby sections with delivered wood; open gaps let water through.';
 if(place?.type==='channel')story=channelStatus(state,place.point.id).swimmable?'This cut now floats a load. Try it on your next supply trip.':state.channels[place.point.id]?'The cut is too shallow to float a load now. You could deepen it or retain more water.':'A low strip leads toward useful growth. Digging here could bring water closer to it.';
 el('place-story').textContent=story;
 const reason=options.filter(a=>!a.enabled&&a.reason).map(a=>a.reason);el('place-detail').textContent=detail+(reason.length?' '+[...new Set(reason)].join(' '):'');
 if(mapOpen&&mapDirty)drawMap();
}
function interact(action){
 if(paused||mapOpen||planning)return;
 if(action==='interact')action=primaryHabitatAction(state)?.id;
 const before=state,result=habitatAction(state,action);state=result.state;message(journeyFeedback(before,state,action)||result.message);
 if(!lab&&!before.journey.completedDay&&state.journey.completedDay){el('chapter-moment').hidden=false;el('moment-detail').textContent='The family spent a fed night at low water, with food left for tomorrow. Your changes made this home work. Keep the creek as it is, improve a hauling route, or explore for another crossing.';}mapDirty=true;persist();updateHud();
}
el('nudge').onclick=()=>message(journeyHint(state));
el('face-home').onclick=()=>{yaw=Math.atan2(state.x-LODGE.x,state.z-LODGE.z);message('The family lodge is ahead. Approach it to leave supplies or rest.');};
el('moment-close').onclick=()=>{el('chapter-moment').hidden=true;el('view').focus();};
el('resume').onclick=()=>setPause(false);
el('restart').onclick=()=>{state=newRun();el('chapter-moment').hidden=true;selectedWork=null;yaw=0;distance=6.5;toggleMap(false);setPause(false);mapDirty=true;message(lab?'Pick up the timber beside you, or open Plan dam to experiment.':journeyHint(state));updateHud();};
el('pause-button').onclick=()=>setPause(!paused);
el('map-button').onclick=()=>{if(!paused)toggleMap();};el('close-map').onclick=()=>toggleMap(false);
el('center-button').onclick=recenter;
el('interact').onclick=()=>interact('interact');el('drop').onclick=()=>interact('drop');
window.addEventListener('keydown',event=>{
 const key=event.key.toLowerCase();
 if(key==='tab'&&paused){
  const controls=[...el('menu').querySelectorAll('button,a,summary')],first=controls[0],last=controls.at(-1);
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  return;
 }
 if(event.target.closest('input,select,textarea'))return;
 if([' ','enter'].includes(key)&&event.target.closest('button,summary'))return;
 if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(key))event.preventDefault();
 if(event.repeat)return;
 if(key==='escape'){if(planning){planner.toggle(false);return;}if(mapOpen)toggleMap(false);else setPause(!paused);return;}
 if(key==='b'&&!paused){toggleMap(false);planner.toggle();return;}
 if(key==='m'&&!paused&&!planning){toggleMap();return;}
 if(key==='c'){recenter();return;}
 if(paused||mapOpen||planning)return;
 if(key==='e'){interact('interact');return;}
 if(key==='x'){interact('drop');return;}
 keys.add(key);
});
window.addEventListener('keyup',event=>keys.delete(event.key.toLowerCase()));
window.addEventListener('blur',()=>{if(!paused)setPause(true);else stopInput();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){setPause(true);persist();}});
const view=el('view');
view.addEventListener('contextmenu',event=>event.preventDefault());
view.addEventListener('pointerdown',event=>{
 if(paused||mapOpen||lookPointer!==null)return;
 lookPointer=event.pointerId;lookStart={x:event.clientX,y:event.clientY};view.setPointerCapture(event.pointerId);
});
view.addEventListener('pointermove',event=>{
 if(event.pointerId!==lookPointer||!lookStart)return;
 yaw-=(event.clientX-lookStart.x)*.006;lookStart={x:event.clientX,y:event.clientY};
});
function releaseLook(event){if(event.pointerId===lookPointer){lookPointer=null;lookStart=null;}}
for(const name of ['pointerup','pointercancel','lostpointercapture'])view.addEventListener(name,releaseLook);
view.addEventListener('wheel',event=>{if(paused||mapOpen||planning)return;event.preventDefault();distance=Math.max(4.5,Math.min(9,distance+event.deltaY*.007));},{passive:false});
const joystick=el('stick');
function moveStick(event){
 const bounds=joystick.getBoundingClientRect(),x=(event.clientX-bounds.left-bounds.width/2)/35,y=(bounds.top+bounds.height/2-event.clientY)/35,length=Math.max(1,Math.hypot(x,y));
 stick={x:x/length,y:y/length};el('stick-knob').style.transform='translate('+stick.x*29+'px,'+(-stick.y*29)+'px)';
}
joystick.addEventListener('pointerdown',event=>{if(paused||mapOpen||stickPointer!==null)return;event.preventDefault();stickPointer=event.pointerId;joystick.setPointerCapture(event.pointerId);moveStick(event);});
joystick.addEventListener('pointermove',event=>{if(event.pointerId===stickPointer)moveStick(event);});
function releaseStick(event){if(event.pointerId===stickPointer){stickPointer=null;stick={x:0,y:0};el('stick-knob').style.transform='';}}
for(const name of ['pointerup','pointercancel','lostpointercapture'])joystick.addEventListener(name,releaseStick);
for(const [id,turn] of [['look-left',1],['look-right',-1]]){
 const button=el(id);button.addEventListener('pointerdown',event=>{if(paused||mapOpen||planning)return;lookDirection=turn;button.setPointerCapture(event.pointerId);});
 for(const name of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(name,()=>lookDirection=0);
 button.onclick=()=>{if(!paused&&!mapOpen&&!planning)yaw+=turn*.2;};
}
function frame(time){
 const dt=Math.min(.4,Math.max(0,(time-lastTime)/1000));lastTime=time;
 let moving=false;
 if(!paused&&!mapOpen&&!planning){
  yaw+=lookDirection*dt*1.7;
  const x=(keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0)+stick.x;
  const forward=(keys.has('w')||keys.has('arrowup')?1:0)-(keys.has('s')||keys.has('arrowdown')?1:0)+stick.y;
  if(Math.hypot(x,forward)>.08){
   const old=state,oldMode=movementMode(old.x,old.z,old);
   const steps=Math.max(1,Math.ceil(dt/.05));
   for(let step=0;step<steps;step++)state=habitatMove(state,{x:x*Math.cos(yaw)-forward*Math.sin(yaw),z:-x*Math.sin(yaw)-forward*Math.cos(yaw)},dt/steps);
   moving=Math.hypot(state.x-old.x,state.z-old.z)>.001;mapDirty=true;
   const found=[...PATCHES,...CHANNELS].find(p=>!old.known[p.id]&&state.known[p.id]);
   if(found)message(found.name+' is nearby. Approach to inspect its possibilities.');
   else if(oldMode!=='swimming'&&movementMode(state.x,state.z,state)==='swimming'&&!state.known.swimming){state.known.swimming=true;message('You are swimming. Hauling is faster here than over land.');}
  }
 }
 if(!lab&&state.journey.broughtHome&&time>messageExpires)el('message').hidden=true;
 scene.update(state,{yaw,distance,moving,active:!paused&&!mapOpen&&!planning,previewState:planner.previewState},time);updateWorkMarkers();
 if(time-lastHud>160){updateHud();lastHud=time;}
 if(time-lastSave>2000){persist();lastSave=time;}
 requestAnimationFrame(frame);
}
if(state.cargo)message('Your load is still in tow. Deliver wood at the dam or bring supplies to the lodge.');
else message(lab?'Pick up the timber beside you, or open Plan dam to experiment.':journeyHint(state));
if(lab){el('lab-link').href='explore.html';el('lab-link').textContent='Return to the living creek sandbox';el('menu-note').textContent='Placement lab: the terrain is surveyed and 24 wood are in piles beside you. Open Plan dam, choose two bank endpoints and a target crest, then place stakes. Pick up timber and deliver it to nearby sections. Compare the completed preview with gaps, notches and different heights.';}
setPause(true);updateHud();requestAnimationFrame(frame);
