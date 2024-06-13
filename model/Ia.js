const Noeud = require('./Noeud.js');
const NoeudEntrer = require('./NoeudEntrer.js');
const NoeudSortie = require('./NoeudSortie.js');
let { error , randomElementArray} = require("../utils/internalIaFunction.js");

class Ia {
    //#region base
    constructor(brain) {
        this.nbNodes = 0;
        this.nodes = {};
        this.inputNodes = [];
        this.outputNodes = [];
        this.callBack = ()=>{error("function callBack non définie dans Ia.js");};
        for (let i=0; i<brain["listNoeud"].length; i++) {
            let n = brain["listNoeud"][i];
            this.nbNodes ++;
            let node = null;
            if (n["isInput"]) {
                node = new NoeudEntrer(n,this);
                this.inputNodes.push(n["id"]);
            }  else if (n["isOutput"]) {
                node = new NoeudSortie(n,this);
                this.outputNodes.push(n["id"]);
            } else {
                node = new Noeud(n,this);
            }
            this.nodes[n["id"]] = node;
        }
        for (let [k,n] of Object.entries(this.nodes)) {
            n.updateLien();
        }
    }
    
    toJson() {
        let brain = {};
        let ln = [];
        for (let [k,node] of Object.entries(this.nodes)) {
            ln.push(node.toJson());
        }
        brain["listNoeud"] = ln;
        return JSON.stringify(brain);
    }

    input(val) {
        if(val.length != this.inputNodes.length) error("le nombre d'input est différent du nombre de node input");
        for (let i=0; i<val.length; i++) {
            this.nodes[this.inputNodes[i]].value = val[i];
        }
    }

    output() {
        let ret = [];
        for (let i=0; i<this.outputNodes.length; i++) {
            ret.push(this.nodes[this.outputNodes[i]].value);
        }
        return ret;
    }

    clone() {
        return new Ia(JSON.parse(this.toJson()));
    }
 
    compute() {
        for(let i in this.inputNodes) {
            this.nodes[i].startInputing();
        }
    }
    //#endregion base

    //#region радиоактивная зона
    mutateBiais() {
        let node = randomElementArray(this.nodes);
        let lien = randomElementArray(node.connexion);
        while(lien == undefined) {
            node = randomElementArray(this.nodes);
            lien = randomElementArray(node.connexion);
        }
        lien.biais = Math.random();
    }

    mutatePoids() {
        let node = randomElementArray(this.nodes);
        let lien = randomElementArray(node.connexion);
        while(lien == undefined) {
            node = randomElementArray(this.nodes);
            lien = randomElementArray(node.connexion);
        }
        lien.poid = Math.random();
    }

    mutateLien() {

    }

    mutateNode() {

    }

    //#endregion радиоактивная зона 
}

module.exports = Ia