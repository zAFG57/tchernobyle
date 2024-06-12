const Ia = require("./Ia");
const { nbSurvivor, nbPopulation, chanceBais, chancePoid, chanceLien, chanceNoeud } = require("../utils/const");

class Trainer {
    constructor(fFunction, brain, trainingData) {
        this.fintnessFunction = fFunction;
        this.Mother = new Ia(brain);
        this.trainingData = trainingData;
        this.nbGen = 0;
        this.bestScore = 0;
        this.bestChild = this.Mother;
        this.needToStop = false;
        this.IsStoped = true;
        this.currentGen = [];
    }

    startTraining() {
        this.needToStop = false;
        this.IsStoped = false;
        for (let i=0; i<nbPopulation; i++) {
            let child = new Ia(JSON.parse(this.Mother.toJson()))
            if (Math.random()>chanceBais) child.mutateBiais();
            else child.mutatePoids();
            this.currentGen.append(child);
        }
        this.nextGenPls()
    }

    nextGenPls() {
        if (this.needToStop) {this.IsStoped = true;return;}

        // on lance toutes les IA
        // on calcul la fitness de toutes les IA
        // on sélectionne les winners
        // on fait reproduire les winners

        if (this.needToStop) {this.IsStoped = true;return;}
        setTimeout(()=>{this.nextGenPls()},0);
    }
}

module.exports = Trainer