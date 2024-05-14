const Noeud = require('./Noeud.js');

class NoeudEntrer extends Noeud {

    constructor(noeud,ia) {
        super(noeud,ia);
    }
    isInput() {
        return true;
    }
}

module.exports = NoeudEntrer