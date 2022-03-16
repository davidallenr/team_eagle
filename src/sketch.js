const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 800;
let deck;
let deck_2;

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  var a = new Deck;
  var b = new Deck;

  deck = a;
  deck_2 = b;
  deck.setDeckLocation((SCREEN_WIDTH/2) - IMAGE_WIDTH * 2, 20);
  deck_2.setDeckLocation((SCREEN_WIDTH/2) + IMAGE_WIDTH, SCREEN_HEIGHT - (IMAGE_HEIGHT + 20));
  print(a);
  print(b);
  noLoop(); // Pauses drawing until loop() called

}

function update() {
	let dt = deltaTime / 1000;

}

function draw() {
  background(220);

  deck.showHand();
  deck_2.showTopOfDeck();
  rect(SCREEN_WIDTH/2, (SCREEN_HEIGHT - 50) / 2, IMAGE_WIDTH, IMAGE_HEIGHT);
  
}

function mouseClicked() {
  loop();
  
}