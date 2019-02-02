export class Round {

    playerWin: boolean;
    bankerWin: boolean;
    tie: boolean;
    playerPair: boolean;
    bankerPair: boolean;

    constructor(playerWin: boolean, bankerWin: boolean, tie: boolean, playerPair: boolean, bankerPair: boolean) {
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
}

export default Round;
