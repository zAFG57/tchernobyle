const { json } = require("stream/consumers");
const Lien = require("./Lien.js");

class Noeud {

    constructor(noeud,ia) {
        this.value = 0;
        this.ia = ia;
        this.id = noeud["id"];
        this.nbPrecedent = noeud["nbPrecedent"];
        this.nbSuivant = noeud["nbSuivant"];
        this.function = noeud["function"];
        this.nbActivation = 0;
        this.connexion = [];
        for (let i=0; i<noeud["listLien"].length; i++) {
            let lien = noeud["listLien"][i];
            this.connexion.push(new Lien(lien,this));
        }
    }

    updateLien() {
        for (let [k,l] of Object.entries(this.connexion)) {
            l.updateLien();
        }
    }

    isInput() {
        return false;
    }
    isOutput() {
        return false;
    }

    toJson() {
        let noeud = {}
        noeud["id"] = this.id;
        noeud["function"] = this.function;
        noeud["isInput"] = this.isInput();
        noeud["isOutput"] = this.isOutput();
        noeud["nbPrecedent"] = this.nbPrecedent;
        noeud["nbSuivant"] = this.nbSuivant;
        let lien = [];
        for (let [k,l] of Object.entries(this.connexion)) {
            lien.push(l.toJson());
        }
        noeud["listLien"] = lien;
        return noeud;
    }
}

module.exports = Noeud