import {LODGE,LODGE_APPROACH,groundHeight,waterLevel} from './explore-rules.mjs?v=lodge-access-1';
import {homeStatus} from './habitat-rules.mjs';
// An explanatory section, not a traversable tunnel or a new access predicate.
export function lodgeSection(state){
 const home=homeStatus(state),x0=LODGE.x-1.3,x1=LODGE_APPROACH.x+1.2,X=x=>18+(x-x0)/(x1-x0)*284,Y=y=>170-y*58;
 const samples=Array.from({length:65},(_,i)=>{const x=x0+(x1-x0)*i/64;return{x,h:groundHeight(x,LODGE_APPROACH.z,state),water:waterLevel(x,LODGE_APPROACH.z,state)};});
 const soil=samples.map(p=>`${X(p.x).toFixed(2)},${Y(p.h).toFixed(2)}`).join(' '),width=284/64;
 const water=samples.slice(0,-1).filter(p=>p.water!==undefined&&p.water>p.h).map(p=>`<rect x="${X(p.x).toFixed(2)}" y="${Y(p.water).toFixed(2)}" width="${(width+.1).toFixed(2)}" height="${((p.water-p.h)*58).toFixed(2)}" fill="#68a1ab"/>`).join('');
 const floor=groundHeight(LODGE_APPROACH.x,LODGE_APPROACH.z,state),cx=X(LODGE.x),cy=Y(groundHeight(LODGE.x,LODGE.z,state)+.45),ex=X(LODGE_APPROACH.x),ey=Y(floor+.15);
 const text=`Entrance depth ${home.depth.toFixed(2)} · ${home.protected?'protected underwater access':'exposed or too shallow'}. The chamber stays in the bank; a passage beneath the soil leads to the creek mouth. Deepen the approach or hold more pond water.`;
 const svg=`<svg viewBox="0 0 320 220" role="img" aria-label="Bank lodge section: dry chamber connects beneath the bank to the creek entrance. ${home.protected?'Entrance has protected underwater access.':'Entrance is exposed or too shallow.'}" data-access="${home.protected?'protected':'shallow'}" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="220" rx="8" fill="#f5f0dc"/><polygon points="18,207 ${soil} 302,207" fill="#b59970"/>${water}<ellipse cx="${cx}" cy="${cy}" rx="27" ry="18" fill="#f5e5bc" stroke="#715039" stroke-width="3"/><path d="M ${cx} ${cy+16} L ${cx+17} ${cy+37} L ${ex} ${ey}" fill="none" stroke="#533f2f" stroke-width="7" stroke-dasharray="6 3"/><ellipse cx="${ex}" cy="${ey}" rx="5" ry="9" fill="#302b21"/><g font-family="system-ui,sans-serif" font-size="12" fill="#243d32"><text x="18" y="20">Dry chamber</text><text x="120" y="20">Bank lodge</text><text x="243" y="65">Creek</text><text x="${ex-28}" y="195">Entrance</text><text x="18" y="213">Passage shown schematically</text></g><path d="M ${cx} 25 L ${cx} ${cy-20}" stroke="#715039"/></svg>`;
 return{svg,text,depth:home.depth,protected:home.protected};
}
