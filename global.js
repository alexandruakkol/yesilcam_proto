var GPC = {};
export function setGPC(newgpc){
GPC=newgpc;
console.log('set', GPC)
}
export function getGPC(){
    return GPC;
}
export default GPC;
