import test from 'node:test';
import assert from 'node:assert/strict';
import {solveBarrierWater,CRESTS,validPlacedDam} from '../playtest/dam-water.mjs';
import {makeDamPlan,previewDam,commitDam,extendDam,damCenter} from '../playtest/dam-placement.mjs';
import {freshDamLab,freshHabitat,habitatAction,primaryHabitatAction,loadHabitat,habitatMove} from '../playtest/habitat-rules.mjs';
import {creekWater,groundHeight} from '../playtest/explore-rules.mjs';
const river=(x,z)=>Math.abs(x)<1.5?-.8:.9;
const section=(a,b,level=2)=>({a,b,level});
const horizontal=(z,level=2)=>section({x:-4,z},{x:4,z},level);
const water=(sections,height=river)=>solveBarrierWater({size:12,min:-6,height,baseHeight:river,sections});
const head=w=>w.wet.get('0,-3');
function action(s,id){const r=habitatAction(s,id);assert.notEqual(r.state,s,id+': '+r.message);return r.state;}
function place(s,z=-3,target=1){const p=makeDamPlan(s,{x:-6,z},{x:6,z},target);assert.ok(p.dam,p.error);return commitDam(s,p.dam).state;}

test('arbitrary barriers retain water and downstream flow survives',()=>{
 assert.equal(head(water([])),.12);const low=water([horizontal(0,1)]);assert.equal(head(low),.4);assert.equal(low.wet.get('0,3'),.12);
 const high=water([horizontal(0,2)]);assert.equal(head(high),.68);assert.equal(high.wet.get('0,3'),.12);
 const diagonal=water([section({x:-4,z:-2},{x:4,z:2})]);assert.equal(head(diagonal),.68,'diagonal spans also block crossed terrain edges');
});
test('gaps, low sections, bank bypasses and excavated outlets limit the pond',()=>{
 const gap=water([section({x:-4,z:0},{x:-1,z:0}),section({x:1,z:0},{x:4,z:0})]);assert.equal(head(gap),.12);
 const mixed=water([section({x:-4,z:0},{x:0,z:0},1),section({x:0,z:0},{x:4,z:0},2)]);assert.equal(head(mixed),.4);
 const short=water([section({x:-1,z:0},{x:1,z:0},3)]);assert.ok(head(short)<1.05,'bank ends fail to contain a high pond');
 const complete=water([horizontal(0,3)]);assert.ok(Math.abs(head(complete)-.9)<1e-9,'terrain saddle caps high crest');
 const cutHeight=(x,z)=>x>=1.5&&x<4?-.1:river(x,z);
 const bypass=water([section({x:-2,z:0},{x:2,z:0},2)],cutHeight);assert.ok(head(bypass)<.68,'a dug outlet around the endpoint drains water');
});
test('isolated depressions stay dry and barriers do not modify terrain',()=>{
 const terrain=(x,z)=>x>3&&x<5&&z< -2?-.5:river(x,z);const before=Array.from({length:144},(_,i)=>terrain(i%12-5.5,Math.floor(i/12)-5.5));
 const w=water([horizontal(0,1)],terrain);assert.equal(w.wet.has('4,-4'),false);assert.deepEqual(Array.from({length:144},(_,i)=>terrain(i%12-5.5,Math.floor(i/12)-5.5)),before);
});
test('placement validates terrain and exploration; preview is pure and agrees with completion',()=>{
 let s=freshDamLab(),before=JSON.stringify(s);const p=makeDamPlan(s,{x:-6,z:-3},{x:6,z:-3},2);assert.ok(p.dam);const preview=previewDam(s,p.dam);assert.equal(JSON.stringify(s),before);
 assert.ok(preview.deeper>0);s=commitDam(s,p.dam).state;assert.equal(creekWater(s).wet.get('0,-5'),.12,'stakes have no retention');
 for(const part of s.placedDam.sections)part.level=part.target;
 assert.deepEqual([...creekWater(s).wet],[...creekWater(preview.state).wet]);
 assert.ok(makeDamPlan(s,{x:0,z:0},{x:5,z:0}).error,'underwater bank rejected');
 assert.ok(makeDamPlan(s,{x:-6,z:9},{x:6,z:9}).error,'family dam clearance');
 assert.ok(makeDamPlan(freshHabitat({flexible:true}),{x:-6,z:3},{x:6,z:3}).error,'unexplored endpoint rejected');
});
test('different locations retain different upstream regions; dry flow lowers each retained pool',()=>{
 const s=freshDamLab(),a=previewDam(s,makeDamPlan(s,{x:-6,z:-3},{x:6,z:-3},2).dam).state,b=previewDam(s,makeDamPlan(s,{x:-6,z:3},{x:6,z:3},2).dam).state;
 assert.ok(creekWater(b).wet.size>creekWater(a).wet.size);assert.equal(creekWater(a).wet.get('0,0'),.12);assert.equal(creekWater(b).wet.get('0,0'),.68);
 const dry={...a,day:4};assert.ok(Math.abs(creekWater(dry).wet.get('0,-5')-.43)<1e-9);
});
test('section construction uses local deliveries, gaps and notches; saves conserve wood',()=>{
 let s=place(freshDamLab());s=action(s,'pickup');const p=s.placedDam.sections[0];s={...s,...damCenter(p)};s=action(s,'customDeposit');assert.equal(primaryHabitatAction(s).id,'customBuild','E builds before collecting more timber or recovering deposits');assert.equal(s.placedDam.sections[0].wood,2);s=action(s,'customBuild');assert.equal(s.ledger.woodUsed,1);assert.equal(s.placedDam.sections[0].level,1);
 assert.equal(creekWater(s).wet.get('0,-5'),.12,'one section cannot close the crossing');assert.ok(loadHabitat(JSON.stringify(s)));
 const far={...s,x:12,z:12};assert.equal(habitatAction(far,'customBuild').state,far);
 s=action(s,'customRemove');assert.equal(s.placedDam.sections[0].level,0);assert.equal(s.ledger.woodUsed,1);assert.ok(loadHabitat(JSON.stringify(s)));
 const bad=structuredClone(s);bad.placedDam.sections[0].wood++;assert.equal(loadHabitat(JSON.stringify(bad)),null);
});
test('extension preserves existing sections and deposited stock, and rejects malformed save geometry',()=>{
 let s=place(freshDamLab());s.placedDam.sections[0].wood=2;s.ledger.woodHarvested+=2;const before=structuredClone(s.placedDam.sections);s=extendDam(s,'b').state;assert.deepEqual(s.placedDam.sections.slice(0,-1),before);assert.equal(s.placedDam.sections.at(-1).level,0);assert.ok(loadHabitat(JSON.stringify(s)));
 const broken=structuredClone(s);broken.placedDam.sections[1].a.x+=1;assert.equal(loadHabitat(JSON.stringify(broken)),null);assert.equal(validPlacedDam({sections:[]}),false);
});

test('an actual haul closes an angled dam, then a local notch drains it without moving terrain',()=>{
 function travel(s,p,threshold=.7){for(let i=0;i<1600&&Math.hypot(s.x-p.x,s.z-p.z)>threshold;i++)s=habitatMove(s,{x:p.x-s.x,z:p.z-s.z},.05);assert.ok(Math.hypot(s.x-p.x,s.z-p.z)<=threshold,'construction is reachable');return s;}
 let s=freshDamLab();const plan=makeDamPlan(s,{x:-6,z:-3},{x:6,z:0},1);s=commitDam(s,plan.dam).state;
 const before=groundHeight(0,-1,s);
 for(let i=0;i<s.placedDam.sections.length;i++){
  s=travel(s,{x:-5,z:-2});s=action(s,'pickup');
  const point=damCenter(s.placedDam.sections[i]);s=travel(s,point,.1);s=action(s,'customDeposit');s=action(s,'customBuild');
  // Leave unused local wood in place; it cannot finance another section remotely.
 }
 assert.ok(creekWater(s).wet.get('0,-8')>.3);assert.equal(groundHeight(0,-1,s),before);assert.ok(loadHabitat(JSON.stringify(s)));
 const full=previewDam(s,s.placedDam);assert.deepEqual([...creekWater(s).wet],[...creekWater(full.state).wet]);assert.equal(full.woodNeeded,0);assert.equal(full.workNeeded,0);
 const middle=Math.floor(s.placedDam.sections.length/2);s=travel(s,damCenter(s.placedDam.sections[middle]),.1);s=action(s,'customLower');assert.equal(creekWater(s).wet.get('0,-8'),.12);assert.ok(loadHabitat(JSON.stringify(s)));
});
