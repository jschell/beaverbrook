// Opening-session observations and feedback; never creates resources or unlocks actions.
import {lodgeApproachDepth,waterLevel} from './explore-rules.mjs';
const dry=s=>s.day%6>=4||s.day%6===0;
const improvements={build:'dam',dig:'channel',entrance:'entrance',customBuild:'new-dam'};
export function initialJourney(s){
 const history=s.history||[];
 return {version:1,broughtHome:history.filter(p=>p.action==='store').length,foodGiven:0,improvements:[...new Set(history.map(p=>improvements[p.action]).filter(Boolean))],drySeen:dry(s),normalWater:null,completedDay:null};
}
export function validJourney(j,s){
 const integer=n=>Number.isInteger(n)&&n>=0&&n<=1e6;
 return j&&j.version===1&&integer(j.broughtHome)&&integer(j.foodGiven)&&Array.isArray(j.improvements)&&j.improvements.every(p=>Object.values(improvements).includes(p))&&typeof j.drySeen==='boolean'&&(j.normalWater===null||Number.isFinite(j.normalWater)&&Math.abs(j.normalWater)<20)&&(j.completedDay===null||integer(j.completedDay)&&j.completedDay>=1&&j.completedDay<=s.day);
}
export function advanceJourney(before,after,action){
 const j=structuredClone(before.journey||initialJourney(before));
 if(action==='store'){j.broughtHome++;j.foodGiven+=before.cargo?.food||0;}
 if(improvements[action]&&!j.improvements.includes(improvements[action]))j.improvements.push(improvements[action]);
 if(action==='rest'){
  if(!dry(before)&&dry(after))j.normalWater=waterLevel(0,6,before)??null;
  j.drySeen ||= dry(before)||dry(after);
  // Completion witnesses a real fed night at low water, with food still in reserve.
  if(!j.completedDay&&dry(before)&&lodgeApproachDepth(before)>=.32&&after.ledger.foodEaten-before.ledger.foodEaten===2&&after.food>=2)j.completedDay=after.day;
 }
 return j;
}
export function familyOutlook(s){
 const accessible=lodgeApproachDepth(s)>=.32;
 if(s.food<2)return {mood:'hungry',text:'The family is short of supper.',accessible};
 if(!accessible)return {mood:'shallow',text:'The family has food, but the way home is shallow.',accessible};
 return {mood:'settled',text:'The family can swim home and has food for supper.',accessible};
}
export function familyActivity(s){
 const {accessible,mood}=familyOutlook(s);
 const route=accessible?'The adult can swim along the lodge approach.':'The adult stays by the bank: the lodge approach is too shallow to swim.';
 return route+(mood==='hungry'?' The family needs more food before the next rest.':' There is food for the next family supper.');
}
export function journeyStatus(s){
 const j=s.journey||initialJourney(s);
 return {complete:!!j.completedDay,title:j.completedDay?'A home through low water':dry(s)?'The creek is low':'Low water is coming',forecast:dry(s)?j.normalWater===null?'Low water exposes more bank. Revisit your routes.':'The exposed band shows where the water used to reach.':s.day%6===3?'Water will fall after tonight.':'A dry spell is approaching. Rest at home when you are ready.',goal:j.completedDay?'Keep exploring and choose what to improve next.':'Help the family through a low-water night, with food left for tomorrow.'};
}
export function journeyHint(s){
 const j=s.journey||initialJourney(s),family=familyOutlook(s);
 if(s.cargo?.mud)return 'Carry this sealing mud to a dam framework and pack it, or store it at the lodge. Wood builds the framework; mud seals it.';
 if(s.cargo)return 'Bring this load to the lodge to feed the family and store wood, or deliver its wood directly at a dam. Find home on your map.';
 if(!j.broughtHome)return 'Try bringing a leafy branch home. The light-leaved willow nearby gives food and wood. Approach it and press E, then return to the lodge.';
 if(dry(s)&&!family.accessible)return 'The water fell below the lodge approach. You can deepen that approach or retain more water with a dam. Choose the change that helps your creek.';
 if(s.food<4)return 'Browse for food or gather leafy branches and bring them home. The family eats when you rest; keep some food for the following night.';
 if(j.completedDay)return 'Follow an unfamiliar bank, improve a hauling route, or try a new dam. Your home stays here while you experiment.';
 if(!j.improvements.length)return 'Try another supply trip. Where does dragging feel awkward? A channel, more water, or a deeper lodge approach can help in different ways.';
 return 'Rest at the lodge when you want to see what holds up as water changes. You can also keep exploring or prepare more food first.';
}
export function journeyFeedback(before,after,action){
 const old=before.journey||initialJourney(before),next=after.journey||initialJourney(after);
 if(!old.completedDay&&next.completedDay)return 'The family has spent a fed night at low water, with food left for tomorrow. This home is working. The creek is still yours to explore.';
 if(!old.drySeen&&next.drySeen)return 'The creek dropped overnight. A pale band marks the old water level. Revisit your lodge approach and hauling cuts; you can adapt and keep going.';
 if(action==='store'&&!old.broughtHome)return 'Your first load is home. The family has more to work with. Try another route, deepen the approach, or help the dam hold water — the choice is yours.';
 if(!familyOutlook(before).accessible&&familyOutlook(after).accessible)return 'The family can now swim through the lodge approach. Watch them use it; reaching home will no longer cost extra energy after rest.';
 if(action==='store'&&before.cargo?.food)return 'Food is home. The family has another supper in reserve; the leafy pile beside the lodge shows your supply.';
 return null;
}
