import {initialChannelDemo, creekAct, routeTo, waterState, terrainHeight, key, SOURCES} from './creek-rules.mjs';

export const PATCHES = {
  willow: {name:'Lodge shrubs', capacity:6, retention:.15, light:.8, flow:'sheltered'},
  brush: {name:'Young shore shrubs', capacity:8, retention:.1, light:1, flow:'sheltered'},
  trees: {name:'Upstream shrubs', capacity:10, retention:.25, light:.9, flow:'sheltered'}
};
const round = n => Math.round(n * 100) / 100;
export function environment(creek, id) {
  const cell = SOURCES[id].cell;
  const water = waterState(creek);
  let distance = Infinity;
  for (const position of water.wet.keys()) {
    const [x,z] = position.split(',').map(Number);
    distance = Math.min(distance, Math.abs(x-cell[0])+Math.abs(z-cell[1]));
  }
  const depth = Math.max(0,(water.wet.get(key(...cell)) || 0)-terrainHeight(creek,...cell));
  const moisture = Math.min(1,Math.max(0, .95-distance*.14+PATCHES[id].retention-(creek.season==='dry'?.2:0)));
  return {depth:round(depth),moisture:round(moisture),light:PATCHES[id].light,flow:PATCHES[id].flow};
}
export function recovery(creek, id, patch, env = environment(creek,id)) {
  const capacity = Math.min(PATCHES[id].capacity,2+patch.age*2);
  const potential = Math.floor(4*env.moisture*env.light*(patch.roots/5));
  const growth = env.depth>.45 ? 0 : Math.max(0,Math.min(capacity-patch.biomass,potential));
  let reason = 'Established roots support new branches.';
  if (env.depth>.45) reason = 'Prolonged deep water prevents branch recovery.';
  else if (patch.roots<=2) reason = 'Repeated cutting has left little root reserve.';
  else if (env.moisture<.55) reason = 'Dry ground slows recovery.';
  else if (patch.age<3) reason = 'Young shrubs are still establishing.';
  return {growth,capacity,env,reason};
}
function observe(s,id) {
  s.observations[id] = {patch:structuredClone(s.patches[id]),env:environment(s.creek,id),season:s.season};
}
export function freshPatches() {
  const creek = initialChannelDemo();
  creek.deepEntrance = true;
  creek.stock.cache.food = 4;
  const s = {version:1,season:1,daylight:10,creek,patches:{
    willow:{age:4,biomass:2,roots:1,cut:false},
    brush:{age:1,biomass:2,roots:4,cut:false},
    trees:{age:4,biomass:6,roots:5,cut:false}
  },observations:{},status:'playing',consumed:0,harvested:0,message:'The lodge has four branches for this season. Choose what to gather for the seasons ahead.'};
  for (const id of Object.keys(PATCHES)) observe(s,id);
  return s;
}
export function patchView(s,id) {
  const observation = s.observations[id];
  return {...observation,live:id==='willow',stale:observation.season!==s.season};
}
export function patchRoute(s,id) { return routeTo(s.creek,id,'cache'); }
export function patchAct(state,action) {
  const bad = message => ({ok:false,state,message});
  if (state.status!=='playing') return bad('This season trial has ended. Undo or start a new run.');
  const s = structuredClone(state);
  const id = action.id;
  let route = null;
  let carried = null;
  if (action.type==='visit' || action.type==='harvest') {
    if (!PATCHES[id]) return bad('Choose a known shrub patch.');
    route = patchRoute(s,id);
    if (!route) return bad('No usable route to this patch.');
    const quantity = action.type==='harvest'?Math.min(2,s.patches[id].biomass):0;
    const cost = action.type==='harvest'?round(SOURCES[id].cut+route.work):Math.max(1,round(route.work));
    if (s.daylight<cost) return bad('There is too little daylight for this trip.');
    s.daylight = round(s.daylight-cost);
    if (action.type==='harvest' && quantity) {
      // Existing gather/delivery rules own inventory transfer and route accounting.
      s.creek.sources[id] = s.patches[id].biomass;
      const gathered = creekAct(s.creek,{type:'gather',id,food:true});
      if (!gathered.ok) return bad(gathered.message);
      carried = gathered.state;
      const delivered = creekAct(carried,{type:'deliver',job:'cache'});
      if (!delivered.ok) return bad(delivered.message);
      s.creek = delivered.state;
      s.patches[id].biomass -= quantity;
      s.patches[id].roots = Math.max(1,s.patches[id].roots-1);
      s.patches[id].cut = true;
      s.harvested += quantity;
    }
    observe(s,id);
    s.message = action.type==='visit'?'Visited '+PATCHES[id].name+'. Its information is current as of this visit.':quantity?'Brought '+quantity+' branches home from '+PATCHES[id].name+'.':'The remembered supply is gone. Your beaver returned without a load; the patch record is refreshed.';
  } else if (action.type==='advance') {
    if (s.creek.stock.cache.food<4) {
      s.status='shortage';
      s.message='The lodge needs four branches. The reserve fell short. Undo to try another harvesting plan.';
    } else {
      s.creek.stock.cache.food -= 4;
      s.consumed += 4;
      for (const [patchId,patch] of Object.entries(s.patches)) {
        const result = recovery(s.creek,patchId,patch);
        patch.biomass += result.growth;
        if (!patch.cut) patch.roots = Math.min(5,patch.roots+1);
        patch.age++;
        patch.cut=false;
      }
      if (s.season===3) {
        s.status=s.creek.stock.cache.food>=4?'success':'reserve';
        s.message=s.status==='success'?'Three seasons fed, with four branches ready for the next. Your harvesting plan sustained the lodge.':'Three seasons fed, but fewer than four branches remain. Undo to build a stronger reserve.';
      } else {
        s.season++;
        s.daylight=10;
        s.creek.season=s.season===2?'dry':'preparation';
        s.message=s.season===2?'Water has fallen. The upstream and shore records still describe your last visits.':'Normal water returns. Check remembered patches before relying on their stock.';
      }
      observe(s,'willow');
      s.creek.lastRoute=null;
    }
  } else return bad('Unknown patch action.');
  return {ok:true,state:s,message:s.message,route,carried};
}
export function savePatches(s) { return JSON.stringify(s); }
export function loadPatches(text) {
  try {
    const s=JSON.parse(text);
    // Compare complete structure to the versioned template, then validate ranges.
    const sameShape=(value,example)=> {
      if (example===null) return value===null || typeof value==='object';
      if (typeof value!==typeof example || value===null) return false;
      if (typeof example!=='object') return typeof value!=='number'||Number.isFinite(value);
      return Object.keys(example).every(k=>sameShape(value[k],example[k]));
    };
    if (!sameShape(s,freshPatches()) || s.version!==1 || !Number.isInteger(s.season) || s.season<1 || s.season>3) return null;
    if (!['playing','success','shortage','reserve'].includes(s.status)||s.daylight<0||s.daylight>10||s.creek.stock.cache.food<0) return null;
    for (const id of Object.keys(PATCHES)) {
      for (const patch of [s.patches[id],s.observations[id].patch]) {
        if (!Number.isInteger(patch.biomass)||patch.biomass<0||patch.biomass>PATCHES[id].capacity||patch.roots<1||patch.roots>5||patch.age<1) return null;
      }
      if (s.observations[id].season<1||s.observations[id].season>s.season) return null;
    }
    return s;
  } catch { return null; }
}
