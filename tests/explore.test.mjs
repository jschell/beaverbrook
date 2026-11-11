import test from 'node:test';
import assert from 'node:assert/strict';
import {freshExplore,moveExplore,movementMode,speedFor,groundHeight,canStand,cameraBoom,dampCamera,interactExplore,nearbyInteraction,loadExplore,GROVE,LODGE,TREES} from '../playtest/explore-rules.mjs';

test('walking, wading and swimming are derived from the same height field',()=>{
 assert.equal(movementMode(-7,3),'walking');assert.equal(movementMode(0,0),'swimming');
 const shore=Array.from({length:100},(_,i)=>i/20).find(x=>movementMode(x,0)==='wading');assert.ok(shore);
 assert.ok(speedFor('walking',true)<speedFor('walking',false));
 assert.ok(speedFor('swimming',true)>speedFor('walking',true));
 const start=freshExplore(),before=JSON.stringify(start);
 const moved=moveExplore(start,{x:1,z:0},.1,[]);assert.equal(JSON.stringify(start),before);assert.ok(moved.x>start.x);
 const diagonal=moveExplore(start,{x:1,z:1},.1,[]);assert.ok(Math.hypot(diagonal.x-start.x,diagonal.z-start.z)<=.231);
});
test('collisions slide safely and large elapsed times cannot jump across a trunk or the boundary',()=>{
 const start={...freshExplore(),x:8,z:-5};
 const obstacle=[{x:9,z:-5,radius:.5,height:3}];
 let s=start;for(let i=0;i<40;i++)s=moveExplore(s,{x:1,z:0},.1,obstacle);
 assert.ok(s.x<9);assert.ok(canStand(s.x,s.z,obstacle));
 const slide=moveExplore(s,{x:1,z:1},.1,obstacle);assert.ok(slide.z>s.z);
 const edge=moveExplore({...start,x:23.35},{x:1,z:0},100,[]);assert.ok(edge.x<=23.4);
});
test('map knowledge expands locally and camera position never reveals new terrain',()=>{
 const start=freshExplore();assert.equal(start.known.grove,undefined);assert.equal(start.explored['20,20'],undefined);
 const original=JSON.stringify(start);cameraBoom(start,2);assert.equal(JSON.stringify(start),original);
 let s={...start,x:GROVE.x-5,z:GROVE.z};s=moveExplore(s,{x:1,z:0},.1,[]);
 assert.equal(s.known.grove,true);assert.ok(s.explored[`${GROVE.x},${GROVE.z}`]);
 assert.ok(s.explored['-7,3']);
});
test('branch gathering, dropping, recovery and delivery conserve the finite supply',()=>{
 let s={...freshExplore(),x:GROVE.x,z:GROVE.z};
 s=interactExplore(s).state;assert.equal(s.carrying,true);assert.equal(s.groveStock,2);
 const unchanged=interactExplore(s);assert.equal(unchanged.state,s);
 s=interactExplore(s,'drop').state;assert.equal(s.dropped.length,1);assert.equal(s.carrying,false);
 assert.equal(nearbyInteraction(s).type,'pickup');s=interactExplore(s).state;assert.equal(s.dropped.length,0);
 s.x=LODGE.x;s.z=LODGE.z;s=interactExplore(s).state;
 assert.equal(s.stored,1);assert.equal(s.carrying,false);assert.equal(s.groveStock,2);
 assert.equal(s.groveStock+s.stored+s.dropped.length+Number(s.carrying),3);
});
test('camera keeps its chosen range and height through obstacles and water transitions',()=>{
 const s=freshExplore();
 for(const yaw of [0,1,3]){
  const boom=cameraBoom(s,yaw,6.5);
  assert.ok(Math.abs(Math.hypot(boom.position.x-s.x,boom.position.z-s.z)-6.5)<1e-9);
  assert.equal(boom.position.y,Math.max(0,groundHeight(s.x,s.z))+3.6);
 }
 const shore=cameraBoom({...s,x:2.5,z:0},0),water=cameraBoom({...s,x:0,z:0},0);
 assert.equal(shore.position.y,water.position.y,'submerged banks share a continuous water reference');
 const one=dampCamera(4,9,.1),two=dampCamera(dampCamera(4,9,.05),9,.05);
 assert.ok(one>4&&one<9);assert.ok(Math.abs(one-two)<1e-9,'smoothing is independent of frame rate');
});
test('saved exploration preserves discoveries and cannot add branch stock',()=>{
 const s=freshExplore();assert.ok(canStand(s.x,s.z,TREES));
 assert.deepEqual(loadExplore(JSON.stringify(s)),s);
 assert.equal(loadExplore('{bad'),null);
 const bad=structuredClone(s);bad.stored=3;assert.equal(loadExplore(JSON.stringify(bad)),null);
 bad.stored=0;bad.x=200;assert.equal(loadExplore(JSON.stringify(bad)),null);
});

test('a real outbound and return route crosses water, discovers the grove and delivers a branch',()=>{
 function travel(s,point,threshold=.75){
  for(let step=0;step<900&&Math.hypot(s.x-point.x,s.z-point.z)>threshold;step++)s=moveExplore(s,{x:point.x-s.x,z:point.z-s.z},.05);
  assert.ok(Math.hypot(s.x-point.x,s.z-point.z)<=threshold,'The route remains traversable');return s;
 }
 let s=freshExplore();
 for(const p of [{x:-4,z:-4},{x:0,z:-4},GROVE])s=travel(s,p);
 assert.equal(s.known.grove,true);assert.equal(s.known.landing,true);assert.ok(s.swimming>3);
 s=interactExplore(s).state;assert.equal(s.carrying,true);
 for(const p of [{x:0,z:-4},{x:-4,z:-4}])s=travel(s,p);
 s=travel(s,LODGE,1.8);s=interactExplore(s).state;
 assert.equal(s.stored,1);assert.ok(Object.keys(s.explored).length>300);
 assert.deepEqual(loadExplore(JSON.stringify(s)),s);
});
