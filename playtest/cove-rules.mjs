import {initialChannelDemo,creekAct,routeTo,scenarioStatus,SOURCES} from './creek-rules.mjs';

export const freshCove = () => ({creek:initialChannelDemo(),day:1,light:10,done:false});
export function projects(game){
 const s=game.creek;
 const haul=(id,job,food=false)=>[{type:'gather',id,food},{type:'deliver',job}];
 const choices=[
  ['brush','Cut shore brush','Bring two leafy branches home. The patch holds two loads.',SOURCES.brush.cell,haul('brush','cache',true)],
  ['trees','Forage upstream','Bring two branches from the larger grove. Water makes the long haul easier.',SOURCES.trees.cell,haul('trees','cache',true)],
  ['dam','Raise the dam','Haul the last fallen alder onto the crest. A wider pond keeps the lodge entrance submerged.',[7,8],[...haul('fallen','dam'),{type:'raise'}]],
  ['lodge','Dig the doorway','Deepen the lodge entrance. A submerged doorway preserves your full morning after the water falls.',[6,5],[{type:'deepen'}]],
  ['channel',s.channels.east?'Deepen the cut':'Cut a waterway',s.channels.east?'Keep the shortcut swimmable at low water.':'Dig toward the grove for shorter hauls. Shallow cuts lose depth in dry weather.',[9,2],[{type:s.channels.east?'deepenChannel':'digChannel',id:'east'}]]
 ];
 return choices.flatMap(([id,name,note,cell,actions])=>{
  if(game.done || id==='dam'&&s.raised)return [];
  let next=s,frames=[];
  for(const action of actions){
   const result=creekAct(next,action);
   if(!result.ok)return [];
   const route=action.type==='deliver'?routeTo(next,next.cargo.source,action.job):null;
   frames.push({before:next,route});next=result.state;
  }
  const cost=Number((next.work-s.work).toFixed(1));
  return [{id,name,note,cell,cost,frames,next,available:cost<=game.light}];
 });
}
export function work(game,id){
 const job=projects(game).find(j=>j.id===id&&j.available);
 return job?{...game,creek:job.next,light:Number((game.light-job.cost).toFixed(1))}:game;
}
export function dusk(game){
 if(game.done)return game;
 const creek=structuredClone(game.creek),food=creek.stock.cache.food;
 creek.stock.cache.food=Math.max(0,food-2);
 const done=food<2||game.day===3;
 creek.season='dry';
 const sheltered=scenarioStatus(creek).depth>=.4;
 const note=food<2?'The larder ran short. Your beaver leaves the cove to forage.':done?
  'Three nights at Willow Cove. '+creek.stock.cache.food+' branches remain for the next morning.':
  'Two branches fed the lodge. '+(sheltered?'The doorway stays underwater. You have a full morning.':'The shallow doorway costs two daylight while your beaver finds a sheltered way in.');
 return {creek,day:done?game.day:game.day+1,light:done?0:sheltered?10:8,done,note};
}
