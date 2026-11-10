// First Creek: small deterministic construction experiment, fictional work units.
export const SIZE={w:15,h:13};
export const key=(x,z)=>`${x},${z}`;
export const SOURCES={
 willow:{name:'Near willow',kind:'wood',quantity:4,cut:1,food:true,cell:[3,5],note:'Small, nearby loads. These branches can also feed the family.'},
 brush:{name:'Shore brush',kind:'wood',quantity:4,cut:1,food:true,cell:[10,7],note:'Quick collection beside the creek. A finite food source, too.'},
 fallen:{name:'Fallen alder',kind:'wood',quantity:8,cut:1,food:false,cell:[5,0],note:'Bulk construction wood. Pond access can make hauling easier.'},
 trees:{name:'Young tree patch',kind:'wood',quantity:12,cut:2,food:true,cell:[11,2],note:'More material, farther away. Cutting takes more work.'},
 mudWest:{name:'West mud bank',kind:'mud',quantity:12,cut:1,food:false,cell:[4,9],note:'Mud seals the gaps in a dam and the lodge shell.'},
 mudEast:{name:'East mud bank',kind:'mud',quantity:12,cut:1,food:false,cell:[10,4],note:'An alternative supply with a different hauling route.'}
};
export const CROSSINGS={narrows:{name:'The Narrows',row:8,columns:[6,7,8],cell:[7,8]},bend:{name:'Meadow Bend',row:10,columns:[5,6,7,8,9],cell:[7,10]}};
export const LODGES={willow:{name:'Willow Cove',cell:[5,5],entrance:[6,5]},meadow:{name:'Meadow Edge',cell:[9,9],entrance:[8,9]}};
export const ELEVATIONS=Array.from({length:SIZE.h},(_,z)=>Array.from({length:SIZE.w},(_,x)=>x===7?.4:1.05+Math.abs(x-7)*.4+(z===0?.05:0)));
// Authored high banks prevent the retained pond from bypassing a completed crossing.
for(const crossing of Object.values(CROSSINGS))for(let x=0;x<SIZE.w;x++)if(!crossing.columns.includes(x))ELEVATIONS[crossing.row][x]=Math.max(ELEVATIONS[crossing.row][x],3.1);
// An isolated hollow tests that low terrain alone never makes a pond.
ELEVATIONS[3][0]=.5;
export const initialCreek=()=>({crossing:'narrows',lodgeSite:'willow',sections:[0,0,0],raised:false,lodge:0,cache:false,storm:false,work:0,
 sources:Object.fromEntries(Object.entries(SOURCES).map(([id,s])=>[id,s.quantity])),cargo:null,
 stock:{dam:{wood:0,mud:0,food:0},lodge:{wood:0,mud:0,food:0},cache:{wood:0,mud:0,food:0},reserve:{wood:0,mud:0,food:0}},lastRoute:null});
export const closed=s=>s.sections.every(n=>n===2);
export function waterState(s){
 const cross=CROSSINGS[s.crossing],complete=closed(s),level=complete?(s.raised?2.65:2.05):1;
 const dry=s.season==='dry'||s.season==='complete';const surface=complete?Number((level-(dry?.30:0)).toFixed(2)):(dry?.85:1);
 const base=s.season==='dry'||s.season==='complete'?.85:1;
 const wet=new Map();for(let z=0;z<SIZE.h;z++)wet.set(key(7,z),base);
 if(complete){const queue=[[7,0]],seen=new Set();while(queue.length){const [x,z]=queue.shift(),id=key(x,z);if(x<0||x>=SIZE.w||z<0||z>=cross.row||seen.has(id))continue;seen.add(id);if(ELEVATIONS[z][x]>=surface)continue;wet.set(id,surface);queue.push([x-1,z],[x+1,z],[x,z-1],[x,z+1]);}}
 return {wet,level:surface,complete,meadowFlooded:(wet.get(key(10,5))||0)>ELEVATIONS[5][10],downstream:base};
}
export function routeTo(s,sourceId,job){
 const source=SOURCES[sourceId],target=job==='dam'?CROSSINGS[s.crossing].cell:LODGES[s.lodgeSite].cell;if(!source||!s.stock[job])return null;
 const water=waterState(s),start=key(...source.cell),end=key(...target),distance=new Map([[start,0]]),previous=new Map(),open=[start];
 // Bounded routing for one material trip, not autonomous colony AI.
 while(open.length){open.sort((a,b)=>distance.get(a)-distance.get(b));const id=open.shift();if(id===end)break;const [x,z]=id.split(',').map(Number);for(const [nx,nz] of [[x-1,z],[x+1,z],[x,z-1],[x,z+1]]){
  if(nx<0||nx>=SIZE.w||nz<0||nz>=SIZE.h)continue;const next=key(nx,nz);const crossing=CROSSINGS[s.crossing];
  if(closed(s)&&nz===crossing.row&&crossing.columns.includes(nx)&&next!==end)continue;
  const swimming=(water.wet.get(next)||0)-ELEVATIONS[nz][nx]>=.3;const cost=distance.get(id)+(swimming?.45:1);
  if(cost<(distance.get(next)??Infinity)){distance.set(next,cost);previous.set(next,id);if(!open.includes(next))open.push(next);}
 }}
 if(!distance.has(end))return null;const cells=[];let id=end;while(id){cells.unshift(id.split(',').map(Number));id=previous.get(id);}const waterCells=cells.filter(([x,z])=>(water.wet.get(key(x,z))||0)-ELEVATIONS[z][x]>=.3).length;
 return {cells,work:Math.max(1,Math.ceil(distance.get(end)*2/4)),waterCells,mode:waterCells>2?'mixed land / water':'mostly land'};
}
export function creekGoals(s){if(s.season)return scenarioStatus(s).goals;const water=waterState(s),lodge=LODGES[s.lodgeSite],depth=(water.wet.get(key(...lodge.entrance))||0)-ELEVATIONS[lodge.entrance[1]][lodge.entrance[0]];
 return [{name:'A sealed dam across the creek',ok:closed(s)},{name:'A completed lodge',ok:s.lodge===2},{name:'Lodge entrance under at least 0.4 water',ok:s.lodge===2&&depth>=.4},{name:'Food cache or repair materials ready',ok:s.cache||(s.stock.reserve.wood>=1&&s.stock.reserve.mud>=1)}];}
export function creekAct(state,a){const s=structuredClone(state),bad=message=>({ok:false,state,message});const pay=(job,w,m)=>{if(s.stock[job].wood<w||s.stock[job].mud<m)return false;s.stock[job].wood-=w;s.stock[job].mud-=m;s.work++;return true;};let message='';
 if(s.season==='complete')return bad('This settlement trial is complete. Undo the finish or start a new creek to try another approach.');
 if(s.season&&a.type==='rain')return bad('The dry-spell trial uses one announced weather change. Rain remains in the construction sandbox.');
 switch(a.type){
 case 'crossing':if(s.sections.some(Boolean)||Object.values(s.stock.dam).some(Boolean))return bad('Undo construction and dam deliveries before moving the crossing.');if(!CROSSINGS[a.id])return bad('Choose a marked crossing.');s.crossing=a.id;s.sections=CROSSINGS[a.id].columns.map(()=>0);message='Crossing selected. Compare hauling distance and lodge access.';break;
 case 'lodgeSite':if(s.lodge||Object.values(s.stock.lodge).some(Boolean)||Object.values(s.stock.cache).some(Boolean)||Object.values(s.stock.reserve).some(Boolean)||s.cache)return bad('Undo home deliveries and construction before moving the lodge.');if(!LODGES[a.id])return bad('Choose a marked lodge site.');s.lodgeSite=a.id;message='Lodge site selected. Its entrance must connect to the pond.';break;
 case 'gather':{const source=SOURCES[a.id];if(!source)return bad('Select a material source.');if(s.cargo)return bad('Deliver this load or undo gathering before collecting another.');if(s.sources[a.id]<=0)return bad('This source is depleted. Choose another patch.');if(a.food&&a.id==='brush'&&waterState(s).wet.has(key(...source.cell)))return bad('The feeding patch is under water. Use the upland trees, lower the crest, or use cached food.');if(a.food&&(!source.food||source.kind!=='wood'))return bad('This source is construction material, not food branches.');const qty=Math.min(2,s.sources[a.id]);s.sources[a.id]-=qty;s.cargo={source:a.id,kind:a.food?'food':source.kind,qty};s.work+=source.cut;s.lastRoute=null;message=`Collected ${qty} ${s.cargo.kind}. Choose a destination, then deliver the load.`;break;}
 case 'deliver':{if(!s.cargo)return bad('Collect a load first.');if(!s.stock[a.job])return bad('Choose a construction destination.');if((s.cargo.kind==='food')!==(a.job==='cache'))return bad('Food branches go to the cache; construction wood and mud go to building jobs.');const r=routeTo(s,s.cargo.source,a.job);if(!r)return bad('No usable delivery route. Change the destination or water access.');s.stock[a.job][s.cargo.kind]+=s.cargo.qty;s.work+=r.work;s.lastRoute={...r,source:s.cargo.source,job:a.job,qty:s.cargo.qty,kind:s.cargo.kind};s.cargo=null;message=`Delivered locally by ${r.mode}: ${r.work} hauling work. Materials are now at this job.`;break;}
 case 'section':{const i=a.index;if(!Number.isInteger(i)||i<0||i>=s.sections.length)return bad('Choose a marked dam section.');if(s.sections[i]===2)return bad('This section is already sealed.');const framework=s.sections[i]===0;if(!pay('dam',framework?2:0,framework?0:1))return bad(framework?'Deliver 2 wood to the dam for a framework.':'Deliver 1 mud to the dam to seal this section.');s.sections[i]++;message=framework?'Framework placed. Water still passes through the open barrier.':closed(s)?'The barrier is sealed. A connected pond forms upstream; water continues downstream.':'Section sealed. Complete the remaining gaps to retain a pond.';break;}
 case 'raise':if(!closed(s)||s.raised)return bad('First complete a low dam.');if(!pay('dam',2,1))return bad('Deliver 2 wood and 1 mud to raise the crest.');s.raised=true;message='Crest raised. The pond spreads farther: check the flooded food meadow.';break;
 case 'lower':if(!s.raised)return bad('The crest is already low.');s.raised=false;s.work++;message='Crest lowered. The meadow can emerge again; spent materials are not refunded.';break;
 case 'remove':if(!Number.isInteger(a.index)||!s.sections[a.index])return bad('Select an existing section.');s.sections[a.index]=0;s.raised=false;s.stock.dam.wood++;s.work++;message='Section removed; 1 wood recovered locally. The gap releases the pond. Undo restores the full previous state.';break;
 case 'lodge':if(s.lodge===2)return bad('The lodge is complete.');if(!pay('lodge',s.lodge===0?4:0,s.lodge===0?0:2))return bad(s.lodge===0?'Deliver 4 wood to build the lodge shell.':'Deliver 2 mud to finish the lodge.');s.lodge++;message=s.lodge===1?'Lodge shell built. Bring mud to finish the shelter.':'Lodge finished. Check whether its entrance is underwater.';break;
 case 'cache':if(s.cache||s.lodge!==2)return bad('Complete the lodge before finishing its food cache.');if(s.stock.cache.food<2)return bad('Deliver 2 food branches to the cache.');s.stock.cache.food-=2;s.cache=true;s.work++;message='Food cache ready beside the lodge.';break;
 case 'rain':if(s.storm||!closed(s))return bad('Test one rain event after completing the dam.');s.storm=true;s.sections[0]=1;s.raised=false;message='Rain loosened one seal. Its framework remains: repair with 1 mud, or use the repair pile.';break;
 case 'deepen':if(!s.season||s.lodge!==2||s.deepEntrance)return bad('Complete the lodge before deepening its entrance once.');s.deepEntrance=true;s.work+=3;message='Entrance deepened by 0.35 game units. The low pond can now protect access during the forecast dry spell.';break;
 case 'foodRoute':if(!s.season||s.lodge!==2||s.foodRoute)return bad('Complete a lodge before establishing its feeding route once.');if(s.sources.brush<2||waterState(s).wet.has(key(...SOURCES.brush.cell)))return bad('The route needs at least 2 branches left in the unflooded shore brush.');if(!pay('lodge',2,0))return bad('Deliver 2 wood to the lodge to establish the feeding route.');s.work++;s.foodRoute=true;message='Feeding route established. It works while at least 2 shore-brush branches remain above water; this is an alternative to cached food.';break;
 case 'startDry':if(s.season!=='preparation'||!closed(s)||s.lodge!==2||s.cargo)return bad('Complete a sealed dam and lodge, and deliver your carried load before advancing.');s.season='dry';message='The announced dry spell has arrived. Pond levels fell by 0.30; the creek still flows. Review the entrance and food supply, then adapt or finish.';break;
 case 'finish':if(s.season!=='dry'||!scenarioStatus(s).goals.every(g=>g.ok))return bad('Resolve the entrance and food checks before finishing the dry-spell trial.');s.outcome={crest:s.raised?'high':'low',entrance:s.deepEntrance?'deepened':'original',food:scenarioStatus(s).routeFood?'feeding route':'food cache',brushLeft:s.sources.brush,work:s.work};s.season='complete';message='A home through the dry spell. Your settlement plan worked; compare another approach on a new creek.';break;
 case 'reserveRepair':if(s.stock.reserve.wood<1||s.stock.reserve.mud<1)return bad('Deliver wood and mud to the repair pile first.');{const i=s.sections.findIndex(n=>n===1);if(i<0)return bad('No leaking framework needs this repair.');s.stock.reserve.wood--;s.stock.reserve.mud--;s.sections[i]=2;s.work++;message='Repair pile used. The sealed barrier retains the pond again.';}break;
 default:return bad('Unknown action.');
 }
 return {ok:true,state:s,message};
}

// An authored, player-paced scenario layered on the original construction sandbox.
export const initialScenario=()=>({...initialCreek(),season:'preparation',deepEntrance:false,foodRoute:false,outcome:null});
export function scenarioStatus(s){
 const dryState={...s,season:'dry'},water=waterState(dryState),lodge=LODGES[s.lodgeSite],[x,z]=lodge.entrance;
 const depth=Math.max(0,(water.wet.get(key(x,z))||0)-ELEVATIONS[z][x]+(s.deepEntrance?.35:0));
 const brushDry=!water.wet.has(key(...SOURCES.brush.cell));
 const routeFood=!!s.foodRoute&&s.sources.brush>=2&&brushDry;
 const goals=[{name:'A sealed dam retains the pond',ok:closed(s)},{name:'A completed lodge',ok:s.lodge===2},
 {name:`Dry-spell entrance depth ${depth.toFixed(2)} / 0.40`,ok:s.lodge===2&&depth>=.4},
 {name:'Dry-spell food: a usable feeding route or cache',ok:s.cache||routeFood}];
 return {goals,depth,routeFood,brushDry,water,ready:goals.every(g=>g.ok)};
}
