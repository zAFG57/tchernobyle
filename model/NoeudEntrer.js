const Noeud = require('./Noeud.js');

class NoeudEntrer extends Noeud {

    constructor(noeud,ia) {
        super(noeud,ia);
    }
    isInput() {
        return true;
    }

    startInputing() {
        for (let [k,lien] of Object.entries(this.connexion)) {
            lien.send(this.value);
        }
    }
}

module.exports = NoeudEntrer