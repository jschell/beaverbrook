import test from 'node:test';
import assert from 'node:assert/strict';
import {freshDamLab,habitatAction,loadHabitat} from '../playtest/habitat-rules.mjs';
import {commitDam,makeDamPlan,damCenter} from '../playtest/dam-placement.mjs';
import {damWorkSites,nextDamWork} from '../playtest/dam-work.mjs';
import {createDamPlanner} from '../playtest/dam-planner.mjs';
const family=s=>damWorkSites(s).find(p=>p.id==='family');
const act=(s,id)=>{const r=habitatAction(s,id);assert.notEqual(s,r.state,r.message);return r.state;};
function project(){let s=freshDamLab();return commitDam(s,makeDamPlan(s,{x:-6,z:-3},{x:6,z:-3},1).dam).state;}

test('family guidance distinguishes missing materials, delivery, construction and the next height',()=>{
 let s=freshDamLab();s=act(s,'pickup');s.x=0;s.z=8;let work=family(s);
 assert.equal(work.missing,2);assert.equal(work.action,'deposit');assert.equal(work.phase,'deliver');
 s=act(s,work.action);work=family(s);assert.equal(work.delivered,2);assert.equal(work.missing,0);assert.equal(work.action,'build');
 s=act(s,work.action);work=family(s);assert.equal(s.dam,1);assert.equal(work.required,3);assert.equal(work.missing,3);assert.equal(work.action,null);assert.ok(loadHabitat(JSON.stringify(s)));
});
test('new section guidance follows physical pickup, local delivery and building without changing rules',()=>{
 let s=project(),work=nextDamWork(s);assert.equal(work.id,'section:0');assert.equal(work.action,'pickup');assert.equal(work.missing,1);
 s=act(s,work.action);work=nextDamWork(s);assert.equal(work.action,'customDeposit');s=act(s,work.action);
 work=nextDamWork(s);assert.equal(work.action,'customBuild');assert.equal(work.delivered,2);s=act(s,work.action);
 assert.equal(damWorkSites(s).find(p=>p.id==='section:0').needsWork,false);assert.notEqual(nextDamWork(s).id,'section:0');assert.ok(loadHabitat(JSON.stringify(s)));
});
test('far markers cannot build remotely and read-only guidance cannot reveal terrain or spend materials',()=>{
 let s=project();s=act(s,'pickup');s.x=-12;s.z=3;const before=JSON.stringify(s),work=damWorkSites(s).find(p=>p.id==='section:0');
 assert.equal(work.action,null);assert.equal(work.phase,'carry');assert.equal(JSON.stringify(s),before);
 const attempted=habitatAction(s,'customDeposit');assert.equal(attempted.state,s);
});
test('tired beavers can still deliver wood, then receive a rest prompt instead of an ineligible build',()=>{
 let s=project();s=act(s,'pickup');s.effort=12;let work=damWorkSites(s).find(p=>p.local);assert.equal(work.action,'customDeposit');s=act(s,work.action);
 work=damWorkSites(s).find(p=>p.local);assert.equal(work.phase,'rest');assert.equal(work.action,null);assert.equal(work.delivered,2);
});
test('food-only cargo is not described as usable construction wood',()=>{
 let s=project();s.cargo={wood:0,food:1};s.carrying=true;const work=damWorkSites(s).find(p=>p.local);
 assert.equal(work.phase,'food');assert.equal(work.action,null);assert.match(work.detail,/food, not wood/);
});

test('staking exits the planner, removes preview water and preserves material counts',()=>{
 const nodes=new Map();const ctx=new Proxy({}, {get:()=>()=>{}});
 function element(){return {value:'',hidden:false,checked:true,disabled:false,textContent:'',children:[],addEventListener(){},append(o){this.children.push(o);},replaceChildren(){this.children=[];},getContext:()=>ctx,focus(){},querySelectorAll:()=>[],setAttribute(){}};}
 const prior=globalThis.document;globalThis.document={getElementById:id=>{if(!nodes.has(id))nodes.set(id,element());return nodes.get(id);},createElement:element};
 try{
  let s=freshDamLab(),toggles=[],notifications=[];nodes.set('dam-height',{...element(),value:'1'});const before=JSON.stringify(s.ledger);
  const planner=createDamPlanner({getState:()=>s,setState:next=>s=next,notify:(...args)=>notifications.push(args),onToggle:v=>toggles.push(v)});
  planner.toggle(true);assert.ok(planner.previewState);nodes.get('dam-commit').onclick();
  assert.equal(planner.open,false);assert.equal(planner.previewState,null);assert.equal(nodes.get('dam-planner').hidden,true);assert.deepEqual(toggles,[true,false]);assert.ok(s.placedDam);assert.equal(JSON.stringify(s.ledger),before);assert.ok(loadHabitat(JSON.stringify(s)));
  assert.equal(notifications.length,1);assert.equal(notifications[0][1].persistent,true);
  planner.toggle(true);const count=s.placedDam.sections.length;
  nodes.get('dam-extend-a').onclick();
  assert.equal(s.placedDam.sections.length,count+1);assert.equal(nodes.get('dam-status').hidden,false);assert.match(nodes.get('dam-status').textContent,/Span extended/);assert.equal(notifications.length,1);
  s.placedDam.sections[0].wood=1;nodes.get('dam-remove-plan').onclick();
  assert.equal(nodes.get('dam-error').hidden,false);assert.match(nodes.get('dam-error').textContent,/Remove built sections/);assert.equal(nodes.get('dam-status').hidden,true);assert.equal(notifications.length,1);
  s.placedDam.sections[0].wood=0;nodes.get('dam-remove-plan').onclick();
  assert.equal(s.placedDam,null);assert.equal(nodes.get('dam-error').hidden,true);assert.match(nodes.get('dam-status').textContent,/Empty project removed/);
  planner.toggle(false);planner.toggle(true);assert.equal(nodes.get('dam-status').hidden,true);
 }finally{globalThis.document=prior;}
});
