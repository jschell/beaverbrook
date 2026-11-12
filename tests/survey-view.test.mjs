import test from 'node:test';
import assert from 'node:assert/strict';
import {traceContours,traceShoreline,buildSurvey} from '../playtest/survey-view.mjs';
import {freshDamLab} from '../playtest/habitat-rules.mjs';
import {makeDamPlan,previewDam} from '../playtest/dam-placement.mjs';

test('contours reproduce a known slope and never sample hidden cells',()=>{
 const known={'0,0':true},sampled=[];
 const lines=traceContours(known,(x,z)=>{sampled.push({x,z});return x;},[.25,.75]);assert.ok(lines.length);
 for(const line of lines){assert.equal(line.a.x,line.height);assert.equal(line.b.x,line.height);assert.ok(line.a.z>=0&&line.a.z<=1&&line.b.z>=0&&line.b.z<=1);}
 assert.ok(sampled.every(p=>p.x>=0&&p.x<=1&&p.z>=0&&p.z<=1));assert.equal(traceContours({},()=>{throw Error('Hidden sampling');},[0]).length,0);
 assert.deepEqual(traceContours(known,()=>1,[0,1,2]),[],'flat ground produces no spurious contour');
});
test('shoreline excludes fog boundaries and only shows wet/dry or water-step edges',()=>{
 const wet=new Map([['0,0',.4],['1,0',.4]]),known={'0,0':true,'1,0':true};assert.deepEqual(traceShoreline(known,wet),[],'same-level neighbors and unknown outer neighbors do not create shoreline');
 known['0,1']=true;const shore=traceShoreline(known,wet);assert.equal(shore.length,1);assert.deepEqual(shore[0],{a:{x:0,z:1},b:{x:1,z:1}});
 assert.deepEqual(traceShoreline({},wet),[]);
});
test('completed-target survey stays distinct from actual shoreline without committing or revealing unknown ground',()=>{
 const s=freshDamLab({construction:true}),plan=makeDamPlan(s,{x:-6,z:-3},{x:6,z:-3},2).dam;assert.ok(plan);
 const before=JSON.stringify(s),future=previewDam(s,plan).state,targetBefore=JSON.stringify(future),actual=buildSurvey(s),prediction=buildSurvey(s,future);
 assert.deepEqual(actual.actualShore,prediction.actualShore);assert.notDeepEqual(prediction.actualShore,prediction.targetShore);assert.match(prediction.summary,/completed-target prediction/);assert.match(prediction.summary,/0.50/);assert.deepEqual(actual.targetShore,[]);
 assert.equal(JSON.stringify(s),before);assert.equal(JSON.stringify(future),targetBefore);
 const hidden={...s,explored:{}};assert.deepEqual(buildSurvey(hidden,future).contours,[]);assert.deepEqual(buildSurvey(hidden,future).actualShore,[]);assert.deepEqual(buildSurvey(hidden,future).targetShore,[]);
});
