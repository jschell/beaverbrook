// Visual mapping of authored scenario stages; not a hydrology simulation.
export const GROUND_HEIGHT=.41;
export const BED_HEIGHT=.44;
export const WATER_VIEWS={
 low:{label:'Low water',height:.52,width:.78,pondWidth:.82},
 normal:{label:'Normal water',height:.70,width:1,pondWidth:1},
 high:{label:'High water',height:1.06,width:1.45,pondWidth:1.14}
};
export const viewForStage=stage=>stage==='prepare'?'normal':stage==='recover'?'high':'low';
export const entranceStatus=slot=>slot==='Cs'?'Exposed at low water':'Submerged at low water';
