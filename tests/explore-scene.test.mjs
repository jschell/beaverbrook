import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import * as Three from 'three';
import * as rules from '../playtest/explore-rules.mjs';

test('occluding lodge fades independently, camera stays put, and scenery recovers',async()=>{
 let scene,camera;
 class Renderer{constructor(){this.domElement={};}setPixelRatio(){}setSize(){}render(s,c){scene=s;camera=c;}dispose(){}}
 const context=vm.createContext({THREE:{...Three,WebGLRenderer:Renderer},...rules,devicePixelRatio:1,window:{matchMedia:()=>({matches:true})},ResizeObserver:class{observe(){}}});
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
