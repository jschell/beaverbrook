// Fictional bulk/packing units. No erosion, fluid dynamics or material strength.
import {groundHeight} from './explore-rules.mjs';
import {CRESTS} from './dam-water.mjs';
export const MUD_BANKS=[
 {id:'near',name:'Lodge mud bank',x:-4,z:3,stock:20},
 {id:'far',name:'Upstream mud bank',x:4,z:-7,stock:32}
];
export function sectionCost(p,s,level){
 if(!level)return {wood:0,mud:0};
 const length=Math.hypot(p.b.x-p.a.x,p.b.z-p.a.z);let bulk=0,area=0;
 for(let i=0;i<8;i++){const t=(i+.5)/8,h=Math.max(0,CRESTS[level]-groundHeight(p.a.x+(p.b.x-p.a.x)*t,p.a.z+(p.b.z-p.a.z)*t,s));bulk+=length/8*h*(.5+.4*h);area+=length/8*h;}
 return {wood:Math.max(0,Math.ceil(bulk-1e-9)),mud:Math.max(0,Math.ceil(area/2-1e-9))};
}
export function prepareSection(p,s){return {...p,frame:p.frame??p.level,mud:p.mud??0,costs:p.costs??[0,1,2,3].map(level=>sectionCost(p,s,level))};}
export function enableConstruction(state){
 if(state.construction===1)return state;
 const s=structuredClone(state);s.construction=1;s.mud=0;s.damMud=0;s.familyFrame=s.dam;s.mudBanks=Object.fromEntries(MUD_BANKS.map(p=>[p.id,p.stock]));s.ledger.mudGathered=0;s.ledger.mudUsed=0;for(const p of MUD_BANKS)if(Math.hypot(s.x-p.x,s.z-p.z)<5.5)s.known[p.id]=true;
 if(s.placedDam)s.placedDam.sections=s.placedDam.sections.map(p=>prepareSection({...p,frame:p.level,mud:0,costs:undefined},s));return s;
}
export function sectionStep(p){
 const next=Math.min(3,p.level+1),cost=p.costs[next],old=p.costs[p.level];
 return {natural:p.costs[p.target].wood===0&&p.costs[p.target].mud===0,packing:p.frame>p.level,wood:p.frame>p.level?0:cost.wood-old.wood,mud:cost.mud-old.mud,next,needsWork:(p.costs[p.target].wood>0||p.costs[p.target].mud>0)&&(p.level<p.target||p.frame>p.target)};
}
export function remainingConstruction(p){
 if(p.costs[p.target].wood===0&&p.costs[p.target].mud===0)return {wood:0,mud:0,work:0};
 const target=p.costs[p.target],built=p.costs[p.level],frame=p.costs[p.frame];
 return {wood:Math.max(0,target.wood-frame.wood-p.wood),mud:Math.max(0,target.mud-built.mud-p.mud),work:Math.max(0,p.target-p.frame)+Math.max(0,p.target-p.level)+Math.max(0,p.frame-p.target)};
}
export function validMaterialSection(p){
 const int=n=>Number.isInteger(n)&&n>=0&&n<=10000;
 return int(p.frame)&&p.frame>=p.level&&p.frame<=Math.min(3,p.level+1)&&int(p.mud)&&Array.isArray(p.costs)&&p.costs.length===4&&p.costs.every((c,i)=>c&&int(c.wood)&&int(c.mud)&&(i?c.wood>=p.costs[i-1].wood&&c.mud>=p.costs[i-1].mud:c.wood===0&&c.mud===0));
}
