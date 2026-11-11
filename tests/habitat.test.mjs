import test from 'node:test';
import assert from 'node:assert/strict';
import {freshHabitat,habitatMove,habitatAction,habitatOptions,primaryHabitatAction,loadHabitat,PATCHES,DAM,channelStatus,homeStatus} from '../playtest/habitat-rules.mjs';
import {LODGE,CHANNELS,groundHeight,waterDepth,creekWater,speedFor,movementMode} from '../playtest/explore-rules.mjs';
function at(s,p){return {...s,x:p.x,z:p.z===LODGE.z&&p.x===LODGE.x?p.z-1.6:p.z};}
function act(s,id){const r=habitatAction(s,id);assert.notEqual(r.state,s,`${id}: ${r.message}`);return r.state;}
function balance(s){assert.ok(loadHabitat(JSON.stringify(s)),'state survives strict save/material accounting');}
function deliver(s,p,action='prune',destination=LODGE){s=act(at(s,p),action);s=act(at(s,destination),destination===DAM?'deposit':'store');if(s.cargo)s=act(at(s,LODGE),'store');balance(s);return s;}

test('harvest yields physical mixed cargo, local deliveries and conserved food/wood',()=>{
 let s=freshHabitat();balance(s);const snapshot=JSON.stringify(s);s=act(at(s,PATCHES[0]),'prune');assert.equal(s.cargo.wood,1);assert.equal(s.cargo.food,1);assert.equal(s.food,6);assert.equal(s.wood,0);assert.equal(JSON.parse(snapshot).patches.willow.stock,5);
 const far=habitatAction(s,'store');assert.equal(far.state,s);
 s=act(at(s,DAM),'deposit');assert.equal(s.damWood,1);assert.deepEqual(s.cargo,{wood:0,food:1});
 s=act(at(s,LODGE),'store');assert.equal(s.food,7);assert.equal(s.damWood,1);balance(s);
 const bad=structuredClone(s);bad.food++;assert.equal(loadHabitat(JSON.stringify(bad)),null);
});
test('felling creates finite recoverable piles, clearing delays regeneration',()=>{
 let s=act(at(freshHabitat(),PATCHES[1]),'fell');assert.equal(s.patches.aspen.stock,0);assert.equal(s.loose.reduce((n,p)=>n+p.wood,0),12);assert.equal(s.loose.reduce((n,p)=>n+p.food,0),3);
 const noRepeat=habitatAction(s,'fell');assert.equal(noRepeat.state,s);
 s=act(s,'pickup');const count=s.loose.length;s=act(s,'drop');assert.equal(s.loose.length,count+1);s=act(s,'pickup');s=act(at(s,LODGE),'store');balance(s);
 for(let i=0;i<2;i++)s=act(at(s,LODGE),'rest');assert.equal(s.patches.aspen.stock,0);
 s=act(at(s,LODGE),'rest');assert.equal(s.patches.aspen.stock,1);balance(s);
});
test('pruning preserves faster recovery, browsing supports a food-first strategy',()=>{
 let s=deliver(freshHabitat(),PATCHES[0],'browse');assert.equal(s.food,8);assert.equal(s.wood,0);assert.equal(s.patches.willow.stock,4);
 s=act(at(s,LODGE),'rest');assert.equal(s.food,6);assert.equal(s.patches.willow.stock,5);assert.equal(s.nights,1);balance(s);
});
test('sealed pond and excavated bed create useful routes; dry weather requires adaptation',()=>{
 let s=freshHabitat();s=deliver(s,PATCHES[0],'prune',DAM);s=deliver(s,PATCHES[0],'prune',DAM);
 s=act(at(s,DAM),'build');assert.equal(s.dam,1);assert.equal(s.damWood,0);assert.equal(s.ledger.woodUsed,2);
 const original=groundHeight(-4,0,s);s=act(at(s,CHANNELS[0]),'dig');assert.ok(groundHeight(-4,0,s)<original);assert.ok(channelStatus(s,'west').swimmable);assert.equal(movementMode(-4,0,s),'swimming');assert.ok(speedFor('swimming',true)>speedFor('walking',true));
 for(let i=0;i<3;i++)s=act(at(s,LODGE),'rest');assert.equal(s.day,4);assert.equal(channelStatus(s,'west').swimmable,false);
 s=act(at(s,CHANNELS[0]),'dig');assert.ok(channelStatus(s,'west').swimmable);balance(s);
 assert.ok(creekWater(s).wet.has('0,15'),'downstream stream remains');
});
test('deep cuts provide an alternative without raising the dam and can flood harvest sites',()=>{
 let s=freshHabitat();s=act(at(s,CHANNELS[1]),'dig');assert.equal(channelStatus(s,'east').swimmable,false);
 s=act(at(s,CHANNELS[1]),'dig');assert.equal(channelStatus(s,'east').swimmable,true);assert.equal(s.dam,0);
 s=deliver(s,PATCHES[1]);assert.equal(s.patches.aspen.stock,5);s=act(at(s,LODGE),'rest');assert.equal(s.patches.aspen.stock,5,'flooded patch does not regrow during this rest');balance(s);
});
test('effort and local delivery guards reject free work; food shortage remains recoverable',()=>{
 let s=freshHabitat();assert.equal(habitatAction(at(s,DAM),'build').state.dam,0);
 s=at(s,PATCHES[0]);s.effort=12;assert.equal(habitatAction(s,'prune').state,s);s=act(at(s,LODGE),'rest');assert.equal(s.effort,2,'shallow lodge approach has a daily effort consequence');
});
test('two distinct strategies support the lodge and continue after dry weather',()=>{
 // Modest water plus a deeper entrance, or a higher pond plus later entrance adaptation.
 for(const raised of [false,true]){
  let s=freshHabitat();
  if(raised){for(let i=0;i<5;i++)s=deliver(s,PATCHES[0],'prune',DAM);s=act(at(s,DAM),'build');s=act(at(s,DAM),'build');}
  else {s=act(at(s,LODGE),'entrance');s=deliver(s,PATCHES[0],'browse');}
  for(let i=0;i<3;i++)s=act(at(s,LODGE),'rest');
  assert.ok(homeStatus(s).protected);assert.ok(s.nights>=3);assert.ok(s.food>=2);assert.equal(s.day,4);balance(s);
 }
 let s=freshHabitat();for(let i=0;i<5;i++)s=act(at(s,LODGE),'rest');assert.equal(s.shortage,true);assert.equal(s.effort,6,'food shortage and shallow access reduce recovery without blocking foraging');
 s=deliver(s,PATCHES[0],'browse');s=act(at(s,LODGE),'rest');assert.equal(s.shortage,false);balance(s);
});

test('real movement can harvest, deliver, excavate and swim the changed route',()=>{
 function travel(s,p,threshold=.8){for(let i=0;i<1800&&Math.hypot(s.x-p.x,s.z-p.z)>threshold;i++)s=habitatMove(s,{x:p.x-s.x,z:p.z-s.z},.05);assert.ok(Math.hypot(s.x-p.x,s.z-p.z)<=threshold,`reachable: ${p.x},${p.z} from ${s.x},${s.z}`);return s;}
 let s=freshHabitat();s=travel(s,PATCHES[0]);s=act(s,'prune');
 s=travel(s,{x:-7,z:4.4});s=act(s,'store');
 s=act(s,'takeWood');s=travel(s,{x:-3,z:4});s=travel(s,{x:0,z:7.5});s=act(s,'deposit');
 s=travel(s,{x:0,z:0});s=travel(s,CHANNELS[0]);s=act(s,'dig');s=act(s,'dig');
 s=travel(s,PATCHES[0]);s=act(s,'prune');const before=s.swimming;s=travel(s,{x:0,z:0});assert.ok(s.swimming>before+3,'excavation creates a usable swimming route');
 s=travel(s,{x:0,z:-4});s=travel(s,PATCHES[1]);assert.equal(s.known.aspen,true);
 s=travel(s,{x:0,z:-4});s=travel(s,{x:-4,z:4});s=travel(s,{x:-7,z:4.4});s=act(s,'store');balance(s);
});

test('notching changes retained water without refund and never becomes the automatic action',()=>{
 let s=freshHabitat();for(let i=0;i<2;i++)s=deliver(s,PATCHES[0],'prune',DAM);s=act(at(s,DAM),'build');
 const surface=creekWater(s).surface,used=s.ledger.woodUsed;
 assert.equal(primaryHabitatAction(s),undefined,'repeating E after building cannot undo the dam');
 s=act(s,'lower');assert.ok(creekWater(s).surface<surface);assert.equal(s.damWood,0);assert.equal(s.ledger.woodUsed,used);balance(s);
 const before=JSON.stringify(s);assert.equal(habitatAction(s,'build').state,s);assert.equal(JSON.stringify(s),before,'insufficient local wood cannot be reused');
});
