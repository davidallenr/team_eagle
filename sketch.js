let card;
let card_width = 100;
let card_height = 145.2;
let hidden_card = 52;
let index_hidden;
let global_control = true;
let deck_count = 52;
let table_count = 0;
let global_index = 0;
let names = ['2_of_clubs.png','2_of_diamonds.png','2_of_hearts.png','2_of_spades.png',
'3_of_clubs.png','3_of_diamonds.png','3_of_hearts.png','3_of_spades.png',
'4_of_clubs.png','4_of_diamonds.png','4_of_hearts.png','4_of_spades.png',
'5_of_clubs.png','5_of_diamonds.png','5_of_hearts.png','5_of_spades.png',
'6_of_clubs.png','6_of_diamonds.png','6_of_hearts.png','6_of_spades.png',
'7_of_clubs.png','7_of_diamonds.png','7_of_hearts.png','7_of_spades.png',
'8_of_clubs.png','8_of_diamonds.png','8_of_hearts.png','8_of_spades.png',
'9_of_clubs.png','9_of_diamonds.png','9_of_hearts.png','9_of_spades.png',
'10_of_clubs.png','10_of_diamonds.png','10_of_hearts.png','10_of_spades.png',
'ace_of_clubs.png','ace_of_diamonds.png','ace_of_hearts.png','ace_of_spades.png',
'jack_of_clubs2.png','jack_of_diamonds2.png','jack_of_hearts2.png','jack_of_spades2.png',
'king_of_clubs2.png','king_of_diamonds2.png','king_of_hearts2.png','king_of_spades2.png',
'queen_of_clubs2.png','queen_of_diamonds2.png','queen_of_hearts2.png','queen_of_spades2.png',
'back_of_card.png'];

let cards = new Array();
let displace = 0;
let index = -1;

class Card{

  constructor(x,y,img){
    this.x = x;
    this.y = y;
    this.img = img;
  }

  show(){
    image(this.img, this.x, this.y,card_width,card_height);
  }

  move(){
    cards.forEach(element => element.show());

    if(this.y > height/2 - card_height/2){
      this.y = this.y - displace;
    }else{
      global_control = true;
    }
  }
  set(x,y){
    this.x = x;
    this.y = y;
  }
  moveTo(x,y){

    if(this.y > y){
      this.y -= displace;
    }else{
      this.y += displace;
    }
    if(this.x>x){
      this.x -= displace;
    }else{
      this.x += displace;
    }
  }

  clicked(){
    if((mouseX > this.x && mouseX < this.x+card_width) && (mouseY > this.y && mouseY < this.y + card_height)){
      if(global_control){
        global_control = false;
        index ++;
        deck_count--;
        table_count++;
        console.log(deck_count, table_count);
        displace = 10;
      }
    }
  }

}

function setup() {
  // put setup code here 
  createCanvas(800,800);
  background(225);

  let i=0;

  names.forEach(element => {

    let img = loadImage('cards/'+element);
    cards[i] = new Card(width/2 - card_width/2, height - card_height - 10 , img);
    console.log(element,i);
    i++;

  });
}

function draw() {
  // put drawing code here
  background(225);

  cards[52].show();

  if(global_index < 53){
    cards[global_index].show();
  }

  if(index>=0 && index<names.length){

    cards[index].move();
  }
}

function mousePressed(){
    global_index = 0;
    cards[52].clicked();
}