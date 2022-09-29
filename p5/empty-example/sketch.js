var screen = 0;
var y=-20;
var x=200;
var speed = 5;
var score= 0;
var startBG;
var startScreenPlay;
var startScreenHelp;
var startScreenInfo;
var startScreenTitle;
var title;
var startScreenContainer;

// All buttons
var startPlay;
var startPlay2;
var startPlay3;
var startHelp;
var startHelp2;
var startHelp3;

// The player
var playerImg;
var player;
var playerCurrent = 3;
var playerX = 104;
var playerY = 319;

// The positions
var positionImg;
var positionCurrent;
var positionHigh2;
var positionHigh;
var positionBase;
var positionLow;
var positionLow2;

// The note
var noteImg;
var noteX = 76;
var noteY;
var noteHigh2 = 64;
var noteHigh = 198;
var noteLow = 463;
var noteLow2 = 596;

var positionNoteX = 1000;
var positionNoteY;
var positionX = 50;
var positionAY = 50;
var positionBY = 150;
var positionCY = 350;
var positionDY = 450;
var coordX = 50;
var coordY = 250;

var canvas;

let notes = [];

var leftEdge = positionX-27;
var rightEdge = positionX+27;

let running = true;
let currentTime;
let timer = 2000;
let nextChange = timer;

let timeCounter = 0;
//let time = setInterval(gameFunction(), 1000);
//let nextSecond = time;

let img;

var current;
var noteInfo;

var position;
var noteY;

// Preload ensures that everything within is loaded before setup does, to prevent
// assets from ending up being incomplete during setup.
function preload() {
  startBG = loadImage('../assets/startBG.svg');

  startPlay = createImg('../assets/spela1.svg').hide();
  startPlay2 = createImg('../assets/spela2.svg').hide();
  startPlay3 = createImg('../assets/spela3.svg').hide();
  startHelp = createImg('../assets/hur1.svg').hide();
  startHelp2 = createImg('../assets/hur2.svg').hide();
  startHelp3 = createImg('../assets/hur3.svg').hide();

  startScreenInfo = createDiv("nä du får ingen hjälp").hide();
  startScreenContainer = createDiv().hide();
  startScreenTitle = createImg('../assets/titel.svg').hide();

  positionImg = loadImage('../assets/position.svg');
  playerImg = loadImage('../assets/tempkaraktär.svg');
  noteImg = loadImage('../assets/note.svg');
}

function setup() {
  //canvas = createCanvas(screenWidth, screenHeight); // This sets the "size" of the game. It's 960x540 pixels (16:9 aspect ratio)
  createCanvas(1440, 810); // This sets the "size" of the game. It's 960x540 pixels (16:9 aspect ratio)
  //pixelDensity(1);
  //image(startScreenBG,0,0).hide();
}

function draw() {
  if(screen == 0){ // Temporary change, start screen is 0
    //startScreen()
    gameOn();
  }else if(screen == 1){
  	gameOn()
  }else if(screen==2){
  	endScreen()
  }	
}

function startScreen(){
    // Sets start screen background
    background(startBG);
    //background(255);
    //image(startScreenBG,0,0);

    // Shows start screen buttons and images
    startHelp.show();
    startScreenTitle.show();
    startPlay.show();
    startScreenContainer.show();

    // This puts the title and the buttons in a column
    // They're being put in an empty div "startScreenContainer" with flexbox attributes
    //startScreenContainer.parent(canvas);
    startScreenContainer.addClass('startScreenContainer');
    startScreenContainer.child(startScreenTitle);
    startScreenContainer.child(startPlay);
    startScreenContainer.child(startHelp);
    // The container's position on the canvas:
    startScreenContainer.position(0,30);
    startScreenContainer.center('horizontal');

    startPlay.addClass('button');
    startPlay.mousePressed(screenChange);

    startHelp.addClass('button');
    startHelp.mousePressed(showInfo);

    startScreenTitle.addClass('title');

    startScreenInfo.addClass('helpBox');
		
		reset();
}

function gameOn(){

  // If coming from the start screen, hide its buttons
  startPlay.hide();
  startPlay2.hide();
  startPlay3.hide();
  startHelp.hide();
  startScreenTitle.hide();


	background("#96ffff") // Sets background
  //text(`${round(millis()/1000)} seconds have gone by!`, 20, height/2);
  text("score = " + score, 30,20);
  text("player is at" + playerCurrent, 100, 20);
  //text("time = " + timeCounter, 100, 20);

  // A circle is 100px wide/high
  positionHigh2 = image(positionImg,100,89); // Player at 53
  positionHigh = image(positionImg,100,221); // Player at 186
  //positionBase = image(positionImg,100,354); // Player at 319
  positionLow = image(positionImg,100,487); // Player at 452
  positionLow2 = image(positionImg,100,620); // Player at 585

  player = image(playerImg,playerX,playerY); // The player is approx 94 px wide and 172px high

  if (running) { // The game is running

    if (millis() > nextChange) {
      notes.push(new Note());
      nextChange = millis() + timer;
    }
  
    for (let i = 0; i < notes.length; i++) {
      notes[i].update();
      notes[i].display();
    }
  } else { // The game is paused
    for (let i = 0; i < notes.length; i++) {
      notes[i].display(); // Show note
    }
  }




  ////////// SQUARE CODE
  /*let c = color('magenta')
  fill(c)
  noStroke();
  rect(positionX, positionAY, 55, 55); // Location (30,20), size 55x55
  rect(positionX, positionBY, 55, 55);
  rect(positionX, positionCY, 55, 55);
  rect(positionX, positionDY, 55, 55);

  c = color(255, 204, 0);
  fill(c);
  player = rect(coordX,coordY,55,55);

  c = color('red');
  fill(c)

  if (running) { // The game is running

    if (millis() > nextChange) {
      notes.push(new Note());
      nextChange = millis() + timer;
    }
  
    for (let i = 0; i < notes.length; i++) {
      notes[i].update();
      notes[i].display();
    }
  } else { // The game is paused
    for (let i = 0; i < notes.length; i++) {
      notes[i].display(); // Show note
    }
  }*/
  ///////////////////////

  /*
  if millis() = 30 000
  end game
  */
}

// The note class
class Note {
  constructor() { // The start values of the note
    noteInfo = notePosition();
    this.x = 1600;
    this.y = noteInfo[0]; // One of 4 random values
    this.current = noteInfo[1];
  }
  update() { // Used to update the note's position (goes to the left)
    if (100<this.x && this.x<200 && playerCurrent==this.current) {
      this.hitNote();
    }
    
    this.x -= speed;
  }
  display() { // Used to display the note
    image(noteImg,this.x,this.y);
    //this.current = this.currentPosition();
  }
  hitNote() { // Used when a note is hit
    score +=1;
    this.x = -1000;
  }
}

function notePosition() {
  //var position;
  var randomNote = [0,1,2,3];
  //var noteY;
  var temp;
  temp = random(randomNote);

  switch(temp) {
    case 0:
      noteY = noteHigh2;
      position = 1;
      break;
    case 1:
      noteY = noteHigh;
      position = 2;
      break;
    case 2:
      noteY = noteLow;
      position = 3;
      break;
    case 3:
      noteY = noteLow2;
      position = 4;
      break;
  }

  return [noteY,position];
}

/*function currentPosition() {
  switch(this.y) {
    case noteHigh2:
      this.current = 1;
      break;
    case noteHigh:
      this.current = 2;
      break;
    case noteLow:
      this.current = 4;
      break;
    case noteLow2:
      this.current = 5;
      break;
  }*/

// Function to put a music note randomly in one of 4 given Y-positions
/*function notePosition() {
  var randomNote = [0,1,2,3];
  var noteY;
  var temp;
  temp = random(randomNote);

  switch(temp) {
    case 0:
      noteY = noteHigh2;
      break;
    case 1:
      noteY = noteHigh;
      break;
    case 2:
      noteY = noteLow;
      break;
    case 3:
      noteY = noteLow2;
      break;
  }

  return noteY;
}*/

function endScreen(){
		background(150)
		textAlign(CENTER);
		text('GAME OVER', width / 2, height / 2)
  	text("SCORE = " + score, width / 2, height / 2 + 20)
		text('click to play again', width / 2, height / 2 + 40);
}

function screenChange(){
	if(screen==0){
  	screen=1
  }else if(screen==2){
  	screen=0
  }
}

function showInfo() {
  startScreenInfo.show();
}

function hideInfo() {
  startScreenInfo.hide();
}

function keyPressed() {
  if (running) {
    switch(keyCode) {
      case 65:
        coordY = positionAY;
        playerY = 54;
        playerCurrent = 1;
        break;
      case 83:
        coordY = positionBY;
        playerY = 186;
        playerCurrent = 2;
        break;
      case 68:
        coordY = positionCY;
        playerY = 452;
        playerCurrent = 4;
        break;
      case 70:
        coordY = positionDY;
        playerY = 585;
        playerCurrent = 5;
        break;
      case 32:
        gamePause();
        break;
    }
    return false;
  } else {
    switch(keyCode) {
      case 32:
        gamePause();
        break;
    }
    return false;
  }
}

function gamePause() {
  running = !running;
}

/*function gameTimer() {
  timeCounter++;
}*/

function reset(){
	  score=0;
  	speed=2;
  	y=-20;
}
