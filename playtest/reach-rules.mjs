import {initialScenario,creekAct,CROSSINGS,SOURCES,waterState,terrainHeight,key,lodgeDefinition,routeTo} from './creek-rules.mjs';
import {recovery,PATCHES} from './patch-rules.mjs';

export const HOME_NAMES={willow:'Old Willow Lodge',meadow:'Meadow Lodge',bank:'Deep Bend Den'};
export const PROJECT_NAMES={dam:'Complete dam',raise:'Raise crest',shelter:'Build shelter',entrance:'Deepen entrance',channel:'Dig channel',forage:'Gather food'};
const emptyStock=()=>({wood:0,mud:0,food:0});
const rounded=n=>Math.round(n*10)/10;
export function freshReach(){
 const creek=initialScenario();
 creek.terrain={'8,11':.3,'8,12':.3};
 creek.siteDefinitions={bank:{name:'Deep Bend Den',cell:[9,11],entrance:[8,11]}};
 creek.dams={narrows:{sections:[2,1,2],raised:false},bend:{sections:[0,0,0,0,0],raised:false}};
 creek.shelters={willow:{stage:2,deep:false},meadow:{stage:0,deep:false},bank:{stage:0,deep:false}};
 creek.sections=[2,1,2];creek.lodge=2;
 creek.sources={willow:6,brush:8,trees:10,fallen:20,mudWest:20,mudEast:20};
 creek.stock.cache.food=8;
 return {version:1,season:1,daylight:36,creek,home:'willow',queue:[],depots:{},patches:{
  willow:{age:4,biomass:6,roots:5,cut:false},brush:{age:3,biomass:8,roots:5,cut:false},trees:{age:4,biomass:10,roots:5,cut:false}
 },observations:{willow:{biomass:6,season:1},brush:{biomass:8,season:1},trees:{biomass:10,season:1}},consumed:0,harvested:{food:0,wood:0,mud:0},challenge:'pending',message:'The old lodge needs deeper water before season 3. Restore the narrows, establish a meadow pond, or settle beside the deep bend. You have two preparation seasons.',log:[]};
}
function activeCreek(s,job){
 const c=structuredClone(s.creek);
 const crossing=['dam','raise'].includes(job?.kind)?job.site:'narrows';
 c.crossing=crossing;c.sections=[...c.dams[crossing].sections];c.raised=c.dams[crossing].raised;
 const site=['shelter','entrance'].includes(job?.kind)?job.site:s.home;
 c.lodgeSite=site;c.lodge=c.shelters[site].stage;c.deepEntrance=c.shelters[site].deep;
 if(job){const stock=s.depots[job.key]||emptyStock();c.stock.dam=structuredClone(stock);c.stock.lodge=structuredClone(stock);}
 return c;
}
export function reachCreek(s){return activeCreek(s);}
export function homeDepth(s,id=s.home,dry=false){
 const c=reachCreek(s);if(dry)c.season='dry';
 const site=lodgeDefinition(c,id),shelter=c.shelters[id];
 return Math.max(0,(waterState(c).wet.get(key(...site.entrance))||0)-terrainHeight(c,...site.entrance)+(shelter.deep?.35:0));
}
export function viableHome(s,id=s.home,dry=false){return s.creek.shelters[id].stage===2&&homeDepth(s,id,dry)>=.4-1e-9;}
export function sustainableFood(s){
 const c=reachCreek(s);
 return Object.entries(s.patches).reduce((total,[id,p])=>{
  const route=routeTo(c,id,'cache');
  return route&&route.work+SOURCES[id].cut<=36?total+Math.min(2,p.biomass,recovery(c,id,{...p,biomass:Math.max(0,p.biomass-2),roots:Math.max(1,p.roots-1)}).growth):total;
 },0);
}
export function projectPreview(s,kind,site){
 const copy=structuredClone(s);
 if(kind==='dam')copy.creek.dams[site].sections.fill(2);
 if(kind==='raise'){copy.creek.dams[site].sections.fill(2);copy.creek.dams[site].raised=true;}
 if(kind==='shelter')copy.creek.shelters[site].stage=2;
 if(kind==='entrance')copy.creek.shelters[site].deep=true;
 if(kind==='channel')copy.creek.channels[site]=copy.creek.channels[site]?2:1;
 return reachCreek(copy);
}
function requirements(s,job){
 const c=activeCreek(s,job);
 if(job.kind==='dam'){
  const index=c.sections.findIndex(n=>n!==2);if(index<0)return null;
  return {wood:c.sections[index]===0?2:0,mud:c.sections[index]===1?1:0,action:{type:'section',index},destination:'dam'};
 }
 if(job.kind==='raise')return c.raised?null:{wood:2,mud:1,action:{type:'raise'},destination:'dam'};
 if(job.kind==='shelter')return c.lodge===2?null:{wood:c.lodge===0?4:0,mud:c.lodge===1?2:0,action:{type:'lodge'},destination:'lodge'};
 if(job.kind==='entrance')return c.deepEntrance?null:{wood:0,mud:0,action:{type:'deepen'},destination:'lodge'};
 if(job.kind==='channel')return (c.channels[job.site]||0)>=job.target?null:{wood:0,mud:0,action:{type:c.channels[job.site]?'deepenChannel':'digChannel',id:job.site},destination:'dam'};
 if(job.kind==='forage')return job.remaining<=0?null:{wood:0,mud:0,destination:'cache',food:true};
 return null;
}
export function jobLabel(job){return PROJECT_NAMES[job.kind]+' · '+(HOME_NAMES[job.site]||CROSSINGS[job.site]?.name||SOURCES[job.site]?.name||job.site);}
export function projectStatus(s,job){
 const need=requirements(s,job);if(!need)return {done:true,message:'Complete'};
 const c=activeCreek(s,job),stock=s.depots[job.key]||emptyStock();
 let source=job.source;
 if(need.food)source=job.site;
 else if(stock.wood<need.wood)source=job.source;
 else if(stock.mud<need.mud){
  source=['mudWest','mudEast'].filter(id=>c.sources[id]>0).sort((a,b)=>(routeTo(c,a,need.destination)?.work||Infinity)-(routeTo(c,b,need.destination)?.work||Infinity))[0];
 }else{
  // Channels use the existing pond rules at the narrows.
  if(job.kind==='channel'&&!c.sections.every(n=>n===2))return {message:'The narrows must retain a pond before a hauling channel can fill.'};
  const result=creekAct(c,need.action);
  return result.ok?{cost:rounded(result.state.work-c.work),result,need}:{message:result.message};
 }
 if(!source||!SOURCES[source]||c.sources[source]<=0)return {message:'The selected source is depleted. Choose a different wood source or remove this order.'};
 const gathered=creekAct(c,{type:'gather',id:source,food:!!need.food});
 if(!gathered.ok)return {message:gathered.message};
 const result=creekAct(gathered.state,{type:'deliver',job:need.destination});
 return result.ok?{cost:rounded(result.state.work-c.work),result,need,source,carried:gathered.state,route:result.state.lastRoute}:{message:result.message};
}
function syncResult(s,job,step){
 const c=step.result.state;
 s.creek.sources=c.sources;s.creek.channels=c.channels;s.creek.work=c.work;s.creek.lastRoute=c.lastRoute;
 s.creek.stock.cache=c.stock.cache;
 s.creek.dams[c.crossing]={sections:c.sections,raised:c.raised};
 s.creek.shelters[c.lodgeSite]={stage:c.lodge,deep:!!c.deepEntrance};
 s.depots[job.key]=structuredClone(c.stock[step.need.destination]);
 if(step.source){
  const qty=step.carried.cargo.qty,kind=step.carried.cargo.kind;
  s.harvested[kind]+=qty;
  if(s.patches[step.source]){
   const p=s.patches[step.source];p.biomass=c.sources[step.source];p.roots=Math.max(1,p.roots-1);p.cut=true;s.observations[step.source]={biomass:p.biomass,season:s.season};
  }
  if(job.kind==='forage')job.remaining=Math.max(0,job.remaining-qty);
 }
}
function record(s,message){s.message=message;s.log=[...s.log,message].slice(-12);}
export function reachAct(state,a){
 const bad=message=>({ok:false,state,message});
 const s=structuredClone(state),trips=[];
 if(a.type==='queue'){
  const {kind,site}=a;
  if(!PROJECT_NAMES[kind])return bad('Unknown project.');
  if(['dam','raise'].includes(kind)&&!CROSSINGS[site])return bad('Choose a crossing.');
  if(['shelter','entrance'].includes(kind)&&!HOME_NAMES[site])return bad('Choose a shelter site.');
  if(kind==='channel'&&!['east','alder'].includes(site))return bad('Choose a channel.');
  if(kind==='forage'&&!SOURCES[site]?.food)return bad('Choose living food branches.');
  const source=a.source||'fallen';
  if(SOURCES[source]?.kind!=='wood')return bad('Choose a wood source.');
  const key=kind+'-'+site;
  if(s.queue.some(j=>j.key===key))return bad('This project is already queued.');
  const job={kind,site,source,key,target:kind==='channel'?(s.creek.channels[site]?2:1):0,remaining:kind==='forage'?4:0};
  if(!requirements(s,job))return bad('This project is already complete.');
  s.queue.push(job);record(s,jobLabel(job)+' queued. Work follows queue order.');
 }else if(a.type==='cancel'){
  if(!s.queue.some(j=>j.key===a.key))return bad('Choose a queued project.');
  s.queue=s.queue.filter(j=>j.key!==a.key);record(s,'Order removed. Delivered material remains at its work site. Requeue it to resume.');
 }else if(a.type==='work'){
  if(!s.queue.length)return bad('Choose a project on the creek first.');
  let steps=0;
  while(s.queue.length&&steps++<100){
   const job=s.queue[0],step=projectStatus(s,job);
   if(step.done){s.queue.shift();continue;}
   if(step.message){record(s,'Work paused: '+step.message);break;}
   if(step.cost>s.daylight){record(s,'Work paused at dusk. End the season or change the plan.');break;}
   if(step.carried)trips.push({carried:step.carried,route:step.route});
   syncResult(s,job,step);s.daylight=rounded(s.daylight-step.cost);
   if(!requirements(s,job)){record(s,jobLabel(job)+' finished.');s.queue.shift();}
  }
 }else if(a.type==='move'){
  if(!HOME_NAMES[a.site]||s.creek.shelters[a.site].stage!==2)return bad('Complete that shelter first.');
  if(s.home===a.site)return bad('The household already lives here.');
  if(s.daylight<3)return bad('Moving the household and stored food needs 3 daylight.');
  s.home=a.site;s.daylight-=3;record(s,'The family and its stored food moved to '+HOME_NAMES[a.site]+'. Old structures remain.');
 }else if(a.type==='visit'){
  if(!PATCHES[a.site])return bad('Choose a living patch.');
  const route=routeTo(reachCreek(s),a.site,'cache');
  if(!route||route.work>s.daylight)return bad('Not enough daylight to inspect this patch.');
  s.daylight=rounded(s.daylight-route.work);s.observations[a.site]={biomass:s.patches[a.site].biomass,season:s.season};
  record(s,'Visited '+SOURCES[a.site].name+'. Its supply is now confirmed.');
 }else if(a.type==='advance'){
  if(s.creek.stock.cache.food<2)return bad('Two food branches are needed before advancing. The season stays open for recovery.');
  if(s.season%3===0&&!viableHome(s))return bad('The occupied shelter is exposed in low water. Adapt or move before ending the season.');
  s.creek.stock.cache.food-=2;s.consumed+=2;
  const c=reachCreek(s);
  for(const [id,p] of Object.entries(s.patches)){
   p.biomass+=recovery(c,id,p).growth;
   if(!p.cut)p.roots=Math.min(5,p.roots+1);
   p.age++;p.cut=false;s.creek.sources[id]=p.biomass;
  }
  let message='A new season begins. Projects and the settlement carry forward.';
  if(s.season%3===0){
   const supplied=s.creek.stock.cache.food>=4||sustainableFood(s)>=2;
   if(s.challenge==='pending'&&supplied){s.challenge='achieved';message='A dependable home through low water. Keep building and exploring this same reach.';}
   else if(s.challenge==='pending')message='The family passed low water. Build a stronger food reserve or productive supply before the next dry season.';
  }
  s.season++;s.daylight=36;s.creek.season=s.season%3===0?'dry':'preparation';s.creek.lastRoute=null;
  record(s,message);
 }else return bad('Unknown settlement action.');
 const site=lodgeDefinition(reachCreek(s));
 for(const id of Object.keys(PATCHES)){
  const cell=SOURCES[id].cell;
  if(Math.abs(cell[0]-site.cell[0])+Math.abs(cell[1]-site.cell[1])<=3)s.observations[id]={biomass:s.patches[id].biomass,season:s.season};
 }
 return {ok:true,state:s,message:s.message,trips};
}
export function saveReach(s){return JSON.stringify(s);}
export function loadReach(text){
 try{
  const s=JSON.parse(text);
  if(s.version!==1||!Number.isInteger(s.season)||s.season<1||!HOME_NAMES[s.home]||!Array.isArray(s.queue)||!s.depots||!s.creek?.sources||!s.patches||!s.observations)return null;
  if(!Number.isFinite(s.daylight)||s.daylight<0||s.daylight>36||!Number.isFinite(s.creek.stock.cache.food)||s.creek.stock.cache.food<0)return null;
  for(const id of Object.keys(CROSSINGS))if(s.creek.dams[id].sections.length!==CROSSINGS[id].columns.length||s.creek.dams[id].sections.some(n=>![0,1,2].includes(n)))return null;
  for(const id of Object.keys(HOME_NAMES))if(![0,1,2].includes(s.creek.shelters[id].stage))return null;
  for(const id of Object.keys(SOURCES))if(!Number.isInteger(s.creek.sources[id])||s.creek.sources[id]<0)return null;
  for(const id of Object.keys(PATCHES))if(s.patches[id].biomass!==s.creek.sources[id]||s.patches[id].roots<1||s.patches[id].roots>5)return null;
  for(const j of s.queue){if(!PROJECT_NAMES[j.kind]||!SOURCES[j.source]||!Number.isFinite(j.remaining))return null;requirements(s,j);}
  return s;
 }catch{return null;}
}
