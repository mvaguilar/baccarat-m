import * as React from "react";
import Card from "./Card";
import TheShoe from "./TheShoe";
import './Table.css';
import Round from './Round';
import GameHistory from './GameHistory';
import GameHistoryPopup from './GameHistoryPopup';
import Player from './Player';

export interface IProps {
    name: string;
}

interface IState {
    value: string;
    showPopup: boolean;
    playerBetValue: number;
    bankerBetValue: number;
    tieBetValue: number;
    playerPairBetValue: number;
    bankerPairBetValue: number;
    roundResultValue: string;
}

var theShoe: Card[] = [];
var gameHistoryValue: GameHistory;
var playerStat: Player;
var roundName: number;
var playerBet: number;
var bankerBet: number;
var tieBet: number;
var playerPairBet: number;
var bankerPairBet: number;
var roundResult: string;

//Table Class - Main Class for rendering and building the Game
class Table extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        roundName = 0;
        playerBet = 0;
        bankerBet = 0;
        tieBet = 0;
        playerPairBet = 0;
        bankerPairBet = 0;
        roundResult = '';
        gameHistoryValue = new GameHistory();
        playerStat = new Player();
        this.createTheShoe();

        this.state = {
            value: '0',
            showPopup: false,
            playerBetValue: 0,
            bankerBetValue: 0,
            tieBetValue: 0,
            playerPairBetValue: 0,
            bankerPairBetValue: 0,
            roundResultValue: ''
        };
    }

    //Restart the Table/Generate New cards for the game
    public onNewCards = () => this.restartGame();

    //Shuffle current Cards in the Shoe
    public onShuffleCards = () => this.shuffleCurrentCards();

    //Deal the round, calculate result
    public onDeal = () => this.dealCards();

    //show record of past rounds and the results
    public showGameHistory = () => this.gameHistory();

    // Coins and Bets (5,25,100,500 denomination)
    public putPlayerBet5 = () => this.playerBet(5);
    public putBankerBet5 = () => this.bankerBet(5);
    public putTieBet5 = () => this.tieBet(5);
    public putPlayerPairBet5 = () => this.playerPairBet(5);
    public putBankerPairBet5 = () => this.bankerPairBet(5);

    public putPlayerBet25 = () => this.playerBet(25);
    public putBankerBet25 = () => this.bankerBet(25);
    public putTieBet25 = () => this.tieBet(25);
    public putPlayerPairBet25 = () => this.playerPairBet(25);
    public putBankerPairBet25 = () => this.bankerPairBet(25);

    public putPlayerBet100 = () => this.playerBet(100);
    public putBankerBet100 = () => this.bankerBet(100);
    public putTieBet100 = () => this.tieBet(100);
    public putPlayerPairBet100 = () => this.playerPairBet(100);
    public putBankerPairBet100 = () => this.bankerPairBet(100);

    public putPlayerBet500 = () => this.playerBet(500);
    public putBankerBet500 = () => this.bankerBet(500);
    public putTieBet500 = () => this.tieBet(500);
    public putPlayerPairBet500 = () => this.playerPairBet(500);
    public putBankerPairBet500 = () => this.bankerPairBet(500);
    //End of Coins and Bets

    //Clear bets
    public onClearBets = () => this.clearBets();

    //Possible Bets (Player, Bank, Tie, Pairs)
    public playerBet(betValue: number) {
        console.log('You Bet: ' + betValue + ' on Player');
        if (!playerStat.putBets(betValue, 0, 0, 0, 0)) {
            console.log('Insufficient Funds');
            window.confirm('Insufficient Funds!')
        } else {
            playerBet += betValue;
            this.setState({ playerBetValue: playerBet });
        }
    }

    public bankerBet(betValue: number) {
        console.log('You Bet: ' + betValue + ' on Player');
        if (!playerStat.putBets(0, betValue, 0, 0, 0)) {
            console.log('Insufficient Funds');
            window.confirm('Insufficient Funds!')
        } else {
            bankerBet += betValue;
            this.setState({ bankerBetValue: bankerBet });
        }
    }

    public tieBet(betValue: number) {
        console.log('You Bet: ' + betValue + ' on Player');
        if (!playerStat.putBets(0, 0, betValue, 0, 0)) {
            console.log('Insufficient Funds');
            window.confirm('Insufficient Funds!')
        } else {
            tieBet += betValue;
            this.setState({ tieBetValue: tieBet });
        }
    }

    public playerPairBet(betValue: number) {
        console.log('You Bet: ' + betValue + ' on Player');
        if (!playerStat.putBets(0, 0, 0, betValue, 0)) {
            console.log('Insufficient Funds');
            window.confirm('Insufficient Funds!')
        } else {
            playerPairBet += betValue;
            this.setState({ playerPairBetValue: playerPairBet });
        }
    }

    public bankerPairBet(betValue: number) {
        console.log('You Bet: ' + betValue + ' on Player');
        if (!playerStat.putBets(0, 0, 0, 0, betValue)) {
            console.log('Insufficient Funds');
            window.confirm('Insufficient Funds!')
        } else {
            bankerPairBet += betValue;
            this.setState({ bankerPairBetValue: bankerPairBet })
        }
    }
    //End Possible Bets (Player, Bank, Tie, Pairs)

    public createTheShoe() {
        theShoe = shuffle(new TheShoe().create());
        playerStat.resetPlayer();
        this.setState({ value: String(playerStat.chips) });
    }

    public restartGame() {
        theShoe = shuffle(new TheShoe().create());
        playerStat.resetPlayer();
        this.setState({ value: String(playerStat.chips) });
        clearCards();
    }

    public shuffleCurrentCards() {
        shuffle(theShoe)
    }

    public dealCards() {
        if (theShoe.length < 52) {
            roundResult = 'Cards in the Shoe is not enought, restart to continue playing.';
            this.setState({ roundResultValue: roundResult });
        } else {
            clearCards();
            deal(theShoe);
            this.setState({ value: String(playerStat.chips) });
            this.setState({ roundResultValue: roundResult });
        }
    }

    public clearBets() {
        console.log(playerStat);
        clearCards();
        playerStat.clearBets();

        playerBet = 0;
        this.setState({ playerBetValue: 0 });
        bankerBet = 0;
        this.setState({ bankerBetValue: 0 });
        tieBet = 0;
        this.setState({ tieBetValue: 0 });
        playerPairBet = 0;
        this.setState({ playerPairBetValue: 0 });
        bankerPairBet = 0;
        this.setState({ bankerPairBetValue: 0 });

        console.log(playerStat);
    }

    public gameHistory() {
        if (gameHistoryValue != undefined) {
            this.setState({
                showPopup: !this.state.showPopup
            });
        }
    }

    public render() {
        return (
            <div className="hello">
                <div className="greeting">
                    <button className="restart-game" onClick={this.onNewCards}>Restart Shoe</button>
                    <label className="Spades">&spades;</label>
                    <label className="Hearts">&hearts;</label>
                    Lets Play Baccarat!
                <label className="Clubs">&clubs;</label>
                    <label className="Diamonds">&diams;</label>
                </div>
                <div>
                    <input className="result" value={roundResult} readOnly /><br></br>
                </div>
                <div>
                    <div className="card-table">
                        {/* Player Side */}
                        <label>Player</label>
                        <div className="cards" id="playerThird">
                            <span className="image"></span>
                            <span className="suit"></span>
                        </div>
                        <div className="cards" id="playerSecond">
                            <span className="image"></span>
                            <span className="suit"></span>
                        </div>
                        <div className="cards" id="playerFirst">
                            <span className="image"></span>
                            <span className="suit"></span>
                        </div>
                        <div className="sep"></div>
                        {/* Banker Side */}
                        <div className="cards" id="bankerFirst">
                            <span className="image"></span>
                            <span className="suit"></span>
                        </div>
                        <div className="cards" id="bankerSecond">
                            <span className="image"></span>
                            <span className="suit"></span>
                        </div>
                        <div className="cards" id="bankerThird">
                            <span className="image"></span>
                            <span className="suit"></span>
                        </div>
                        <label>Banker</label>
                    </div>
                </div>
                <div>
                    <div className="horizontal-sep"></div>
                    <label>
                        <label>Available Funds: </label>
                        <input id="currentFunds" value={playerStat.chips} readOnly />
                    </label><br></br>
                    <button className="clear-bets" onClick={this.onClearBets}>Clear Bets</button>
                    <button className="deal" onClick={this.onDeal}>Deal!</button>
                    <button className="shuffle" onClick={this.onShuffleCards}>Shuffle Cards</button>
                </div>

                <div>
                    <div className="bets">
                        <label>Player Pair Bet:</label>
                        <input value={playerPairBet} readOnly /><br></br>
                        <button className="chip" onClick={this.putPlayerPairBet5}>5</button>
                        <button className="chip" onClick={this.putPlayerPairBet25}>25</button>
                        <button className="chip" onClick={this.putPlayerPairBet100}>100</button>
                        <button className="chip" onClick={this.putPlayerPairBet500}>500</button>
                    </div>
                    <div className="sep"></div>
                    <div className="bets">
                        <label>Player Bet:</label>
                        <input value={playerBet} readOnly /><br></br>
                        <button className="chip" onClick={this.putPlayerBet5}>5</button>
                        <button className="chip" onClick={this.putPlayerBet25}>25</button>
                        <button className="chip" onClick={this.putPlayerBet100}>100</button>
                        <button className="chip" onClick={this.putPlayerBet500}>500</button>
                    </div>
                    <div className="sep"></div>
                    <div className="bets">
                        <label>Tie Bet:</label>
                        <input value={tieBet} readOnly /><br></br>
                        <button className="chip" onClick={this.putTieBet5}>5</button>
                        <button className="chip" onClick={this.putTieBet25}>25</button>
                        <button className="chip" onClick={this.putTieBet100}>100</button>
                        <button className="chip" onClick={this.putTieBet500}>500</button>
                    </div>
                    <div className="sep"></div>
                    <div className="bets">
                        <label>Banker Bet:</label>
                        <input value={bankerBet} readOnly /><br></br>
                        <button className="chip" onClick={this.putBankerBet5}>5</button>
                        <button className="chip" onClick={this.putBankerBet25}>25</button>
                        <button className="chip" onClick={this.putBankerBet100}>100</button>
                        <button className="chip" onClick={this.putBankerBet500}>500</button>
                    </div>
                    <div className="sep"></div>
                    <div className="bets">
                        <label>Banker Pair Bet:</label>
                        <input value={bankerPairBet} readOnly /><br></br>
                        <button className="chip" onClick={this.putBankerPairBet5}>5</button>
                        <button className="chip" onClick={this.putBankerPairBet25}>25</button>
                        <button className="chip" onClick={this.putBankerPairBet100}>100</button>
                        <button className="chip" onClick={this.putBankerPairBet500}>500</button>
                    </div>
                </div>
                <div className="horizontal-sep"></div>
                <button onClick={this.showGameHistory}>Game History</button>
                {this.state.showPopup ?
                    <GameHistoryPopup
                        gameHistory={gameHistoryValue}
                        closePopup={this.gameHistory.bind(this)}
                    />
                    : null
                }
            </div>
        );
    }
}

export default Table;

function shuffle(theShoe: Card[]) {
    console.log(theShoe);
    var theShoe = theShoe;

    for (let i = 0; i < 1000; i++) {
        let location1 = Math.floor(Math.random() * theShoe.length);
        let location2 = Math.floor(Math.random() * theShoe.length);
        let temp = theShoe[location1];
        theShoe[location1] = theShoe[location2];
        theShoe[location2] = temp;
    }
    return theShoe;
}

var playerTotalCards = 0;
var bankerTotalCards = 0;
var playerHandTotalValue = 0;
var bankerHandTotalValue = 0;

function deal(theShoe: Card[]) {
    let playerHand = [];
    let bankerHand = [];

    playerHand.push(theShoe.shift()!);
    playerTotalCards++;
    bankerHand.push(theShoe.shift()!);
    bankerTotalCards++;
    playerHand.push(theShoe.shift()!);
    playerTotalCards++;
    bankerHand.push(theShoe.shift()!);
    bankerTotalCards++;

    //For Debug
    console.log(playerHand, bankerHand)
    playerHandTotalValue = playerHand[0]!.value + playerHand[1]!.value;
    bankerHandTotalValue = bankerHand[0]!.value + bankerHand[1]!.value;
    console.log(playerTotalCards, bankerTotalCards)
    console.log(playerHandTotalValue, bankerHandTotalValue)
    //End Debug

    totalTheHands(playerHand, bankerHand);
}

function clearCards() {
    document.querySelector("#playerFirst .suit")!.innerHTML = "";
    document.querySelector("#playerFirst .image")!.innerHTML = "";
    document.querySelector("#playerSecond .suit")!.innerHTML = "";
    document.querySelector("#playerSecond .image")!.innerHTML = "";
    document.querySelector("#playerThird .suit")!.innerHTML = "";
    document.querySelector("#playerThird .image")!.innerHTML = "";
    document.querySelector("#bankerFirst .suit")!.innerHTML = "";
    document.querySelector("#bankerFirst .image")!.innerHTML = "";
    document.querySelector("#bankerSecond .suit")!.innerHTML = "";
    document.querySelector("#bankerSecond .image")!.innerHTML = "";
    document.querySelector("#bankerThird .suit")!.innerHTML = "";
    document.querySelector("#bankerThird .image")!.innerHTML = "";
    document.querySelector("#playerFirst")!
        .classList.remove("Diamonds", "Hearts", "Spades", "Clubs");
    document.querySelector("#playerSecond")!
        .classList.remove("Diamonds", "Hearts", "Spades", "Clubs");
    document.querySelector("#bankerFirst")!
        .classList.remove("Diamonds", "Hearts", "Spades", "Clubs");
    document.querySelector("#bankerSecond")!
        .classList.remove("Diamonds", "Hearts", "Spades", "Clubs");
    document.querySelector("#playerThird")!
        .classList.remove("Diamonds", "Hearts", "Spades", "Clubs");
    document.querySelector("#bankerThird")!
        .classList.remove("Diamonds", "Hearts", "Spades", "Clubs");
    playerBet = 0;
    bankerBet = 0;
    tieBet = 0;
    playerPairBet = 0;
    bankerPairBet = 0;
}

function totalTheHands(playerHand: Card[], bankerHand: Card[]) {
    playerHandTotalValue = (playerHand[0].value + playerHand[1].value) % 10;
    bankerHandTotalValue = (bankerHand[0].value + bankerHand[1].value) % 10;

    document.querySelector("#playerFirst .suit")!.innerHTML = playerHand[0].getCardSuit();
    document.querySelector("#playerFirst .image")!.innerHTML = playerHand[0].image;
    document.querySelector("#playerFirst")!.classList.add(playerHand[0].suits);
    document.querySelector("#playerSecond .suit")!.innerHTML = playerHand[1].getCardSuit();
    document.querySelector("#playerSecond .image")!.innerHTML = playerHand[1].image;
    document.querySelector("#playerSecond")!.classList.add(playerHand[1].suits);
    document.querySelector("#bankerFirst .suit")!.innerHTML = bankerHand[0].getCardSuit();
    document.querySelector("#bankerFirst .image")!.innerHTML = bankerHand[0].image;
    document.querySelector("#bankerFirst")!.classList.add(bankerHand[0].suits);
    document.querySelector("#bankerSecond .suit")!.innerHTML = bankerHand[1].getCardSuit();
    document.querySelector("#bankerSecond .image")!.innerHTML = bankerHand[1].image;
    document.querySelector("#bankerSecond")!.classList.add(bankerHand[1].suits);

    if (playerHandTotalValue === 8 ||
        playerHandTotalValue === 9 ||
        bankerHandTotalValue === 8 ||
        bankerHandTotalValue === 9) {

        //For Debug
        console.log('Player Hand Natural: ' + playerHandTotalValue);
        console.log('Banker Hand Natural: ' + bankerHandTotalValue);
        //End Debug

    } else {
        drawThirdCards(playerHand, bankerHand);
    }
    gameResult(playerHand, bankerHand);
}

function drawThirdCards(playerHand: Card[], bankerHand: Card[]) {
    if (playerHandTotalValue <= 5) {
        playerHand.push(theShoe.shift()!);
        playerTotalCards++;
    }
    if (!playerHand[2]) {
        if (bankerHandTotalValue <= 5) {
            bankerHand.push(theShoe.shift()!);
            bankerTotalCards++;
        }
    }
    if (playerHand[2]) {
        if (bankerHandTotalValue === 0 || bankerHandTotalValue === 1 || bankerHandTotalValue === 2) {
            bankerHand.push(theShoe.shift()!);
            bankerTotalCards++;
        } else if (bankerHandTotalValue === 3 && playerHand[2].value !== 8) {
            bankerHand.push(theShoe.shift()!);
            bankerTotalCards++;
        } else if (bankerHandTotalValue === 3 && playerHand[2].value === 8) {
            // console.log("Banker 3 vs 8 exception fires");
        } else if (
            bankerHandTotalValue === 4 && playerHand[2].value > 1 && playerHand[2].value < 8
            //   [2, 3, 4, 5, 6, 7].includes(playerHand[2].value)
        ) {
            bankerHand.push(theShoe.shift()!);
            bankerTotalCards++;
        } else if (
            bankerHandTotalValue === 5 && playerHand[2].value > 4 && playerHand[2].value < 8
            //   [4, 5, 6, 7].includes(playerHand[2].value)
        ) {
            bankerHand.push(theShoe.shift()!);
            bankerTotalCards++;
        } else if (bankerHandTotalValue === 6 && playerHand[2].value > 4 && playerHand[2].value < 8) {
            bankerHand.push(theShoe.shift()!);
            bankerTotalCards++;
        }
    }
    playerHandTotalValue = playerHand[2]
        ? (playerHand[0].value + playerHand[1].value + playerHand[2].value) % 10
        : (playerHand[0].value + playerHand[1].value) % 10;
    bankerHandTotalValue = bankerHand[2]
        ? (bankerHand[0].value + bankerHand[1].value + bankerHand[2].value) % 10
        : (bankerHand[0].value + bankerHand[1].value) % 10;

    //For Debug
    console.log('Player Hand Tableau: ' + playerHandTotalValue);
    console.log('Banker Hand Tableau: ' + bankerHandTotalValue);
    //End Debug

    if (playerHand.length == 3) {
        document.querySelector("#playerThird .suit")!.innerHTML = playerHand[2].getCardSuit();
        document.querySelector("#playerThird .image")!.innerHTML = playerHand[2].image;
        document.querySelector("#playerThird")!.classList.add(playerHand[2].suits);
    }

    if (bankerHand.length == 3) {
        document.querySelector("#bankerThird .suit")!.innerHTML = bankerHand[2].getCardSuit();
        document.querySelector("#bankerThird .image")!.innerHTML = bankerHand[2].image;
        document.querySelector("#bankerThird")!.classList.add(bankerHand[2].suits);
    }
}

function gameResult(playerHand: Card[], bankerHand: Card[]) {
    var endRound: Round;
    roundName += 1;
    if (playerHandTotalValue > bankerHandTotalValue) {
        console.log("Player Wins!");
        roundResult = "Player Wins!";
        endRound = new Round("" + roundName, true, false, false, false, false);
    } else if (playerHandTotalValue < bankerHandTotalValue) {
        console.log("Banker Wins!");
        roundResult = "Banker Wins!";
        endRound = new Round("" + roundName, false, true, false, false, false);
    } else if (playerHandTotalValue === bankerHandTotalValue) {
        console.log("It is a TIE. The bank and player both have", bankerHandTotalValue);
        roundResult = "It is a TIE!";
        endRound = new Round("" + roundName, false, false, true, false, false);
    }

    if (playerHand[0].value == playerHand[1].value) {
        roundResult = roundResult + " Player hand got a Pair!";
        endRound!.updatePlayerPair();
    }

    if (bankerHand[0].value == bankerHand[1].value) {
        if (playerHand[0].value == playerHand[1].value) {
            roundResult = roundResult + " Player and Banker hand got a Pair!";
        } else {
            roundResult = roundResult + " Banker hand got a Pair!";
        }
        endRound!.updateBankerPair();
    }

    console.log(endRound!);
    playerStat.updateChips(endRound!);
    gameHistoryValue.addToRecord(endRound!);
    // bonusHands();
}