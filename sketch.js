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
let player1_score = 0;   // Player score variable
let player2_score = 0;
let delayTime = 200;
let backgroundLogo;
let endBackground;
let startBackground;
let rulesBackground;
let scoreFont;
let coolFont;
let myInput;
let startButton;
let backButton;
let myText = '';
let playButton;
let replayButton;
let rulesButton;

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
      //if (this.x < 800/2) {
      //}
      updateScore.call(); // Increase player score
    }

  }

  clicked(){
    if((mouseX > this.x && mouseX < this.x+card_width) && (mouseY > this.y && mouseY < this.y + card_height)){
      if(global_control){
        global_control = false;
        move = true;
        index1++;
        index2++;
        displace = 7;
        console.log("clicked");
      }
    }
  }
}

function setup() {
  // put setup code here 
  createCanvas(800,800);
  background(225);
  logo = loadImage('assets/UI/logo.png');

  myInput = createInput('');
  myInput.position(width/2.64, height/2)
  myInput.hide();

  startButton = createButton('Start');
  startButton.position(width/2.16, height/1.86)
  startButton.mousePressed(startButtonClicked);
  startButton.hide();

  backButton = createButton('Back to main menu');
  backButton.position(width/2.45, height/1.13);
  backButton.mousePressed(backButtonClicked);
  backButton.hide();

  playButton = createButton('Play');
  playButton.position(width/2.16, height/2)
  playButton.mousePressed(playButtonClicked);
  playButton.hide();

  replayButton = createButton('Replay');
  replayButton.position(width/2.16, height/2)
  replayButton.mousePressed(replayButtonClicked);
  replayButton.hide();

  rulesButton = createButton('Rules');
  rulesButton.position(width/2.18, height/1.8)
  rulesButton.mousePressed(rulesButtonClicked);
  rulesButton.hide();

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
    startGameScreen();
  } else if (screen_state == 2) {
    gameRunning();
  } else if (screen_state == 3) {
    endGame();
  } else if (screen_state == 4) {
    displayRules();
  }

}

function startButtonClicked() {
  screen_state = 2;
  myInput.hide();
  startButton.hide();
  backButton.hide();
  myText = myInput.value();
}

let backButtonState = false;
function backButtonClicked(){
  screen_state = 0;
  backButton.hide();
  myInput.hide();
  startButton.hide();
  replayButton.hide();
  backButtonState = true;
  resetGame();
}

function playButtonClicked(){
  screen_state = 1;
  playButton.hide();
  rulesButton.hide();
}

function replayButtonClicked(){
  screen_state = 2;
  replayButton.hide();
  backButton.hide();
  resetGame();
}

function rulesButtonClicked(){
  screen_state = 4;
  rulesButton.hide();
  playButton.hide();
}

//function to create a delay when comparing cards
const sleep = (millis) => { 
  return new Promise(resolve => setTimeout(resolve, millis)) 
}

function displayRules(){
  background(rulesBackground);
  backButton.show();
  fill(165,42,42);
  textAlign(CENTER);
  textSize(40);
  textFont(coolFont);
  text("Rules of WAR Card Game!", 400, 60);
  textSize(17);
  fill(0,0,0);
  text("War is a very simple card game for two players. Much like real war it's incredibly long", 400, 110);
  text("and pointless. It's mostly a kids game, since it relies exclusively on luck of the draw.", 400, 140);
  text("Like most card games it has plenty of regional variations, but the rules used on this site", 400, 170);
  text("are simple. The game is played as follows:", 400, 200);
  text("1. Each player gets dealt half the deck, 26 cards, and the cards are put face down", 400, 250);
  text("in a stack in front of the players.", 400, 280);
  text("2. Both players turn their top card face up at the same time. The person with the", 400, 310);
  text("higher card wins that draw, and takes both the cards.", 400, 340);
  text("3. If both players draw a card of the same rank, e.g. they both draw 8s, then", 400, 370);
  text("there's a war. The face up cards are left on the table and each player puts three", 400, 400);
  text("cards face down on the table, and then puts one card face up. The face up card", 400, 430);
  text("determines who wins the war and gets all 10 cards that are on the table at this", 400, 460);
  text("point. If the face up card is again the same rank, then the war goes on, three", 400, 490);
  text("more face down, one face up etc.", 400, 520);
  text("4. The player with the highest score at the end wins.", 400, 550);
  text("5. If a player finishes their cards during a war without having enough cards to", 400, 580);
  text("finish the war then he loses immediately.", 400, 610);
  text("That's all there is to it. Just a lot of clicking on cards and hoping for the best! Enjoy :)", 400, 660);

}

// Start screen is when screen state == 0
function startScreen() {
  background(startBackground);
  playButton.show();
  rulesButton.show();
  image(logo, 150, 50); // Title Screen Logo Image
  fill(100,100,255);
  textAlign(CENTER);
  textSize(30);
  textFont(coolFont);
  text("Welcome to War Card Game!", 800/2 - 20, 800/2 - 80);
  fill(200,200,200);
  textSize(18);
  //text("Choose an option to conitue", 800/2 - 20, 800/2 - 40);
}


function startGameScreen() {
  background(startBackground);
  myInput.show();
  startButton.show();
  backButton.show();
  image(logo, 150, 50); // Title Screen Logo Image
  fill(100,100,255);
  textAlign(CENTER);
  textSize(30);
  textFont(coolFont);
  text("Are you ready for WAR?!", 800/2 - 20, 800/2 - 100);
  fill(200,200,100);
  textSize(20);
  text("Enter your name!", 800/2 - 15, 800/2 - 20);
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
  if (myText == ''){
    text("Human: " + player1_score, 80, 780);
  } else {
    text(myText + ": " + player1_score, 80, 780);
  }
  text("Computer: " + player2_score, 700, 80);
  fill(193,248,207);
  rect(600, 680, 180, 50, 10, 10, 10, 10);
  describe('white rect with black outline');
  textSize(16);
  fill(40,40,40);
  textFont(coolFont);
  text("Click on your top card", 690, 700);
  text("to play it", 690, 720);
  
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
    screen_state = 5;
  }
}

function updateScore(){
  if (char1 > char2){
    player1_score += parseInt(char1) + parseInt(char2);
  } else if (char1 < char2){
    player2_score += parseInt(char1) + parseInt(char2);
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
  replayButton.show();
  replayButton.position(width/2.1, height/2.08);
  backButton.show();
  backButton.position(width/2.3, height/1.9);
  textSize(30);
  fill(100,100,255);
  textAlign(CENTER);
  textFont(coolFont);
  if (myText == '') {
    myText = 'Human'
  }
  if (player1_score > player2_score) {
    text("You WON, " + myText + "!", 800/1.8 - 45, 800/2.6 - 10);
    text("Great Job!", 800/1.8 - 45, 800/2.6 + 30);
  } else if (player1_score < player2_score) {
    text("Sorry " + myText + ", You Lost!", 800/1.8 - 45, 800/2.6 - 10);
    text("Good luck next time!", 800/1.8 - 45, 800/2.6 + 30);
  } else {
    text("Draw!", 800/1.8 - 45, 800/2.6);
    }
}

function mousePressed(){
  // Check the screen state
  // If screen state == 0 then start game
  // If screen state == 3(transition state) then end game
  // transition state is triggered when the cards array length == index length in gameRunning()
  //if (screen_state == 0) {
  //  screen_state = 1;
  //} else 
  if(screen_state == 5) {
    screen_state = 3;
  }
  //} else if (screen_state == 3) {
  //  resetGame();
  //  screen_state = 0;

  back1.clicked();
}

function preload(){
  startBackground = loadImage('assets/UI/startBackground.jpg');
  backgroundLogo = loadImage('assets/UI/cardBackground.jpg');
  endBackground = loadImage('assets/UI/endBackground.jpg');
  rulesBackground = loadImage('assets/UI/rulesBackground.jpg');
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
  char1 = 0;
  char2 = 0;
  player1_score = 0;
  player2_score = 0;
  if (backButtonState) {
    myText = '';
  }
  compare = false;
  move = false;
  global_control = true;
  randomize(names,names.length);
  setup();
  draw();
}