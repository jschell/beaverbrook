import test from 'node:test';
import assert from 'node:assert/strict';
import {initialChannelDemo, creekAct} from '../playtest/creek-rules.mjs';
import {familyHaul,familyRoute,restAtHome} from '../playtest/family-rules.mjs';
test('the adult provides supper and the player can explore through the first dry morning',()=>{
  const start = initialChannelDemo();
  const trip = familyHaul(start);
  assert.equal(trip.home.sources.trees, start.sources.trees-2);
  assert.equal(trip.carried.cargo.kind,'food');
  assert.equal(trip.home.stock.cache.food,2);
  const morning = restAtHome(trip.home);
  assert.equal(morning.stock.cache.food,0);
  assert.equal(morning.season,'dry');
  assert.ok(familyHaul(morning));
});
test('digging trades carrying for swimming along the teaching route',()=>{
  const home = familyHaul(initialChannelDemo()).home;
  const cut = creekAct(home,{type:'digChannel',id:'east'}).state;
  assert.ok(familyRoute(cut).waterCells > familyRoute(home).waterCells);
  assert.ok(familyRoute(cut).work < familyRoute(home).work);
});
