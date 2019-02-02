export class Card {

    name: string;
    suits: string;
    deck: number;
    value: number;
    image: string;

    constructor (name: string, suits: string, deck: number, image: string, value: number) {
        this.name = name;
        this.suits = suits;
        this.deck = deck;
        this.value = value;
        this.image = image;
    }
}

export default Card;