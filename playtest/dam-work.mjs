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
export function damWorkSites(s){
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
