import {createCreekScene} from './creek-scene.mjs';
import {SOURCES} from './creek-rules.mjs';
import {PATCHES,freshPatches,patchView,patchRoute,recovery,patchAct,savePatches,loadPatches} from './patch-rules.mjs';

const el=id=>document.getElementById(id);
const storageKey='beaverbrook-shrub-seasons-v1';
let storageReady=true;
let state;
try { state=loadPatches(localStorage.getItem(storageKey))||freshPatches(); }
catch { state=freshPatches();storageReady=false; }
let history=[];
let selected='willow';
let busy=false;
const scene=createCreekScene(el('scene'),el('pins'),data=>select(data.project));
function select(id) { if (!busy && PATCHES[id]) { selected=id;draw(); } }
function persist() {
  try { localStorage.setItem(storageKey,savePatches(state));storageReady=true; }
  catch { storageReady=false; }
}
function draw() {
  const snapshot=structuredClone(state.creek);
  snapshot.lastRoute=null;
  const pins=[];
  for (const id of Object.keys(SOURCES)) snapshot.sources[id]=0;
  for (const [id,definition] of Object.entries(PATCHES)) {
    const observation=patchView(state,id);
    snapshot.sources[id]=observation.patch.biomass;
    pins.push({id,name:definition.name+(observation.stale?' — last seen season '+observation.season:''),symbol:observation.stale?'?':'♧',cell:SOURCES[id].cell});
  }
  scene.update(snapshot,{projects:pins,patchIds:Object.keys(PATCHES),preview:patchRoute(state,selected),familyTrail:true});
  el('day').textContent='SEASON '+state.season+' OF 3';
  el('headline').textContent=state.status==='success'?'A reserve for tomorrow':state.season===2?'A dry season':'Shrubs through the seasons';
  el('story').textContent=state.message;
  el('light').textContent=state.daylight+' daylight left';
  el('food').textContent=state.creek.stock.cache.food+' food branches stored';
  el('jobs').replaceChildren(...Object.entries(PATCHES).map(([id,p])=>{
    const button=document.createElement('button');
    button.textContent=p.name;
    button.setAttribute('aria-pressed',id===selected);
    button.onclick=()=>select(id);
    return button;
  }));
  const view=patchView(state,selected);
  const forecast=recovery(state.creek,selected,view.patch,view.env);
  el('patch-name').textContent=PATCHES[selected].name;
  el('knowledge').textContent=view.live?'Observed from the lodge':view.stale?'Remembered from season '+view.season+' · revisit to refresh':'Last visited this season';
  el('patch-stock').textContent=view.patch.biomass+' branches observed · root reserves '+view.patch.roots+'/5';
  el('conditions').textContent='Observed moisture '+Math.round(view.env.moisture*100)+'% · water depth '+view.env.depth+' · '+view.env.flow+' · light '+Math.round(view.env.light*100)+'%';
  el('growth').textContent=(view.stale?'From the last observation, estimated':'If left as observed, expected')+' recovery: '+forecast.growth+' branches at season end. '+forecast.reason;
  const route=patchRoute(state,selected);
  const harvestCost=Math.round((SOURCES[selected].cut+route.work)*100)/100;
  el('visit').textContent='Visit patch · '+route.work+' daylight';
  el('harvest').textContent='Gather up to 2 · '+harvestCost+' daylight';
  const ended=state.status!=='playing';
  el('visit').disabled=ended||state.daylight<route.work;
  // Remembered stock is an estimate. Arrival can reveal an empty patch.
  el('harvest').disabled=ended||state.daylight<harvestCost;
  el('advance').disabled=ended;
  el('advance').textContent=state.creek.stock.cache.food<4?'End season · food shortage':'Feed lodge & end season';
  el('undo').disabled=!history.length;
  el('forecast').textContent=state.season===1?'Next season: water falls. The third season returns to normal. Growth uses the conditions experienced during the season just ending.':state.season===2?'Next season: normal water returns. Distant patches update when visited.':'This is the last season. After feeding, keep at least 4 branches stored.';
  el('save-note').textContent=storageReady?'Run saved on this device.':'Saving is unavailable. Keep this page open or export the run.';
}
async function act(action) {
  if (busy) return;
  const result=patchAct(state,action);
  if (!result.ok) { el('story').textContent=result.message;return; }
  busy=true;
  el('controls').inert=true;
  try {
    if (result.carried) {
      // Display only remembered supplies during a trip, with the visible cargo.
      const pictured=structuredClone(result.carried);
      for (const id of Object.keys(PATCHES)) pictured.sources[id]=patchView(state,id).patch.biomass;
      scene.update(pictured,{projects:[],patchIds:Object.keys(PATCHES),preview:result.route,familyTrail:true});
      await scene.animateDelivery(result.route,1300);
    }
    history.push(state);
    state=result.state;
    persist();
  } finally { busy=false;el('controls').inert=false;draw(); }
}
el('visit').onclick=()=>act({type:'visit',id:selected});
el('harvest').onclick=()=>act({type:'harvest',id:selected});
el('advance').onclick=()=>act({type:'advance'});
el('undo').onclick=()=>{if (!busy&&history.length) {state=history.pop();persist();draw();}};
el('restart').onclick=()=>{if (!busy) {state=freshPatches();history=[];persist();draw();}};
el('export').onclick=()=>{
  const url=URL.createObjectURL(new Blob([savePatches(state)],{type:'application/json'}));
  const a=document.createElement('a');a.href=url;a.download='beaverbrook-shrub-seasons.json';a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
};
draw();
