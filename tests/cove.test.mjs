import test from 'node:test';
import assert from 'node:assert/strict';
import {freshCove,work,dusk} from '../playtest/cove-rules.mjs';
test('three fed nights persist on the same creek',()=>{
 let g=work(work(freshCove(),'dam'),'brush');
 assert.equal(g.light,3.1);
 assert.equal(work(g,'trees'),g);
 for(let i=0;i<3;i++){
  if(i)g=work(g,'trees');
  g=dusk(g);
  assert.equal(g.creek.raised,true);
  assert.equal(g.done,i===2);
 }
 assert.equal(g.creek.sources.trees,8);
});
test('a shallow entrance costs daylight and an empty larder ends the run',()=>{
 const g=dusk(work(freshCove(),'brush'));
 assert.equal(g.light,8);
 assert.equal(dusk(g).done,true);
 assert.equal(dusk(work(work(freshCove(),'lodge'),'brush')).light,10);
});
