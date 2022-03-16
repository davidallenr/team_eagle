const face_names = ["Ace", "Two", "Three", "Four",
                   "Five", "Six", "Seven", "Eight",
                   "Nine", "Ten", "Jack", "Queen", "King"];

const suit_names = ["Clubs", "Spades", "Diamonds", "Hearts"];

const file_names = [
    '01_ace_of_clubs.png','02_of_clubs.png', '03_of_clubs.png',
    '04_of_clubs.png', '05_of_clubs.png', '06_of_clubs.png',
    '07_of_clubs.png', '08_of_clubs.png', '09_of_clubs.png',
    '10_of_clubs.png', '11_jack_of_clubs2.png', '12_queen_of_clubs2.png',
    '13_king_of_clubs2.png', '01_ace_of_spades.png', '02_of_spades.png', 
    '03_of_spades.png', '04_of_spades.png', '05_of_spades.png',
    '06_of_spades.png', '07_of_spades.png', '08_of_spades.png',
    '09_of_spades.png', '10_of_spades.png', '11_jack_of_spades2.png',
    '12_queen_of_spades2.png', '13_king_of_spades2.png', '01_ace_of_diamonds.png',
    '02_of_diamonds.png','03_of_diamonds.png', '04_of_diamonds.png',
    '05_of_diamonds.png', '06_of_diamonds.png', '07_of_diamonds.png',
    '08_of_diamonds.png', '09_of_diamonds.png', '10_of_diamonds.png',
    '11_jack_of_diamonds2.png', '12_queen_of_diamonds2.png', '13_king_of_diamonds2.png',
    '02_of_hearts.png', '03_of_hearts.png', '04_of_hearts.png',
    '05_of_hearts.png', '06_of_hearts.png', '07_of_hearts.png',
    '08_of_hearts.png', '09_of_hearts.png', '10_of_hearts.png',
    '01_ace_of_hearts.png', '11_jack_of_hearts2.png', '12_queen_of_hearts2.png',
    '13_king_of_hearts2.png'
    ];

const IMAGE_WIDTH = 100;
const IMAGE_HEIGHT = 142.5;


//*
//* Card Class
//* @decription This class contains the information pertaining to each Card object
//* @constructor(f, s, i)
//* f = face
//* s = suit
//* i = index
//* @show(x,y) takes coordinates and shows the card at those coordinates 
//*
class Card {
    constructor(f, s, i) {
        this.posX;
        this.posY;
        this.face = f;
        this.suit = s;
        this.fullName = face_names[f] + " of " + suit_names[s];
        this.img = loadImage('../assets/cards/' + file_names[i]);
        this.img_back = loadImage('../assets/cards/back_of_card.png');
        this.topOfDeck = false;
        this.inCenter = false;
    }

    show() {
        if(!this.topOfDeck && !this.inCenter) {
            image(this.img, this.posX, this.posY, IMAGE_WIDTH, IMAGE_HEIGHT);
        } else {
            image(this.img_back, this.posX, this.posY, IMAGE_WIDTH, IMAGE_HEIGHT);
        }
    }

}