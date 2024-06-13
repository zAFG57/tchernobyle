const Ia = require("./Ia");
const { nbSurvivor, nbPopulation, chanceBais, chancePoid, chanceLien, chanceNoeud } = require("../utils/const");
const { randomElementArray } = require("../utils/internalIaFunction");

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
        this.currentGenScore = {};
        this.nbGen = 0;
    }

    startTraining() {
        this.needToStop = false;
        this.IsStoped = false;
        for (let i=0; i<nbPopulation; i++) {
            let child = this.Mother.clone();
            if (Math.random()>chanceBais) child.mutateBiais();
            else child.mutatePoids();
            this.currentGen.push(child);
        }
        this.nextGenPls();
    }

    nextGenPls() {
        if (this.needToStop) {this.IsStoped = true;return;}
        this.nbGen ++;
        // on lance toutes les IA
        // on calcul la fitness de toutes les IA
        for (let i=0; i<this.currentGen.length; i++) {
            let score = 0;
            for (let y=0; y<4; y++) {
                this.currentGen[i].input(this.trainingData["input"][y]);
                this.currentGen[i].compute();
                let output = this.currentGen[i].output();
                score += this.fintnessFunction({"input": this.trainingData["input"][y], "output": this.trainingData["output"][y]},output);
            }
            
            if (score>this.bestScore) {
                this.bestScore = score;
                this.bestChild = this.currentGen[i];
                console.log(this.bestScore);
            }
            this.currentGenScore[i] = score
        }
        // on sélectionne les winners
        let self = this;
        let list = Object.keys(this.currentGenScore).map(function(key) {
            return [key, self.currentGenScore[key]];
        });
        list.sort(function(first, second) {
            return second[1] - first[1];
        });
        let winners = list.slice(0, nbSurvivor);
        // on fait reproduire les winners
        let nextGen = [];
        for (let i=0; i<nbSurvivor; i++) {
            let reproductor = this.currentGen[winners[i][0]]
            nextGen.push(reproductor);
            for(let y=0; y<nbPopulation/nbSurvivor; y++) {
                let r = Math.random();
                let child = reproductor.clone();
                if (r>chanceBais) {
                    child.mutateBiais();
                } else {
                    child.mutatePoids();
                }
                nextGen.push(child);
            }
        }
        this.currentGen = nextGen;
        this.currentGenScore = {};
        if (this.needToStop) {this.IsStoped = true;return;}
        setTimeout(()=>{this.nextGenPls()},0);
    }
}

module.exports = Trainer