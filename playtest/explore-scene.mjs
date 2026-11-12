import {MUD_BANKS} from './construction-rules.mjs';
import * as THREE from './vendor/three.module.js';
import {BOUNDS,TREES,LODGE,LODGE_APPROACH,GROVE,LANDING,groundHeight,movementMode,cameraBoom,dampCamera,creekWater,waterLevel,CHANNELS} from './explore-rules.mjs?v=lodge-access-1';

import {familyOutlook} from './journey-rules.mjs';
import {CRESTS,damCenter} from './dam-placement.mjs';
import {PATCHES,DAM} from './habitat-rules.mjs';

export function createExploreScene(container){
 const scene=new THREE.Scene();scene.background=new THREE.Color('#c7d9cc');scene.fog=new THREE.Fog('#c7d9cc',9,22);
 const camera=new THREE.PerspectiveCamera(58,1,.12,65);
 let renderer=null;
 try{renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;container.append(renderer.domElement);}catch{}
 scene.add(new THREE.HemisphereLight('#fff4d4','#3e6558',2.5));
 const sunlight=new THREE.DirectionalLight('#fff2d2',2);sunlight.position.set(-8,18,4);scene.add(sunlight);
 const world=new THREE.Group();scene.add(world);
 const materials=new Map();
 function material(color){if(!materials.has(color))materials.set(color,new THREE.MeshStandardMaterial({color,roughness:.9}));return materials.get(color);}
 function mesh(geometry,color,x,y,z,parent=world){const object=new THREE.Mesh(geometry,material(color));object.position.set(x,y,z);parent.add(object);return object;}
 function log(a,b,radius=.06,color='#86613d',parent=world){
  const direction=new THREE.Vector3(...b).sub(new THREE.Vector3(...a));
  const object=mesh(new THREE.CylinderGeometry(radius,radius,direction.length(),6),color,0,0,0,parent);
  object.position.copy(new THREE.Vector3(...a).add(new THREE.Vector3(...b)).multiplyScalar(.5));
  object.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),direction.normalize());return object;
 }
 // Separate materials keep fading local: one tree or bank never fades its neighbors.
 const terrainBanks=[],occluders=[];
 function register(root,terrain=false){const record={root,terrain,materials:new Set(),opacity:1,hold:0};occluders.push(record);refresh(record);return root;}
 function refresh(record){
  const clones=new Map();
  record.root.traverse(o=>{if(!o.isMesh||record.materials.has(o.material))return;
   if(!clones.has(o.material)){const m=o.material.clone();m.side=THREE.DoubleSide;clones.set(o.material,m);record.materials.add(m);}
   o.material=clones.get(o.material);
  });
 }
 function terrainColor(x,z,s,wet){
  const h=groundHeight(x,z,s),cut=groundHeight(x,z)-h,slope=Math.hypot(groundHeight(x+.15,z,s)-groundHeight(x-.15,z,s),groundHeight(x,z+.15,s)-groundHeight(x,z-.15,s))/.3;
  const levelAt=(x,z)=>s?.version===2?wet?.get(Math.floor(x)+','+Math.floor(z)):0;
  let water=levelAt(x,z);
  if(water===undefined)for(const [dx,dz]of [[1,0],[-1,0],[0,1],[0,-1]]){const level=levelAt(x+dx,z+dz);if(level!==undefined&&(water===undefined||level>water))water=level;}
  const depth=water===undefined?-Infinity:water-h;
  const color=new THREE.Color(depth>=0?(depth>.6?'#726448':'#a08c61'):depth>-.16?'#665640':cut>.05?'#a17a50':slope>.65?'#82724d':h>1.5?'#758663':'#8fa16a');
  return color.multiplyScalar(1-Math.min(.18,slope*.09));
 }
 for(let tz=-BOUNDS;tz<BOUNDS;tz+=8)for(let tx=-BOUNDS;tx<BOUNDS;tx+=8){
  // One shared half-unit lattice keeps adjacent terrain patches watertight.
  const segments=16;
  const terrain=new THREE.PlaneGeometry(8,8,segments,segments);terrain.rotateX(-Math.PI/2);terrain.translate(tx+4,0,tz+4);
  const positions=terrain.getAttribute('position'),colors=[];
  for(let i=0;i<positions.count;i++){
   const x=positions.getX(i),z=positions.getZ(i),h=groundHeight(x,z);positions.setY(i,h);
   const color=terrainColor(x,z);colors.push(color.r,color.g,color.b);
  }
  terrain.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));terrain.computeVertexNormals();
  const bank=new THREE.Mesh(terrain,new THREE.MeshStandardMaterial({vertexColors:true,roughness:1}));world.add(bank);register(bank,true);terrainBanks.push(bank);
 }
 const mudBanks=MUD_BANKS.map(p=>{const root=new THREE.Group();root.userData.kind='mud-bank';root.position.set(p.x,groundHeight(p.x,p.z),p.z);world.add(root);mesh(new THREE.CylinderGeometry(.7,.8,.06,12),'#876546',0,.04,0,root);for(let i=0;i<3;i++)mesh(new THREE.IcosahedronGeometry(.16,0),'#715138',i*.22-.22,.15,0,root);return {p,root};});
 const waterTiles=[];
 const waterMaterial=new THREE.MeshStandardMaterial({color:'#448f9f',transparent:true,opacity:.85,roughness:.3});
 const waterMaterials=[waterMaterial.clone(),waterMaterial.clone(),waterMaterial];
 waterMaterials[0].opacity=.48;waterMaterials[1].opacity=.68;

 for(let z=-BOUNDS;z<BOUNDS;z++)for(let x=-BOUNDS;x<BOUNDS;x++){
  const tile=new THREE.Mesh(new THREE.PlaneGeometry(1,1),waterMaterial);tile.rotation.x=-Math.PI/2;tile.position.set(x+.5,0,z+.5);world.add(tile);waterTiles.push(tile);
 }
 const trees=[];
 for(const t of TREES){
  const tree=new THREE.Group();tree.position.set(t.x,groundHeight(t.x,t.z),t.z);world.add(tree);
  mesh(new THREE.CylinderGeometry(.14,.22,t.height,7),'#7d6847',0,t.height/2,0,tree);
  const crown=mesh(new THREE.IcosahedronGeometry(.95,renderer?1:0),t.id%3?'#547c55':'#779452',0,t.height,0,tree);crown.scale.y=1.2;
  tree.userData.source=t;trees.push(tree);register(tree);
 }
 // Low plants and rocks give the local camera recognizable shoreline landmarks.
 const plants=[];
 for(let i=0;i<90;i++){
  const x=((i*67)%271)/10-13.5,z=((i*83+17)%317)/10-15.8,h=groundHeight(x,z);
  if(h<-.05||h>.35||Math.hypot(x-LANDING.x,z-LANDING.z)<1.4)continue;
  const group=new THREE.Group();group.position.set(x,h,z);world.add(group);
  for(let j=0;j<3;j++)log([j*.1,0,0],[j*.13,.55+(j%2)*.2,.1],.025,'#65834a',group);
  plants.push(group);register(group);
 }
 const rock=mesh(new THREE.IcosahedronGeometry(.7,1),'#869082',-4,groundHeight(-4,-8)+.25,-8);rock.scale.set(1.4,.65,1);register(rock);
 const lodge=new THREE.Group();lodge.position.set(LODGE.x,groundHeight(LODGE.x,LODGE.z),LODGE.z);world.add(lodge);
 const dome=mesh(new THREE.SphereGeometry(1.2,12,8),'#826346',0,.35,0,lodge);dome.scale.set(1,.8,1);
 for(let i=0;i<16;i++){const a=i*.9;log([Math.cos(a),.15,Math.sin(a)],[Math.cos(a+.7)*.3,1.1,Math.sin(a+.7)*.3],.065,'#a17d50',lodge);}
 const grove=new THREE.Group();grove.position.set(GROVE.x,groundHeight(GROVE.x,GROVE.z),GROVE.z);world.add(grove);
 for(let i=0;i<4;i++){
  const stem=mesh(new THREE.CylinderGeometry(.06,.09,1.3,5),'#8b6f42',i*.5-.75,.6,0,grove);
  mesh(new THREE.IcosahedronGeometry(.6,1),'#9aad65',stem.position.x,1.4,0,grove);
 }
 const branchPile=new THREE.Group();grove.add(branchPile);
 const storedPile=new THREE.Group();lodge.add(storedPile);
 const dropped=new THREE.Group();world.add(dropped);register(grove);register(lodge);
 function branch(parent,y=0){log([-.65,y,0],[.65,y,.13],.065,'#bd9560',parent);log([.1,y,.08],[.5,y,.5],.04,'#a98049',parent);}
 // A distinct exposed root identifies the same landing from land and water.
 log([LANDING.x-.7,groundHeight(LANDING.x-.7,LANDING.z)+.1,LANDING.z],[LANDING.x+.8,.12,LANDING.z+.1],.09,'#d9c28c');
 const stands=[];
 for(const p of PATCHES){
  const root=new THREE.Group();root.position.set(p.x,groundHeight(p.x,p.z),p.z);world.add(root);
  const shoots=[];
  for(let i=0;i<6;i++){
   const shoot=new THREE.Group(),a=i*2.4;shoot.position.set(Math.cos(a)*.7,0,Math.sin(a)*.7);root.add(shoot);
   const height=p.kind==='shrub'?1.2:2.4;
   mesh(new THREE.CylinderGeometry(.08,.13,height,6),'#97724c',0,height/2,0,shoot);
   const crown=mesh(new THREE.IcosahedronGeometry(p.kind==='shrub'?.5:.65,0),p.kind==='shrub'?'#a3b665':'#b1bb68',0,height,0,shoot);crown.scale.y=1.2;shoots.push(shoot);
  }
  const stump=mesh(new THREE.CylinderGeometry(.22,.3,.2,8),'#ba9965',0,.1,0,root);
  register(root);stands.push({p,root,shoots,stump});
 }
 const damGroup=new THREE.Group();world.add(damGroup);
 for(let i=0;i<18;i++){const x=-3.8+i*.45;log([x,-.25,9.6],[x+.6,.5+(i%3)*.08,10.4],.14,'#8b6947',damGroup);}
 const crest=new THREE.Group();damGroup.add(crest);
 for(let i=0;i<9;i++)log([-3.8+i*.85,.55,9.8],[-2.8+i*.85,.75,10.2],.15,'#b0925e',crest);
 register(damGroup);
 const damPile=new THREE.Group();damPile.userData.kind='family-dam-supplies';world.add(damPile);damPile.position.set(-2,groundHeight(-2,8.5),8.5);
 // Visual clearance avoids coplanar mud caps and retained water; it is not a hydraulic crest change.
 const mudCapClearance=.012;
 const familyPackingFace=mesh(new THREE.BoxGeometry(8,1,.25),'#715039',0,0,9.7,damGroup);familyPackingFace.userData.kind='family-packed-face';refresh(occluders.find(r=>r.root===damGroup));
 const placedGroup=new THREE.Group();placedGroup.userData.kind='placed-dam';world.add(placedGroup);register(placedGroup);let lastPlaced='';
 function drawPlaced(s,preview){
  const dam=preview?.placedDam||s.placedDam,key=JSON.stringify([dam,!!preview,s.channels,s.entrance]);if(key===lastPlaced)return;lastPlaced=key;clear(placedGroup);placedGroup.visible=!!dam;
  if(!dam)return;for(const [i,p]of dam.sections.entries()){
   const center=damCenter(p),bed=Math.min(groundHeight(center.x,center.z,s),groundHeight(p.a.x,p.a.z,s),groundHeight(p.b.x,p.b.z,s)),level=preview?p.target:(p.frame??p.level),crest=level?CRESTS[level]:bed+.3;
   const section=new THREE.Group();section.userData.section=i;section.userData.stage=level>(p.level||0)&&!preview?'framework':level?'packed':'stakes';placedGroup.add(section);
   if(level){
    for(let y=bed+.1;y<crest+.06;y+=.17)log([p.a.x,y,p.a.z],[p.b.x,y,p.b.z],.105,preview?'#d3b667':'#977149',section);
    for(const t of [.15,.65]){const x=p.a.x+(p.b.x-p.a.x)*t,z=p.a.z+(p.b.z-p.a.z)*t;log([x,bed,z],[x,crest+.12,z],.07,'#b29968',section);}
   }else for(const v of [p.a,p.b])log([v.x,groundHeight(v.x,v.z,s),v.z],[v.x,Math.max(groundHeight(v.x,v.z,s)+.5,.55),v.z],.045,'#d9c497',section);
   const packed=preview?p.target:p.level;
   if(s.construction&&packed&&CRESTS[packed]>bed){const face=mesh(new THREE.BoxGeometry(Math.hypot(p.b.x-p.a.x,p.b.z-p.a.z),CRESTS[packed]+mudCapClearance-bed,.25),'#715039',center.x,(bed+CRESTS[packed]+mudCapClearance)/2,center.z,section);face.rotation.y=-Math.atan2(p.b.z-p.a.z,p.b.x-p.a.x);face.userData.kind='packed-face';}
   if(p.mud)mesh(new THREE.IcosahedronGeometry(.18,0),'#715138',center.x+.25,Math.max(bed,.15)+.15,center.z+.3,section);
   for(let j=0;j<Math.min(5,p.wood);j++)log([center.x-.4,Math.max(bed,.15)+.15+j*.1,center.z-.4],[center.x+.4,Math.max(bed,.15)+.15+j*.1,center.z-.25],.06,'#c09b65',section);
  }
  refresh(occluders.find(r=>r.root===placedGroup));
 }
 const markers=[];
 for(const c of CHANNELS){
  const root=new THREE.Group();root.position.set(c.x,groundHeight(c.x,c.z),c.z);world.add(root);
  log([-.25,0,0],[-.25,.8,0],.04,'#dfcb92',root);log([-.5,.65,0],[.5,.65,0],.06,'#dfcb92',root);
  const route=new THREE.Group();world.add(route);
  for(let x=Math.min(c.start,c.end)+.25;x<Math.max(c.start,c.end);x+=.65)log([x,groundHeight(x,c.z)+.05,c.z-.16],[x,groundHeight(x,c.z)+.05,c.z+.16],.025,'#d3bb7b',route);
  markers.push({c,root,route});
 }
 // Creek-facing mouth at the very same probe used for household access.
 const entrance=new THREE.Group();entrance.userData.kind='lodge-entrance';world.add(entrance);
 const mouth=mesh(new THREE.CircleGeometry(.26,20),'#302b21',.015,.15,0,entrance);mouth.rotation.y=Math.PI/2;mouth.scale.y=.48;
 const rim=mesh(new THREE.TorusGeometry(.28,.035,6,20),'#8b704c',0,.15,0,entrance);rim.rotation.y=Math.PI/2;rim.scale.y=.48;
 mouth.material=mouth.material.clone();mouth.material.side=THREE.DoubleSide;rim.material=rim.material.clone();rim.material.side=THREE.DoubleSide;

 const beaver=new THREE.Group();world.add(beaver);
 const body=mesh(new THREE.SphereGeometry(.35,12,8),'#795437',0,.36,0,beaver);body.scale.set(1,1,1.55);
 const head=mesh(new THREE.SphereGeometry(.25,10,8),'#8b6342',0,.5,-.48,beaver);head.scale.z=1.1;
 mesh(new THREE.SphereGeometry(.17,8,6),'#b68c61',0,.42,-.69,beaver).scale.set(1,.7,.6);
 for(const side of [-1,1]){
  mesh(new THREE.SphereGeometry(.085,7,5),'#795437',side*.17,.72,-.43,beaver);
  mesh(new THREE.SphereGeometry(.04,6,5),'#201e16',side*.19,.56,-.64,beaver);
  mesh(new THREE.BoxGeometry(.055,.10,.03),'#f3deb0',side*.04,.36,-.79,beaver);
 }
 const tail=mesh(new THREE.SphereGeometry(.32,10,6),'#433a2c',0,.08,.68,beaver);tail.scale.set(.8,.2,1.55);
 const legs=[];
 for(const x of [-.27,.27])for(const z of [-.24,.3])legs.push(mesh(new THREE.SphereGeometry(.11,7,5),'#543e2b',x,.11,z,beaver));
 const cargo=new THREE.Group();beaver.add(cargo);
 log([0,.37,-.8],[.65,.1,1.2],.055,'#c5a16b',cargo);log([.4,.18,.5],[1,.1,.9],.04,'#b88b56',cargo);
 cargo.name='carried-wood';body.name='beaver-body';
 const foodCargo=mesh(new THREE.IcosahedronGeometry(.24,0),'#b3c075',0,.4,-.8,beaver);
 foodCargo.name='carried-food';
 const mudCargo=mesh(new THREE.IcosahedronGeometry(.23,0),'#715138',0,.38,-.8,beaver);mudCargo.name='carried-mud';
 // Ground stays solid. A small location ring handles terrain occlusion without
 // cloning the character or changing any player/family material.
 const markerMaterial=new THREE.MeshBasicMaterial({color:'#ffd783',transparent:true,opacity:.7,depthTest:false,depthWrite:false,fog:false,side:THREE.DoubleSide});
 const terrainMarker=new THREE.Mesh(new THREE.RingGeometry(.42,.46,32),markerMaterial);
 terrainMarker.userData.kind='terrain-player-marker';terrainMarker.rotation.x=-Math.PI/2;
 terrainMarker.renderOrder=20;terrainMarker.visible=false;world.add(terrainMarker);
 let terrainBlocked=false;
 const wake=mesh(new THREE.TorusGeometry(.55,.018,3,28),'#bfddcc',0,.02,0);wake.rotation.x=-Math.PI/2;wake.scale.set(.75,1.7,1);
 // Authored family response, not autonomous gathering or extra resource production.
 const family=new THREE.Group();family.userData.kind='family-response';world.add(family);
 function relative(scale,tint){const animal=beaver.clone(true);animal.scale.setScalar(scale);animal.traverse(o=>{if(o.isMesh&&['795437','8b6342'].includes(o.material.color.getHexString())){o.material=o.material.clone();o.material.color.set(tint);}});animal.getObjectByName('carried-wood').visible=false;animal.getObjectByName('carried-food').visible=false;animal.getObjectByName('carried-mud').visible=false;family.add(animal);return animal;}
 const adult=relative(.8,'#806048'),kit=relative(.52,'#9b7755');adult.userData.kind='family-adult';kit.userData.kind='family-kit';let familyClock=0;
 const waterMemory=new THREE.Group();waterMemory.userData.kind='water-memory';world.add(waterMemory);
 log([0,-.8,6],[0,1.35,6],.045,'#b4a57c',waterMemory);
 const oldBand=mesh(new THREE.BoxGeometry(.65,.045,.1),'#f4dfad',0,0,6,waterMemory);
 function updateFamily(s,view,dt){
  const near=Math.hypot(s.x-LODGE.x,s.z-LODGE.z)<16;family.visible=s.version===2&&!!s.journey&&near;
  if(!family.visible){waterMemory.visible=false;return;}
  if(view.active&&!reduced)familyClock+=dt;const mood=familyOutlook(s),t=(1-Math.cos(familyClock*.6))/2;
  family.userData.mood=mood.mood;family.userData.route=mood.accessible?'water':'bank';
  const x=mood.accessible?-6+t*3.8:-6+Math.sin(familyClock*.6)*.3,z=mood.accessible?4.6+t*1.4:4.6;
  const swimming=movementMode(x,z,s)==='swimming';adult.position.set(x,swimming?(waterLevel(x,z,s)??0)-.1:groundHeight(x,z,s),z);adult.rotation.y=mood.accessible?Math.atan2(-3.8,-1.4)+(Math.sin(familyClock*.6)<0?Math.PI:0):Math.sin(familyClock*.3)*.4;
  adult.getObjectByName('beaver-body').scale.y=swimming?.8:1;adult.getObjectByName('carried-food').visible=s.food>0&&t<.12;
  const kx=-7.9+(mood.mood==='settled'?Math.sin(familyClock)*.3:0),kz=4.5;kit.position.set(kx,groundHeight(kx,kz,s),kz);kit.rotation.y=mood.mood==='hungry'?Math.PI:Math.sin(familyClock*.7)*.5;
  waterMemory.visible=s.journey.normalWater!==null&&(s.day%6>=4||s.day%6===0);oldBand.position.y=s.journey.normalWater??0;
 }
 let followHeight=null,followDistance=null;
 const ray=new THREE.Raycaster(),box=new THREE.Box3();
 function fadeScenery(s,dt){
  world.updateMatrixWorld(true);
  const center=beaver.position.clone().add(new THREE.Vector3(0,.45,0));
  const side=new THREE.Vector3(Math.cos(camera.rotation.y)*.3,0,-Math.sin(camera.rotation.y)*.3);
  const targets=[center,center.clone().add(side),center.clone().sub(side),center.clone().add(new THREE.Vector3(0,.35,0))];
  terrainBlocked=false;
  for(const record of occluders){
   if(!record.root.visible)continue;
   // A sloped tile's bounding box contains empty air above its lower ground.
   // Only surface intersections establish terrain occlusion; enclosing objects
   // still need the containment check when the camera is inside their mesh.
   let blocked=!record.terrain&&box.setFromObject(record.root).expandByScalar(.2).containsPoint(camera.position);
   for(const target of targets){if(blocked)break;const direction=target.clone().sub(camera.position);ray.set(camera.position,direction.clone().normalize());ray.far=Math.max(0,direction.length()-.45);blocked=ray.intersectObject(record.root,true).length>0;}
   record.hold=blocked?.18:Math.max(0,record.hold-dt);
   if(record.terrain){terrainBlocked ||= record.hold>0;continue;}
   record.opacity=dampCamera(record.opacity,record.hold>0?.14:1,dt,record.hold>0?14:5);
   if(record.opacity>.995)record.opacity=1;
   for(const m of record.materials){const transparent=record.opacity<1;if(m.transparent!==transparent){m.transparent=transparent;m.needsUpdate=true;}m.opacity=record.opacity;m.depthWrite=!transparent;}
  }
  terrainMarker.position.copy(beaver.position);terrainMarker.position.y+=.04;
  terrainMarker.visible=terrainBlocked&&!!renderer;
 }
 let lastTerrain='',lastTerrainShape='',lastInventory='',lastFallback=0,lastFrame=0;
 function landscape(s){
  const shape=s.version===2?JSON.stringify([s.channels,s.entrance]):'original',hydrology=creekWater(s),key=shape+'|'+(hydrology?.key||'original');if(key===lastTerrain)return;lastTerrain=key;
  const changed=shape!==lastTerrainShape;lastTerrainShape=shape;
  for(const bank of terrainBanks){
   const positions=bank.geometry.getAttribute('position'),colors=bank.geometry.getAttribute('color');
   for(let i=0;i<positions.count;i++){const x=positions.getX(i),z=positions.getZ(i);if(changed)positions.setY(i,groundHeight(x,z,s));const color=terrainColor(x,z,s,hydrology?.wet);colors.setXYZ(i,color.r,color.g,color.b);}
   colors.needsUpdate=true;if(changed){positions.needsUpdate=true;bank.geometry.computeVertexNormals();bank.geometry.computeBoundingSphere();}
  }
 }
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function clear(group){while(group.children.length){const child=group.children.pop();child.traverse(o=>{o.geometry?.dispose();for(const record of occluders)if(record.materials.delete(o.material))o.material.dispose();});child.parent=null;}}
 function inventory(s){
  const signature=JSON.stringify([s.groveStock,s.stored,s.dropped,s.loose,s.damWood,s.food,s.mud,s.damMud]);if(signature===lastInventory)return;lastInventory=signature;
  for(const group of [branchPile,storedPile,dropped,damPile])clear(group);
  if(s.version!==2)for(let i=0;i<s.groveStock;i++)branch(branchPile,.1+i*.11);
  for(let i=0;i<Math.min(12,s.damWood||0);i++)branch(damPile,.1+i*.13);
  for(let i=0;i<Math.min(12,s.stored);i++){const stack=new THREE.Group();stack.position.set(1.1,.1+i*.13,0);storedPile.add(stack);branch(stack);}
  for(const point of (s.version===2?s.loose:s.dropped)){const stack=new THREE.Group();stack.userData.kind='loose-supplies';stack.userData.floats=point.wood===undefined||point.wood>0||point.food>0;stack.position.set(point.x,0,point.z);dropped.add(stack);if(point.wood===undefined||point.wood>0)branch(stack);if(point.mud>0)mesh(new THREE.IcosahedronGeometry(.23,0),'#715138',0,.15,0,stack);if(point.food>0)mesh(new THREE.IcosahedronGeometry(.2,0),'#acb96c',.2,.2,0,stack);}
  if(s.construction){for(const [group,n,x]of [[damPile,s.damMud,.6],[storedPile,s.mud,1.4]])for(let i=0;i<Math.min(6,n);i++)mesh(new THREE.IcosahedronGeometry(.17,0),'#715138',x,.12+Math.floor(i/3)*.18,(i%3)*.22,group);}
  if(s.version===2)for(let i=0;i<Math.min(10,s.food);i++)mesh(new THREE.IcosahedronGeometry(.13,0),'#a4b66d',-.8+(i%3)*.2,.08+Math.floor(i/3)*.15,.7,storedPile);
  for(const record of occluders)if(record.root===lodge||record.root===grove)refresh(record);
 }
 // Counts/geometry can be cached; support heights cannot. Excavation, weather
 // and completed dams can change the surface beneath an unchanged inventory.
 function positionSupplies(s){
  for(const stack of dropped.children){const {x,z}=stack.position,ground=groundHeight(x,z,s),water=stack.userData.floats?waterLevel(x,z,s):undefined;stack.position.y=Math.max(ground,water??ground)+.05;}
  damPile.position.y=Math.max(groundHeight(-2,8.5,s),waterLevel(-2,8.5,s)??-Infinity);
 }
 function resize(){const w=container.clientWidth,h=container.clientHeight;if(!w||!h)return;camera.aspect=w/h;camera.updateProjectionMatrix();renderer?.setSize(w,h,false);}
 new ResizeObserver(resize).observe(container);resize();
 function compatibility(s){
  const w=container.clientWidth,h=container.clientHeight,faces=[];
  world.updateMatrixWorld(true);camera.updateMatrixWorld();
  const cameraPosition=camera.position;
  world.traverse(o=>{
   if(!o.isMesh||!o.visible)return;let parent=o.parent;while(parent&&parent!==world){if(!parent.visible)return;parent=parent.parent;}
   const positions=o.geometry.getAttribute('position'),indices=o.geometry.index,count=indices?indices.count:positions.count,attribute=o.geometry.getAttribute('color');
   for(let i=0;i<count;i+=3){
    const ids=[0,1,2].map(j=>indices?indices.getX(i+j):i+j);
    const vertices=ids.map(id=>new THREE.Vector3().fromBufferAttribute(positions,id).applyMatrix4(o.matrixWorld));
    const center=vertices[0].clone().add(vertices[1]).add(vertices[2]).multiplyScalar(1/3);
    const distance=center.distanceTo(cameraPosition);if(distance>23)continue;
    const normal=vertices[1].clone().sub(vertices[0]).cross(vertices[2].clone().sub(vertices[0])).normalize();
    if(o.material.side!==THREE.DoubleSide&&normal.dot(cameraPosition.clone().sub(center))<=0)continue;
    const projected=vertices.map(v=>v.clone().project(camera));
    if(projected.some(v=>v.z< -1||v.z>1)||projected.every(v=>v.z>1)||projected.every(v=>v.x< -1)||projected.every(v=>v.x>1)||projected.every(v=>v.y< -1)||projected.every(v=>v.y>1))continue;
    const color=o.material.color.clone();
    if(attribute){color.setRGB(0,0,0);for(const id of ids){color.r+=attribute.getX(id)/3;color.g+=attribute.getY(id)/3;color.b+=attribute.getZ(id)/3;}}
    color.multiplyScalar(.75+Math.max(0,normal.dot(new THREE.Vector3(-.3,.9,.2).normalize()))*.3).lerp(scene.background,Math.max(0,Math.min(1,(distance-9)/13)));
    faces.push({depth:projected.reduce((sum,v)=>sum+v.z,0)/3,svg:'<polygon points="'+projected.map(v=>((v.x+1)*w/2).toFixed(1)+','+((1-v.y)*h/2).toFixed(1)).join(' ')+'" fill="#'+color.getHexString()+'" stroke="#'+color.getHexString()+'" fill-opacity="'+o.material.opacity.toFixed(3)+'" stroke-opacity="'+o.material.opacity.toFixed(3)+'" stroke-width=".45"/>'});
   }
  });
  faces.sort((a,b)=>b.depth-a.depth);
  const point=beaver.position.clone().add(new THREE.Vector3(0,.04,0)).project(camera);
  const marker=terrainBlocked&&point.z>=-1&&point.z<=1?'<g fill="none" stroke="#ffd783" stroke-width="3"><ellipse cx="'+((point.x+1)*w/2)+'" cy="'+((1-point.y)*h/2)+'" rx="12" ry="5"/></g>':'';
  container.innerHTML='<svg viewBox="0 0 '+w+' '+h+'" width="100%" height="100%" role="img" aria-label="Third-person beaver view of the creek">'+faces.map(f=>f.svg).join('')+marker+'</svg>';
 }
 return {mode:renderer?'WebGL':'Compatibility renderer',update(s,view,time){
  const dt=lastFrame?Math.min(.1,Math.max(0,(time-lastFrame)/1000)):1/60;
  landscape(s);inventory(s);positionSupplies(s);drawPlaced(s,view.previewState);
  const mode=movementMode(s.x,s.z,s),swim=mode==='swimming',moving=view.moving;
  const surface=waterLevel(s.x,s.z,s)??0;
  beaver.position.set(s.x,swim?surface-.12:groundHeight(s.x,s.z,s),s.z);
  const turn=Math.atan2(Math.sin(-s.yaw-beaver.rotation.y),Math.cos(-s.yaw-beaver.rotation.y));
  beaver.rotation.y+=turn*(1-Math.exp(-Math.min(.2,(time-lastFrame)/1000)*14));lastFrame=time;
  body.scale.y=swim?.8:1;
  if(!reduced&&moving)body.position.y=.36+Math.sin(time*.012)*.025;
  else body.position.y=.36;
  legs.forEach((leg,i)=>{leg.position.y=.11+(moving&&!reduced?Math.sin(time*.015+i*Math.PI)*.06:0);});
  foodCargo.visible=s.version===2&&s.cargo?.food>0;mudCargo.visible=s.version===2&&s.cargo?.mud>0;
  for(const {p,root}of mudBanks){root.visible=!!s.construction&&Math.hypot(s.x-p.x,s.z-p.z)<14;root.position.y=groundHeight(p.x,p.z,s);root.children.forEach((o,i)=>{if(i)o.visible=s.construction&&s.mudBanks[p.id]>0;});}
  cargo.visible=s.carrying;cargo.children.forEach(o=>o.visible=s.version!==2||s.cargo?.wood>0);cargo.rotation.y=swim?-.15:.15;
  wake.visible=swim&&moving;wake.position.set(s.x,surface+.025,s.z);wake.rotation.z=s.yaw;
  const hydrology=creekWater(view.previewState||s);for(const [i,m]of waterMaterials.entries()){m.color.set(view.previewState?'#a2bda5':'#448f9f');m.opacity=view.previewState?.6:[.48,.68,.85][i];}
  for(const tile of waterTiles){const x=tile.position.x,z=tile.position.z,level=hydrology?hydrology.wet.get(Math.floor(x)+','+Math.floor(z)):groundHeight(x,z)<.35?0:undefined;tile.visible=level!==undefined&&Math.hypot(x-s.x,z-s.z)<20;tile.position.y=level??0;const depth=(level??0)-groundHeight(x,z,view.previewState||s);tile.material=waterMaterials[depth<.25?0:depth<.65?1:2];}
  for(const stand of stands){stand.root.visible=s.version===2&&Math.hypot(stand.p.x-s.x,stand.p.z-s.z)<16;stand.root.position.y=groundHeight(stand.p.x,stand.p.z,s);if(s.version===2){const stock=s.patches[stand.p.id].stock;stand.shoots.forEach((o,i)=>o.visible=i<stock);stand.stump.visible=stock===0;}}
  damGroup.visible=s.version===2;damGroup.position.y=s.version===2?[-.28,0,.2][s.dam]:0;damGroup.children.forEach((o,i)=>{if(o!==crest&&o!==familyPackingFace)o.visible=(s.familyFrame??s.dam)>0||i%5!==2;});crest.visible=(s.familyFrame??s.dam)===2;damPile.visible=s.version===2;familyPackingFace.visible=!!s.construction&&s.dam>0;familyPackingFace.scale.y=s.dam===2?1.18:.9;familyPackingFace.position.y=(CRESTS[s.dam]??0)+mudCapClearance-familyPackingFace.scale.y/2-damGroup.position.y;
  for(const m of markers){m.root.visible=s.version===2&&Math.hypot(m.c.x-s.x,m.c.z-s.z)<14;m.root.position.y=groundHeight(m.c.x,m.c.z,s);m.route.visible=m.root.visible&&!(s.channels?.[m.c.id]);}
  entrance.visible=s.version===2;entrance.position.set(LODGE_APPROACH.x,groundHeight(LODGE_APPROACH.x,LODGE_APPROACH.z,s),LODGE_APPROACH.z);
  for(const tree of trees)tree.visible=Math.hypot(tree.position.x-s.x,tree.position.z-s.z)<16;
  for(const plant of plants)plant.visible=Math.hypot(plant.position.x-s.x,plant.position.z-s.z)<14;
  grove.visible=s.version!==2&&Math.hypot(GROVE.x-s.x,GROVE.z-s.z)<15;
  lodge.visible=Math.hypot(LODGE.x-s.x,LODGE.z-s.z)<18;
  const reference=Math.max(surface,groundHeight(s.x,s.z,s));
  followHeight=followHeight===null?reference:dampCamera(followHeight,reference,dt);
  followDistance=followDistance===null?view.distance:dampCamera(followDistance,view.distance,dt,8);
  const boom=cameraBoom(s,view.yaw,followDistance,followHeight);
  camera.position.set(boom.position.x,boom.position.y,boom.position.z);camera.lookAt(boom.target.x,boom.target.y,boom.target.z);camera.updateMatrixWorld();
  updateFamily(s,view,dt);
  fadeScenery(s,dt);
  if(renderer)renderer.render(scene,camera);
  else if(time-lastFallback>120||view.force){compatibility(s);lastFallback=time;}
 },projectWorkSites(sites,s){
  return sites.filter(p=>Math.hypot(p.x-s.x,p.z-s.z)<14).map(p=>{const y=Math.max(groundHeight(p.x,p.z,s),waterLevel(p.x,p.z,s)??-1)+1.15,v=new THREE.Vector3(p.x,y,p.z).project(camera);return {...p,distance:Math.hypot(p.x-s.x,p.z-s.z),screenX:(v.x+1)*50,screenY:(1-v.y)*50,shown:v.z>=-1&&v.z<=1&&Math.abs(v.x)<.92&&v.y<.8&&v.y>-.65};}).filter(p=>p.shown);
 },dispose(){for(const m of waterMaterials)m.dispose();markerMaterial.dispose();renderer?.dispose();world.traverse(o=>o.geometry?.dispose());for(const record of occluders)for(const m of record.materials)m.dispose();}};
}
