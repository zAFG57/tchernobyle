//#region import
const fs = require('node:fs');
//#endregion import
//#region localFile
const Ia = require('./model/Ia.js');
const Lien = require('./model/Lien.js');
const Noeud = require('./model/Noeud.js');
const NoeudEntrer = require('./model/NoeudEntrer.js');
const NoeudSortie = require('./model/NoeudSortie.js');
const Trainer = require("./model/Trainer.js");
//#endregion localFile

let data = null;
try {
    data = fs.readFileSync("./brain/sample/1.json",'utf8');
} catch (err) {
    console.log(err);
    process.exit(1);
}

let brain = JSON.parse(data)
let ia = new Ia(brain);
ia.input([0,1]);
console.log(ia.output());
ia.compute();
console.log(ia.output());

let fFunction = (data,output) => {
    let notGood = false;
    let ret = 0;
    if(output[0]<0 || output[0]>1) {
        output[0] = Math.abs(output[0]);
        notGood = true;
    }
    if (output[0] > 1) ret = 1/(1+output);
    else ret = 0.5

    if (data["output"][0] == 1) {ret += (1 - data["output"][0] - output[0]);}
    else ret += (1 - output[0]);
    ret = 25*ret/1.5
    if (notGood) ret -= 15;
    return ret;
}

trdata = {
    "input": [
        [0,0],
        [1,0],
        [0,1],
        [1,1]
    ],
    "output": [
        [0],
        [1],
        [1],
        [0]
    ]
}

let trainer = new Trainer(fFunction,brain,trdata);

trainer.startTraining();