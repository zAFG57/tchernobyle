
function getCumuleFunction(id) {
    return (value1,value2) => value1+value2
}

function getActivationFunction(id) {
   return (value) => {if(value>=0.5)return value;return 0;}
}

function error(message) {
    console.log(message);
    process.exit(1);
}

function randomElementArray(array) {
    return array[Object.keys(array)[Math.floor(Math.random() * Object.keys(array).length)]];
}

module.exports = { getCumuleFunction, getActivationFunction, error , randomElementArray};