import {createExploreScene} from './explore-scene.mjs';
import {BOUNDS,LODGE,GROVE,LANDING,freshExplore,moveExplore,movementMode,nearbyInteraction,interactExplore,groundHeight,loadExplore} from './explore-rules.mjs';

const el=id=>document.getElementById(id),saveKey='beaverbrook-creekside-v1';
let state,storage=true;
try{state=loadExplore(localStorage.getItem(saveKey))||freshExplore();}catch{state=freshExplore();storage=false;}
let paused=true,mapOpen=false,yaw=0,pitch=.5,distance=6.5,lastTime=0,lastSave=0,lastHud=0,mapDirty=true;
let stick={x:0,y:0},stickPointer=null,lookPointer=null,lookStart=null,lookDirection=0;
const keys=new Set(),scene=createExploreScene(el('view'));
el('renderer').textContent=scene.mode;
function persist(){try{localStorage.setItem(saveKey,JSON.stringify(state));storage=true;}catch{storage=false;}}
function stopInput(){keys.clear();stick={x:0,y:0};stickPointer=null;lookPointer=null;lookDirection=0;el('stick-knob').style.transform='';}
function message(text){el('message').textContent=text+(storage?'':' Saving is unavailable in this browser.');}
function setPause(value){paused=value;stopInput();for(const child of el('play').children)if(child.id!=='menu')child.inert=paused;el('menu').hidden=!paused;el('menu-title').textContent='A beaver’s view';el('resume').textContent='Return to the creek';if(!paused)el('view').focus();else el('resume').focus();persist();}
function toggleMap(value=!mapOpen){mapOpen=value;stopInput();el('map-panel').hidden=!value;el('map-button').setAttribute('aria-expanded',value);if(value)drawMap();else el('view').focus();}
function recenter(){yaw=-state.yaw;pitch=.5;}
function drawMap(){
 const canvas=el('map'),ctx=canvas.getContext('2d'),size=canvas.width,scale=size/(BOUNDS*2);
 ctx.fillStyle='#253f39';ctx.fillRect(0,0,size,size);
 for(const cell of Object.keys(state.explored)){
  const [x,z]=cell.split(',').map(Number),h=groundHeight(x+.5,z+.5),live=Math.hypot(x+.5-state.x,z+.5-state.z)<7;
  ctx.fillStyle=h<0?(live?'#68a6af':'#446b70'):h>1.5?(live?'#86916c':'#53634e'):(live?'#b3bb8c':'#778465');
  ctx.fillRect((x+BOUNDS)*scale,(z+BOUNDS)*scale,scale+.2,scale+.2);
 }
 function mark(point,color,label){const x=(point.x+BOUNDS)*scale,z=(point.z+BOUNDS)*scale;ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,z,5,0,Math.PI*2);ctx.fill();ctx.font='bold 13px system-ui';ctx.fillText(label,x+9,z-7);}
 mark(LODGE,'#f4ddb1','Lodge');
 if(state.known.grove)mark(GROVE,'#e6d6a3','Grove');
 if(state.known.landing)mark(LANDING,'#e5d8aa','Landing');
 for(const point of state.dropped)if(Math.hypot(point.x-state.x,point.z-state.z)<7)mark(point,'#d9b080','Branch');
 mark(state,'#ffffff','You');
 ctx.strokeStyle='#fff';ctx.beginPath();const px=(state.x+BOUNDS)*scale,pz=(state.z+BOUNDS)*scale;ctx.moveTo(px,pz);ctx.lineTo(px+Math.sin(state.yaw)*12,pz-Math.cos(state.yaw)*12);ctx.stroke();
 el('map-legend').textContent='Lighter ground is nearby. Darker ground is remembered. '+Object.keys(state.explored).length+' ground cells explored.';
 mapDirty=false;
}
function updateHud(){
 const mode=movementMode(state.x,state.z);
 el('mode').textContent=mode[0].toUpperCase()+mode.slice(1);
 el('load').textContent=state.carrying?'Branch in tow':'Free paws';el('stock').textContent=state.stored+' at the lodge';
 const interaction=nearbyInteraction(state);
 el('interact').disabled=!interaction||paused||mapOpen;
 el('interact').textContent=interaction?interaction.label+' · E':state.carrying?'Bring the branch home':'Explore the creek';
 el('drop').hidden=!state.carrying;
 if(mapOpen&&mapDirty)drawMap();
}
function interact(action){
 if(paused||mapOpen)return;
 const result=interactExplore(state,action);state=result.state;message(result.message);mapDirty=true;persist();updateHud();
}
el('resume').onclick=()=>setPause(false);
el('restart').onclick=()=>{state=freshExplore();yaw=0;pitch=.5;distance=6.5;toggleMap(false);setPause(false);mapDirty=true;message('A fresh creek. Find the grove across the water, or follow the bank and explore.');updateHud();};
el('pause-button').onclick=()=>setPause(!paused);
el('map-button').onclick=()=>{if(!paused)toggleMap();};el('close-map').onclick=()=>toggleMap(false);
el('center-button').onclick=recenter;
el('interact').onclick=()=>interact('interact');el('drop').onclick=()=>interact('drop');
window.addEventListener('keydown',event=>{
 const key=event.key.toLowerCase();
 if(key==='tab'&&paused){
  const controls=[...el('menu').querySelectorAll('button,a')],first=controls[0],last=controls.at(-1);
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  return;
 }
 if(event.target.closest('input,select,textarea'))return;
 if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(key))event.preventDefault();
 if(event.repeat)return;
 if(key==='escape'){if(mapOpen)toggleMap(false);else setPause(!paused);return;}
 if(key==='m'&&!paused){toggleMap();return;}
 if(key==='c'){recenter();return;}
 if(paused||mapOpen)return;
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
 yaw-=(event.clientX-lookStart.x)*.006;pitch=Math.max(.22,Math.min(.85,pitch+(event.clientY-lookStart.y)*.004));lookStart={x:event.clientX,y:event.clientY};
});
function releaseLook(event){if(event.pointerId===lookPointer){lookPointer=null;lookStart=null;}}
for(const name of ['pointerup','pointercancel','lostpointercapture'])view.addEventListener(name,releaseLook);
view.addEventListener('wheel',event=>{if(paused||mapOpen)return;event.preventDefault();distance=Math.max(4.5,Math.min(9,distance+event.deltaY*.007));},{passive:false});
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
 const button=el(id);button.addEventListener('pointerdown',event=>{if(paused||mapOpen)return;lookDirection=turn;button.setPointerCapture(event.pointerId);});
 for(const name of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(name,()=>lookDirection=0);
 button.onclick=()=>{if(!paused&&!mapOpen)yaw+=turn*.2;};
}
function frame(time){
 const dt=Math.min(.4,Math.max(0,(time-lastTime)/1000));lastTime=time;
 let moving=false;
 if(!paused&&!mapOpen){
  yaw+=lookDirection*dt*1.7;
  const x=(keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0)+stick.x;
  const forward=(keys.has('w')||keys.has('arrowup')?1:0)-(keys.has('s')||keys.has('arrowdown')?1:0)+stick.y;
  if(Math.hypot(x,forward)>.08){
   const old=state,oldMode=movementMode(old.x,old.z);
   const steps=Math.max(1,Math.ceil(dt/.05));
   for(let step=0;step<steps;step++)state=moveExplore(state,{x:x*Math.cos(yaw)-forward*Math.sin(yaw),z:-x*Math.sin(yaw)-forward*Math.cos(yaw)},dt/steps);
   moving=Math.hypot(state.x-old.x,state.z-old.z)>.001;mapDirty=true;
   if(!old.known.grove&&state.known.grove)message('A branch grove is ahead. Look for the fallen branches beneath the shrubs.');
   else if(!old.known.landing&&state.known.landing)message('A pale root marks a low bank. Approach it and inspect the landing.');
   else if(oldMode!=='swimming'&&movementMode(state.x,state.z)==='swimming'&&!state.known.swimming){state.known.swimming=true;message('You are swimming. Turn toward a gradual bank to get out.');}
  }
 }
 scene.update(state,{yaw,pitch,distance,moving},time);
 if(time-lastHud>160){updateHud();lastHud=time;}
 if(time-lastSave>2000){persist();lastSave=time;}
 requestAnimationFrame(frame);
}
if(state.carrying)message('Your branch is still in tow. Find the family lodge on the map.');
else if(state.stored)message(state.stored+' branches are home. Explore another route or bring back another branch.');
setPause(true);updateHud();requestAnimationFrame(frame);
