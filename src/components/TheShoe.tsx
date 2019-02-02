import Card from "./Card";

export class TheShoe{

    newShoe:Card[] = [];

    constructor () {
    }

    create() {

        for (let deck = 1; deck <= decks; deck++) {
            for (let suit = 0; suit < suits.length; suit++) {
              for (let name = 0; name < names.length; name++) {
                this.newShoe.push(new Card(names[name], suits[suit], deck, images[name], name+1 ));
              }
            }
        }

        return this.newShoe;
    }
} 

var names = [
    "Ace",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Jack",
    "Queen",
    "King"
  ];

  var images = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];

var suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
var decks = 8;

export default TheShoe;