import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import * as Three from 'three';
import * as rules from '../playtest/rules.mjs';
import * as water from '../playtest/water.mjs';

// Exercise the actual app entrypoint with successful renderer construction.
// A CPU renderer double verifies startup and mesh transforms, not GPU pixels.
class Element {
 constructor(){this.children=[];this.dataset={};this.attributes={};this.clientWidth=900;this.clientHeight=760;}
 append(...elements){this.children.push(...elements);}
 replaceChildren(...elements){this.children=elements;}
 setAttribute(k,v){this.attributes[k]=v;}
 after(){}
 addEventListener(){}
 getContext(){return {fillText(){}};}
}
test('WebGL startup binds water controls and changes rendered meshes without spending work',async()=>{
 const elements=new Map(),frames=[];
 const get=id=>{if(!elements.has(id))elements.set(id,new Element());return elements.get(id);};
 const buttons=['low','normal','high'].map(id=>Object.assign(new Element(),{dataset:{water:id}}));
 const document={getElementById:get,createElement:()=>new Element(),querySelectorAll:()=>buttons};
 class Renderer {
  constructor(){this.domElement=new Element();}
  setPixelRatio(){} setClearColor(){} setSize(){}
  render(scene){const surfaces=[];scene.traverse(o=>{if(o.isMesh&&o.material?.color?.getHexString()==='347e9a')surfaces.push({y:o.position.y,width:o.scale.x});});frames.push(surfaces);}
 }
 const context=vm.createContext({THREE:{...Three,WebGLRenderer:Renderer},...rules,...water,document,window:{devicePixelRatio:1},structuredClone,Date,Blob,URL,setTimeout,ResizeObserver:class{constructor(callback){this.callback=callback;}observe(){this.callback();}}});
 const source=(await readFile(new URL('../playtest/app.mjs',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'');
 assert.doesNotThrow(()=>vm.runInContext(source,context));
 const budget=()=>[get('work').textContent,get('supplies').textContent,get('step').textContent];
 const before=budget();
 const captured=[];
 for(const b of buttons){assert.equal(typeof b.onclick,'function');b.onclick();const frame=frames.at(-1);assert.equal(frame.length,2);assert.ok(frame.every(s=>s.y===water.WATER_VIEWS[b.dataset.water].height));captured.push(frame[0].width);assert.deepEqual(budget(),before);}
 assert.equal(new Set(captured).size,3,'all previews must render distinct water widths');
 get('water-current').onclick();assert.ok(frames.at(-1).every(s=>s.y===water.WATER_VIEWS.normal.height));
});
