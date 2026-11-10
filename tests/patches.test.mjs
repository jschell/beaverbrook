import test from 'node:test';
import assert from 'node:assert/strict';
import {freshPatches,patchAct,patchView,recovery,savePatches,loadPatches} from '../playtest/patch-rules.mjs';

function apply(state,type,id) {
  const result=patchAct(state,{type,id});
  assert.equal(result.ok,true,result.message);
  return result.state;
}
function run(sequence) {
  let state=freshPatches();
  for (const action of sequence) state=apply(state,action==='advance'?'advance':'harvest',action);
  return state;
}
test('renewable sources transfer real food and repeated cutting reduces recovery',()=>{
  const before=freshPatches();
  const snapshot=savePatches(before);
  const after=apply(before,'harvest','trees');
  assert.equal(savePatches(before),snapshot);
  assert.equal(after.patches.trees.biomass,4);
  assert.equal(after.creek.stock.cache.food,6);
  assert.equal(after.creek.sources.trees,4);
  assert.equal(after.creek.cargo,null);
  const twice=apply(after,'harvest','trees');
  assert.ok(recovery(twice.creek,'trees',twice.patches.trees).growth<recovery(before.creek,'trees',before.patches.trees).growth);
  const refused=patchAct(twice,{type:'harvest',id:'trees'});
  assert.equal(refused.ok,false);
  assert.equal(refused.state,twice);
});
test('rest and changed water alter growth while distant memories stay stale',()=>{
  const before=freshPatches();
  const dry=apply(before,'advance');
  assert.equal(dry.patches.trees.biomass,9);
  assert.equal(dry.observations.trees.patch.biomass,6);
  assert.equal(patchView(dry,'trees').stale,true);
  assert.equal(patchView(dry,'willow').stale,false);
  assert.equal(dry.patches.willow.roots,2);
  assert.ok(recovery(dry.creek,'trees',dry.patches.trees).env.moisture<recovery(before.creek,'trees',before.patches.trees).env.moisture);
  const visited=apply(dry,'visit','trees');
  assert.equal(visited.observations.trees.patch.biomass,9);
  assert.equal(visited.creek.stock.cache.food,0);
  assert.equal(visited.harvested,0);
});
test('three seasons support distinct harvest allocations and exact food accounting',()=>{
  const plans=[
    ['willow','brush','trees','advance','brush','trees','advance','trees','advance'],
    ['brush','trees','advance','brush','trees','advance','trees','trees','advance']
  ];
  for (const plan of plans) {
    const result=run(plan);
    assert.equal(result.status,'success');
    assert.equal(result.consumed,12);
    assert.equal(result.creek.stock.cache.food,4+result.harvested-result.consumed);
    assert.ok(result.creek.stock.cache.food>=4);
    assert.equal(patchAct(result,{type:'advance'}).ok,false);
  }
  const shortage=run(['advance','advance']);
  assert.equal(shortage.status,'shortage');
  assert.equal(shortage.consumed,4);
});
test('saved runs preserve biology, memories and consumption without regeneration',()=>{
  const state=run(['trees','brush','advance']);
  const restored=loadPatches(savePatches(state));
  assert.deepEqual(restored,state);
  assert.deepEqual(apply(restored,'advance'),apply(state,'advance'));
  assert.equal(loadPatches('{broken'),null);
  assert.equal(loadPatches('{"version":999}'),null);
  const corrupt=structuredClone(state);corrupt.patches.trees.biomass=100;
  assert.equal(loadPatches(JSON.stringify(corrupt)),null);
});
