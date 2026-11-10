import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import * as rules from '../playtest/creek-rules.mjs';
test('completed lodge keeps controls, forecast and scene synchronized through recovery and finish',async()=>{
 class Element{constructor(){this.textContent='';this.children=[];this.disabled=false;this.dataset={};}append(...xs){this.children.push(...xs);}replaceChildren(...xs){this.children=xs;}setAttribute(){}get text(){return this.textContent+this.children.map(x=>x.text).join('');}}
 const elements=new Map(),el=id=>{if(!elements.has(id))elements.set(id,new Element());return elements.get(id);};let drawn;
 const seed=rules.initialScenario();seed.sections=[2,2,2];seed.lodge=2;seed.stock.lodge.wood=2;
 const context=vm.createContext({...rules,initialScenario:()=>structuredClone(seed),structuredClone,URLSearchParams,location:{search:''},document:{getElementById:el,createElement:()=>new Element(),querySelectorAll:()=>[]},createCreekScene:()=>({mode:'test',update:s=>drawn=structuredClone(s),animateDelivery:async()=>{}})});
 const src=(await readFile(new URL('../playtest/creek-app.mjs',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'');vm.runInContext(src,context);
 const find=(id,name)=>{const walk=e=>[e,...e.children.flatMap(walk)];const b=walk(el(id)).find(e=>e.textContent.startsWith(name));assert.ok(b,`${name} present`);assert.equal(b.disabled,false);return b;};
 assert.match(el('landscape-note').textContent,/Surface 2.05/);assert.match(el('dry-readout').textContent,/0.30/);
 await find('destinations','Lodge').onclick();await find('build-controls','Deepen lodge entrance').onclick();assert.match(el('dry-readout').textContent,/0.65/);assert.equal(drawn.deepEntrance,true);
 await find('build-controls','Establish feeding route').onclick();assert.match(el('dry-readout').textContent,/feeding route usable/);
 await find('season-actions','Advance to dry spell').onclick();assert.match(el('landscape-note').textContent,/Surface 1.75/);assert.equal(drawn.season,'dry');
 await find('season-actions','Finish settlement trial').onclick();assert.equal(drawn.season,'complete');assert.match(el('outcome').text,/Low pond.*feeding route/);
 el('undo').onclick();assert.equal(drawn.season,'dry');assert.equal(el('outcome').children.length,0);
});
