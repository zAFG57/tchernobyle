
class Lien {

    constructor(lien,noeud) {
        this.noeudOrigine = noeud;
        this.noeudDestination = lien["id"];
        this.poid = lien["poid"];
        this.biais = lien["biais"];
        this.function = lien["function"];
    }

    updateLien() {
        this.noeudDestination = this.noeudOrigine.ia.nodes[this.noeudDestination];
    }

    toJson() {
        let lien = {};
        lien["id"] = this.noeudDestination.id;
        lien["poid"] = this.poid;
        lien["biais"] = this.biais;
        lien["function"] = this.function;
        return lien;
    }
}

module.exports = Lien