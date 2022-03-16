//* Deck Class
// @description This class holds an array of Card Objects
// @shuffleDeck() Shuffles the deck into a random order
// @showHand(x,y) takes coordinates and shows the hand at those coordinates 
// @requires Card class
class Deck{
    constructor() {
        this.cards = [];
        let n = 0;
        // Card Faces 0-12 Ace, Two, Three, ... , king
        for(let i = 0; i < 13; i++) {
            // Card Suits 0-3 "Clubs", "Spades", "Diamonds", "Hearts"
            for (let j = 0; j < 4; j++) {
                this.cards[n] = new Card(i, j, n);
                n++;
            }
        }

        this.shuffleDeck();
    }


    // Ran during setup after shuffle is called sets the top of deck
    shuffleDeck() { 
        shuffle(this.cards, true);
        this.setTopOfDeck(this.cards[51]); // Set this Deck objects last card to the top of the deck
    }

    //* Helper function to set top of deck true when given a card
    setTopOfDeck(card) {
        card.topOfDeck = true;
    }

    //* Helper function to set the location of the entire deck
    setDeckLocation(x, y) {
        for(let i = 0; i < 52; i++) {
            this.cards[i].posX = x;
            this.cards[i].posY = y;
        }
    }

    //* Helper function to get top of deck index
    // Returns location of top of deck
    // Error condition is -1
    getTopOfDeck() {
        let i = 0;
        for(i; i < 52; i++) {
            if(this.cards[i].topOfDeck){
                return i;
            }
        }

        return -1;
    }

    //* Helper function to show entire hand of cards
    // Will only show the top of the deck card
    showHand() {
        for(let i = 0; i < 52; i++) {
            this.cards[i].show();
        }
    }

    //* Helper function to show the top of deck
    showTopOfDeck() {
        let topOfDeckIndex = this.getTopOfDeck();

        if(topOfDeckIndex != -1){
            this.cards[topOfDeckIndex].show();
        }
    }

    // Just a placeholder function right now
    // TODO: Come up with a way to move the current top of the deck to a location.
    moveTopOfDeck() {
        let topOfDeckIndex = this.getTopOfDeck();
        this.cards[topOfDeckIndex].posX += 10;
    }
}