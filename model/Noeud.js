
class Noeud {

    constructor(noeud) {
        this.id = noeud["id"];
        this.nbPrecedent = noeud["nbPrecedent"];
        this.nbSuivant = noeud["nbSuivant"];
        this.function = noeud["function"];
        this.nbActivation = 0;
        this.connexion = [];
        for (let i=0; i<noeud["listLien"].length; i++) {
            let l = noeud["listLien"][i];
            
        }
    }
}

module.exports = Noeud