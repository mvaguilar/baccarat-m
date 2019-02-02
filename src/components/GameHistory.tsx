import Round from "./Round";

export class GameHistory{

    rounds:Round[] = [];

    constructor () {
    }

    addToRecord(roundResult:Round) {
        this.rounds.push(roundResult);
        return this.rounds;
    }

    getPastResults() {
        return this.rounds;
    }
}

export default GameHistory;