import {groundHeight,creekWater} from './explore-rules.mjs';
import {CRESTS,validPlacedDam} from './dam-water.mjs';
export {CRESTS};
export function makeDamPlan(state,a,b,target=1){
 const point=p=>p&&[p.x,p.z].every(n=>Number.isInteger(n)&&Math.abs(n)<=18);
 if(!point(a)||!point(b)||!Number.isInteger(target)||target<1||target>3)return {error:'Choose grid points within the surveyed area.'};
 const length=Math.hypot(b.x-a.x,b.z-a.z);
 if(length<3||length>16)return {error:'Choose a span between 3 and 16 units long.'};
 if(groundHeight(a.x,a.z,state)<.25||groundHeight(b.x,b.z,state)<.25)return {error:'Both endpoints need firm banks, above 0.25.'};
 if(Math.min(a.z,b.z)<-18||Math.max(a.z,b.z)>16||Math.min(a.z,b.z)<12&&Math.max(a.z,b.z)>8)return {error:'Leave space around the family dam at z=10.'};
 if(!state.lab&&[a,b].some(p=>!state.explored[Math.floor(p.x)+','+Math.floor(p.z)]))return {error:'Explore both banks before placing a dam there.'};
 let crosses=false;for(let i=0;i<=40;i++)if(groundHeight(a.x+(b.x-a.x)*i/40,a.z+(b.z-a.z)*i/40,state)<0)crosses=true;
 if(!crosses)return {error:'The span must cross the stream or an excavated water route.'};
 const n=Math.ceil(length/2),sections=Array.from({length:n},(_,i)=>({a:{x:a.x+(b.x-a.x)*i/n,z:a.z+(b.z-a.z)*i/n},b:{x:a.x+(b.x-a.x)*(i+1)/n,z:a.z+(b.z-a.z)*(i+1)/n},level:0,target,wood:0}));
 return {dam:{sections},length,cost:n*target};
}
export function damCenter(section){return {x:(section.a.x+section.b.x)/2,z:(section.a.z+section.b.z)/2};}
export function nearestDamSection(s){
 let nearest=null;for(const [index,section]of(s.placedDam?.sections||[]).entries()){
  const point=damCenter(section),distance=Math.hypot(s.x-point.x,s.z-point.z);if(distance<2.3&&(!nearest||distance<nearest.distance))nearest={index,section,point,distance};
 }return nearest;
}
export function previewDam(s,dam){
 const preview=structuredClone(s);preview.flexible=true;preview.placedDam=structuredClone(dam);for(const section of preview.placedDam.sections)section.level=section.target;
 const actual=creekWater(s),future=creekWater(preview);let newlyWet=0,deeper=0,shallower=0;
 for(const [key,level]of future.wet){const old=actual.wet.get(key);if(old===undefined)newlyWet++;else if(level>old+.02)deeper++;}
 for(const [key,level]of actual.wet)if(!future.wet.has(key)||future.wet.get(key)<level-.02)shallower++;
 const first=dam.sections[0],last=dam.sections.at(-1),center={x:(first.a.x+last.b.x)/2,z:(first.a.z+last.b.z)/2};
 let probe=center,minBed=Infinity;for(let i=0;i<=80;i++){const p={x:first.a.x+(last.b.x-first.a.x)*i/80,z:first.a.z+(last.b.z-first.a.z)*i/80},bed=groundHeight(p.x,p.z,s);if(bed<minBed){minBed=bed;probe=p;}}
 const upstream=future.wet.get(Math.floor(probe.x)+','+Math.floor(probe.z-1));
 const desired=Math.min(...dam.sections.map(p=>CRESTS[p.target]));
 return {state:preview,newlyWet,deeper,shallower,upstream,limited:upstream!==undefined&&upstream<desired-(s.day%6>=4||s.day%6===0?.25:0)-.03,woodNeeded:dam.sections.reduce((n,p)=>n+Math.max(0,p.target-p.level-p.wood),0),workNeeded:dam.sections.reduce((n,p)=>n+Math.abs(p.target-p.level),0)};
}
export function commitDam(s,dam){
 if(s.placedDam||!validPlacedDam(dam)||dam.sections.some(p=>p.level||p.wood))return {state:s,error:'Only one new dam project can be active.'};
 // Revalidate public input; a preview is never authorization to create arbitrary barriers.
 const first=dam.sections[0],last=dam.sections.at(-1),plan=makeDamPlan(s,first.a,last.b,first.target);if(plan.error)return {state:s,error:plan.error};
 const next=structuredClone(s);next.flexible=true;next.placedDam=plan.dam;return {state:next};
}
export function extendDam(s,end){
 if(!s.placedDam||!['a','b'].includes(end))return {state:s,error:'Place a dam first.'};
 const next=structuredClone(s),parts=next.placedDam.sections,first=parts[0],last=parts.at(-1),dx=last.b.x-first.a.x,dz=last.b.z-first.a.z,d=Math.hypot(dx,dz),anchor=end==='a'?first.a:last.b;
 const point={x:anchor.x+(end==='a'?-1:1)*dx/d*2,z:anchor.z+(end==='a'?-1:1)*dz/d*2};
 if(!s.lab&&!s.explored[Math.floor(point.x)+','+Math.floor(point.z)])return {state:s,error:'Explore the extension bank first.'};
 if(Math.abs(point.x)>18||Math.abs(point.z)>18||point.z>8&&point.z<12||groundHeight(point.x,point.z,s)<.25)return {state:s,error:'Extension needs firm bank space away from the family dam.'};
 const section={a:end==='a'?point:{...anchor},b:end==='a'?{...anchor}:point,level:0,target:end==='a'?first.target:last.target,wood:0};
 if(end==='a')parts.unshift(section);else parts.push(section);
 if(!validPlacedDam(next.placedDam))return {state:s,error:'The demo supports at most 18 units of dam.'};
 return {state:next};
}
