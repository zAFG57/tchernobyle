//#region import
const fs = require('node:fs');
//#endregion import
//#region localFile
const Ia = require('./model/Ia.js');
const Lien = require('./model/Lien.js');
const Noeud = require('./model/Noeud.js');
const NoeudEntrer = require('./model/NoeudEntrer.js');
const NoeudSortie = require('./model/NoeudSortie.js');
//#endregion localFile

let data = null;
try {
    data = fs.readFileSync("./brain/sample/1.json",'utf8');
} catch (err) {
    console.log(err);
    process.exit(1);
}

let ia = new Ia(JSON.parse(data));
ia.input([0,1]);
console.log(ia.output());
ia.compute();
console.log(ia.output());