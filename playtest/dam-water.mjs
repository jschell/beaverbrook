// Stable-terrain, grid-edge barriers and minimax drainage. No erosion or fluid dynamics.
export const CRESTS=[null,.4,.68,1.05];
export function edgeKey(a,b){return a<b?a+':'+b:b+':'+a;}
const cross=(a,b,c)=>(b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x);
function intersects(a,b,c,d){
 const ab1=cross(a,b,c),ab2=cross(a,b,d),cd1=cross(c,d,a),cd2=cross(c,d,b),e=1e-8;
 if(Math.max(a.x,b.x)+e<Math.min(c.x,d.x)||Math.max(c.x,d.x)+e<Math.min(a.x,b.x)||Math.max(a.z,b.z)+e<Math.min(c.z,d.z)||Math.max(c.z,d.z)+e<Math.min(a.z,b.z))return false;
 return ab1*ab2<=e&&cd1*cd2<=e;
}
export function barrierEdges(size,min,sections){
 const edges=new Map(),id=(x,z)=>(z-min)*size+x-min;
 for(const section of sections){
  if(!section.level)continue;const crest=CRESTS[section.level];
  for(let z=Math.max(min,Math.floor(Math.min(section.a.z,section.b.z))-1);z<=Math.min(min+size-1,Math.ceil(Math.max(section.a.z,section.b.z)));z++){
   for(let x=Math.max(min,Math.floor(Math.min(section.a.x,section.b.x))-1);x<=Math.min(min+size-1,Math.ceil(Math.max(section.a.x,section.b.x)));x++){
    for(const [dx,dz] of [[1,0],[0,1]]){if(x+dx>=min+size||z+dz>=min+size)continue;
     if(intersects(section.a,section.b,{x:x+.5,z:z+.5},{x:x+.5+dx,z:z+.5+dz})){
      const key=edgeKey(id(x,z),id(x+dx,z+dz));edges.set(key,Math.max(edges.get(key)??-Infinity,crest));
     }
    }
   }
  }
 }
 return edges;
}
class Heap{
 constructor(){this.items=[];}
 push(item){const a=this.items;a.push(item);let i=a.length-1;while(i){const p=(i-1)>>1;if(a[p][0]<=item[0])break;a[i]=a[p];i=p;}a[i]=item;}
 pop(){const a=this.items,first=a[0],last=a.pop();if(a.length){let i=0;while(i*2+1<a.length){let c=i*2+1;if(c+1<a.length&&a[c+1][0]<a[c][0])c++;if(a[c][0]>=last[0])break;a[i]=a[c];i=c;}a[i]=last;}return first;}
}
export function solveBarrierWater({size=48,min=-24,height,baseHeight=height,sections=[],dry=false}){
 const count=size*size,beds=Float64Array.from({length:count},(_,i)=>height(i%size+min+.5,Math.floor(i/size)+min+.5));
 const escape=new Float64Array(count).fill(Infinity),edges=barrierEdges(size,min,sections),heap=new Heap();
 const add=(i,h)=>{if(h<escape[i]){escape[i]=h;heap.push([h,i]);}};
 // Downstream and lateral map boundaries drain. The upstream edge is the inlet.
 for(let z=0;z<size;z++)for(let x=0;x<size;x++)if(x===0||x===size-1||z===size-1)add(z*size+x,beds[z*size+x]);
 const neighbors=i=>{const x=i%size,z=Math.floor(i/size),out=[];if(x)out.push(i-1);if(x<size-1)out.push(i+1);if(z)out.push(i-size);if(z<size-1)out.push(i+size);return out;};
 while(heap.items.length){const [h,i]=heap.pop();if(h!==escape[i])continue;for(const j of neighbors(i))add(j,Math.max(h,beds[j],edges.get(edgeKey(i,j))??-Infinity));}
 const levels=Float64Array.from(escape,(h,i)=>Math.max((Math.floor(i/size)+min>=10?0:.12)-(dry&&Math.floor(i/size)+min<10?.25:0),h-(dry?.25:0)));
 const wet=new Map(),queue=[],seen=new Set();
 for(let i=0;i<count;i++){const x=i%size+min+.5,z=Math.floor(i/size)+min+.5,baseline=(z>=10?0:.12)-(dry&&z<10?.25:0);if(baseHeight(x,z)<baseline)queue.push(i);}
 for(let q=0;q<queue.length;q++){
  const i=queue[q];if(seen.has(i))continue;seen.add(i);if(beds[i]>=levels[i]-1e-7)continue;
  const x=i%size+min,z=Math.floor(i/size)+min;wet.set(x+','+z,levels[i]);
  for(const j of neighbors(i))if((edges.get(edgeKey(i,j))??-Infinity)<=Math.max(levels[i],levels[j])+1e-7)queue.push(j);
 }
 return {wet,escape,edges,levels,size,min};
}
export function validPlacedDam(dam){
 if(dam===null)return true;
 if(!dam||!Array.isArray(dam.sections)||dam.sections.length<1||dam.sections.length>16)return false;
 const point=p=>p&&[p.x,p.z].every(n=>Number.isFinite(n)&&Math.abs(n)<=20);
 let length=0;
 for(let i=0;i<dam.sections.length;i++){
  const s=dam.sections[i];if(!point(s.a)||!point(s.b)||!Number.isInteger(s.level)||s.level<0||s.level>3||!Number.isInteger(s.target)||s.target<1||s.target>3||!Number.isInteger(s.wood)||s.wood<0||s.wood>1e6)return false;
  const span=Math.hypot(s.b.x-s.a.x,s.b.z-s.a.z);if(span<.1||span>2.01)return false;length+=span;
  if(i&&Math.hypot(s.a.x-dam.sections[i-1].b.x,s.a.z-dam.sections[i-1].b.z)>1e-6)return false;
 }
 return length<=18.01;
}
