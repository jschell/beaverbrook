// Trial game economy; compressed days/yields are design abstractions, not biology.
import {freshExplore,moveExplore,discover,waterDepth,canStand,OBSTACLES,LODGE,CHANNELS} from './explore-rules.mjs';
export const DAM={id:'dam',name:'Family dam',x:0,z:10};
export const PATCHES=[
 {id:'willow',name:'Bank willow',x:-7,z:0,max:5,kind:'shrub',description:'Close to home. Prune for a mixed load, or browse for food. Leave stems for faster regrowth.'},
 {id:'aspen',name:'Aspen stand',x:7,z:-4,max:6,kind:'tree',description:'Across the creek. Felling the stand leaves several loads of wood and some food; recovery takes longer.'},
 {id:'alder',name:'Upstream alder',x:-7,z:-11,max:5,kind:'tree',description:'A second wood and food source. A longer journey can protect the nearby willow.'}
];
export const DAY_WORK=12;
export function freshHabitat(){
 const s={...freshExplore(),version:2,day:1,effort:0,food:6,wood:0,dam:0,damWood:0,channels:{west:0,east:0},entrance:0,patches:Object.fromEntries(PATCHES.map(p=>[p.id,{stock:p.max,recovery:0}])),cargo:null,loose:[],ledger:{woodHarvested:0,foodHarvested:0,woodUsed:0,foodEaten:0},nights:0,shortage:false,history:[]};
 s.known.dam=true;for(const p of [...PATCHES,...CHANNELS])if(Math.hypot(s.x-p.x,s.z-p.z)<5.5)s.known[p.id]=true;return discover(s);
}
export function weather(s){return s.day%6>=4||s.day%6===0?'dry':'normal';}
export function habitatMove(s,input,dt){const next=moveExplore(s,input,dt,OBSTACLES);for(const p of [...PATCHES,...CHANNELS])if(Math.hypot(next.x-p.x,next.z-p.z)<5.5)next.known[p.id]=true;return next;}
const near=(s,p,r=2.3)=>Math.hypot(s.x-p.x,s.z-p.z)<r;
export function localPlace(s){
 if(near(s,LODGE,2.7))return {type:'lodge',point:LODGE};
 if(near(s,DAM,3.3))return {type:'dam',point:DAM};
 for(const p of PATCHES)if(near(s,p,2.6))return {type:'patch',point:p};
 for(const p of CHANNELS)if(near(s,p,2.5))return {type:'channel',point:p};
 return null;
}
export function channelStatus(s,id){
 const p=CHANNELS.find(p=>p.id===id);if(!p)return {depth:0,swimmable:false};
 const depth=waterDepth(p.x,p.z,s);return {depth,swimmable:depth>=.32};
}
export function homeStatus(s){
 const depth=waterDepth(-2.2,6,s);
 return {depth,protected:depth>=.32,foodNights:Math.floor(s.food/2),supported:s.food>=2&&depth>=.32};
}
function option(s,id,label,cost=0,allowed=true,why=''){
 const tired=s.effort+cost>DAY_WORK;
 return {id,label,cost,enabled:allowed&&!tired,reason:!allowed?why:tired?'Rest at the lodge to recover.':''};
}
export function habitatOptions(s){
 const actions=[],place=localPlace(s);
 const loose=s.loose.findIndex(p=>near(s,p,1.8));
 if(!s.cargo&&loose>=0)actions.push(option(s,'pickup','Pick up timber / food',0));
 if(place?.type==='patch'){
  const p=place.point,stock=s.patches[p.id].stock,free=!s.cargo;
  actions.push(option(s,'prune','Prune · 1 wood + 1 food',1,free&&stock>=1,!free?'Set down your load first.':'Regrowth needs time.'));
  actions.push(option(s,'browse','Browse · 2 food',1,free&&stock>=1,!free?'Set down your load first.':'Regrowth needs time.'));
  actions.push(option(s,'fell',p.kind==='shrub'?'Cut patch · several wood loads':'Fell stand · several wood loads',3,free&&stock>=2,!free?'Set down your load first.':'At least two growth units needed.'));
 }
 if(place?.type==='lodge'){
  if(s.cargo)actions.push(option(s,'store','Store load at lodge',0));
  if(!s.cargo&&s.wood>0)actions.push(option(s,'takeWood','Take 1 stored wood to haul',0));
  actions.push(option(s,'entrance','Deepen lodge entrance',3,!s.cargo&&!s.entrance,s.cargo?'Set down your load first.':'Entrance already deepened.'));
  actions.push(option(s,'rest','Rest until tomorrow · family eats 2',0,!s.cargo,'Store your load before resting.'));
 }
 if(place?.type==='dam'){
  if(s.cargo)actions.push(option(s,'deposit','Deposit wood here · keep food in tow',0,s.cargo.wood>0,'This load contains only food.'));
  actions.push(option(s,'build',s.dam===0?'Seal leaks · 2 local wood':s.dam===1?'Raise crest · 3 local wood':'Crest at test limit',2,s.dam<2&&s.damWood>=(s.dam===0?2:3),'Deliver enough wood directly to the dam.'));
  if(s.dam>0)actions.push(option(s,'lower','Open a notch · lower water',1));
 }
 if(place?.type==='channel'){
  const level=s.channels[place.point.id];
  actions.push(option(s,'dig',level===0?'Dig hauling channel':level===1?'Deepen channel for dry weather':'Channel fully deepened',3,!s.cargo&&level<2,s.cargo?'Set down your load first.':'Already at test depth.'));
 }
 if(s.cargo)actions.push(option(s,'drop','Set down load',0));
 return actions;
}
export function primaryHabitatAction(s){return habitatOptions(s).find(a=>a.enabled&&!['lower','drop','fell'].includes(a.id));}
export function habitatAction(state,id){
 const available=habitatOptions(state).find(a=>a.id===id);
 if(!available?.enabled)return {state,message:available?.reason||'Move closer to a stand, lodge, dam or channel marker.'};
 const s=structuredClone(state),place=localPlace(s);s.effort+=available.cost;
 let message='';
 if(id==='prune'||id==='browse'){
  s.patches[place.point.id].stock--;s.cargo={wood:id==='prune'?1:0,food:id==='browse'?2:1};
  s.ledger.woodHarvested+=s.cargo.wood;s.ledger.foodHarvested+=s.cargo.food;
  message=id==='prune'?'A mixed load: edible growth and building wood. Take it home, or bring wood directly to the dam.':'Food gathered. Bring it to the lodge before the next rest.';
 }
 if(id==='fell'){
  const p=s.patches[place.point.id],wood=p.stock*2,food=Math.ceil(p.stock/2);p.stock=0;p.recovery=0;
  for(let left=wood,f=food;left>0;left-=2){const edible=Math.min(1,f);f-=edible;s.loose.push({x:place.point.x+(s.loose.length%3-1)*.45,z:place.point.z+.8,wood:Math.min(2,left),food:edible});}
  s.ledger.woodHarvested+=wood;s.ledger.foodHarvested+=food;
  message='Cut wood is on the ground in carryable loads. The stand will recover slowly; nothing has been delivered yet.';
 }
 if(id==='pickup'){const i=s.loose.findIndex(p=>near(s,p,1.8));const p=s.loose.splice(i,1)[0];s.cargo={wood:p.wood,food:p.food};message='Load in tow. Water carries wood faster than the bank.';}
 if(id==='drop'){s.loose.push({...s.cargo,x:s.x,z:s.z});s.cargo=null;message='Load set down here. You can return for it.';}
 if(id==='store'){s.wood+=s.cargo.wood;s.food+=s.cargo.food;s.cargo=null;message='Supplies delivered. Food stays in the lodge; stored wood can be picked up again.';}
 if(id==='takeWood'){s.wood--;s.cargo={wood:1,food:0};message='One stored wood in tow. Carry it to the dam.';}
 if(id==='deposit'){s.damWood=(s.damWood||0)+s.cargo.wood;s.cargo.wood=0;if(!s.cargo.food)s.cargo=null;message='Wood delivered at the dam. Food remains in tow for the lodge.';}
 if(id==='build'){const cost=s.dam===0?2:3;s.damWood-=cost;s.ledger.woodUsed+=cost;s.dam++;message=s.dam===1?'Leaks sealed. The higher pond now reaches farther into low banks and shallow cuts.':'Crest raised. More water is retained, but newly flooded vegetation recovers differently.';}
 if(id==='lower'){s.dam--;message='A notch releases retained water. Construction wood is not refunded; inspect your channels before hauling.';}
 if(id==='dig'){s.channels[place.point.id]++;const status=channelStatus(s,place.point.id);message=status.swimmable?'The cut connects to the pond and is deep enough to swim a load through.':'The cut is open, but too shallow for swimming now. Retain more water or deepen the bed.';}
 if(id==='entrance'){s.entrance=1;message='The lodge approach is deeper. This is an alternative to raising the whole pond.';}
 if(id==='rest'){
  const eaten=Math.min(2,s.food);s.food-=eaten;s.ledger.foodEaten+=eaten;s.shortage=eaten<2;s.nights+=eaten===2?1:0;s.day++;s.effort=(homeStatus(s).protected?0:2)+(s.shortage?4:0);
  for(const p of PATCHES){const patch=s.patches[p.id],flooded=waterDepth(p.x,p.z,s)>.25;patch.recovery++;const gain=patch.stock>0?1:(patch.recovery>=3?1:0);if(!flooded){patch.stock=Math.min(p.max,patch.stock+gain);if(gain)patch.recovery=0;}}
  message=(!homeStatus(s).protected?'The shallow lodge approach costs 2 effort today. ':'')+(s.shortage?'Food ran short: recovery uses 4 effort today. Bring food home before resting again to recover. ':'The family ate; you are rested. ')+(weather(s)==='dry'?'Dry weather: shallow cuts may lose swimming depth.':'Normal flow: inspect regrowth and choose your next improvement.');
 }
 s.carrying=!!s.cargo;s.stored=s.wood;s.groveStock=s.patches.aspen.stock;
 s.history.push({day:s.day,action:id});if(s.history.length>40)s.history.shift();
 return {state:s,message};
}
// A bounded save schema plus material balance prevents stock duplication on reload.
export function loadHabitat(text){
 try{
  const s=JSON.parse(text);if(s.version!==2||![s.x,s.z,s.yaw].every(Number.isFinite)||!canStand(s.x,s.z))return null;
  const integer=(n,max=1e6)=>Number.isInteger(n)&&n>=0&&n<=max;
  if(!integer(s.day)||s.day<1||!integer(s.effort,DAY_WORK)||!integer(s.food)||!integer(s.wood)||!integer(s.dam,2)||!integer(s.damWood)||!integer(s.entrance,1)||!integer(s.nights))return null;
  if(!CHANNELS.every(p=>integer(s.channels?.[p.id],2))||!PATCHES.every(p=>integer(s.patches?.[p.id]?.stock,p.max)&&integer(s.patches[p.id].recovery)))return null;
  const load=p=>p&&integer(p.wood,2)&&integer(p.food,2)&&p.wood+p.food>0;
  if(s.cargo!==null&&!load(s.cargo))return null;
  if(!Array.isArray(s.loose)||s.loose.length>500||!s.loose.every(p=>load(p)&&[p.x,p.z].every(n=>Number.isFinite(n)&&Math.abs(n)<=24)))return null;
  if(!['woodHarvested','foodHarvested','woodUsed','foodEaten'].every(k=>integer(s.ledger?.[k])))return null;
  if(s.wood+s.damWood+(s.cargo?.wood||0)+s.loose.reduce((n,p)=>n+p.wood,0)+s.ledger.woodUsed!==s.ledger.woodHarvested)return null;
  if(s.food+(s.cargo?.food||0)+s.loose.reduce((n,p)=>n+p.food,0)+s.ledger.foodEaten!==6+s.ledger.foodHarvested)return null;
  if(!s.explored||!s.known||!Array.isArray(s.history)||!['walking','swimming','distance'].every(k=>Number.isFinite(s[k])&&s[k]>=0))return null;
  s.carrying=!!s.cargo;s.stored=s.wood;s.groveStock=s.patches.aspen.stock;return s;
 }catch{return null;}
}
