var screen = 0;
var y=-20;
var x=200;
var speed = 2;
var score= 0;
var startscreenBG;
var startScreenPlay;
var startScreenHelp;
var startScreenInfo;
var startScreenTitle;
var title;
var screenWidth = 960;
var screenHeight = 540;
var startScreenContainer;

// Preload ensures that everything within is loaded before setup does, to prevent
// assets from ending up being incomplete during setup.
function preload() {
  startscreenBG = loadImage('../assets/startscreenBG.svg'); // Loads the start screen BG
  startScreenPlay = createImg('../assets/knapp.svg').hide();
  startScreenHelp = createButton('Hjälp');
  startScreenInfo = createDiv("nä du får ingen hjälp").hide();
  startScreenContainer = createDiv().hide();
  startScreenTitle = createImg('../assets/titel.svg').hide();
}

function setup() {
  createCanvas(screenWidth, screenHeight); // This sets the "size" of the game. It's 960x540 pixels (16:9 aspect ratio)
}

function draw() {
	if(screen == 0){
    startScreen()
  }else if(screen == 1){
  	gameOn()
  }else if(screen==2){
  	endScreen()
  }	
}

function startScreen(){
    // Sets start screen background
    background(startscreenBG);

    // Shows start screen buttons and images
    startScreenPlay.show();
    startScreenHelp.show();
    startScreenTitle.show();
    startScreenPlay.show();
    startScreenContainer.show();

    // This puts the title and the buttons in a column
    // They're being put in an empty div "startScreenContainer" with flexbox attributes
    startScreenContainer.addClass('startScreenContainer');
    startScreenContainer.child(startScreenTitle);
    startScreenContainer.child(startScreenPlay);
    startScreenContainer.child(startScreenHelp);
    // The container's position on the canvas:
    startScreenContainer.position(0,30);
    startScreenContainer.center('horizontal');

    startScreenPlay.addClass('button');
    startScreenPlay.mousePressed(screenChange);

    startScreenHelp.addClass('button');
    startScreenHelp.mousePressed(showInfo);

    startScreenTitle.addClass('title');

    startScreenInfo.addClass('helpBox');
		
		reset();
}

function gameOn(){

  // If coming from the start screen, hide its buttons
  startScreenPlay.hide();
  startScreenHelp.hide();
  startScreenTitle.hide();


	background(0) // Sets background
  text("score = " + score, 30,20) // Shows score
  ellipse(x,y,20,20) // Creates circle
  rectMode(CENTER)
  rect(mouseX,height-10,50,30)
	y+= speed;
  if(y>height){
  	screen =2
	 }
  if(y>height-10 && x>mouseX-20 && x<mouseX+20){
  	y=-20
    speed+=.5
    score+= 1
  }
	if(y==-20){
  	pickRandom();
  }
}

function pickRandom(){
	x= random(20,width-20)
}

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

function reset(){
	  score=0;
  	speed=2;
  	y=-20;
}
