var screen = 0; // The current screen (start screen or game screen)
var speed = 5; // The speed of the note
var score = 0; // The current score
var startBG; // The background image on the start screen
var startInfo; // The "How to play" box on the start screen
var startTitle; // The game's title on the start screen
var startContainer; // Container with title and start screen buttons

// Audio stuff
let mic;
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/'
let pitch;
let audioContext;
let freq = 0;
let threshold = 0.007;

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

var positionX = 50;
var positionAY = 50;
var positionBY = 150;
var positionCY = 350;
var positionDY = 450;
var coordX = 50;
var coordY = 250;

var canvas;

var notes = [];

let running = true;
let currentTime;
let timer = 2000;
let nextChange = timer;

let timeCounter = 0;

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

  startInfo = createDiv("nä du får ingen hjälp").hide();
  startContainer = createDiv().hide();
  startTitle = createImg('../assets/titel.svg').hide();

  positionImg = loadImage('../assets/position.svg');
  playerImg = loadImage('../assets/tempkaraktär.svg');
  noteImg = loadImage('../assets/note.svg');
}

function setup() {
  //canvas = createCanvas(screenWidth, screenHeight); // This sets the "size" of the game. It's 960x540 pixels (16:9 aspect ratio)
  let cnv = createCanvas(1440, 810); // This sets the "size" of the game. It's 960x540 pixels (16:9 aspect ratio)
  audioContext = getAudioContext();
  cnv.mousePressed(userStartAudio);
  textAlign(CENTER);
  fft = new p5.FFT();
  mic = new p5.AudioIn();
  mic.start(listening);
  fft.setInput(mic);
}

//Laddar in pitchdetection från ml5 samt skriver ut ddet till konsollen
function listening(){
  console.log('Listening...');
  pitch = ml5.pitchDetection(
    model_url,
    audioContext,
    mic.stream,
    modelLoaded);
}

//Laddar modellen (oklart varför man måste göra detta?)
function modelLoaded() {
  console.log('model loaded');
  pitch.getPitch(gotPitch);
}

//Funktionen som kollar om vi har en frekvens, om nej så loggar den ett error, om vi har fått in en frekvens sätts
//Variabeln freq till vår frekvens sen körs den igen (basically en oändlig loop atm)
function gotPitch(error, frequency){
  let volume = mic.getLevel();
  if(error){
    console.log(error);
  }
  if(frequency && volume>threshold){
    freq = frequency;
  }
  else{
    freq = 0;
  }
  pitch.getPitch(gotPitch);
}

function draw() {
  if(screen == 0){ // Temporary change, start screen is 0
    startScreen()
    //gameOn();
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
    startTitle.show();
    startPlay.show();
    startContainer.show();

    // This puts the title and the buttons in a column
    // They're being put in an empty div "startScreenContainer" with flexbox attributes
    //startScreenContainer.parent(canvas);
    startContainer.addClass('startScreenContainer');
    startContainer.child(startTitle);
    startContainer.child(startPlay);
    startContainer.child(startHelp);
    // The container's position on the canvas:
    startContainer.position(0,30);
    startContainer.center('horizontal');

    startPlay.addClass('button');
    startPlay.mousePressed(screenChange);

    startHelp.addClass('button');
    startHelp.mousePressed(showInfo);

    startTitle.addClass('title');

    startInfo.addClass('helpBox');
		
		reset();
}

function gameOn(){
  audioControl();
  // If coming from the start screen, hide its buttons
  startPlay.hide();
  startPlay2.hide();
  startPlay3.hide();
  startHelp.hide();
  startTitle.hide();


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
      position = 4;
      break;
    case 3:
      noteY = noteLow2;
      position = 5;
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
  startInfo.show();
}

function hideInfo() {
  startInfo.hide();
}

function audioControl(){
  console.log("frekvens = " + freq);
  if (running){
    if(freq >= 450){
      playerY = 54;
      playerCurrent = 1;
    }
    else if(450 > freq && freq > 300 ){
      playerY = 186;
      playerCurrent = 2;
    }
    else if(300 > freq && freq >= 150){
      playerY = 452;
      playerCurrent = 4;
    }
    else if(150 > freq && freq > 1){
      playerY = 585;
      playerCurrent = 5;
    }
    else {
      playerY = 319;
      playerCurrent = 3;
    }
  }
}

/*function keyPressed() {
  if (running) {
    switch(keyCode) {
      case 65:
        playerY = 54;
        playerCurrent = 1;
        break;
      case 83:
        playerY = 186;
        playerCurrent = 2;
        break;
      case 68:
        playerY = 452;
        playerCurrent = 4;
        break;
      case 70:
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
*/
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

/*//Fixa harmonic product spectrum... 
function draw() {
  let volume = mic.getLevel();
  let threshold = 0.007;
  console.log("volyme is " + volume);
  background(43, 236, 82);
  //Teststorlek samt freq.toFixed skriver ut frekvensen
  textSize(64);
  if(volume > threshold){
    text(freq.toFixed(2), width/2, height/2);
    //console.log(freq);
  }
  else{
    text("0",width/2, height/2);
  }
  //FFTn (som egentligen inte ens används)
  let spectrum = fft.analyze();
  for (let i = 0; i< spectrum.length; i++){
    fill(0, 0, 255);
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }
}*/
