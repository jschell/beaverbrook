import {initialChannelDemo, creekAct, routeTo} from './creek-rules.mjs';

export function familyHaul(creek) {
  const gathered = creekAct(creek, {type:'gather', id:'trees', food:true});
  if (!gathered.ok) return null;
  const carried = gathered.state;
  const delivered = creekAct(carried, {type:'deliver', job:'cache'});
  if (!delivered.ok) return null;
  return {carried, route:delivered.state.lastRoute, home:delivered.state};
}

export function familyRoute(creek) {
  return routeTo(creek, 'trees', 'cache');
}

export function restAtHome(creek) {
  const next = structuredClone(creek);
  next.season = 'dry';
  next.stock.cache.food = Math.max(0, next.stock.cache.food - 2);
  next.lastRoute = null;
  return next;
}
