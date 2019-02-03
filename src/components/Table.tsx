import * as React from "react";
import Card from "./Card";
import TheShoe from "./TheShoe";
import './Hello.css';
import Round from './Round';
import GameHistory from './GameHistory';
import GameHistoryPopup from './GameHistoryPopup';
import Player from './Player';

export interface IProps {
    name: string;
    enthusiasmLevel?: number;
}

interface IState {
    value:string;
    showPopup: boolean;
}

var theShoe: Card[] = [];
var gameHistoryValue: GameHistory;
var playerStat: Player;
var roundName: number;
  
class Table extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        roundName = 0;
        gameHistoryValue = new GameHistory();
        playerStat = new Player();
        this.createTheShoe();
        this.state = { value: '0', showPopup: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }

    forceUpdateHandler(){
        this.forceUpdate();
      };
      
    public onNewCards = () => this.createTheShoe();
    public onShuffleCards = () => this.shuffleCurrentCards();
    public onDeal = () => this.dealCards();
    public showGameHistory = () => this.gameHistory();
    public putPlayerBet = () => this.playerBet();
    public putBankerBet = () => this.bankerBet();
    public putTieBet = () => this.tieBet();
    public putPlayerPairBet = () => this.playerPairBet();
    public putBankerPairBet = () => this.bankerPairBet();
    public onClearBets = () => this.clearBets();

    public playerBet() {
        console.log('You Bet: 100 on Player');
        if(!playerStat.putBets(100,0,0,0,0)) {
            console.log('Insufficient Funds');
            window.confirm('Insufficient Funds!')
        } else {}
    }

    public bankerBet() {
        console.log('You Bet: 100 on Banker');
        if(!playerStat.putBets(0,100,0,0,0)) {
            console.log('Insufficient Funds');
            window.confirm('Insufficient Funds!')
        }
    }

    public tieBet() {
        console.log('You Bet: 100 on Tie');
        if(!playerStat.putBets(0,0,100,0,0)) {
            console.log('Insufficient Funds');
            window.confirm('Insufficient Funds!')
        }
    }

    public playerPairBet() {
        console.log('You Bet: 100 on Player Pair');
        if(!playerStat.putBets(0,0,0,100,0)) {
            console.log('Insufficient Funds');
            window.confirm('Insufficient Funds!')
        }
    }

    public bankerPairBet() {
        console.log('You Bet: 100 on Banker Pair');
        if(!playerStat.putBets(0,0,0,0,100)) {
            console.log('Insufficient Funds');
            window.confirm('Insufficient Funds!')
        }
    }

    public createTheShoe() {
        // theShoe = createShoe();
        theShoe = shuffle(new TheShoe().create());
        playerStat.resetPlayer();
        this.setState({value: String(playerStat.chips)});
    }

    public shuffleCurrentCards() {
        shuffle(theShoe)
    }

    public dealCards() {
        deal(theShoe);
        this.setState({value: String(playerStat.chips)});
    }

    public clearBets() {
        console.log(playerStat);
        playerStat.clearBets();
        console.log(playerStat);
    }

    public gameHistory() {
        if (gameHistoryValue != undefined) {
            this.setState({
                showPopup: !this.state.showPopup
              });
        }
    }

    handleChange(event: any) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event: any) {
        event.preventDefault();
    }

    public render() {
        return (
            <div className="hello">
                <div className="greeting">
                    Lets Play Baccarat!
                </div>
                <div className="available-funds">
                <label>
                    <label>Available Funds: </label>
                    <input id="currentFunds" value={playerStat.chips} readOnly/>
                </label>
                </div>
                <button onClick={this.onNewCards}>Restart Game</button>
                <button onClick={this.onShuffleCards}>Shuffle Cards</button>
                <button onClick={this.onClearBets}>Clear Bets</button>
                <div>
                    <button onClick={this.onDeal}>Deal!</button>
                </div>
                <div>
                    <button onClick={this.putPlayerBet}>Bet 100 on Player</button>
                    <button onClick={this.putBankerBet}>Bet 100 on Banker</button>
                    <button onClick={this.putTieBet}>Bet 100 on Tie</button>
                    <button onClick={this.putPlayerPairBet}>Bet 100 on Player Pair</button>
                    <button onClick={this.putBankerPairBet}>Bet 100 on Banker Pair</button>
                </div>
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

function totalTheHands(playerHand: Card[], bankerHand: Card[]) {
    playerHandTotalValue = (playerHand[0].value + playerHand[1].value) % 10;
    bankerHandTotalValue = (bankerHand[0].value + bankerHand[1].value) % 10;
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
}

function gameResult(playerHand: Card[], bankerHand: Card[]) {
    var endRound: Round;
    roundName += 1;
    if (playerHandTotalValue > bankerHandTotalValue) {
        console.log("Player Wins!");
        endRound = new Round(""+roundName, true, false, false, false, false);
    } else if (playerHandTotalValue < bankerHandTotalValue) {
        console.log("Banker Wins!");
        endRound = new Round(""+roundName, false, true, false, false, false);
    } else if (playerHandTotalValue === bankerHandTotalValue) {
        console.log("It is a TIE. The bank and player both have", bankerHandTotalValue);
        endRound = new Round(""+roundName, false, false, true, false, false);
    }

    if (playerHand[0].value == playerHand[1].value) {
        endRound!.updatePlayerPair();
    }

    if (bankerHand[0].value == bankerHand[1].value) {
        endRound!.updateBankerPair();
    }

    console.log(endRound!);
    playerStat.updateChips(endRound!);
    gameHistoryValue.addToRecord(endRound!);
    // bonusHands();
}