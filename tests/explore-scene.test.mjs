import * as construction from '../playtest/construction-rules.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import * as Three from 'three';
import * as rules from '../playtest/explore-rules.mjs';
import * as habitat from '../playtest/habitat-rules.mjs';
import * as placement from '../playtest/dam-placement.mjs';
import * as journey from '../playtest/journey-rules.mjs';

test('occluding lodge fades independently, camera stays put, and scenery recovers',async()=>{
 let scene,camera;
 class Renderer{constructor(){this.domElement={};}setPixelRatio(){}setSize(){}render(s,c){scene=s;camera=c;}dispose(){}}
 const context=vm.createContext({THREE:{...Three,WebGLRenderer:Renderer},...rules,...habitat,...placement,...journey,...construction,devicePixelRatio:1,window:{matchMedia:()=>({matches:true})},ResizeObserver:class{observe(){}}});
 const code=(await readFile(new URL('../playtest/explore-scene.mjs',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'').replace('export function createExploreScene','function createExploreScene');
 vm.runInContext(code,context);
 const view=context.createExploreScene({clientWidth:900,clientHeight:760,append(){}}),s={...rules.freshExplore(),z:4.5};
 const update=(yaw,time)=>view.update(s,{yaw,distance:6.5,moving:false},time);
 for(let i=1;i<=60;i++)update(0,i*16.667);
 let lodge,body;const banks=[];
 scene.traverse(o=>{if(!o.isMesh)return;if(o.material.color.getHexString()==='826346')lodge=o;if(o.material.color.getHexString()==='795437')body=o;if(o.material.vertexColors)banks.push(o);});
 assert.ok(lodge.material.opacity<.3,'lodge blocking the view becomes translucent');
 assert.equal(body.material.opacity,1,'beaver remains solid');
 assert.equal(banks.length,36,'terrain is divided into local patches');
 assert.ok(banks.some(o=>o.material.opacity===1),'distant terrain remains solid');
 const height=camera.position.y;
 assert.ok(Math.abs(camera.position.z-s.z-6.5)<1e-9);
 for(let i=61;i<=180;i++)update(Math.PI,i*16.667);
 assert.equal(camera.position.y,height,'orbiting through scenery never changes camera height');
 assert.equal(lodge.material.opacity,1,'lodge restores after leaving the sightline');
 assert.equal(rules.canStand(rules.LODGE.x,rules.LODGE.z),false,'transparent objects retain collision');
 view.dispose();
});

test('terrain stays opaque through false bounding-box and real hillside obstruction; player marker follows visibility',async()=>{
 let scene,camera;
 class Renderer{constructor(){this.domElement={};}setPixelRatio(){}setSize(){}render(s,c){scene=s;camera=c;}dispose(){}}
 const context=vm.createContext({THREE:{...Three,WebGLRenderer:Renderer},...rules,...habitat,...placement,...journey,...construction,devicePixelRatio:1,window:{matchMedia:()=>({matches:true})},ResizeObserver:class{observe(){}}});
 const code=(await readFile(new URL('../playtest/explore-scene.mjs',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'').replace('export function createExploreScene','function createExploreScene');
 vm.runInContext(code,context);const view=context.createExploreScene({clientWidth:900,clientHeight:760,append(){}});
 let time=0;const s={...habitat.freshHabitat(),x:12,z:5};
 const frame=(state,yaw)=>view.update(state,{yaw,distance:9},time+=17);
 for(let i=0;i<80;i++)frame(s,0);
 const banks=[];scene.traverse(o=>{if(o.isMesh&&o.material.vertexColors)banks.push(o);});
 assert.ok(camera.position.y>rules.groundHeight(camera.position.x,camera.position.z,s)+3,'camera is above the actual surface');
 assert.ok(banks.some(o=>new Three.Box3().setFromObject(o).expandByScalar(.2).containsPoint(camera.position)),'reproduces misleading tile bounding-box containment');
 assert.ok(banks.every(o=>o.material.opacity===1&&!o.material.transparent&&o.material.depthWrite),'unobstructing terrain stays opaque instead of flashing pale');
 const colors=banks.map(o=>Array.from(o.geometry.getAttribute('color').array));
 const obstructed={...s,x:10,z:8};for(let i=0;i<100;i++)frame(obstructed,Math.PI/2);
 assert.ok(camera.position.y<rules.groundHeight(camera.position.x,camera.position.z,obstructed),'camera lies inside a real hillside');
 assert.ok(banks.every(o=>o.material.opacity===1&&!o.material.transparent&&o.material.depthWrite),'even real intersecting terrain remains solid');
 let outline;scene.traverse(o=>{if(o.userData.kind==='terrain-player-marker')outline=o;});assert.ok(outline.visible,'player marker supplies visibility through the hillside');
 for(let i=0;i<140;i++)frame(s,0);
 assert.ok(banks.every(o=>o.material.opacity===1&&o.material.depthWrite),'terrain restores after the real obstruction');
 assert.equal(outline.visible,false,'marker disappears with clear terrain sightlines');
 assert.deepEqual(banks.map(o=>Array.from(o.geometry.getAttribute('color').array)),colors,'orbit does not recolor ground');
 view.dispose();
});

test('habitat renderer uses the same changing pond and cut bed as movement rules',async()=>{
 let scene;
 class Renderer{constructor(){this.domElement={};}setPixelRatio(){}setSize(){}render(s){scene=s;}dispose(){}}
 const context=vm.createContext({THREE:{...Three,WebGLRenderer:Renderer},...rules,...habitat,...placement,...journey,...construction,devicePixelRatio:1,window:{matchMedia:()=>({matches:true})},ResizeObserver:class{observe(){}}});
 const code=(await readFile(new URL('../playtest/explore-scene.mjs',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'').replace('export function createExploreScene','function createExploreScene');
 vm.runInContext(code,context);const view=context.createExploreScene({clientWidth:900,clientHeight:760,append(){}});
 let s=habitat.freshHabitat();s.x=-4;s.z=0;view.update(s,{yaw:0,distance:6.5},10);
 function water(){const tiles=[];scene.traverse(o=>{if(o.isMesh&&o.visible&&o.material.color.getHexString()==='448f9f')tiles.push(o);});return tiles;}
 assert.ok(water().every(o=>o.position.y===.12||o.position.y===0));
 const old=water().length;
 // Renderer assertions isolate geometry from economy; rule tests cover valid construction costs.
 s={...s,dam:1,channels:{west:1,east:0}};view.update(s,{yaw:0,distance:6.5},30);
 assert.ok(water().length>old,'pond/cut changes visible water meshes');
 const tile=water().find(o=>o.position.x===-3.5&&o.position.z===.5);assert.ok(tile);assert.equal(tile.position.y,rules.waterLevel(-3.5,.5,s));
 let cut=false;scene.traverse(o=>{if(!o.isMesh||!o.material.vertexColors)return;const p=o.geometry.getAttribute('position');for(let i=0;i<p.count;i++)if(Math.abs(p.getX(i)+4)<.01&&Math.abs(p.getZ(i))<.01&&Math.abs(p.getY(i)+.08)<.01)cut=true;});assert.ok(cut,'rendered terrain is excavated, not just recolored');
 s={...s,day:4};view.update(s,{yaw:0,distance:6.5},50);assert.ok(water().some(o=>Math.abs(o.position.y-.15)<1e-9));view.dispose();
});

test('placed dam meshes and preview water reflect arbitrary geometry without committing the preview',async()=>{
 let scene;
 class Renderer{constructor(){this.domElement={};}setPixelRatio(){}setSize(){}render(s){scene=s;}dispose(){}}
 const context=vm.createContext({THREE:{...Three,WebGLRenderer:Renderer},...rules,...habitat,...placement,...journey,...construction,devicePixelRatio:1,window:{matchMedia:()=>({matches:true})},ResizeObserver:class{observe(){}}});
 const code=(await readFile(new URL('../playtest/explore-scene.mjs',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'').replace('export function createExploreScene','function createExploreScene');
 vm.runInContext(code,context);const view=context.createExploreScene({clientWidth:900,clientHeight:760,append(){}});
 let s=habitat.freshDamLab();s=placement.commitDam(s,placement.makeDamPlan(s,{x:-6,z:-3},{x:6,z:0},2).dam).state;s.x=0;s.z=-5;
 const read=()=>{let level;scene.traverse(o=>{if(o.isMesh&&o.visible&&o.material.roughness===.3&&o.position.x===.5&&o.position.z===-7.5)level=o.position.y;});return level;};
 view.update(s,{yaw:0,distance:6.5},10);assert.equal(read(),.12);
 const before=JSON.stringify(s),preview=placement.previewDam(s,s.placedDam).state;view.update(s,{yaw:0,distance:6.5,previewState:preview},30);assert.equal(read(),.68);assert.equal(JSON.stringify(s),before);
 let group;scene.traverse(o=>{if(o.userData.kind==='placed-dam')group=o;});assert.equal(group.children.length,7,'angled sections rendered at their own coordinates');
 view.update(s,{yaw:0,distance:6.5},50);assert.equal(read(),.12,'closing preview restores actual water');
 for(const p of s.placedDam.sections)p.level=2;view.update(s,{yaw:0,distance:6.5},70);assert.equal(read(),.68);
 s.placedDam.sections[3].level=0;view.update(s,{yaw:0,distance:6.5},90);assert.equal(read(),.12,'visible water responds to an actual gap');view.dispose();
});

test('family uses improved water access, pauses with play, and the old water mark reflects a witnessed drop',async()=>{
 let scene;
 class Renderer{constructor(){this.domElement={};}setPixelRatio(){}setSize(){}render(s){scene=s;}dispose(){}}
 const context=vm.createContext({THREE:{...Three,WebGLRenderer:Renderer},...rules,...habitat,...placement,...journey,...construction,devicePixelRatio:1,window:{matchMedia:()=>({matches:false})},ResizeObserver:class{observe(){}}});
 const code=(await readFile(new URL('../playtest/explore-scene.mjs',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'').replace('export function createExploreScene','function createExploreScene');
 vm.runInContext(code,context);const view=context.createExploreScene({clientWidth:900,clientHeight:760,append(){}}),s=habitat.freshHabitat({flexible:true});
 view.update(s,{yaw:0,distance:6.5,active:true},10);let family,memory;scene.traverse(o=>{if(o.userData.kind==='family-response')family=o;if(o.userData.kind==='water-memory')memory=o;});
 assert.ok(family.visible);assert.equal(family.userData.route,'bank');s.entrance=1;const snapshot=JSON.stringify(s);
 for(let i=1;i<=40;i++)view.update(s,{yaw:0,distance:6.5,active:true},10+i*100);
 assert.equal(family.userData.route,'water');assert.equal(family.userData.mood,'settled');assert.ok(family.children[0].position.x> -4,'adult visibly uses the improved approach');
 const position=family.children[0].position.clone();view.update(s,{yaw:0,distance:6.5,active:false},4110);assert.ok(family.children[0].position.equals(position),'ambient activity pauses');assert.equal(JSON.stringify(s),snapshot,'family visuals never generate/consume supplies');
 s.day=4;s.journey.normalWater=.12;view.update(s,{yaw:0,distance:6.5,active:true},4210);assert.ok(memory.visible);assert.equal(memory.children[1].position.y,.12);
 s.food=0;view.update(s,{yaw:0,distance:6.5},4310);assert.equal(family.userData.mood,'hungry');view.dispose();
});

test('M1 renderer distinguishes stakes, open framework, packed faces and sealing mud without changing water rules',async()=>{
 let scene;
 class Renderer{constructor(){this.domElement={};}setPixelRatio(){}setSize(){}render(s){scene=s;}dispose(){}}
 const context=vm.createContext({THREE:{...Three,WebGLRenderer:Renderer},...rules,...habitat,...placement,...journey,...construction,devicePixelRatio:1,window:{matchMedia:()=>({matches:true})},ResizeObserver:class{observe(){}}});
 const code=(await readFile(new URL('../playtest/explore-scene.mjs',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'').replace('export function createExploreScene','function createExploreScene');
 vm.runInContext(code,context);const view=context.createExploreScene({clientWidth:900,clientHeight:760,append(){}});
 let s=habitat.freshDamLab({construction:true});s=placement.commitDam(s,placement.makeDamPlan(s,{x:-6,z:-3},{x:6,z:-3},1).dam).state;
 const update=()=>view.update(s,{yaw:0,distance:6.5,active:true},100);update();let group;scene.traverse(o=>{if(o.userData.kind==='placed-dam')group=o;});assert.equal(group.children[2].userData.stage,'stakes');
 const water=()=>{const out=[];scene.traverse(o=>{if(o.isMesh&&o.visible&&o.material.color.getHexString()==='448f9f')out.push([o.position.x,o.position.y,o.position.z]);});return out;};const initial=water();
 s.placedDam.sections[2].frame=1;s.cargo={wood:0,food:0,mud:2};update();assert.equal(group.children[2].userData.stage,'framework');assert.equal(group.children[2].children.some(o=>o.userData.kind==='packed-face'),false);assert.deepEqual(water(),initial);let cargo;scene.traverse(o=>{if(o.name==='carried-mud'&&o.parent?.parent?.type==='Group')cargo??=o;});assert.ok(cargo);assert.equal(cargo.visible,true);
 s.placedDam.sections[2].level=1;s.cargo=null;const before=JSON.stringify(s);update();assert.equal(group.children[2].userData.stage,'packed');assert.ok(group.children[2].children.some(o=>o.userData.kind==='packed-face'));assert.equal(JSON.stringify(s),before,'rendering cannot consume sealing stock');view.dispose();
});


test('deep Willow cut camera reproduction never fades whole ground tiles or changes the saved world',async()=>{
 let scene;
 class Renderer{constructor(){this.domElement={};}setPixelRatio(){}setSize(){}render(s){scene=s;}dispose(){}}
 const context=vm.createContext({THREE:{...Three,WebGLRenderer:Renderer},...rules,...habitat,...placement,...journey,...construction,devicePixelRatio:1,window:{matchMedia:()=>({matches:true})},ResizeObserver:class{observe(){}}});
 const code=(await readFile(new URL('../playtest/explore-scene.mjs',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'').replace('export function createExploreScene','function createExploreScene');
 vm.runInContext(code,context);const view=context.createExploreScene({clientWidth:1024,clientHeight:620,append(){}});
 const s={...habitat.freshHabitat(),x:-7,z:1,channels:{west:2,east:0}},before=JSON.stringify(s);let time=0;
 for(let i=0;i<50;i++)view.update(s,{yaw:0,distance:6.5},time+=17);
 let outline;const banks=[];scene.traverse(o=>{if(o.userData.kind==='terrain-player-marker')outline=o;if(o.isMesh&&o.material.vertexColors)banks.push(o);});
 assert.ok(outline.visible,'reproduces the bank intersecting camera sightlines at the deep cut');
 const bodies=[];scene.traverse(o=>{if(o.name==='beaver-body')bodies.push(o);if(o.isMesh)assert.notEqual(o.material.wireframe,true,'no player, cargo or family wireframe overlay');});
 assert.equal(bodies.length,3,'only player, adult and kit exist; no duplicate character');
 assert.ok(bodies.every(o=>o.material.opacity===1&&!o.material.transparent),'character bodies retain solid shaded materials');
 const playerBody=bodies.find(o=>!o.parent.userData.kind),player=playerBody.parent;
 assert.equal(outline.position.x,player.position.x);assert.equal(outline.position.z,player.position.z);assert.ok(Math.abs(outline.position.y-player.position.y-.04)<1e-9,'ring follows player feet instead of a floating duplicate');
 assert.equal(outline.geometry.type,'RingGeometry');

 assert.ok(banks.every(o=>o.material.opacity===1&&!o.material.transparent&&o.material.depthWrite),'no pale 8×8 patch or transparent terrain/water sorting');
 outline.traverse(o=>{if(o.isMesh){assert.equal(o.material.depthTest,false);assert.equal(o.material.depthWrite,false);}});
 const colors=banks.map(o=>Array.from(o.geometry.getAttribute('color').array));
 for(let i=0;i<60;i++)view.update(s,{yaw:Math.PI,distance:6.5},time+=17);
 assert.equal(outline.visible,false,'rotating away from the bank clears the marker');
 assert.deepEqual(banks.map(o=>Array.from(o.geometry.getAttribute('color').array)),colors);
 assert.equal(JSON.stringify(s),before,'camera movement does not modify water, resources or terrain state');view.dispose();
});

test('compatibility terrain obstruction uses a local player marker rather than transparent ground',async()=>{
 class UnavailableRenderer{constructor(){throw new Error('No WebGL');}}
 const context=vm.createContext({THREE:{...Three,WebGLRenderer:UnavailableRenderer},...rules,...habitat,...placement,...journey,...construction,devicePixelRatio:1,window:{matchMedia:()=>({matches:true})},ResizeObserver:class{observe(){}}});
 const code=(await readFile(new URL('../playtest/explore-scene.mjs',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'').replace('export function createExploreScene','function createExploreScene');
 vm.runInContext(code,context);const container={clientWidth:900,clientHeight:760,append(){},innerHTML:''},view=context.createExploreScene(container);
 const s={...habitat.freshHabitat(),x:10,z:8};let time=0;
 for(let i=0;i<40;i++)view.update(s,{yaw:Math.PI/2,distance:9,force:true},time+=17);
 assert.match(container.innerHTML,/<ellipse/,'fallback can locate the player through a hillside');
 for(let i=0;i<60;i++)view.update({...s,x:12,z:5},{yaw:0,distance:9,force:true},time+=17);
 assert.doesNotMatch(container.innerHTML,/<ellipse/,'clear terrain sightline removes fallback marker');view.dispose();
});


test('unchanged loose supplies resettle after excavation and water changes without rebuilding or spending stock',async()=>{
 let scene;
 class Renderer{constructor(){this.domElement={};}setPixelRatio(){}setSize(){}render(s){scene=s;}dispose(){}}
 const context=vm.createContext({THREE:{...Three,WebGLRenderer:Renderer},...rules,...habitat,...placement,...journey,...construction,devicePixelRatio:1,window:{matchMedia:()=>({matches:true})},ResizeObserver:class{observe(){}}});
 const code=(await readFile(new URL('../playtest/explore-scene.mjs',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'').replace('export function createExploreScene','function createExploreScene');
 vm.runInContext(code,context);const view=context.createExploreScene({clientWidth:1024,clientHeight:620,append(){}});
 const s=habitat.freshHabitat({construction:true});s.loose=[{x:-6,z:0,wood:2,food:0,mud:0},{x:-5,z:0,wood:0,food:0,mud:2},{x:-6,z:1,wood:1,food:1,mud:0}];
 let time=0;const update=()=>view.update(s,{yaw:0,distance:6.5},time+=17);update();
 const piles=[];scene.traverse(o=>{if(o.userData.kind==='loose-supplies')piles.push(o);});assert.equal(piles.length,3);
 const wood=piles[0],mud=piles[1],oldY=wood.position.y,geometry=wood.children[0].geometry,inventory=JSON.stringify([s.loose,s.ledger]);
 s.channels.west=2;update();
 assert.ok(wood.position.y<oldY-.3,'wood drops from its old bank height after digging');
 assert.equal(wood.position.y,Math.max(rules.groundHeight(-6,0,s),rules.waterLevel(-6,0,s))+.05,'wood floats at the actual water surface');
 assert.equal(mud.position.y,rules.groundHeight(-5,0,s)+.05,'mud-only loads settle on the excavated bed');
 assert.equal(wood.children[0].geometry,geometry,'surface updates do not rebuild inventory geometry');
 const normalY=wood.position.y;s.day=4;update();assert.ok(wood.position.y<normalY,'unchanged wood follows a low-water day');
 s.day=1;s.dam=2;update();assert.equal(wood.position.y,Math.max(rules.groundHeight(-6,0,s),rules.waterLevel(-6,0,s))+.05);
 const positions=piles.map(p=>p.position.clone());update();assert.ok(piles.every((p,i)=>p.position.equals(positions[i])),'support is stable across identical frames');
 assert.equal(JSON.stringify([s.loose,s.ledger]),inventory,'visual settling never changes counts or accounting');view.dispose();
});


test('packed mud caps are separated from water and the family mud face shares log fading',async()=>{
 let scene;
 class Renderer{constructor(){this.domElement={};}setPixelRatio(){}setSize(){}render(s){scene=s;}dispose(){}}
 const context=vm.createContext({THREE:{...Three,WebGLRenderer:Renderer},...rules,...habitat,...placement,...journey,...construction,devicePixelRatio:1,window:{matchMedia:()=>({matches:true})},ResizeObserver:class{observe(){}}});
 const code=(await readFile(new URL('../playtest/explore-scene.mjs',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'').replace('export function createExploreScene','function createExploreScene');
 vm.runInContext(code,context);const view=context.createExploreScene({clientWidth:1024,clientHeight:620,append(){}});
 let s=habitat.freshHabitat({construction:true});s.x=0;s.z=8;let time=0;
 for(const level of [1,2]){
  s.dam=level;s.familyFrame=2;const before=JSON.stringify(s);view.update(s,{yaw:0,distance:6.5},time+=100);scene.updateMatrixWorld(true);
  let face;const water=[];scene.traverse(o=>{if(o.userData.kind==='family-packed-face')face=o;if(o.isMesh&&o.material.roughness===.3)water.push(o);});
  assert.ok(face.visible);const bounds=new Three.Box3().setFromObject(face),crest=rules.waterLevel(0,8,s);
  assert.ok(Math.abs(bounds.max.y-crest-.012)<1e-7,'visible mud cap has a small clearance above normal retained water');
  assert.ok(water.every(o=>o.geometry.parameters.width===1&&o.geometry.parameters.height===1),'adjacent water tiles meet without double-blended strips');
  assert.ok(face.parent.children.some(o=>o.geometry?.type==='CylinderGeometry'),'mud and family logs belong to one fading group');
  for(let i=0;i<20;i++)view.update(s,{yaw:0,distance:6.5},time+=17);
  assert.ok(face.parent.children.filter(o=>o.isMesh).every(o=>o.material.opacity===face.material.opacity),'mud and logs fade together');
  assert.equal(JSON.stringify(s),before,'visual cap clearance never raises hydraulic crest or changes stock');
 }
 s=habitat.freshDamLab({construction:true});s=placement.commitDam(s,placement.makeDamPlan(s,{x:-6,z:-3},{x:6,z:-3},1).dam).state;
 for(const section of s.placedDam.sections){section.frame=1;section.level=1;}
 const before=JSON.stringify(s);view.update(s,{yaw:0,distance:6.5},time+=100);scene.updateMatrixWorld(true);
 const faces=[];scene.traverse(o=>{if(o.userData.kind==='packed-face')faces.push(o);});assert.ok(faces.length);
 for(const face of faces){const bounds=new Three.Box3().setFromObject(face);assert.ok(Math.abs(bounds.max.y-.412)<1e-7,'placed dam caps also avoid exact water coplanarity');}
 assert.equal(JSON.stringify(s),before);view.dispose();
});
