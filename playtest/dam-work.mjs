import {MUD_BANKS,sectionStep} from './construction-rules.mjs';
// Read-only work guidance uses the same proximity and eligibility rules as actions.
import {DAM,DAY_WORK,localPlace,habitatOptions,PATCHES} from './habitat-rules.mjs';
import {damCenter} from './dam-placement.mjs';
function sourceHint(s){
 const piles=s.loose.filter(p=>p.wood>0&&Math.hypot(s.x-p.x,s.z-p.z)<=7).sort((a,b)=>Math.hypot(s.x-a.x,s.z-a.z)-Math.hypot(s.x-b.x,s.z-b.z));
 if(piles.length)return `Timber is ${Math.ceil(Math.hypot(s.x-piles[0].x,s.z-piles[0].z))} unit${Math.ceil(Math.hypot(s.x-piles[0].x,s.z-piles[0].z))===1?'':'s'} away. Approach the pile and press E to pick it up.`;
 if(s.wood>0)return 'Take stored wood from the family lodge, then carry it here.';
 const patch=PATCHES.filter(p=>s.known[p.id]&&(Math.hypot(s.x-p.x,s.z-p.z)>7||s.patches[p.id].stock>0)).sort((a,b)=>Math.hypot(s.x-a.x,s.z-a.z)-Math.hypot(s.x-b.x,s.z-b.z))[0];
 return patch?`Prune ${patch.name} for wood, or pick up loose timber. Carry the load to this marker.`:'Prune a light-leaved stand for wood, or pick up loose timber. Carry the load to this marker.';
}
function legacyDamWorkSites(s){
 const local=localPlace(s),options=habitatOptions(s),facts=[{...DAM,id:'family',name:'Family dam',required:s.dam===0?2:s.dam===1?3:0,delivered:s.damWood,needsWork:s.dam<2,deposit:'deposit',build:'build',effort:2,local:local?.type==='dam'}];
 for(const [index,part]of(s.placedDam?.sections||[]).entries())facts.push({id:'section:'+index,name:'Section '+(index+1),index,...damCenter(part),required:part.level<part.target?1:0,delivered:part.wood,needsWork:part.level<part.target,deposit:'customDeposit',build:'customBuild',effort:1,local:local?.type==='customDam'&&local.index===index});
 return facts.map(site=>{
  const distance=Math.hypot(s.x-site.x,s.z-site.z),missing=Math.max(0,site.required-site.delivered),materials=site.needsWork?`${site.delivered}/${site.required} wood delivered here`:`${site.delivered} unspent wood here`;
  let prompt,detail,action=null,phase;
  if(!site.needsWork){phase='complete';prompt='At target height';detail=site.id==='family'?'The family dam is fully raised for this test. You can work on your new dam or explicitly open a notch.':'This work is complete. Choose another section, or use Plan dam to change its target.';}
  else if(site.local&&s.cargo?.wood>0){phase='deliver';prompt='Deliver wood · E';detail=`${materials}. Press E to leave your wood here, then ${s.effort+site.effort>DAY_WORK?'rest at the lodge before building.':'press E again to build.'}`;action=site.deposit;}
  else if(!missing&&s.effort+site.effort>DAY_WORK){phase='rest';prompt='Rest before building';detail=`${materials}. Rest at the lodge to recover effort. Delivered wood stays here.`;}
  else if(!missing){phase='build';prompt=site.local?'Build here · E':'Ready to build';detail=`${materials}. ${site.local?'Press E to build.':'Approach this marker to build.'} Construction costs ${site.effort} effort.`;if(site.local)action=site.build;}
  else if(s.cargo?.wood>0){phase='carry';prompt=`Bring ${missing} wood here`;detail=`${materials}. You are carrying ${s.cargo.wood} wood. Move to this marker; E will deliver when close.`;}
  else if(s.cargo){phase='food';prompt=`Bring ${missing} wood here`;detail=`${materials}. Your load contains food, not wood. Store it at the lodge or set it down with X, then collect wood.`;}
  else{phase='collect';prompt=`Bring ${missing} wood here`;detail=`${materials}. ${sourceHint(s)}`;if(site.local&&options.some(a=>a.id==='pickup'&&a.enabled)){prompt='Pick up timber · E';action='pickup';}}
  // Guidance never makes an action eligible or changes the world's material accounting.
  if(action&&!options.some(a=>a.id===action&&a.enabled))action=null;
  return {...site,distance,missing,materials,prompt,detail,phase,action};
 });
}
export function nextDamWork(s,kind='new'){
 const sites=damWorkSites(s).filter(p=>kind==='family'?p.id==='family':p.id!=='family');
 return sites.filter(p=>p.needsWork).sort((a,b)=>a.distance-b.distance)[0]||sites.sort((a,b)=>a.distance-b.distance)[0]||null;
}

export function damWorkSites(s){
 if(!s.construction)return legacyDamWorkSites(s);
 const local=localPlace(s),options=habitatOptions(s),familyPacking=s.familyFrame>s.dam;
 const facts=[{...DAM,id:'family',name:'Family dam',required:familyPacking?1:s.dam===0?2:3,kind:familyPacking?'mud':'wood',wood:s.damWood,mud:s.damMud,needsWork:s.dam<2,packing:familyPacking,deposit:'deposit',build:familyPacking?'pack':'build',effort:familyPacking?1:2,local:local?.type==='dam'}];
 for(const [index,p]of(s.placedDam?.sections||[]).entries()){
  const step=sectionStep(p);facts.push({id:'section:'+index,name:'Section '+(index+1),index,...damCenter(p),required:step.packing?step.mud:step.wood,kind:step.packing?'mud':'wood',wood:p.wood,mud:p.mud,needsWork:!step.natural&&(p.level<p.target||p.frame>p.target),natural:step.natural,packing:step.packing,adjust:p.frame>p.target,deposit:'customDeposit',build:step.packing?'customPack':'customBuild',effort:1,local:local?.type==='customDam'&&local.index===index});
 }
 return facts.map(site=>{
  const bank=MUD_BANKS.filter(p=>s.known[p.id]).sort((a,b)=>Math.hypot(s.x-a.x,s.z-a.z)-Math.hypot(s.x-b.x,s.z-b.z))[0];
  const delivered=site[site.kind],missing=Math.max(0,site.required-delivered),distance=Math.hypot(s.x-site.x,s.z-site.z),materials=`${site.wood} wood + ${site.mud} mud delivered here`,operation=site.packing?'Pack framework':'Build framework';let prompt,detail,phase,action=null;
  if(!site.needsWork){phase='complete';prompt=site.natural?'Natural bank':'Packed to target';detail=site.natural?'The ground already contains water to this target; no construction is needed.':materials+'. Choose another section, or change the target in Plan dam.';}
  else if(site.adjust){phase='adjust';prompt='Notch unfinished frame';detail='The frame is above the lowered target. Notch it locally before packing.';}
  else if(site.local&&(s.cargo?.wood||s.cargo?.mud)){phase='deliver';prompt='Deliver materials · E';detail=materials+`. Next: ${site.required} ${site.kind} for ${site.packing?'packing':'framework'}.`;action=site.deposit;}
  else if(!missing&&s.effort+site.effort>DAY_WORK){phase='rest';prompt='Rest before working';detail=materials+'. Your materials stay here while you rest.';}
  else if(!missing){phase='build';prompt=operation+(site.local?' · E':' ready');detail=materials+`. ${operation} costs ${site.effort} effort.`;if(site.local)action=site.build;}
  else if(s.cargo?.[site.kind]){phase='carry';prompt=`Bring ${missing} ${site.kind}`;detail=materials+'. Carry this load to the marker to deliver.';}
  else{phase='collect';prompt=`Bring ${missing} ${site.kind}`;detail=materials+'. '+(s.cargo?'Store food or set down your current load first. ':site.kind==='mud'?(s.mud>0?'Take stored mud from the lodge.':bank?`Gather at ${bank.name} (${Math.ceil(Math.hypot(s.x-bank.x,s.z-bank.z))} units away; shown on Map), or pick up brown mud loads.`:'Explore the shoreline for a mud bank, or pick up brown mud loads.'):sourceHint(s));if(site.local&&!s.cargo){const pickup=site.kind==='mud'&&options.some(a=>a.id==='pickupMud'&&a.enabled)?'pickupMud':options.some(a=>a.id==='pickup'&&a.enabled)?'pickup':null;if(pickup){prompt=pickup==='pickupMud'?'Pick up sealing mud · E':'Pick up nearby load · E';action=pickup;}}}
  if(action&&!options.some(a=>a.id===action&&a.enabled))action=null;
  return {...site,delivered,missing,distance,materials,prompt,detail,phase,action};
 });
}
