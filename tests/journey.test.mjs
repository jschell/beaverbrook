import test from 'node:test';
import assert from 'node:assert/strict';
import {freshHabitat,habitatAction,loadHabitat,PATCHES,DAM} from '../playtest/habitat-rules.mjs';
import {LODGE,waterLevel} from '../playtest/explore-rules.mjs';
import {familyOutlook,journeyStatus,journeyHint} from '../playtest/journey-rules.mjs';
const at=(s,p)=>({...s,x:p.x,z:p===LODGE?4.4:p.z});
const act=(s,id)=>{const r=habitatAction(s,id);assert.notEqual(r.state,s,`${id}: ${r.message}`);return r.state;};
function deliver(s,p,action='browse',destination=LODGE){s=act(at(s,p),action);s=act(at(s,destination),destination===DAM?'deposit':'store');if(s.cargo)s=act(at(s,LODGE),'store');return s;}
function rest(s,n){for(let i=0;i<n;i++)s=act(at(s,LODGE),'rest');return s;}

test('opening purpose adds no free stock, forced work sequence or compulsory dam',()=>{
 const s=freshHabitat({flexible:true}),before=JSON.stringify(s);
 assert.equal(journeyStatus(s).complete,false);assert.match(journeyHint(s),/leafy branch/);assert.equal(s.food,6);assert.equal(s.wood,0);assert.equal(s.dam,0);
 familyOutlook(s);journeyStatus(s);journeyHint(s);assert.equal(JSON.stringify(s),before);
});
test('a food-and-entrance strategy completes after a witnessed low-water night without dam work',()=>{
 let s=freshHabitat({flexible:true});s=act(at(s,LODGE),'entrance');for(let i=0;i<2;i++)s=deliver(s,PATCHES[0]);
 assert.equal(s.journey.broughtHome,2);assert.equal(s.journey.foodGiven,4);assert.equal(s.dam,0);s=rest(s,3);
 assert.equal(s.day,4);assert.equal(s.journey.completedDay,null,'arrival of dry weather alone is not success');assert.equal(s.journey.drySeen,true);assert.equal(s.journey.normalWater,.12);
 s=rest(s,1);assert.equal(s.day,5);assert.equal(s.journey.completedDay,5);assert.equal(s.food,2);assert.equal(familyOutlook(s).mood,'settled');assert.ok(loadHabitat(JSON.stringify(s)));
 s=rest(s,1);assert.equal(s.journey.completedDay,5,'completion remains recorded while play continues');
});
test('a raised-pond strategy succeeds without deepening the entrance',()=>{
 let s=freshHabitat({flexible:true});for(let i=0;i<5;i++)s=deliver(s,PATCHES[0],'prune',DAM);s=act(at(s,DAM),'build');s=act(s,'build');
 assert.equal(s.entrance,0);assert.equal(s.dam,2);s=rest(s,3);assert.equal(s.journey.normalWater,.68);assert.equal(s.journey.completedDay,null);
 s=rest(s,1);assert.equal(s.journey.completedDay,5);assert.equal(s.food,3);assert.ok(loadHabitat(JSON.stringify(s)));
});
test('an exposed or unfed night stays recoverable, and later adaptation earns the same outcome',()=>{
 let s=rest(freshHabitat({flexible:true}),4);assert.equal(s.journey.completedDay,null);assert.equal(familyOutlook(s).mood,'hungry');
 s=act(at(s,LODGE),'entrance');for(let i=0;i<2;i++)s=deliver(s,PATCHES[1]);s=rest(s,1);
 assert.equal(s.journey.completedDay,6);assert.equal(s.shortage,false);assert.ok(loadHabitat(JSON.stringify(s)));
});
test('normal-weather rest cannot falsely claim a low-water success',()=>{
 let s=freshHabitat({flexible:true});s=act(at(s,LODGE),'entrance');s=deliver(s,PATCHES[0]);s=rest(s,1);assert.equal(s.journey.completedDay,null);
 const old=structuredClone(s);delete old.journey;const loaded=loadHabitat(JSON.stringify(old));assert.ok(loaded);assert.equal(loaded.journey.completedDay,null);assert.equal(loaded.food,s.food);assert.equal(loaded.ledger.foodEaten,s.ledger.foodEaten);
 const bad=structuredClone(loaded);bad.journey.completedDay=999;assert.equal(loadHabitat(JSON.stringify(bad)),null);
});
test('withdrawing a larger stored load moves existing wood without duplication',()=>{
 let s=freshHabitat({flexible:true});s=deliver(s,PATCHES[0],'prune');s=deliver(s,PATCHES[0],'prune');assert.equal(s.wood,2);
 s=act(at(s,LODGE),'takeWood');assert.equal(s.cargo.wood,2);assert.equal(s.wood,0);assert.ok(loadHabitat(JSON.stringify(s)));
});
