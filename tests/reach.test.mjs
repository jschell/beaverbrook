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
