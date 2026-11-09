import test from 'node:test';
import assert from 'node:assert/strict';
import {BED_HEIGHT,GROUND_HEIGHT,WATER_VIEWS,viewForStage,entranceStatus} from '../playtest/water.mjs';
test('the low-water surface cannot disappear below the bed or flat ground',()=>{
 assert.ok(WATER_VIEWS.low.height>BED_HEIGHT);
 assert.ok(WATER_VIEWS.low.height>GROUND_HEIGHT);
 assert.ok(WATER_VIEWS.low.width>0&&WATER_VIEWS.low.pondWidth>0);
});
test('stage mapping distinguishes normal, flood and low water',()=>{
 assert.equal(viewForStage('prepare'),'normal');assert.equal(viewForStage('recover'),'high');assert.equal(viewForStage('complete'),'low');
 assert.ok(WATER_VIEWS.low.height<WATER_VIEWS.normal.height&&WATER_VIEWS.normal.height<WATER_VIEWS.high.height);
 assert.ok(WATER_VIEWS.low.width<WATER_VIEWS.normal.width&&WATER_VIEWS.normal.width<WATER_VIEWS.high.width);
});
test('the shallow entrance warning differs from the deep entrance',()=>{
 assert.equal(entranceStatus('Cs'),'Exposed at low water');assert.equal(entranceStatus('C'),'Submerged at low water');
});
