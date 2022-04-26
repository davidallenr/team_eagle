let card;
let logo;
let char1 = 0;
let char2 = 0;
let card_width = 100;
let card_height = 145.2;
let hidden_card = 52;
let global_control = true;
let deck_count = 52;
let table_count = 0;
let back1,back2;
let compare = false;
let move = false;
let player_score = 0;   // Player score variable
let delayTime = 200;
let backgroundLogo;
let endBackground;
let scoreFont;
let coolFont;

// Screen state is how we can transition between title-game-gameover screens etc.
// 0 = StarScreen
// 1 = Game Screen
// 2 = Game Over
// 3 = Transition trigger to game over
let screen_state = 0;


let names = [
'02_of_clubs.png','02_of_diamonds.png','02_of_hearts.png','02_of_spades.png',
'03_of_clubs.png','03_of_diamonds.png','03_of_hearts.png','03_of_spades.png',
'04_of_clubs.png','04_of_diamonds.png','04_of_hearts.png','04_of_spades.png',
'05_of_clubs.png','05_of_diamonds.png','05_of_hearts.png','05_of_spades.png',
'06_of_clubs.png','06_of_diamonds.png','06_of_hearts.png','06_of_spades.png',
'07_of_clubs.png','07_of_diamonds.png','07_of_hearts.png','07_of_spades.png',
'08_of_clubs.png','08_of_diamonds.png','08_of_hearts.png','08_of_spades.png',
'09_of_clubs.png','09_of_diamonds.png','09_of_hearts.png','09_of_spades.png',
'10_of_clubs.png','10_of_diamonds.png','10_of_hearts.png','10_of_spades.png',
'01_ace_of_clubs.png','01_ace_of_diamonds.png','01_ace_of_hearts.png','01_ace_of_spades.png',
'11_jack_of_clubs2.png','11_jack_of_diamonds2.png','11_jack_of_hearts2.png','11_jack_of_spades2.png',
'12_queen_of_clubs2.png','12_queen_of_diamonds2.png','12_queen_of_hearts2.png','12_queen_of_spades2.png',
'13_king_of_clubs2.png','13_king_of_diamonds2.png','13_king_of_hearts2.png','13_king_of_spades2.png'
];

//Randomly shuffling cards: 
let randomize = (arr, n) =>
{
    // Start from the last element and swap
    // one by one. We don't need to run for
    // the first element that's why i > 0
    for (let i = n - 1; i > 0; i--)
    {
        // Pick a random index from 0 to i inclusive
        let j = Math.floor(Math.random() * (i + 1));
        // Swap arr[i] with the element
        // at random index
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

randomize(names,names.length);


let cards_1 = new Array();

let cards_2 = new Array();

let deck1_count, deck2_count;

let displace = 0;
let index2 = -1;
let index1 = -1

class Card{
  constructor(x,y,img,name){
    this.x = x;
    this.y = y;
    this.img = img;
    this.name = name;
  }

  show(){
    image(this.img, this.x, this.y,card_width,card_height);
  }

  move(){ 
    if(move){
      if(this.y > height/2 - card_height/2 + 10){
        this.y -= displace;
      }else if(this.y < height/2 - card_height/2 - 10){
        this.y += displace;
      }else{
        compare = true;
        move = false;
      }
    }
  }

  set(x,y){
    this.x = x;
    this.y = y;
  }

  moveTo(x,y){

    if(this.x < x){2
      this.x+=displace;
    }

    if(this.x > x){
      this.x-=displace;
    }

    if(this.y < y){
      this.y+=displace;
    }

    if(this.y > y){
      this.y-=displace;
    }

    if(Math.abs(this.x - x) < displace  && Math.abs(this.y - y) < displace){
      global_control=true;
      compare = false;
      // Player score increase
      // Current Implementation is just checking if the cards position is < half the screen width after it's moved
      // if (this cards position < ( screen width / 2))
      // TODO: screen width needs to be set as a variable and same with height.
      if (this.x < 800/2) {
        updateScore.call(); // Increase player score
      }
    }

  }

  clicked(){
    if((mouseX > this.x && mouseX < this.x+card_width) && (mouseY > this.y && mouseY < this.y + card_height)){
      if(global_control){
        global_control = false;
        move = true;
        index1++;
        index2++;
        displace = 10;
        console.log("clicked");
      }
    }
  }
}


function setup() {
  // put setup code here 
  createCanvas(800,800);
  background(225);
  logo = loadImage('/assets/UI/logo.png');

  let i=0;
  while(i<26){
    
    let img = loadImage('assets/cards/'+names[i]);
    cards_1[i] = new Card((2*width)/3 - card_width/2, height - card_height - 10 , img,names[i]);

    img = loadImage('assets/cards/'+names[i+25]);
    cards_2[i] = new Card(width/3 - card_width/2, 10 , img,names[i+25]);
    i++;

  }
  img = loadImage('assets/cards/back_of_card.png');
  back2 = new Card(width/3 - card_width/2, 10 , img);
  img = loadImage('assets/cards/back_of_card_blue.png');
  back1 = new Card((2*width)/3- card_width/2, height - card_height - 10 , img);

}

function draw() {

  // Screen state check to determine game state
  if (screen_state == 0) {
    startScreen();
  } else if (screen_state == 1) {
    gameRunning();
  } else if (screen_state == 2) {
    endGame();
  }

}

//function to create a delay when comparing cards
const sleep = (millis) => { 
  return new Promise(resolve => setTimeout(resolve, millis)) 
}

// Start screen is when screen state == 0
function startScreen() {
  background(5,118,7);
  image(logo, 150, 50); // Title Screen Logo Image
  textAlign(CENTER);
  textSize(30);
  textFont(coolFont);
  text("Start Game?", 800/2 - 20, 800/2);
  text("Click to begin!", 800/2 - 20, 800/2 + 30);
}

// Game running is when screen state == 1
// Main game logic and functions will be ran in this function
async function gameRunning() {
  background(backgroundLogo);
  index_hidden = 0;

  cards_1.forEach(element => {
    element.show();
  });
  cards_2.forEach(element => {
    element.show();
  });

  if((index1>=0 && index1<names.length/2)&&(index2>=0 && index2<names.length/2)){
    cards_1[index1].move();
    cards_2[index2].move();
  }

  back1.show();
  back2.show();

  // Draw the player score to screen
  // TODO: Style the text appropriately
  textSize(25);
  fill(255,0,0);
  textFont(scoreFont);
  text("Score: " + player_score, 80, 780);
  
  if(compare){
    char1 = cards_1[index1].name.charAt(0)+cards_1[index1].name.charAt(1);
    char2 = cards_2[index2].name.charAt(0)+cards_2[index2].name.charAt(1);
    //await sleep(delayTime);
    if(char2 < char1){
      // delayTime(1);
      
      cards_1[index1].moveTo(width/3- card_width/2, height - card_height - 10);
      cards_2[index2].moveTo(width/3- card_width/2, height - card_height - 10);
    }else if(char1 < char2){
      // delayTime(1);
      cards_1[index1].moveTo((2*width)/3- card_width/2, 10);
      cards_2[index2].moveTo((2*width)/3- card_width/2,10);
    }else if(char1 = char2){
      // delayTime(1);
      compare = false;
      console.log("WAR!");
      //Move three cards from each deck to the middle of the screen
      // moveThreeCardsUp();
      
      global_control = true;
    }

    console.log("out of loop")
  }
  // Screen State check for game over condition
  // if the length of the cards array is equal to index set state to 3
  if (cards_1.length == index1) {
    screen_state = 3;
  }
}

function updateScore(){
  if (char1 > char2){
    console.log(char1);
    console.log(char2);
    player_score += parseInt(char1) + parseInt(char2);
  }
}
function moveThreeCardsUp(){
  for(let i=0;i<3;i++){
    setTimeout(() => {  
      cards_1[++index1].moveTo(500,500);
      cards_2[++index2].moveTo(500,500);
     }, 400);

  }
}

// End game is when the screen state == 2
// this is currently triggered by a check of the array length and index in gameRunning()
function endGame() {

  background(endBackground);
  textSize(24);
  fill(100,100,255);
  textAlign(CENTER);
  textFont(coolFont);
  text("Game Over!", 800/1.8 - 40, 800/2.3);
  text("Click to Play Again!", 800/1.8 - 40, 800/2.3 + 30);

}

function mousePressed(){
  // Check the screen state
  // If screen state == 0 then start game
  // If screen state == 3(transition state) then end game
  // transition state is triggered when the cards array length == index length in gameRunning()
  if (screen_state == 0) {
    screen_state = 1;
  } else if(screen_state == 3) {
    screen_state = 2;
  } else if (screen_state == 2) {
    resetGame();
    screen_state = 1;
  }
  back1.clicked();
}

function preload(){
  backgroundLogo = loadImage('assets/UI/cardBackground.jpg');
  endBackground = loadImage('assets/UI/endBackground.jpg');
  scoreFont = loadFont('assets/fonts/PermanentMarker-Regular.ttf');
  coolFont = loadFont('assets/fonts/CreteRound-Regular.ttf');
}

// const sleep = (millis) => { 
//     return new Promise(resolve => setTimeout(resolve, millis)) 
// }
// function getRandomInt(min, max) {
//     min = Math.ceil(min)
//     max = Math.floor(max)
//     return Math.floor(Math.random() * (max - min) + min)
// }
// async function draw() {
//     let time = frameCount * 20
//     let value2 = getRandomInt(100,500)
//     line( time - 20, value1, time, value2 )
//     value1 = value2
//     await sleep(100)
//     if (time < 1200) { redraw() } else { myProgram() }
// }

function resetGame(){

  index1 = -1;
  index2 = -1
  cards_1 = [];
  cards_2 = [];
  player_score = 0;
  compare = false;
  move = false;
  global_control = true;
  randomize(names,names.length);
  setup();
  draw();
  
}