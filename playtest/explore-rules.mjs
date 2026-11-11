// Authored movement playground. Distances and speeds are game units.
export const BOUNDS=24;
export const LODGE={id:'lodge',name:'Family lodge',x:-7,z:6};
export const GROVE={id:'grove',name:'Branch grove',x:7,z:-4};
export const LANDING={id:'landing',name:'Low-bank crossing',x:2,z:-4};
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const smooth=n=>{const t=clamp(n,0,1);return t*t*(3-2*t);};
export function riverCenter(z){return Math.sin(z*.14)*1.7;}
function baseHeight(x,z){
 const d=Math.abs(x-riverCenter(z));
 const bank=-.85+smooth((d-1.8)/3.3)*1.8;
 const ridge=smooth((x-12)/5)*smooth((z-2)/6)*5.5;
 return bank+ridge;
}
export const CHANNELS=[
 {id:'west',name:'Willow cut',x:-4,z:0,start:0,end:-7},
 {id:'east',name:'Aspen cut',x:4,z:-4,start:0,end:7}
];
export function groundHeight(x,z,s){
 let bed=baseHeight(x,z);
 if(s?.version===2){
  for(const c of CHANNELS){const level=s.channels[c.id];if(!level)continue;
   const offset=Math.hypot(Math.max(Math.min(c.start,c.end)-x,0,x-Math.max(c.start,c.end)),z-c.z);
   const blend=1-smooth((offset-.65)/1.8),floor=level===1?-.08:-.5;
   bed=Math.min(bed,bed+(floor-bed)*blend);
  }
  if(s.entrance){const d=Math.hypot(x+2.2,z-6);bed=Math.min(bed,bed+(-.6-bed)*(1-smooth((d-.5)/1.8)));}
 }
 return bed;
}
const waterCache=new Map();
export function creekWater(s){
 if(s?.version!==2)return null;
 const dry=s.day%6>=4||s.day%6===0,key=[s.dam,s.channels.west,s.channels.east,s.entrance,dry].join(',');
 if(waterCache.has(key))return waterCache.get(key);
 const surface=[.12,.4,.68][s.dam]-(dry?.25:0),wet=new Map(),queue=[[0,0]],seen=new Set();
 for(let i=0;i<queue.length;i++){
  const [x,z]=queue[i],k=x+','+z;if(seen.has(k))continue;seen.add(k);
  if(Math.abs(x)>23||z< -23||z>=10||groundHeight(x+.5,z+.5,s)>=surface)continue;
  wet.set(k,surface);queue.push([x+1,z],[x-1,z],[x,z+1],[x,z-1]);
 }
 // The downstream stream remains fed. Retained pond water cannot cross the dam.
 for(let z=10;z<24;z++)for(let x=-24;x<24;x++)if(groundHeight(x+.5,z+.5,s)<0)wet.set(x+','+z,0);
 const result={key,surface,wet};if(waterCache.size>30)waterCache.clear();waterCache.set(key,result);return result;
}
export function waterLevel(x,z,s){return s?.version===2?creekWater(s).wet.get(Math.floor(x)+','+Math.floor(z)):0;}
export function waterDepth(x,z,s){const surface=waterLevel(x,z,s);return surface===undefined?0:Math.max(0,surface-groundHeight(x,z,s));}
export function movementMode(x,z,s){const depth=waterDepth(x,z,s);return depth>=.32?'swimming':depth>.02?'wading':'walking';}
export function speedFor(mode,carrying){return mode==='swimming'?(carrying?2.5:2.8):mode==='wading'?(carrying?1.15:1.45):(carrying?1.55:2.3);}
// Trees are authored reproducibly, with clear approaches to the teaching locations.
export const TREES=Array.from({length:88},(_,i)=>({id:i,x:((i*137)%431)/10-21.5,z:((i*193+51)%427)/10-21.3,radius:.45,height:2.7+(i%4)*.25})).filter(t=>groundHeight(t.x,t.z)>.3&&[LODGE,GROVE,LANDING,{x:-7,z:0},{x:-7,z:-11}].every(p=>Math.hypot(t.x-p.x,t.z-p.z)>3));
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
 const mode=movementMode(s.x,s.z,s),speed=speedFor(mode,s.carrying);
 const dx=input.x/Math.max(1,length)*speed*dt,dz=input.z/Math.max(1,length)*speed*dt;
 // Axis sliding lets the player move past trunks and banks without getting pinned.
 const legal=(x,z)=>canStand(x,z,obstacles)&&groundHeight(x,z,s)-groundHeight(s.x,s.z,s)<=Math.hypot(x-s.x,z-s.z)*(s.version===2?1.6:.95)+.005;
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
// Keep the eye above the local ground/water reference, independent of obstructions.
export function cameraBoom(s,yaw,distance=6.5,height=Math.max(0,groundHeight(s.x,s.z))){
 return {target:{x:s.x,y:height+.65,z:s.z},position:{x:s.x+Math.sin(yaw)*distance,y:height+3.6,z:s.z+Math.cos(yaw)*distance}};
}
export function dampCamera(current,target,dt,rate=6){return current+(target-current)*(1-Math.exp(-Math.max(0,dt)*rate));}
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
