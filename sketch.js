let cardName = 'ace.png';
let card;
let names = ['ace.png','2.png'];
let cards = new Array();
let displace = 0;
let index = 2;

class Card{

  constructor(x,y,img){

    this.x = x;
    this.y = y;
    this.img = img;
  
  }

  show(){
    this.img.width = 100;
    image(this.img, this.x, this.y);
  }

  move(){

    background(225);

    cards.forEach(element => element.show());

    if(this.y > height/2){
      this.y = this.y - displace;
    }
  }

  set(x,y){
    this.x = x;
    this.y = y;
  }

  moveY(y){

  }
  moveX(x){

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
}

function setup() {
  // put setup code here 
  createCanvas(800,800);
  background(225);
  let i=0;

  names.forEach(element => {
    let img = loadImage('cards/'+element);
    cards[i] = new Card(height/2, 600, img);
    i++;
 
  });
}

function draw() {
  // put drawing code here
  cards.forEach(element => {

    element.show();

  });

  if(index>=0 && index<2){

    cards[index].move();
    console.log(index);

  }
}

function mouseClicked(){

  index = index-1;
  displace = 10;

}