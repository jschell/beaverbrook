import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import * as Three from 'three';
import * as rules from '../playtest/creek-rules.mjs';

test('successful renderer startup draws the actual creek water meshes after dam closure',async()=>{
 const frames=[];const container={clientWidth:900,clientHeight:760,append(){}};
 const overlay={querySelectorAll:()=>[]};
 class Renderer{constructor(){this.domElement={};}setPixelRatio(){}setSize(){}render(scene){const surfaces=[];scene.traverse(o=>{if(o.isMesh&&o.material?.color?.getHexString()==='3c88a2')surfaces.push(o.position.y);});frames.push(surfaces);}}
 const context=vm.createContext({THREE:{...Three,WebGLRenderer:Renderer},...rules,window:{devicePixelRatio:1,matchMedia:()=>({matches:true})},ResizeObserver:class{constructor(cb){this.cb=cb;}observe(){this.cb();}}});
 const code=(await readFile(new URL('../playtest/creek-scene.mjs',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'').replace('export function createCreekScene','function createCreekScene');
 vm.runInContext(code,context);const view=context.createCreekScene(container,overlay,()=>{});const s=rules.initialCreek();view.update(s);assert.equal(frames.at(-1).length,13);
 s.sections=[2,2,2];view.update(s);const low=frames.at(-1);assert.equal(low.length,rules.waterState(s).wet.size);assert.ok(low.length>13);assert.ok(low.some(y=>y>1));
 s.raised=true;view.update(s);assert.ok(frames.at(-1).length>low.length);
 s.raised=false;view.update(s,{raisedPreview:true});assert.ok(overlay.innerHTML.includes('additional inundation'));assert.equal(frames.at(-1).length,low.length,'preview must not change current water meshes');
 s.sections[0]=0;view.update(s);assert.equal(frames.at(-1).length,13,'the stream remains when the pond drains');
});
