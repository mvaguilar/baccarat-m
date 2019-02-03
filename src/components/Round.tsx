export class Round {

    roundName: string;
    playerWin: boolean;
    bankerWin: boolean;
    tie: boolean;
    playerPair: boolean;
    bankerPair: boolean;
    roundResult: string;

    constructor(roundName: string, playerWin: boolean, bankerWin: boolean, tie: boolean, playerPair: boolean, bankerPair: boolean) {
        this.roundName = roundName;
        this.playerWin = playerWin;
        this.bankerWin = bankerWin;
        this.tie = tie;
        this.playerPair = playerPair;
        this.bankerPair = bankerPair;
    }

    updatePlayerPair() {
        this.playerPair = true;
    }

    updateBankerPair() {
        this.bankerPair = true;
    }

    getRoundName(){
        return this.roundName;
    }

    getPlayerWin() {
        if (this.playerWin)
        return "O"
        else
        return " ";
    }

    getBankerWin() {
        if (this.bankerWin)
        return "O"
        else
        return " ";
    }

    getTie() {
        if (this.tie)
        return "O"
        else
        return " ";
    }

    getPlayerPair() {
        if (this.playerPair)
        return "O"
        else
        return " ";
    }

    getBankerPair() {
        if (this.bankerPair)
        return "O"
        else
        return " ";
    }

    getRoundResult() {
        this.roundResult = "";
        if (this.playerWin) {
            this.roundResult = "1/0/0"
        }
        if (this.bankerWin) {
            this.roundResult = "0/1/0"
        }
        if (this.tie) {
            this.roundResult = "0/0/1"
        }
        if (this.playerPair) {
            this.roundResult = this.roundResult+"/1"
        } else {
            this.roundResult = this.roundResult+"/0"
        }
        if (this.bankerPair) {
            this.roundResult = this.roundResult+"/1"
        } else {
            this.roundResult = this.roundResult+"/0"
        }

        return this.roundResult;
    }
}

export default Round;
