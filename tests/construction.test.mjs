import test from 'node:test';
import assert from 'node:assert/strict';
import {MUD_BANKS,sectionCost,sectionStep,enableConstruction,remainingConstruction,prepareSection} from '../playtest/construction-rules.mjs';
import {freshHabitat,freshDamLab,habitatAction,habitatOptions,loadHabitat,habitatMove,primaryHabitatAction,DAM,PATCHES} from '../playtest/habitat-rules.mjs';
import {makeDamPlan,commitDam,previewDam,damCenter,extendDam} from '../playtest/dam-placement.mjs';
import {creekWater,groundHeight,LODGE} from '../playtest/explore-rules.mjs';
import {damWorkSites} from '../playtest/dam-work.mjs';
const at=(s,p)=>({...s,x:p.x,z:p===LODGE?4.4:p.z});
const act=(s,id)=>{const r=habitatAction(s,id);assert.notEqual(r.state,s,id+': '+r.message);assert.ok(loadHabitat(JSON.stringify(r.state)),id+' conserves materials and saves');return r.state;};
const place=(s,target=1)=>commitDam(s,makeDamPlan(s,{x:-6,z:-3},{x:6,z:-3},target).dam).state;
function haul(s,kind,index){const point=s.loose.find(p=>kind==='mud'?p.mud>0:p.wood>0);assert.ok(point,'finite lab supplies available');s=act(at(s,point),kind==='mud'?'pickupMud':'pickup');s=at(s,damCenter(s.placedDam.sections[index]));assert.equal(primaryHabitatAction(s).id,'customDeposit');return act(s,'customDeposit');}
function finish(s,index,target=s.placedDam.sections[index].target){
 if(sectionStep(s.placedDam.sections[index]).natural)return s;
 while(s.placedDam.sections[index].level<target){let p=s.placedDam.sections[index],step=sectionStep(p);while(!step.packing&&p.wood<step.wood){s=haul(s,'wood',index);p=s.placedDam.sections[index];}
  if(s.effort>=12){s=act(at(s,LODGE),'rest');s=at(s,damCenter(p));}
  if(!step.packing)s=act(at(s,damCenter(p)),'customBuild');p=s.placedDam.sections[index];step=sectionStep(p);while(p.mud<step.mud){s=haul(s,'mud',index);p=s.placedDam.sections[index];}
  if(s.effort>=12)s=act(at(s,LODGE),'rest');s=act(at(s,damCenter(p)),'customPack');
 }return s;
}
test('survey costs increase with bed depth, length and height; cumulative stages prevent rounding discounts',()=>{
 const s=freshHabitat({construction:true}),shallow={a:{x:-4,z:-3},b:{x:-2,z:-3}},deep={a:{x:-1,z:-3},b:{x:1,z:-3}},short={a:{x:-.5,z:-3},b:{x:.5,z:-3}};
 assert.ok(sectionCost(deep,s,1).wood>sectionCost(shallow,s,1).wood);assert.ok(sectionCost(deep,s,3).wood>sectionCost(deep,s,1).wood);assert.ok(sectionCost(deep,s,3).wood>=sectionCost(short,s,3).wood);
 const p=prepareSection({...deep,level:0,target:3,wood:0},s);let wood=0,mud=0;for(let level=0;level<3;level++){p.level=p.frame=level;const step=sectionStep(p);wood+=step.wood;mud+=step.mud;}assert.deepEqual({wood,mud},p.costs[3]);
});
test('legacy upgrade preserves paid structures, carried food, resources and targets without recharging old work',()=>{
 let s=place(freshDamLab());s=act(s,'pickup');s=act(at(s,damCenter(s.placedDam.sections[0])),'customDeposit');s=act(s,'customBuild');
 const old=JSON.stringify(s),next=enableConstruction(loadHabitat(old));assert.equal(JSON.stringify(s),old);assert.equal(next.placedDam.sections[0].level,1);assert.equal(next.placedDam.sections[0].frame,1);assert.equal(next.placedDam.sections[0].wood,1);assert.equal(next.ledger.woodUsed,s.ledger.woodUsed);assert.equal(next.food,s.food);assert.equal(next.mud,0);assert.equal(next.ledger.mudGathered,0);assert.ok(loadHabitat(JSON.stringify(next)));assert.equal(enableConstruction(next),next);
});
test('mud is finite, recoverable, locally delivered and never edible or structural wood',()=>{
 let s=freshHabitat({construction:true});s=act(at(s,MUD_BANKS[0]),'gatherMud');assert.equal(s.cargo.mud,2);assert.equal(s.mudBanks.near,18);assert.equal(s.ledger.woodHarvested,0);assert.equal(s.ledger.foodHarvested,0);
 s=act(s,'drop');s=act(s,'pickupMud');s=act(at(s,LODGE),'store');assert.equal(s.mud,2);assert.equal(s.food,6);s=act(s,'takeMud');s=act(at(s,DAM),'deposit');assert.equal(s.damMud,2);s=act(s,'takeDamMud');assert.equal(s.cargo.mud,2);assert.equal(s.damMud,0);
 const bad=structuredClone(s);bad.cargo.mud++;assert.equal(loadHabitat(JSON.stringify(bad)),null);
 const empty={...s,cargo:null,mudBanks:{near:0,far:32}};assert.equal(habitatOptions(at(empty,MUD_BANKS[0])).find(x=>x.id==='gatherMud').enabled,false);
});
test('framework alone never increases retention; packing, notching, local recovery and preview agree',()=>{
 let s=place(freshDamLab({construction:true})),initial=[...creekWater(s).wet],quote=previewDam(s,s.placedDam),woodUsed=0,mudUsed=s.ledger.mudUsed;
 assert.ok(quote.mudNeeded>0);const before=JSON.stringify(s);previewDam(s,s.placedDam);assert.equal(JSON.stringify(s),before);
 const i=2;let p=s.placedDam.sections[i],step=sectionStep(p);while(p.wood<step.wood){s=haul(s,'wood',i);p=s.placedDam.sections[i];}s=act(at(s,damCenter(p)),'customBuild');assert.equal(s.placedDam.sections[i].level,0);assert.equal(s.placedDam.sections[i].frame,1);assert.deepEqual([...creekWater(s).wet],initial);
 for(let j=0;j<s.placedDam.sections.length;j++)s=finish(s,j);
 assert.deepEqual([...creekWater(s).wet],[...creekWater(quote.state).wet]);assert.ok(creekWater(s).wet.get('0,-8')>.3);assert.equal(previewDam(s,s.placedDam).woodNeeded,0);assert.equal(previewDam(s,s.placedDam).mudNeeded,0);assert.equal(previewDam(s,s.placedDam).workNeeded,0);
 const paid=structuredClone(s.ledger),bed=groundHeight(0,-3,s);if(s.effort===12)s=act(at(s,LODGE),'rest');s=act(at(s,damCenter(s.placedDam.sections[2])),'customLower');assert.equal(s.ledger.woodUsed,paid.woodUsed);assert.equal(s.ledger.mudUsed,paid.mudUsed);assert.equal(creekWater(s).wet.get('0,-8'),.12);assert.equal(groundHeight(0,-3,s),bed);
});
test('raising targets, extending, cancelling an unpacked frame and save validation preserve accounting',()=>{
 let s=place(freshDamLab({construction:true}),2);s=haul(s,'wood',0);s=act(s,'customBuild');assert.ok(s.placedDam.sections[0].frame>s.placedDam.sections[0].level);s.placedDam.sections[0].target=1;
 s=act(s,'customLower');assert.equal(s.placedDam.sections[0].frame,0);assert.ok(loadHabitat(JSON.stringify(s)));const wood=s.ledger.woodUsed;s=extendDam(s,'a').state;assert.ok(s.placedDam.sections[0].costs);assert.equal(s.ledger.woodUsed,wood);assert.ok(loadHabitat(JSON.stringify(s)));
 const bad=structuredClone(s);bad.placedDam.sections[0].frame=3;assert.equal(loadHabitat(JSON.stringify(bad)),null);const neg=structuredClone(s);neg.placedDam.sections[0].costs[2].mud=-1;assert.equal(loadHabitat(JSON.stringify(neg)),null);
});
test('inherited dam repair needs framework then packing; food and entrance remain another route',()=>{
 let s=freshDamLab({construction:true});s=act(s,'pickup');s=act(at(s,DAM),'deposit');s=act(s,'build');assert.equal(s.dam,0);assert.equal(s.familyFrame,1);assert.equal(damWorkSites(s).find(p=>p.id==='family').kind,'mud');
 s=act(at(s,{x:-5,z:-3}),'pickupMud');s=act(at(s,DAM),'deposit');assert.equal(primaryHabitatAction(s).id,'pack');s=act(s,'pack');assert.equal(s.dam,1);assert.equal(s.ledger.mudUsed,1);
 let other=freshHabitat({construction:true});other=act(at(other,LODGE),'entrance');for(let i=0;i<2;i++){other=act(at(other,PATCHES[0]),'browse');other=act(at(other,LODGE),'store');}for(let i=0;i<4;i++)other=act(at(other,LODGE),'rest');assert.equal(other.journey.completedDay,5);assert.equal(other.ledger.woodUsed,0);assert.equal(other.ledger.mudGathered,0);
});
test('mud collection remains possible when a construction section overlaps the mud bank',()=>{
 let s=freshDamLab({construction:true});s=commitDam(s,makeDamPlan(s,{x:-6,z:3},{x:6,z:3},1).dam).state;s=at(s,MUD_BANKS[0]);assert.ok(habitatOptions(s).some(x=>x.id==='gatherMud'&&x.enabled));s=act(s,'gatherMud');assert.equal(s.cargo.mud,2);
});

test('an actual movement haul builds and packs a deep section from separate local supplies',()=>{
 function travel(s,p){for(let i=0;i<1600&&Math.hypot(s.x-p.x,s.z-p.z)>.12;i++)s=habitatMove(s,{x:p.x-s.x,z:p.z-s.z},.05);assert.ok(Math.hypot(s.x-p.x,s.z-p.z)<=.12,'supply and work locations are reachable');return s;}
 let s=place(freshDamLab({construction:true}));const index=2,point=damCenter(s.placedDam.sections[index]),needed=sectionStep(s.placedDam.sections[index]).wood;
 while(s.placedDam.sections[index].wood<needed){const pile=s.loose.find(p=>p.wood);s=travel(s,pile);s=act(s,'pickup');s=travel(s,point);s=act(s,'customDeposit');}s=act(s,'customBuild');assert.equal(s.placedDam.sections[index].level,0);
 const mud=s.loose.find(p=>p.mud);s=travel(s,mud);s=act(s,'pickupMud');s=travel(s,point);s=act(s,'customDeposit');assert.equal(primaryHabitatAction(s).id,'customPack');s=act(s,'customPack');assert.equal(s.placedDam.sections[index].level,1);assert.ok(s.distance>10);assert.equal(s.ledger.woodUsed,needed);
});

test('high natural banks need no invisible construction chores, while a higher target can require work',()=>{
 let s=place(freshDamLab({construction:true}));const index=s.placedDam.sections.findIndex(p=>sectionStep(p).natural);assert.ok(index>=0);const p=s.placedDam.sections[index];assert.deepEqual(remainingConstruction(p),{wood:0,mud:0,work:0});s=at(s,damCenter(p));assert.equal(habitatOptions(s).find(a=>a.id==='customBuild').enabled,false);assert.equal(damWorkSites(s).find(p=>p.index===index).needsWork,false);
 s.placedDam.sections[index].target=3;assert.equal(sectionStep(s.placedDam.sections[index]).natural,false);assert.ok(remainingConstruction(s.placedDam.sections[index]).wood>0);
});
test('successive raises charge the same cumulative budget quoted for a high crest',()=>{
 let s=place(freshDamLab({construction:true}),3);const expected=s.placedDam.sections[2].costs[3];s=finish(s,2,3);assert.equal(s.placedDam.sections[2].level,3);assert.equal(s.ledger.woodUsed,expected.wood);assert.equal(s.ledger.mudUsed,expected.mud);assert.equal(remainingConstruction(s.placedDam.sections[2]).wood,0);assert.equal(remainingConstruction(s.placedDam.sections[2]).mud,0);
});
