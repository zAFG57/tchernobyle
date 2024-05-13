const Noeud = require('./Noeud.js');
const NoeudEntrer = require('./NoeudEntrer.js');
const NoeudSortie = require('./NoeudSortie.js');

class IA {
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
                node = /* nouveau noeud d'entrer */ null
                this.inputNodes.push(i);
            }  else if (n["isOutput"]) {
                node = /* nouveau noeud d'sortie */ null
                this.outputNodes.push(i);
            } else {
                node = /* nouveau noeud */ null
            }
            this.nodes.push({"id":n["id"],"node": node });
        }
    }

}

module.exports = IA