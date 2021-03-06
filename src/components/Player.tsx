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
            //Player Wins, double the bet for the win
            this.chips += this.playerBet * 2
        }
        if (currentRound.bankerWin) {
            //Banker Wins, the bet and 95% of it for the win 
            this.chips += this.bankerBet * 1.95
        }
        if (currentRound.tie) {
            //Tie, 8 to 1 for the win, then return the bets
            this.chips += this.tieBet * 8
            this.chips += this.totalBetThisRound;
            this.chips -= this.playerPairBet
            this.chips -= this.bankerPairBet
            this.chips -= this.tieBet
        }
        if (currentRound.playerPair) {
            //Player pair is 11 to 1 for the win
            this.chips += this.playerPairBet * 11
        }
        if (currentRound.bankerPair) {
            //Banker pair is 11 to 1 for the win
            this.chips += this.bankerPairBet * 11
        }
        console.log("Funds: "+this.chips);
        this.clearBets();
        return this.chips;
    }
}

export default Player;