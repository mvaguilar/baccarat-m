import Round from "./Round";

export class Player {

    chips: number;
    playerBet: number;
    bankerBet: number;
    tieBet: number;
    playerPairBet: number;
    bankerPairBet: number;
    currentRound: Round;
    totalBetThisRound: number;

    constructor() {
        this.chips = 1000;
        this.playerBet = 0;
        this.bankerBet = 0;
        this.tieBet = 0;
        this.playerPairBet = 0;
        this.bankerPairBet = 0;
        this.totalBetThisRound = 0;
    }

    resetPlayer() {
        this.chips = 1000;
        this.playerBet = 0;
        this.bankerBet = 0;
        this.tieBet = 0;
        this.playerPairBet = 0;
        this.bankerPairBet = 0;
        this.totalBetThisRound = 0;
    }

    clearBets() {
        this.playerBet = 0;
        this.bankerBet = 0;
        this.tieBet = 0;
        this.playerPairBet = 0;
        this.bankerPairBet = 0;
        console.log(this.totalBetThisRound);
        this.totalBetThisRound = 0;
    }

    putBets(playerBet: number, bankerBet: number, tieBet: number, playerPairBet: number, bankerPairBet: number) {
        this.playerBet += playerBet;
        this.bankerBet += bankerBet;
        this.tieBet += tieBet;
        this.playerPairBet += playerPairBet;
        this.bankerPairBet += bankerPairBet;

        this.totalBetThisRound += playerBet + bankerBet + tieBet + playerPairBet + bankerPairBet;
        console.log(this.totalBetThisRound);
        if (this.chips >= this.totalBetThisRound) {
            // this.chips -= this.totalBetThisRound;
            return true;
        } else {
            this.totalBetThisRound -= playerBet + bankerBet + tieBet + playerPairBet + bankerPairBet;
            this.playerBet -= playerBet;
            this.bankerBet -= bankerBet;
            this.tieBet -= tieBet;
            this.playerPairBet -= playerPairBet;
            this.bankerPairBet -= bankerPairBet;
            return false;
        }
    }

    updateChips(currentRound:Round) {
        this.chips -= this.totalBetThisRound;
        if (currentRound.playerWin) {
            this.chips += this.playerBet * 2
        }
        if (currentRound.bankerWin) {
            this.chips += this.bankerBet * 1.95
        }
        if (currentRound.tie) {
            this.chips += this.tieBet * 8
        }
        if (currentRound.playerPair) {
            this.chips += this.playerPairBet * 11
        }
        if (currentRound.bankerPair) {
            this.chips += this.bankerPairBet * 11
        }
        console.log("Funds: "+this.chips);
        this.clearBets();
        return this.chips;
    }
}

export default Player;