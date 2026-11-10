import {createCreekScene} from './creek-scene.mjs';
import {freshCove,projects,work,dusk} from './cove-rules.mjs';
const el=id=>document.getElementById(id);
let game=freshCove(),history=[],selected=null,busy=false;
const symbols={brush:'☘',trees:'♧',dam:'≋',lodge:'⌂',channel:'≈'};
const scene=createCreekScene(el('scene'),el('pins'),data=>choose(data.project));
function choose(id){if(!busy){selected=id;draw();}}
function draw(){
 const jobs=projects(game),job=jobs.find(j=>j.id===selected);
 const pins=jobs.map(j=>({...j,symbol:symbols[j.id]}));
 scene.update(game.creek,{projects:pins,preview:job?.frames.find(f=>f.route)?.route,raisedPreview:job?.id==='dam',channelPreview:job?.id==='channel'?'east':null});
 el('day').textContent='NIGHT '+game.day+' OF 3';
 el('headline').textContent=game.done?'Your season at the cove':game.day===1?'The creek is falling':'Low water at Willow Cove';
 el('story').textContent=game.note||'Your dam and lodge are standing. The water drops tonight. Bring home two branches for supper, then decide how to spend the remaining daylight.';
 el('light').textContent=game.light+' daylight';el('food').textContent=game.creek.stock.cache.food+' branches stored';
 el('jobs').replaceChildren(...jobs.map(j=>{const b=document.createElement('button');b.textContent=symbols[j.id]+' '+j.name;b.setAttribute('aria-pressed',j.id===selected);b.onclick=()=>choose(j.id);return b;}));
 el('plan').textContent=job?job.note+' Costs '+job.cost+' daylight.'+(job.available?'':' Too late today.'):'';
 el('go').hidden=!job;el('go').disabled=!job?.available;el('go').textContent=job?.name||'';
 el('night').textContent=game.done?'Play another creek':game.creek.stock.cache.food<2?'End night hungry':'Eat and sleep';
 el('undo').disabled=!history.length;
}
el('go').onclick=async()=>{
 if(busy)return;
 const j=projects(game).find(j=>j.id===selected&&j.available);
 if(!j)return;
 busy=true;document.querySelector('main').inert=true;
 try{
  el('story').textContent=j.name+'…';
  for(const f of j.frames)if(f.route){scene.update(f.before,{projects:[],preview:f.route});await scene.animateDelivery(f.route);}
  history.push(game);game=work(game,j.id);game.note=j.name+' finished. '+(j.id==='dam'?'Water spreads across the banks.':j.id==='lodge'?'The deeper doorway will stay submerged tonight.':j.id==='channel'?'The cut follows the edge of the grove.':'Two more branches are home.');
  selected=null;
 }finally{busy=false;document.querySelector('main').inert=false;draw();}
};
el('night').onclick=()=>{if(game.done){game=freshCove();history=[];}else{history.push(game);game=dusk(game);}selected=null;draw();};
el('undo').onclick=()=>{if(history.length){game=history.pop();selected=null;draw();}};
draw();
