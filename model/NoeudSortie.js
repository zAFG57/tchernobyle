const Noeud = require('./Noeud.js');

class NoeudSortie extends Noeud {

    constructor(noeud,ia) {
        super(noeud,ia);
    }
    isOutput() {
        return true;
    }
}

module.exports = NoeudSortie