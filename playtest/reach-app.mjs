import {createCreekScene} from './creek-scene.mjs';
import {SOURCES,CROSSINGS,CHANNELS,waterState,lodgeDefinition} from './creek-rules.mjs';
import {freshReach,reachAct,reachCreek,homeDepth,viableHome,projectPreview,HOME_NAMES,jobLabel,saveReach,loadReach} from './reach-rules.mjs';
const el=id=>document.getElementById(id),saveKey='beaverbrook-first-reach-v1';
let state,storage=true;
try{state=loadReach(localStorage.getItem(saveKey))||freshReach();}catch{state=freshReach();storage=false;}
let selected='home:willow',layer='sites',history=[],busy=false;
const scene=createCreekScene(el('scene'),el('pins'),data=>{if(!busy){selected=data.project;draw();}});
const sourceIds=Object.keys(SOURCES);
for(const id of sourceIds.filter(id=>SOURCES[id].kind==='wood')){const option=document.createElement('option');option.value=id;option.textContent=SOURCES[id].name;el('wood').append(option);}
el('wood').value='fallen';
function persist(){try{localStorage.setItem(saveKey,saveReach(state));storage=true;}catch{storage=false;}}
function button(text,action){const b=document.createElement('button');b.textContent=text;b.onclick=()=>perform(action);return b;}
function queue(kind,site){return {type:'queue',kind,site,source:el('wood').value};}
function draw(){
 const creek=reachCreek(state),pins=[];
 if(layer==='sites'){
  for(const [id,name] of Object.entries(HOME_NAMES))pins.push({id:'home:'+id,name:(id===state.home?'⌂ ':'')+name,cell:lodgeDefinition(creek,id).cell,labelOffset:id==='meadow'?[85,-20]:id==='bank'?[35,35]:[-15,-20]});
  for(const [id,c] of Object.entries(CROSSINGS))pins.push({id:'dam:'+id,name:c.name+' dam',cell:c.cell,labelOffset:id==='bend'?[-80,25]:[-60,-20]});
 }else if(layer==='sources'){
  for(const [id,source] of Object.entries(SOURCES))pins.push({id:'source:'+id,name:source.name,cell:source.cell});
 }else for(const [id,c] of Object.entries(CHANNELS))pins.push({id:'channel:'+id,name:c.name,cell:c.cells[1]});
 const [type,id]=selected.split(':');
 const picture=structuredClone(creek);
 for(const [source,record] of Object.entries(state.observations))picture.sources[source]=record.biomass;
 let preview;
 if(type==='dam')preview=projectPreview(state,'dam',id);
 if(type==='channel')preview=projectPreview(state,'channel',id);
 scene.update(picture,{projects:pins,namedProjects:true,waterPreview:preview,channelPreview:type==='channel'?id:null});
 el('season').textContent='Season '+state.season+(state.season%3===0?' · low water':' · normal water');
 el('daylight').textContent=state.daylight+' daylight';el('food').textContent=state.creek.stock.cache.food+' food stored';el('home').textContent=HOME_NAMES[state.home];
 el('message').textContent=state.message;
 el('forecast').textContent=state.season%3===2?'Water falls next season. Inspect the dry entrance forecast before moving.':state.season%3===0?'Low water lasts through this season. Normal water returns next season.':'Two normal seasons, then one dry season. Structures and resource patches persist.';
 el('landscape').textContent=waterState(creek).wet.size+' water tiles · '+(viableHome(state)?'The occupied entrance is sheltered.':'The occupied entrance needs deeper water or another shelter.');
 el('actions').replaceChildren();el('selection-depth').textContent='';el('wood-label').hidden=type==='source';
 if(type==='home'){
  const shelter=creek.shelters[id];
  el('selection-title').textContent=HOME_NAMES[id];
  el('selection-note').textContent=id==='bank'?'Existing deep water beside a high bank. A bank shelter can work independently of a dam.':id==='meadow'?'An open meadow beside the lower crossing. A pond here can support a new lodge and different hauling routes.':'An inherited lodge beside a leaking dam. Restore its pond, deepen its entrance, or leave it standing while the family settles elsewhere.';
  el('selection-depth').textContent='Entrance now '+homeDepth(state,id).toFixed(2)+' · low-water forecast '+homeDepth(state,id,true).toFixed(2)+' · sheltered at 0.40. '+(shelter.stage===2?'Shelter complete.':shelter.stage===1?'Shell standing.':'No shelter built.');
  if(shelter.stage<2)el('selection-depth').textContent+=' Construction uses '+(shelter.stage===0?'4 wood and 2 mud.':'2 mud.');
  if(shelter.stage<2)el('actions').append(button('Build shelter',queue('shelter',id)));
  if(shelter.stage===2&&!shelter.deep)el('actions').append(button('Deepen doorway',queue('entrance',id)));
  if(shelter.stage===2&&id!==state.home)el('actions').append(button('Move household · 3 daylight',{type:'move',site:id}));
 }else if(type==='dam'){
  const dam=creek.dams[id],closed=dam.sections.every(n=>n===2);
  el('selection-title').textContent=CROSSINGS[id].name+' dam';
  el('selection-note').textContent=dam.sections.filter(n=>n===2).length+' of '+dam.sections.length+' sections sealed. The outline previews additional pond water after completion. All building uses delivered wood and mud. Remaining structure needs '+dam.sections.filter(n=>n===0).length*2+' wood and '+dam.sections.filter(n=>n<2).length+' mud, less any material already delivered.';
  if(!closed)el('actions').append(button(id==='narrows'?'Restore the old dam':'Build meadow dam',queue('dam',id)));
  if(closed&&!dam.raised)el('actions').append(button('Raise crest',queue('raise',id)));
 }else if(type==='channel'){
  el('selection-title').textContent=CHANNELS[id].name;
  el('selection-note').textContent='Lower the marked ground to connect material routes to the narrows pond. Shallow cuts may lose swimming depth during dry weather.';
  if(creek.channels[id]!==2)el('actions').append(button(creek.channels[id]?'Deepen cut':'Dig cut',queue('channel',id)));
 }else{
  const source=SOURCES[id],record=state.observations[id];
  el('selection-title').textContent=source.name;
  el('selection-note').textContent=(record?record.biomass+' branches observed in season '+record.season:creek.sources[id]+' '+source.kind+' available')+'. Living sources supply food or construction wood. Cutting for either purpose reduces the same patch and its recovery reserves.';
  if(source.food)el('actions').append(button('Order 4 food branches',queue('forage',id)),button('Inspect supply',{type:'visit',site:id}));
 }
 el('orders').replaceChildren(...state.queue.map(j=>{
  const li=document.createElement('li');li.textContent=jobLabel(j)+(j.kind==='forage'?' · '+j.remaining+' remaining':' · wood from '+SOURCES[j.source].name);
  li.append(button('Remove',{type:'cancel',key:j.key}));return li;
 }));
 el('work').disabled=!state.queue.length;el('undo').disabled=!history.length;
 el('outcome').textContent=state.challenge==='achieved'?'Seasonal challenge achieved. Your settlement continues.':'Goal: shelter the household through low water with stored reserves or a renewing food supply.';
 el('save-note').textContent=storage?'Autosaved on this device. Undo history lasts for this session.':'Saving unavailable. Keep this page open or export your run.';
 el('history').replaceChildren(...state.log.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
}
async function perform(action){
 if(busy)return;
 const result=reachAct(state,action);
 if(!result.ok){el('message').textContent=result.message;return;}
 busy=true;el('controls').inert=true;el('layers').inert=true;
 try{
  for(const trip of result.trips){
   const pictured=structuredClone(trip.carried);
   for(const [id,record] of Object.entries(state.observations))pictured.sources[id]=record.biomass;
   scene.update(pictured,{projects:[],preview:trip.route,familyTrail:true});await scene.animateDelivery(trip.route,500);
  }
  history.push(state);state=result.state;persist();
 }finally{busy=false;el('controls').inert=false;el('layers').inert=false;draw();}
}
for(const b of document.querySelectorAll('[data-layer]'))b.onclick=()=>{if(!busy){layer=b.dataset.layer;document.querySelectorAll('[data-layer]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw();}};
el('wood').onchange=draw;
el('work').onclick=()=>perform({type:'work'});
el('advance').onclick=()=>perform({type:'advance'});
el('undo').onclick=()=>{if(!busy&&history.length){state=history.pop();persist();draw();}};
el('restart').onclick=()=>{if(!busy){state=freshReach();history=[];persist();draw();}};
el('export').onclick=()=>{const url=URL.createObjectURL(new Blob([saveReach(state)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='beaverbrook-first-reach.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
draw();
