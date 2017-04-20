export function getStateCopy(state){
    let stateCopy = JSON.parse(JSON.stringify(state));
    return stateCopy;
}