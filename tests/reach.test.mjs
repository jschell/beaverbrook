import test from 'node:test';
import assert from 'node:assert/strict';
import {freshReach,reachAct,reachCreek,homeDepth,viableHome,projectPreview,saveReach,loadReach} from '../playtest/reach-rules.mjs';
import {waterState,routeTo,key} from '../playtest/creek-rules.mjs';
const queue=(kind,site,source='fallen')=>({type:'queue',kind,site,source});
function apply(s,a){const r=reachAct(s,a);assert.equal(r.ok,true,r.message);return r.state;}
function play(actions){let s=freshReach();for(const a of actions)s=apply(s,a);return s;}
const work={type:'work'},advance={type:'advance'};
const plans={
 restored:[queue('dam','narrows'),queue('entrance','willow'),work,advance,advance,advance],
 bank:[queue('shelter','bank'),work,{type:'move',site:'bank'},advance,advance,advance],
 meadow:[queue('dam','bend'),queue('shelter','meadow'),queue('entrance','meadow'),work,advance,work,{type:'move',site:'meadow'},advance,advance]
};
test('three different settlement strategies succeed and continue on the same reach',()=>{
 const results=Object.values(plans).map(play);
 assert.deepEqual(results.map(s=>s.home),['willow','bank','meadow']);
 for(const s of results){
  assert.equal(s.challenge,'achieved');assert.equal(s.season,4);assert.equal(s.consumed,6);
  assert.equal(s.creek.stock.cache.food,8+s.harvested.food-s.consumed);
  assert.ok(viableHome(s));assert.ok(viableHome(s,s.home,true));
  assert.equal(apply(s,advance).season,5);
 }
 assert.deepEqual(results[1].creek.dams.narrows.sections,[2,1,2]);
 assert.equal(results[1].creek.shelters.willow.stage,2);
 assert.ok(waterState(reachCreek(results[2])).wet.size>waterState(reachCreek(results[1])).wet.size);
});
test('work pauses at dusk and resumes delivered materials without duplication',()=>{
 const initial=freshReach();const snapshot=saveReach(initial);
 let s=apply(initial,queue('dam','bend'));
 s=apply(s,work);assert.equal(saveReach(initial),snapshot);
 assert.ok(s.queue.length);assert.ok(s.daylight<5);
 const wood=s.creek.sources.fallen,sections=[...s.creek.dams.bend.sections],stock=structuredClone(s.depots['dam-bend']);
 s=apply(s,work);assert.equal(s.creek.sources.fallen,wood);assert.deepEqual(s.creek.dams.bend.sections,sections);assert.deepEqual(s.depots['dam-bend'],stock);
 s=apply(s,advance);s=apply(s,work);assert.ok(s.creek.dams.bend.sections.every(n=>n===2));
 assert.equal(s.harvested.wood,10);assert.equal(s.harvested.mud,6); // 5 consumed mud plus a partial-load remainder.
 assert.equal(s.depots['dam-bend'].mud,1);
});
test('removing and requeuing an order retains local stock',()=>{
 let s=freshReach();s.daylight=6;
 s=apply(s,queue('shelter','bank'));s=apply(s,work);
 const wood=s.creek.sources.fallen,stock=structuredClone(s.depots['shelter-bank']);
 s=apply(s,{type:'cancel',key:'shelter-bank'});
 s=apply(s,queue('shelter','bank'));
 assert.equal(s.creek.sources.fallen,wood);assert.deepEqual(s.depots['shelter-bank'],stock);
});
test('preview, resource contention, channel access and shelter guards use shared simulation',()=>{
 const s=freshReach(),before=saveReach(s);
 const preview=projectPreview(s,'dam','narrows');assert.ok(waterState(preview).wet.size>waterState(reachCreek(s)).wet.size);assert.equal(saveReach(s),before);
 assert.equal(reachAct(s,{type:'move',site:'bank'}).ok,false);
 let dry=apply(apply(s,advance),advance);assert.equal(reachAct(dry,advance).ok,false);
 let cut=play([queue('dam','narrows'),work,queue('channel','east'),work]);
 assert.equal(cut.creek.channels.east,1); // Deepening is a separate decision.
 assert.ok(routeTo(reachCreek(cut),'trees','cache').work<routeTo(projectPreview(s,'dam','narrows'),'trees','cache').work);
 let living=play([queue('shelter','bank','trees'),work]);
 assert.equal(living.harvested.wood,4);assert.equal(living.creek.sources.trees,living.patches.trees.biomass);assert.equal(living.patches.trees.roots,3);
 let food=play([queue('forage','trees'),work]);assert.equal(food.creek.stock.cache.food,12);assert.equal(food.creek.sources.trees,6);
});
test('complete and partial work survives save/reload and depleted orders pause safely',()=>{
 let s=play([queue('dam','bend'),work]);assert.deepEqual(loadReach(saveReach(s)),s);
 const restored=loadReach(saveReach(s));assert.deepEqual(apply(apply(s,advance),work),apply(apply(restored,advance),work));
 s=freshReach();s.creek.sources.fallen=0;s=apply(s,queue('shelter','bank'));const paused=apply(s,work);
 assert.equal(paused.daylight,36);assert.equal(paused.harvested.wood,0);assert.match(paused.message,/depleted/);
 assert.equal(loadReach('{broken'),null);assert.equal(loadReach('{"version":9}'),null);
});
test('all water surfaces derive from connected terrain and both barriers',()=>{
 const bank=play(plans.bank),meadow=play(plans.meadow),c=reachCreek(bank);
 assert.ok(waterState(c).wet.has(key(8,11)));assert.ok(homeDepth(bank,'bank',true)>=.4);
 assert.equal(waterState(c).wet.has(key(0,3)),false);
 const both=play([queue('dam','narrows'),queue('dam','bend'),work,advance,work]);
 assert.ok(both.creek.dams.narrows.sections.every(n=>n===2));assert.ok(both.creek.dams.bend.sections.every(n=>n===2));
 assert.ok(waterState(reachCreek(both)).wet.size>=waterState(reachCreek(meadow)).wet.size);
});

test('individual committed work steps reproduce a batch and can resume after reload',()=>{
 let queued=apply(apply(freshReach(),queue('dam','narrows')),queue('entrance','willow'));
 const batch=apply(queued,work);
 let step=reachAct(queued,{type:'workStep'});
 assert.equal(step.progressed,true);
 assert.equal(step.state.creek.dams.narrows.sections[1],1);
 assert.equal(step.state.depots['dam-narrows'].mud,2);
 assert.equal(step.state.creek.sources.mudWest,18);
 let s=loadReach(saveReach(step.state));
 for(let i=0;i<20&&s.queue.length;i++){
  const result=reachAct(s,{type:'workStep'});assert.equal(result.ok,true);s=result.state;
  if(!result.progressed)break;
 }
 assert.deepEqual(s,batch);
});
test('project estimates are pure, credit deposits and use remembered source quantities',async()=>{
 const {estimateProject}=await import('../playtest/reach-rules.mjs');
 let s=apply(freshReach(),queue('shelter','bank'));
 const before=saveReach(s),estimate=estimateProject(s,s.queue[0]);
 assert.equal(saveReach(s),before);assert.equal(estimate.complete,true);
 assert.equal(estimate.materials.wood,4);assert.equal(estimate.materials.mud,2);
 assert.equal(estimate.work,15.2);
 s=apply(s,{type:'workStep'});
 const remaining=estimateProject(s,s.queue[0]);
 assert.equal(remaining.materials.wood,2);assert.equal(remaining.deposit.wood,2);
 assert.equal(remaining.work,estimate.work-(36-s.daylight));
 let living=apply(freshReach(),queue('shelter','bank','trees'));
 living.creek.sources.trees=0;living.patches.trees.biomass=0;
 assert.equal(estimateProject(living,living.queue[0]).complete,true);
 assert.equal(apply(living,work).harvested.wood,0);
});
test('reprioritizing and retargeting a blocked order preserves delivered materials',()=>{
 let s=apply(freshReach(),queue('shelter','bank'));
 s=apply(s,{type:'workStep'});
 const deposit=structuredClone(s.depots['shelter-bank']);
 s.creek.sources.fallen=0;
 s=apply(s,queue('forage','brush'));
 s=apply(s,{type:'prioritize',key:'forage-brush'});
 assert.equal(s.queue[0].kind,'forage');
 s=apply(s,{type:'source',key:'shelter-bank',source:'trees'});
 assert.deepEqual(s.depots['shelter-bank'],deposit);
 s=apply(s,work);
 assert.equal(s.creek.shelters.bank.stage,2);
 assert.equal(s.creek.stock.cache.food,12);
 assert.equal(s.harvested.wood,4);
 assert.equal(s.creek.sources.trees,8);
});
test('three settlement forms remain playable through three seasonal challenges',()=>{
 for(const plan of Object.values(plans)){
  let s=play(plan);
  while(s.season<=9){
   if(s.home==='willow'&&!s.creek.shelters.willow.elevated){s=apply(s,queue('chamber','willow'));s=apply(s,work);}
   if(s.creek.stock.cache.food<6){
    const c=reachCreek(s);
    const source=['willow','brush','trees'].filter(id=>s.creek.sources[id]>=4).sort((a,b)=>s.patches[b].roots-s.patches[a].roots||routeTo(c,a,'cache').work-routeTo(c,b,'cache').work)[0];
    assert.ok(source,'An accessible food source remains');
    s=apply(s,queue('forage',source));s=apply(s,work);assert.equal(s.queue.length,0);
   }
   s=apply(s,advance);
  }
  assert.equal(s.season,10);assert.equal(s.consumed,18);assert.equal(s.challenge,'achieved');
  assert.equal(s.creek.stock.cache.food,8+s.harvested.food-18);
  assert.ok(viableHome(s));
 }
});

test('the second challenge distinguishes a deep doorway from a dry chamber',async()=>{
 const {chamberClearance}=await import('../playtest/reach-rules.mjs');
 let s=play(plans.restored);
 s=apply(s,queue('forage','brush'));s=apply(s,work);
 s=apply(apply(s,advance),advance);
 assert.equal(s.season,6);assert.equal(s.creek.season,'flood');
 assert.ok(homeDepth(s)>.4);assert.ok(chamberClearance(s)<0);
 assert.equal(reachAct(s,advance).ok,false);
 s=apply(s,queue('chamber','willow'));s=apply(s,work);
 assert.ok(chamberClearance(s)>=.1);assert.equal(apply(s,advance).season,7);
 const bank=play(plans.bank);assert.ok(chamberClearance(bank,'bank',true)>=.1);
 const meadow=play(plans.meadow);assert.ok(chamberClearance(meadow,'meadow',true)>=.1);
});
test('lowering a raised dam changes flood exposure without refunding spent materials',async()=>{
 const {chamberClearance}=await import('../playtest/reach-rules.mjs');
 let s=play([queue('dam','narrows'),queue('chamber','willow'),queue('raise','narrows'),work]);
 const before=chamberClearance(s,'willow',true),stock=s.creek.sources.fallen;
 s=apply(s,queue('lower','narrows'));s=apply(s,work);
 assert.ok(chamberClearance(s,'willow',true)>before);
 assert.equal(s.creek.sources.fallen,stock);assert.equal(s.creek.dams.narrows.raised,false);
});

test('older layout saves retain stocks and projects while adopting the higher meadow bank',()=>{
 const old=apply(freshReach(),queue('shelter','meadow'));
 delete old.layoutVersion;old.creek.terrain['9,9']=1.85;
 const loaded=loadReach(saveReach(old));
 assert.equal(loaded.layoutVersion,2);assert.equal(loaded.creek.terrain['9,9'],2.65);
 assert.deepEqual(loaded.creek.sources,old.creek.sources);assert.deepEqual(loaded.queue,old.queue);
 assert.equal(loaded.creek.stock.cache.food,old.creek.stock.cache.food);
 assert.deepEqual(loadReach(saveReach(loaded)),loaded);
});
