import * as React from "react";
import Card from "./Card";
import TheShoe from "./TheShoe";
import './Hello.css';
import Round from './Round';
import GameHistory from './GameHistory';

export interface IProps {
    name: string;
    enthusiasmLevel?: number;
}

var theShoe: Card[] = [];
var gameHistory: GameHistory;

class Table extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        gameHistory = new GameHistory();
        this.createTheShoe();
    }
    public onNewCards = () => this.createTheShoe();
    public onShuffleCards = () => this.shuffleCurrentCards();
    public onDeal = () => this.dealCards();
    public showGameHistory = () => this.gameHistory();

    public render() {
        return (
            <div className="hello">
                <div className="greeting">
                    Lets Play Baccarat!
                </div>
                <button onClick={this.onNewCards}>Get New Cards</button>
                <button onClick={this.onShuffleCards}>Shuffle Cards</button>
                <button onClick={this.onDeal}>Deal!</button>
                <button onClick={this.showGameHistory}>Game History!</button>
            </div>
        );
    }

    public createTheShoe() {
        // theShoe = createShoe();
        theShoe = shuffle(new TheShoe().create());
    }

    public shuffleCurrentCards() {
        shuffle(theShoe)
    }

    public dealCards() {
        deal(theShoe);
    }

    public gameHistory() {
        if (gameHistory != undefined)
        console.log(gameHistory);
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
    gameResult();
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

function gameResult() {
    var endRound:Round;
    if (playerHandTotalValue > bankerHandTotalValue) {
        console.log("Player Wins!");
        endRound = new Round(true,false,false,false,false);
    } else if (playerHandTotalValue < bankerHandTotalValue) {
        console.log("Banker Wins!");
        endRound = new Round(false,true,false,false,false);
    } else if (playerHandTotalValue === bankerHandTotalValue) {
        console.log("It is a TIE. The bank and player both have", bankerHandTotalValue);
        endRound = new Round(false,false,true,false,false);
    }
    gameHistory.addToRecord(endRound!);
    // bonusHands();
}