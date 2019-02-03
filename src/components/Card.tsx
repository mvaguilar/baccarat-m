export class Card {

    name: string;
    suits: string;
    deck: number;
    value: number;
    image: string;

    constructor(name: string, suits: string, deck: number, image: string, value: number) {
        this.name = name;
        this.suits = suits;
        this.deck = deck;
        this.value = value;
        this.image = image;
    }

    getCardSuit() {
        if (this.suits === "Spades") {
            return "&spades;";
        } else if (this.suits === "Hearts") {
            return "&hearts;";
        } else if (this.suits === "Clubs") {
            return "&clubs;";
        } else if (this.suits === "Diamonds") {
            return "&diams;";
        } else {
            return "";
        }
    }
}

export default Card;