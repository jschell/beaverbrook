import test from 'node:test';
import assert from 'node:assert/strict';
import {lodgeSection} from '../playtest/lodge-section.mjs';
import {freshHabitat,homeStatus,habitatAction} from '../playtest/habitat-rules.mjs';
import {LODGE,LODGE_APPROACH,groundHeight,lodgeApproachDepth} from '../playtest/explore-rules.mjs';

test('lodge section uses actual access state for dry, deepened and low-water approaches without mutating saves',()=>{
 let s=freshHabitat();s.x=LODGE.x;s.z=LODGE.z;
 const original=JSON.stringify(s),dry=lodgeSection(s);assert.equal(dry.protected,false);assert.equal(dry.depth,lodgeApproachDepth(s));assert.match(dry.text,/exposed or too shallow/);assert.match(dry.svg,/data-access="shallow"/);assert.equal(JSON.stringify(s),original);
 s=habitatAction(s,'entrance').state;assert.equal(s.entrance,1);
 for(const day of [1,4]){s.day=day;const before=JSON.stringify(s),view=lodgeSection(s);assert.equal(view.protected,homeStatus(s).protected);assert.equal(view.depth,homeStatus(s).depth);assert.match(view.svg,/data-access="protected"/);assert.match(view.svg,/Passage shown schematically/);assert.equal(JSON.stringify(s),before);}
 const pooled={...freshHabitat(),dam:1};assert.equal(lodgeSection(pooled).protected,true,'retaining pond water remains a valid alternative to digging');
 assert.deepEqual(LODGE_APPROACH,{x:-2.2,z:6});assert.equal(groundHeight(LODGE.x,LODGE.z,s),groundHeight(LODGE.x,LODGE.z),'entrance work leaves chamber bank unchanged');
});
