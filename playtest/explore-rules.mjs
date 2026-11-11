// Authored movement playground. Distances and speeds are game units.
export const BOUNDS=24;
export const LODGE={id:'lodge',name:'Family lodge',x:-7,z:6};
export const GROVE={id:'grove',name:'Branch grove',x:7,z:-4};
export const LANDING={id:'landing',name:'Low-bank crossing',x:2,z:-4};
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const smooth=n=>{const t=clamp(n,0,1);return t*t*(3-2*t);};
export function riverCenter(z){return Math.sin(z*.14)*1.7;}
export function groundHeight(x,z){
 const d=Math.abs(x-riverCenter(z));
 const bank=-.85+smooth((d-1.8)/3.3)*1.8;
 const ridge=smooth((x-12)/5)*smooth((z-2)/6)*5.5;
 return bank+ridge;
}
export function waterDepth(x,z){return Math.max(0,-groundHeight(x,z));}
export function movementMode(x,z){const depth=waterDepth(x,z);return depth>=.32?'swimming':depth>.02?'wading':'walking';}
export function speedFor(mode,carrying){return mode==='swimming'?(carrying?2.5:2.8):mode==='wading'?(carrying?1.15:1.45):(carrying?1.55:2.3);}
// Trees are authored reproducibly, with clear approaches to the teaching locations.
export const TREES=Array.from({length:88},(_,i)=>({id:i,x:((i*137)%431)/10-21.5,z:((i*193+51)%427)/10-21.3,radius:.45,height:2.7+(i%4)*.25})).filter(t=>groundHeight(t.x,t.z)>.3&&[LODGE,GROVE,LANDING].every(p=>Math.hypot(t.x-p.x,t.z-p.z)>3));
export const OBSTACLES=[...TREES,{x:LODGE.x,z:LODGE.z,radius:1.15,height:1.4},{x:-4,z:-8,radius:.8,height:.7}];
export function canStand(x,z,obstacles=OBSTACLES){
 return Math.abs(x)<=BOUNDS-.6&&Math.abs(z)<=BOUNDS-.6&&!obstacles.some(o=>Math.hypot(x-o.x,z-o.z)<o.radius+.32);
}
export function discover(state){
 const next=state;
 for(let z=-BOUNDS;z<BOUNDS;z++)for(let x=-BOUNDS;x<BOUNDS;x++){
  if(Math.hypot(x+.5-next.x,z+.5-next.z)<=7)next.explored[`${x},${z}`]=true;
 }
 for(const p of [GROVE,LANDING])if(Math.hypot(next.x-p.x,next.z-p.z)<=5.5)next.known[p.id]=true;
 return next;
}
export function freshExplore(){return discover({version:1,x:-7,z:3,yaw:0,carrying:false,groveStock:3,dropped:[],stored:0,explored:{},known:{lodge:true},inspected:false,distance:0,walking:0,swimming:0});}
export function moveExplore(state,input,seconds,obstacles=OBSTACLES){
 const s=structuredClone(state),dt=clamp(seconds,0,.1);
 const length=Math.hypot(input.x,input.z);
 if(!length||!Number.isFinite(length)||!dt)return s;
 const mode=movementMode(s.x,s.z),speed=speedFor(mode,s.carrying);
 const dx=input.x/Math.max(1,length)*speed*dt,dz=input.z/Math.max(1,length)*speed*dt;
 // Axis sliding lets the player move past trunks and banks without getting pinned.
 const legal=(x,z)=>canStand(x,z,obstacles)&&groundHeight(x,z)-groundHeight(s.x,s.z)<=Math.hypot(x-s.x,z-s.z)*.95+.005;
 const old={x:s.x,z:s.z};
 if(legal(s.x+dx,s.z))s.x+=dx;
 if(legal(s.x,s.z+dz))s.z+=dz;
 const travelled=Math.hypot(s.x-old.x,s.z-old.z);
 if(travelled){
  s.yaw=Math.atan2(s.x-old.x,-(s.z-old.z));
  s.distance+=travelled;
  if(mode==='swimming')s.swimming+=travelled;else s.walking+=travelled;
  discover(s);
 }
 return s;
}
export function nearbyInteraction(s){
 if(s.carrying){
  if(Math.hypot(s.x-LODGE.x,s.z-LODGE.z)<2)return {type:'deliver',label:'Leave branch at the lodge'};
  return null;
 }
 const dropped=s.dropped.findIndex(p=>Math.hypot(s.x-p.x,s.z-p.z)<1.7);
 if(dropped>=0)return {type:'pickup',index:dropped,label:'Pick up dropped branch'};
 if(s.groveStock>0&&Math.hypot(s.x-GROVE.x,s.z-GROVE.z)<2)return {type:'gather',label:'Take a fallen branch'};
 if(Math.hypot(s.x-LANDING.x,s.z-LANDING.z)<2)return {type:'inspect',label:'Inspect the landing'};
 return null;
}
export function interactExplore(state,action='interact'){
 const s=structuredClone(state);
 if(action==='drop'){
  if(!s.carrying)return {state,message:'You have no branch to drop.'};
  s.dropped.push({x:s.x,z:s.z});s.carrying=false;
  return {state:s,message:'Branch released. It stays here so you can try another approach.'};
 }
 const interaction=nearbyInteraction(s);
 if(!interaction)return {state,message:'Move closer to the grove, landing or lodge.'};
 if(interaction.type==='deliver'){s.carrying=false;s.stored++;return {state:s,message:'A branch is home. Try another route, or explore beyond the familiar bank.'};}
 if(interaction.type==='gather'){s.carrying=true;s.groveStock--;return {state:s,message:'Branch in tow. Swimming is easier than dragging it over the bank. The lodge is marked on your map.'};}
 if(interaction.type==='pickup'){s.dropped.splice(interaction.index,1);s.carrying=true;return {state:s,message:'Branch recovered.'};}
 s.inspected=true;return {state:s,message:'A low, gradual bank. You can wade here, then swim in the deeper channel. This could be a useful hauling landing.'};
}
export function cameraBoom(s,yaw,distance=6.5,pitch=.5,obstacles=OBSTACLES){
 const height=movementMode(s.x,s.z)==='swimming'?-.1:groundHeight(s.x,s.z);
 const target={x:s.x,y:height+.8,z:s.z};
 const horizontal=Math.cos(pitch)*distance;
 const desired={x:target.x+Math.sin(yaw)*horizontal,y:target.y+Math.sin(pitch)*distance,z:target.z+Math.cos(yaw)*horizontal};
 let fraction=1;
 for(let i=3;i<=30;i++){
  const t=i/30,x=target.x+(desired.x-target.x)*t,y=target.y+(desired.y-target.y)*t,z=target.z+(desired.z-target.z)*t;
  const blocked=groundHeight(x,z)+.22>y||obstacles.some(o=>Math.hypot(x-o.x,z-o.z)<o.radius+.18&&y<groundHeight(o.x,o.z)+o.height+.5);
  if(blocked){fraction=Math.max(.18,(i-2)/30);break;}
 }
 return {target,position:{x:target.x+(desired.x-target.x)*fraction,y:Math.max(groundHeight(target.x+(desired.x-target.x)*fraction,target.z+(desired.z-target.z)*fraction)+.25,target.y+(desired.y-target.y)*fraction),z:target.z+(desired.z-target.z)*fraction}};
}
export function loadExplore(text){
 try{
  const s=JSON.parse(text);
  if(s.version!==1||!Number.isFinite(s.x)||!Number.isFinite(s.z)||!canStand(s.x,s.z)||!Number.isFinite(s.yaw)||typeof s.carrying!=='boolean')return null;
  if(!Number.isInteger(s.groveStock)||s.groveStock<0||s.groveStock>3||!Number.isInteger(s.stored)||s.stored<0||!Array.isArray(s.dropped))return null;
  if(s.groveStock+s.stored+s.dropped.length+Number(s.carrying)!==3)return null;
  if(s.dropped.some(p=>!Number.isFinite(p.x)||!Number.isFinite(p.z)||Math.abs(p.x)>BOUNDS||Math.abs(p.z)>BOUNDS))return null;
  if(!s.explored||typeof s.explored!=='object'||!s.known||typeof s.known!=='object')return null;
  if(!['distance','walking','swimming'].every(k=>Number.isFinite(s[k])&&s[k]>=0))return null;
  return s;
 }catch{return null;}
}
