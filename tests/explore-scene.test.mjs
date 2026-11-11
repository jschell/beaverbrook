import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import * as Three from 'three';
import * as rules from '../playtest/explore-rules.mjs';
import * as habitat from '../playtest/habitat-rules.mjs';

test('occluding lodge fades independently, camera stays put, and scenery recovers',async()=>{
 let scene,camera;
 class Renderer{constructor(){this.domElement={};}setPixelRatio(){}setSize(){}render(s,c){scene=s;camera=c;}dispose(){}}
 const context=vm.createContext({THREE:{...Three,WebGLRenderer:Renderer},...rules,...habitat,devicePixelRatio:1,window:{matchMedia:()=>({matches:true})},ResizeObserver:class{observe(){}}});
 const code=(await readFile(new URL('../playtest/explore-scene.mjs',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'').replace('export function createExploreScene','function createExploreScene');
 vm.runInContext(code,context);
 const view=context.createExploreScene({clientWidth:900,clientHeight:760,append(){}}),s={...rules.freshExplore(),z:4.5};
 const update=(yaw,time)=>view.update(s,{yaw,distance:6.5,moving:false},time);
 for(let i=1;i<=60;i++)update(0,i*16.667);
 let lodge,body;const banks=[];
 scene.traverse(o=>{if(!o.isMesh)return;if(o.material.color.getHexString()==='826346')lodge=o;if(o.material.color.getHexString()==='795437')body=o;if(o.material.vertexColors)banks.push(o);});
 assert.ok(lodge.material.opacity<.3,'lodge blocking the view becomes translucent');
 assert.equal(body.material.opacity,1,'beaver remains solid');
 assert.equal(banks.length,36,'banks fade in local patches');
 assert.ok(banks.some(o=>o.material.opacity===1),'distant terrain remains solid');
 const height=camera.position.y;
 assert.ok(Math.abs(camera.position.z-s.z-6.5)<1e-9);
 for(let i=61;i<=180;i++)update(Math.PI,i*16.667);
 assert.equal(camera.position.y,height,'orbiting through scenery never changes camera height');
 assert.equal(lodge.material.opacity,1,'lodge restores after leaving the sightline');
 assert.equal(rules.canStand(rules.LODGE.x,rules.LODGE.z),false,'transparent objects retain collision');
 view.dispose();
});

test('habitat renderer uses the same changing pond and cut bed as movement rules',async()=>{
 let scene;
 class Renderer{constructor(){this.domElement={};}setPixelRatio(){}setSize(){}render(s){scene=s;}dispose(){}}
 const context=vm.createContext({THREE:{...Three,WebGLRenderer:Renderer},...rules,...habitat,devicePixelRatio:1,window:{matchMedia:()=>({matches:true})},ResizeObserver:class{observe(){}}});
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
