import * as THREE from './vendor/three.module.js';
import {BOUNDS,TREES,LODGE,GROVE,LANDING,groundHeight,movementMode,cameraBoom} from './explore-rules.mjs';

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
 const terrain=new THREE.PlaneGeometry(BOUNDS*2,BOUNDS*2,renderer?64:32,renderer?64:32);terrain.rotateX(-Math.PI/2);
 const positions=terrain.getAttribute('position'),colors=[];
 for(let i=0;i<positions.count;i++){
  const x=positions.getX(i),z=positions.getZ(i),h=groundHeight(x,z);positions.setY(i,h);
  const color=new THREE.Color(h<-.05?'#a59a73':h<.28?'#a7a47b':h>1.5?'#758663':'#8fa57b');
  colors.push(color.r,color.g,color.b);
 }
 terrain.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));terrain.computeVertexNormals();
 world.add(new THREE.Mesh(terrain,new THREE.MeshStandardMaterial({vertexColors:true,roughness:1})));
 const waterTiles=[];
 const waterMaterial=new THREE.MeshStandardMaterial({color:'#448f9f',transparent:true,opacity:.85,roughness:.3});

 for(let z=-BOUNDS;z<BOUNDS;z++)for(let x=-BOUNDS;x<BOUNDS;x++)if(groundHeight(x+.5,z+.5)<.35){
  const tile=new THREE.Mesh(new THREE.PlaneGeometry(1.01,1.01),waterMaterial);tile.rotation.x=-Math.PI/2;tile.position.set(x+.5,0,z+.5);world.add(tile);waterTiles.push(tile);
 }
 const trees=[];
 for(const t of TREES){
  const tree=new THREE.Group();tree.position.set(t.x,groundHeight(t.x,t.z),t.z);world.add(tree);
  mesh(new THREE.CylinderGeometry(.14,.22,t.height,7),'#7d6847',0,t.height/2,0,tree);
  const crown=mesh(new THREE.IcosahedronGeometry(.95,renderer?1:0),t.id%3?'#547c55':'#779452',0,t.height,0,tree);crown.scale.y=1.2;
  trees.push(tree);
 }
 // Low plants and rocks give the local camera recognizable shoreline landmarks.
 const plants=[];
 for(let i=0;i<90;i++){
  const x=((i*67)%271)/10-13.5,z=((i*83+17)%317)/10-15.8,h=groundHeight(x,z);
  if(h<-.05||h>.35||Math.hypot(x-LANDING.x,z-LANDING.z)<1.4)continue;
  const group=new THREE.Group();group.position.set(x,h,z);world.add(group);
  for(let j=0;j<3;j++)log([j*.1,0,0],[j*.13,.55+(j%2)*.2,.1],.025,'#65834a',group);
  plants.push(group);
 }
 mesh(new THREE.IcosahedronGeometry(.7,1),'#869082',-4,groundHeight(-4,-8)+.25,-8).scale.set(1.4,.65,1);
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
 const dropped=new THREE.Group();world.add(dropped);
 function branch(parent,y=0){log([-.65,y,0],[.65,y,.13],.065,'#bd9560',parent);log([.1,y,.08],[.5,y,.5],.04,'#a98049',parent);}
 // A distinct exposed root identifies the same landing from land and water.
 log([LANDING.x-.7,groundHeight(LANDING.x-.7,LANDING.z)+.1,LANDING.z],[LANDING.x+.8,.12,LANDING.z+.1],.09,'#d9c28c');
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
 const wake=mesh(new THREE.TorusGeometry(.55,.018,3,28),'#bfddcc',0,.02,0);wake.rotation.x=-Math.PI/2;wake.scale.set(.75,1.7,1);
 let lastInventory='',lastFallback=0,lastFrame=0;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function clear(group){while(group.children.length){const child=group.children.pop();child.traverse(o=>o.geometry?.dispose());child.parent=null;}}
 function inventory(s){
  const signature=JSON.stringify([s.groveStock,s.stored,s.dropped]);if(signature===lastInventory)return;lastInventory=signature;
  for(const group of [branchPile,storedPile,dropped])clear(group);
  for(let i=0;i<s.groveStock;i++)branch(branchPile,.1+i*.11);
  for(let i=0;i<s.stored;i++){const stack=new THREE.Group();stack.position.set(1.1,.1+i*.13,0);storedPile.add(stack);branch(stack);}
  for(const point of s.dropped){const stack=new THREE.Group();stack.position.set(point.x,Math.max(0,groundHeight(point.x,point.z))+.05,point.z);dropped.add(stack);branch(stack);}
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
    if(normal.dot(cameraPosition.clone().sub(center))<=0)continue;
    const projected=vertices.map(v=>v.clone().project(camera));
    if(projected.some(v=>v.z< -1||v.z>1)||projected.every(v=>v.z>1)||projected.every(v=>v.x< -1)||projected.every(v=>v.x>1)||projected.every(v=>v.y< -1)||projected.every(v=>v.y>1))continue;
    const color=o.material.color.clone();
    if(attribute){color.setRGB(0,0,0);for(const id of ids){color.r+=attribute.getX(id)/3;color.g+=attribute.getY(id)/3;color.b+=attribute.getZ(id)/3;}}
    color.multiplyScalar(.75+Math.max(0,normal.dot(new THREE.Vector3(-.3,.9,.2).normalize()))*.3).lerp(scene.background,Math.max(0,Math.min(1,(distance-9)/13)));
    faces.push({depth:projected.reduce((sum,v)=>sum+v.z,0)/3,svg:'<polygon points="'+projected.map(v=>((v.x+1)*w/2).toFixed(1)+','+((1-v.y)*h/2).toFixed(1)).join(' ')+'" fill="#'+color.getHexString()+'" stroke="#'+color.getHexString()+'" stroke-width=".45"/>'});
   }
  });
  faces.sort((a,b)=>b.depth-a.depth);
  container.innerHTML='<svg viewBox="0 0 '+w+' '+h+'" width="100%" height="100%" role="img" aria-label="Third-person beaver view of the creek">'+faces.map(f=>f.svg).join('')+'</svg>';
 }
 return {mode:renderer?'WebGL':'Compatibility renderer',update(s,view,time){
  inventory(s);
  const mode=movementMode(s.x,s.z),swim=mode==='swimming',moving=view.moving;
  beaver.position.set(s.x,swim?-.12:groundHeight(s.x,s.z),s.z);
  const turn=Math.atan2(Math.sin(-s.yaw-beaver.rotation.y),Math.cos(-s.yaw-beaver.rotation.y));
  beaver.rotation.y+=turn*(1-Math.exp(-Math.min(.2,(time-lastFrame)/1000)*14));lastFrame=time;
  body.scale.y=swim?.8:1;
  if(!reduced&&moving)body.position.y=.36+Math.sin(time*.012)*.025;
  else body.position.y=.36;
  legs.forEach((leg,i)=>{leg.position.y=.11+(moving&&!reduced?Math.sin(time*.015+i*Math.PI)*.06:0);});
  cargo.visible=s.carrying;cargo.rotation.y=swim?-.15:.15;
  wake.visible=swim&&moving;wake.position.set(s.x,.025,s.z);wake.rotation.z=s.yaw;
  for(const tile of waterTiles)tile.visible=Math.hypot(tile.position.x-s.x,tile.position.z-s.z)<20;
  for(const tree of trees)tree.visible=Math.hypot(tree.position.x-s.x,tree.position.z-s.z)<16;
  for(const plant of plants)plant.visible=Math.hypot(plant.position.x-s.x,plant.position.z-s.z)<14;
  grove.visible=Math.hypot(GROVE.x-s.x,GROVE.z-s.z)<15;
  lodge.visible=Math.hypot(LODGE.x-s.x,LODGE.z-s.z)<18;
  const boom=cameraBoom(s,view.yaw,view.distance,view.pitch);
  // Boom obstruction is resolved immediately, preventing interpolation through a bank.
  camera.position.set(boom.position.x,boom.position.y,boom.position.z);camera.lookAt(boom.target.x,boom.target.y,boom.target.z);camera.updateMatrixWorld();
  if(renderer)renderer.render(scene,camera);
  else if(time-lastFallback>120||view.force){compatibility(s);lastFallback=time;}
 },dispose(){renderer?.dispose();world.traverse(o=>o.geometry?.dispose());}};
}
