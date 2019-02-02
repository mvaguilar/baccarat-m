import * as React from "react";
import Card from "./Card";
import TheShoe from "./TheShoe";
import './Hello.css';

export interface IProps {
    name: string;
    enthusiasmLevel?: number;
}

interface IState {
    currentEnthusiasm: number;
}

class Hello extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { currentEnthusiasm: props.enthusiasmLevel || 1 };
        this.createTheShoe();
    }
    public onIncrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm + 1);
    public onDecrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm - 1);
    public newCards = () => this.createTheShoe();
    public shuffleCards = () => this.shuffleCurrentCards();
    public onPlay = () => this.onDeal();

    public render() {
        const { name } = this.props;

        if (this.state.currentEnthusiasm <= 0) {
            throw new Error('You could be a little more enthusiastic. :D');
        }

        return (
            <div className="hello">
                <div className="greeting">
                    Hello {name + getExclamationMarks(this.state.currentEnthusiasm)}
                </div>
                <button onClick={this.onDecrement}>-</button>
                <button onClick={this.onIncrement}>+</button>
                <button onClick={this.newCards}>Get New Cards</button>
                <button onClick={this.shuffleCards}>Shuffle Cards</button>
                <button onClick={this.onPlay}>Deal!</button>
            </div>
        );
    }

    public updateEnthusiasm(currentEnthusiasm: number) {
        this.setState({ currentEnthusiasm });
    }

    public createTheShoe() {
        // theShoe = createShoe();
        theShoe = shuffle(new TheShoe().create());
    }

    public shuffleCurrentCards() {
        shuffle(theShoe)
    }

    public onDeal() {
        dealNaturals(theShoe);
    }
}

export default Hello;

var theShoe: Card[] = [];

function getExclamationMarks(numChars: number) {
    // console.log(createShoe());
    // console.log(shuffle(theShoe));
    // dealNaturals(shuffle(theShoe));
    return Array(numChars + 1).join('!');
}


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

function dealNaturals(theShoe: Card[]) {
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
    console.log(playerHand, bankerHand)

    playerHandTotalValue = playerHand[0]!.value + playerHand[1]!.value;
    bankerHandTotalValue = bankerHand[0]!.value + bankerHand[1]!.value;
    totalTheHands(playerHand, bankerHand);

    console.log(playerTotalCards, bankerTotalCards)
    console.log(playerHandTotalValue, bankerHandTotalValue)
}

function totalTheHands(playerHand: Card[], bankerHand: Card[]) {
    playerHandTotalValue = (playerHand[0].value + playerHand[1].value) % 10;
    bankerHandTotalValue = (bankerHand[0].value + bankerHand[1].value) % 10;
    if (playerHandTotalValue === 8 ||
        playerHandTotalValue === 9 ||
        bankerHandTotalValue === 8 ||
        bankerHandTotalValue === 9) {
        console.log('Player Hand Natural: ' + playerHandTotalValue);
        console.log('Banker Hand Natural: ' + bankerHandTotalValue);
    } else {
        drawThirdCards(playerHand, bankerHand);
    }
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
    console.log('Player Hand Tableau: ' + playerHandTotalValue);
    console.log('Banker Hand Tableau: ' + bankerHandTotalValue);
}