const Noeud = require('./Noeud.js');
const NoeudEntrer = require('./NoeudEntrer.js');
const NoeudSortie = require('./NoeudSortie.js');
let error = require("../utils/internalIaFunction.js").error;

class Ia {
    constructor(brain) {
        this.nbNodes = 0;
        this.nodes = {};
        this.inputNodes = [];
        this.outputNodes = [];
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


}

module.exports = Ia