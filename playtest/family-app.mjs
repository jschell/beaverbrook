import {createCreekScene} from './creek-scene.mjs';
import {initialChannelDemo, creekAct, CHANNELS, SOURCES} from './creek-rules.mjs';
import {familyHaul, familyRoute, restAtHome} from './family-rules.mjs';

const el = id => document.getElementById(id);
const first = familyHaul(initialChannelDemo());
let creek = first.home;
let selected = null;
let busy = false;
let note = 'An adult is bringing supper home from the grove.';
const history = [];
const scene = createCreekScene(el('scene'), el('pins'), data => select(data.project));

function choices() {
  const jobs = [];
  if (creek.sources.trees > 0) jobs.push({id:'haul', name:'Bring branches home', symbol:'♧', cell:SOURCES.trees.cell});
  const stage = creek.channels.east || 0;
  if (stage < 2) jobs.push({id:'cut', name:stage ? 'Deepen the cut' : 'Dig toward the grove', symbol:'≈', cell:CHANNELS.east.cells[1]});
  return jobs;
}
function select(id) {
  if (busy) return;
  selected = id;
  draw();
}
function routeDescription(route) {
  const carry = route.cells.length - route.waterCells;
  return route.waterCells + ' swim tiles · ' + carry + ' carry tiles';
}
function dig() {
  return creekAct(creek, {type:creek.channels.east ? 'deepenChannel' : 'digChannel', id:'east'});
}
function draw() {
  const jobs = choices();
  const job = jobs.find(j => j.id === selected);
  const route = familyRoute(creek);
  scene.update(creek, {projects:jobs, preview:route, familyTrail:true, channelPreview:selected === 'cut' ? 'east' : null});
  el('day').textContent = 'THE FAMILY LODGE';
  el('headline').textContent = creek.season === 'dry' ? 'The water has fallen' : 'A branch for home';
  el('story').textContent = note;
  el('light').textContent = 'Grove to lodge';
  el('food').textContent = creek.stock.cache.food + ' branches at home';
  el('jobs').replaceChildren(...jobs.map(j => {
    const b = document.createElement('button');
    b.textContent = j.name;
    b.setAttribute('aria-pressed', selected === j.id);
    b.onclick = () => select(j.id);
    return b;
  }));
  let detail = 'Blue line: swim. Dotted brown: carry. ' + routeDescription(route) + '.';
  if (selected === 'cut') detail += ' After digging: ' + routeDescription(familyRoute(dig().state)) + '.';
  el('plan').textContent = detail;
  el('go').hidden = !job;
  el('go').textContent = job?.name || '';
  el('night').hidden = creek.season === 'dry';
  el('undo').disabled = !history.length;
}
async function showTrip(trip) {
  busy = true;
  el('go').disabled = true;
  try {
    scene.update(trip.carried,{projects:[], preview:trip.route, familyTrail:true});
    await scene.animateDelivery(trip.route, 2300);
  } finally {
    busy = false;
    el('go').disabled = false;
  }
}
function remember() { history.push({creek,note}); }
el('go').onclick = async () => {
  if (busy) return;
  if (selected === 'haul') {
    const trip = familyHaul(creek);
    if (!trip) return;
    await showTrip(trip);
    remember();
    creek = trip.home;
    note = 'Two branches reach the lodge. Where did you have to carry them?';
  } else if (selected === 'cut') {
    const result = dig();
    if (!result.ok) return;
    remember();
    creek = result.state;
    note = 'Look along the trail to the grove. Try bringing another branch home.';
  }
  selected = null;
  draw();
};
el('night').onclick = () => {
  if (busy || creek.season === 'dry') return;
  remember();
  creek = restAtHome(creek);
  note = 'The family shared supper. Look at the route again. Can you still swim through the same places?';
  selected = null;
  draw();
};
el('undo').onclick = () => {
  if (busy || !history.length) return;
  ({creek,note} = history.pop());
  selected = null;
  draw();
};
draw();
await showTrip(first);
note = 'Supper is home. Want to bring a branch back from the grove?';
draw();
