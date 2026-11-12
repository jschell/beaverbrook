import {groundHeight,creekWater,LODGE_APPROACH} from './explore-rules.mjs';
import {CRESTS} from './dam-water.mjs';

// Sample only known cells; split each half-unit square into triangles so saddle
// cases have a deterministic contour without leaking unexplored topography.
export function traceContours(known,height,levels){
 const segments=[];
 for(const key of Object.keys(known)){
  if(!known[key])continue;const [x,z]=key.split(',').map(Number);
  for(const dx of [0,.5])for(const dz of [0,.5]){
   const points=[[x+dx,z+dz],[x+dx+.5,z+dz],[x+dx+.5,z+dz+.5],[x+dx,z+dz+.5]].map(([x,z])=>({x,z,h:height(x,z)}));
   for(const ids of [[0,1,2],[0,2,3]])for(const level of levels){
    const hits=[];
    for(let i=0;i<3;i++){const a=points[ids[i]],b=points[ids[(i+1)%3]];if((a.h<level)===(b.h<level))continue;const t=(level-a.h)/(b.h-a.h);const p={x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t};if(!hits.some(q=>Math.hypot(p.x-q.x,p.z-q.z)<1e-8))hits.push(p);}
    if(hits.length===2&&Math.hypot(hits[0].x-hits[1].x,hits[0].z-hits[1].z)>1e-8)segments.push({height:level,a:hits[0],b:hits[1]});
   }
  }
 }
 return segments;
}
export function traceShoreline(known,wet){
 const segments=[];
 for(const key of Object.keys(known)){
  if(!known[key]||!wet.has(key))continue;const [x,z]=key.split(',').map(Number),level=wet.get(key);
  for(const [dx,dz,a,b]of [[-1,0,{x,z},{x,z:z+1}],[1,0,{x:x+1,z},{x:x+1,z:z+1}],[0,-1,{x,z},{x:x+1,z}],[0,1,{x,z:z+1},{x:x+1,z:z+1}]]){
   const next=(x+dx)+','+(z+dz);if(!known[next])continue;
   if(!wet.has(next)||wet.get(next)<level-.001)segments.push({a,b});
  }
 }
 return segments;
}
export function buildSurvey(state,targetState=null){
 const known=state.explored,actual=creekWater(state),target=targetState?creekWater(targetState):null;
 const contours=traceContours(known,(x,z)=>groundHeight(x,z,state),Array.from({length:15},(_,i)=>(i-2)*.5));
 const actualShore=traceShoreline(known,actual.wet),targetShore=target?traceShoreline(known,target.wet):[];
 const key=s=>{const v=creekWater(s).wet.get(Math.floor(LODGE_APPROACH.x)+','+Math.floor(LODGE_APPROACH.z));return v===undefined?'dry':v.toFixed(2);};
 const crest=state.dam?CRESTS[state.dam].toFixed(2):'leaky/open';
 return{contours,actualShore,targetShore,summary:`Contours: 0.50 height steps on explored ground. Solid shoreline: current water. Dashed shoreline: completed-target prediction${target?'':' unavailable until a valid span is selected'}. Family dam crest: ${crest}. Water at lodge approach: ${key(state)}${target?' → '+key(targetState)+' at completed target':''}. Heights are game units; no work or supplies are spent by surveying.`};
}
