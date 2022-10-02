// ----- VARIABLES -----
// Basics
let canvas; // The canvas itself
let kaphFont; // The font used in the game
let screen = 0; // The current screen (start screen or game screen)
let score; // The current score

// Misc images
let startBG; // The background image on the start screen
let startTitle; // The game's title on the start screen
let positionImg; // The "circle" the player moves to during the game
let noteImg; // The note (candy)
let candy; // Displays candy on the end popup

// Containers and text
let startInfo; // The "How to play" box on the start screen
let endBox; // The container for the end popup
let pauseBox; // The container for the pause popup
let timeBox; // The container for the time left
let scoreBox; // The container for the score gained
let results; // Div containing the text result, div is needed to display text on top of image

let timeText; // Text displaying time remaining
let scoreText; // Text displaying score gained
let resultText; // Text displaying the results on end, ex. 20/20

// Phadderister images
// "Play" are used during gameplay, others are on the start screen
let legionen;
let legionenPlay;
let kretsn;
let kretsnPlay;
let nphadderiet;
let nphadderietPlay;
let familjen;
let familjenPlay;
let skurkeriet;
let skurkerietPlay;
let characters; // Array storing the gameplay images, used for randomizing

// Buttons
let startPlay; // The "Play" button on the start screen
let startHelp; // The "How to play" button on the start screen
let pauseContinue; // The "Continue" button on the pause popup
let pauseQuit; // The "Quit" button on the pause popup
let endPlay; // The "Play again" button on the end popup
let endQuit; // The "Quit" button on the end popup
let X; // The X button in the "How to play" box
let pauseIcon; // The pause icon on the game screen

// Sounds
let speedSound; // Plays when note speeds up
let completeSound; // Plays when game is over
let noteSound; // Plays when a note is hit
let buttonSound; // Plays when used clicks a button
let legionenSound; // Plays when user clicks on Legionen
let kretsnSound; // Plays when user clicks on Kretsn
let nphadderietSound; // Plays when user clicks on N-Phadderiet
let familjenSound; // Plays when user clicks on Familjen
let skurkerietSound; // Plays when user clicks on Skurkeriet

// Booleans (they are mostly being used when we want to run a function only once)
let running = false; // Whether the game is running or not
let hasPlayerStarted = false; // Runs when player starts the game, triggers delay before game starts
let isDelayOver = false; // Runs when the delay ends, triggers the start of the game
let hasGameStarted = false; // Runs when the game starts, triggers gameplay

// Time
const gameLength = 30; // How long the game runs
const delay = 5; // How long the game is delayed before start
let timeStarter; // Starts the game timer
let delayStarter; // Starts the delay timer
let timeCounter; // Counts how many seconds the game has been running
let delayCounter; // Counts how many seconds the game has been delayed
let timeLeft; // How many seconds are left before the game ends
// let speed; // The speed of the note (used if note speed should be the same for all displayed notes)
let spawnTime; // How many milliseconds between each note spawns
let nextSpawn; // Needed to spawn new notes
let speedMode; // Sets a new speed and spawn time

// Player settings
let player; // An "image()" that contains an image, an X-pos and a Y-pos
let playerImg; // The image used for the player, is randomized
let playerCurrent; // The current indexed Y-position the player is at, to sync with the note position
const playerX = 90; // The X-pos the player is at
let playerY; // The Y-pos the player is at

// Player positions are image()s that contain the circle image, X-position and Y-positions
let positionHigh2;
let positionHigh;
// let positionBase; // Circle for the middle position isn't displayed
let positionLow;
let positionLow2;
const positionX = 100; // The X-position of the circles

// Notes
let totalNotes; // Counts how many notes have been spawned in a round
let notes; // Array storing spawned notes
let noteInfo; // Containes a notes actual Y-position and indexed Y-position

// Audio stuff
let mic;
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/'
let pitch;
let audioContext;
let freq = 0;
// ----------





// ----- SETUP FUNCTIONS -----
// Preload ensures that everything within is loaded before setup does, to prevent
// assets from ending up being incomplete during setup. Load all images and sounds in here!
function preload() {
  // Font
  kaphFont = loadFont('../assets/kaph-font/Kaph-Regular.otf');

  // Sound assets
  speedSound = loadSound('../assets/sound/speed.mp3');
  completeSound = loadSound('../assets/sound/complete.wav');
  noteSound = loadSound('../assets/sound/collect.wav');
  buttonSound = loadSound('../assets/sound/click.mp3');
  legionenSound = loadSound('../assets/sound/wave.wav');
  kretsnSound = loadSound('../assets/sound/raygun.mp3');
  nphadderietSound = loadSound('../assets/sound/working.wav');
  familjenSound = loadSound('../assets/sound/foliage.mp3');
  skurkerietSound = loadSound('../assets/sound/evillaugh.mp3');

  // Loaded images
  startBG = loadImage('../assets/startBG.svg');
  positionImg = loadImage('../assets/position.svg');
  noteImg = loadImage('../assets/note.svg');
  legionenPlay = loadImage('../assets/legionenPlay.svg');
  kretsnPlay = loadImage('../assets/kretsnPlay.svg');
  nphadderietPlay = loadImage('../assets/n-phadderietPlay.svg');
  familjenPlay = loadImage('../assets/familjenPlay.svg');
  skurkerietPlay = loadImage('../assets/skurkerietPlay.svg');
  characters = [legionenPlay, kretsnPlay, nphadderietPlay, familjenPlay, skurkerietPlay];

  // Created images
  // NOTE: They are all layered! Later images are layered on top of earlier images
  legionen = createImg('../assets/legionen.svg').hide();
  kretsn = createImg('../assets/kretsn.svg').hide();
  nphadderiet = createImg('../assets/n-phadderiet.svg').hide();
  familjen = createImg('../assets/familjen.svg').hide();
  skurkeriet = createImg('../assets/skurkeriet.svg').hide();
  startPlay = createImg('../assets/spela1.svg').hide();
  startHelp = createImg('../assets/hur1.svg').hide();
  startTitle = createImg('../assets/titel.svg').hide();
  startInfo = createImg('../assets/hurmanspelar.svg').hide();
  X = createImg('../assets/x.svg').hide();
  endBox = createImg('../assets/avklarad.svg').hide();
  endPlay = createImg('../assets/spelaigen1.svg').hide();
  endQuit = createImg('../assets/avsluta1.svg').hide();
  pauseBox = createImg('../assets/paus.svg').hide();
  pauseContinue = createImg('../assets/fortsätt1.svg').hide();
  pauseQuit = createImg('../assets/avsluta1.svg').hide();
  pauseIcon = createImg('../assets/pausikon.svg').hide();
  candy = createImg('../assets/note.svg').hide();
  timeBox = createImg('../assets/tid.svg').hide();
  scoreBox = createImg('../assets/score.svg').hide();

  // Divs for text
  results = createDiv(resultText)
  .style('font-family','Kaph-Regular')
  .style('font-size','62px')
  .style('color','#ff8484ff').hide();
  scoreText = createDiv(score)
  .style('font-family','Kaph-Regular')
  .style('font-size','36px')
  .style('color','#ff8484ff').hide();
  timeText = createDiv(timeLeft)
  .style('font-family','Kaph-Regular')
  .style('font-size','36px')
  .style('color','#ff8484ff').hide();
}

// Setup
function setup() {
  canvas = createCanvas(1440, 810); // This sets the "size" of the game in pixels
  textFont(kaphFont); // Sets the custom font as default
  textSize(48); // Sets default font size

  audioContext = getAudioContext();
  canvas.mousePressed(userStartAudio);
  textAlign(CENTER);
  fft = new p5.FFT();
  mic = new p5.AudioIn();
  mic.start(listening);
  fft.setInput(mic);
}

// Draw displays either the start screen or the game screen
function draw() {
  if (screen == 0) { // Start screen
    startScreen();
  } else if (screen == 1) { // Game screen
  	gameScreen();
  }
}
// ----------




// ----- AUDIO FUNCTIONS -----
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
  if(error){
    console.log(error);
  }
  if(frequency){
    freq = frequency;
  }
  pitch.getPitch(gotPitch);
}
// ----------




// ----- GAME SCREENS -----
function startScreen(){
    // Sets start screen background
    background(startBG);

    // If coming from the game screen, hide its buttons and images
    endBox.hide();
    endPlay.hide();
    endQuit.hide();
    pauseBox.hide();
    pauseContinue.hide();
    pauseQuit.hide();
    pauseIcon.hide();
    candy.hide();
    results.hide();
    timeBox.hide();
    scoreBox.hide();
    timeText.hide();
    scoreText.hide();

    // Shows start screen buttons and images
    startHelp.show();
    startTitle.show();
    startPlay.show();
    legionen.show();
    kretsn.show();
    nphadderiet.show();
    familjen.show();
    skurkeriet.show();

    // Sets positions of buttons and images
    startInfo.position(150,115);
    X.position(1194,139);
    startTitle.position(277,30);
    startPlay.position(457,465);
    startHelp.position(457,590);
    legionen.position(90,450);
    kretsn.position(250,300);
    nphadderiet.position(1000,300);
    familjen.position(1250,280);
    skurkeriet.position(1150,500);

    // Mouse button functions
    X.mousePressed(hideInfo);
    startPlay.mousePressed(screenChange);
    startHelp.mousePressed(showInfo);
    legionen.mousePressed(legionenClick);
    kretsn.mousePressed(kretsnClick);
    nphadderiet.mousePressed(nphadderietClick);
    familjen.mousePressed(familjenClick);
    skurkeriet.mousePressed(skurkerietClick);
		
    // Sets all game stats to their initial value
		resetGame();
}

function gameScreen(){
  // ----- Game setup
  // Sets game screen background
  background("#96ffff");

  // If coming from the start screen, hide its buttons and images
  startHelp.hide();
  startTitle.hide();
  startPlay.hide();
  legionen.hide();
  kretsn.hide();
  nphadderiet.hide();
  familjen.hide();
  skurkeriet.hide();

  // Positions and images
  endBox.position(353,115);
  endPlay.position(457,444);
  endQuit.position(457,565);
  pauseBox.position(428,175);
  pauseContinue.position(457,349);
  pauseQuit.position(457,476);
  pauseIcon.position(1348,14);
  candy.position(786,217);
  results.position(511, 260);
  timeBox.position(547,15);
  scoreBox.position(727,15);
  timeText.position(619,30);
  scoreText.position(798,30);

  positionHigh2 = image(positionImg,positionX,89);
  positionHigh = image(positionImg,positionX,221);
  //positionBase = image(positionImg,positionX,354);
  positionLow = image(positionImg,positionX,487);
  positionLow2 = image(positionImg,positionX,620);
  player = image(playerImg,playerX,playerY);

  // Text settings
  resultText = score + "/" + totalNotes;
  results.html(resultText);
  scoreText.html(score);
  timeText.html(timeLeft);

  // Mouse button functions
  endPlay.mousePressed(gameAgain);
  endQuit.mousePressed(screenChange);
  pauseContinue.mousePressed(gameContinue);
  pauseQuit.mousePressed(screenChange);
  pauseIcon.mousePressed(gamePause);
  // -----

  // ----- During game
  // Runs when the player has started the game. It starts a delay before the gameplay begins
  if (hasPlayerStarted) {
    delayStarter = setInterval(delayTimer,1000); // Starts the delay timer
    hasPlayerStarted = false; // Disables this function so it doesn't run anymore
  }

  // Displays 3, 2, 1, GO! text before the gameplay starts
  switch (delayCounter) {
    case 1:
      fill('#ff8484ff');
      text('3',1440/2,810/2);
      break;
    case 2:
      text('2',1440/2,810/2);
      break;
    case 3:
      text('1',1440/2,810/2);
      break;
    case 4:
      text('KÖR!',1440/2,810/2);
      break;
  }

  // Runs when the delay is over. It starts running the game
  if (delayCounter == delay && isDelayOver == false) {
    clearInterval(delayStarter); // Stops the delay timer
    running = true;
    isDelayOver = true; // Disables this function so it doesn't run anymore
  }

  // Runs when the game starts running. It starts the game timer
  if (hasGameStarted == false && running) {
    timeStarter = setInterval(gameTimer,1000); // Starts the game timer
    hasGameStarted = true; // Disables this function so it doesn't run anymore
  }

  // The game is running
  if (running) {
    // Show relevant icons
    pauseIcon.show();
    timeBox.show();
    scoreBox.show();
    scoreText.show();
    timeText.show();

    // Spawn/speed times and game end
    if (timeLeft == 10 && speedMode == 1) {
      speedSound.play();
      spawnTime = 1000;
      speedMode = 2;
    } else if (timeLeft == 5 && speedMode == 2) {
      speedSound.play();
      spawnTime = 400;
      speedMode = 3;
    } else if (timeLeft == -1) {
      gameComplete(); // Ends game and displays end popup
    }

    // Spawning new notes
    if (millis() > nextSpawn) {
      if (timeLeft > 3) { // Prevents notes from spawning near the end of the round
        notes.push(new Note()); // Spawn new note
      }
      nextSpawn = millis() + spawnTime; // Makes sure this runs again for next spawn
    }
  
    // Displays and updates positions for all currently spawned notes
    for (let i = 0; i < notes.length; i++) {
      notes[i].update();
      notes[i].display();
    }

  } else { // The game is paused
    // Only displays note, doesn't move it
    for (let i = 0; i < notes.length; i++) {
      notes[i].display();
    }
  }
}
// ----------




// ----- GAME FUNCTIONS -----
// Sets initial values of the game
function resetGame() {
  clearInterval(timeStarter);
	score = 0;
  //speed = 5;
  spawnTime = 2000;
  nextSpawn = spawnTime;
  timeCounter = 0;
  timeLeft = gameLength;
  notes = [];
  speedMode = 1;
  hasGameStarted = false;
  playerY = 307;
  playerCurrent = 3;
  playerImg = random(characters);
  totalNotes = 0;
  delayCounter = 0;
  isDelayOver = false;
}

// Switches between start screen and game screen
function screenChange() {
  buttonSound.play(); // Since the user clicked a button to come here, play sound
	
  if (screen == 0) { // Start -> Game
  	screen = 1;
    hasPlayerStarted = true; // Triggers the delay before the game starts
  } else if (screen == 1) { // Game -> Start
  	screen = 0;
  }
}

// The note class
class Note {
  constructor() { // The initial values of the note
    noteInfo = notePosition(); // Randomized Y-position
    this.y = noteInfo[0]; // Sets real Y-position
    this.current = noteInfo[1]; // Sets indexed Y-position
    this.x = 1460; // Initial X-position
    totalNotes++; // Counts total amount of spawned notes

    // Sets individual speeds for notes depending on time remaining
    switch (speedMode) {
      case 1:
        this.speed = 5;
        break;
      case 2:
        this.speed = 6;
        break;
      case 3:
        this.speed = 7;
        break;
    }

  }
  update() { // Used to update the note's position (goes to the left)
    // If player hits the note
    if (30 < this.x && this.x < 180 && playerCurrent == this.current) {
      this.hitNote();
    }
    
    this.x -= this.speed; // Moves note to the left according to speed
  }
  display() { // Used to display the note
    image(noteImg, this.x, this.y);
  }
  hitNote() { // Used when a note is hit
    noteSound.play();
    score += 1;
    this.x = -1000; // Moves note outside the canvas so it's no longer shown
  }
}

// Randomizes a note's Y-position
function notePosition() {
  let noteY; // Real Y-position
  let position; // Indexed Y-position

  const randomNote = [0,1,2,3]; // 4 indexed positions
  const temp = random(randomNote); // Randomizes position

  switch(temp) {
    case 0:
      noteY = 64;
      position = 1;
      break;
    case 1:
      noteY = 198;
      position = 2;
      break;
    case 2:
      noteY = 463;
      position = 4;
      break;
    case 3:
      noteY = 596;
      position = 5;
      break;
  }

  return [noteY,position];
}

// Counts seconds and time remaining
function gameTimer() {
  if (timeLeft != -1 && running) {
    timeCounter++;
    timeLeft = gameLength - timeCounter;
  }
}

// Counts seconds the game start had been delayed
function delayTimer() {
  delayCounter++;
}

// Pause the game and show pause popup
function gamePause() {
  running = !running;
  buttonSound.play();
  pauseBox.show();
  pauseContinue.show();
  pauseQuit.show();
  pauseIcon.hide();
}

// Continue the game from the pause popup and hide it
function gameContinue() {
  buttonSound.play();
  running = true;
  pauseBox.hide();
  pauseContinue.hide();
  pauseQuit.hide();
  pauseIcon.show();
}

// On game end, hide gameplay items and show end popup items
function gameComplete() {
  running = !running;
  completeSound.play();
  endBox.show();
  endPlay.show();
  endQuit.show();
  candy.show();
  results.show();
  pauseIcon.hide();
  timeBox.hide();
  scoreBox.hide();
  timeText.hide();
  scoreText.hide();
}

// If user wants to play again, hide end popup and reset game values
function gameAgain() {
  buttonSound.play();
  endBox.hide();
  endPlay.hide();
  endQuit.hide();
  candy.hide();
  results.hide();
  resetGame();
  hasPlayerStarted = true;
}

// Show "How to play" box
function showInfo() {
  buttonSound.play();
  startInfo.show();
  X.show();
}

// Hide "How to play" box
function hideInfo() {
  buttonSound.play();
  startInfo.hide();
  X.hide();
}

// Sound plays when clicking on a phadderist on the start page
function legionenClick() {
  legionenSound.play();
}
function kretsnClick() {
  kretsnSound.play();
}
function nphadderietClick() {
  nphadderietSound.play();
}
function familjenClick() {
  familjenSound.play();
}
function skurkerietClick() {
  skurkerietSound.play();
}

// FOR DEBUG ONLY: Play the game with ASDF keyboard buttons
function keyPressed() {
  if (running) {
    switch(keyCode) {
      case 65:
        playerY = 45;
        playerCurrent = 1;
        break;
      case 83:
        playerY = 172;
        playerCurrent = 2;
        break;
      case 68:
        playerY = 438;
        playerCurrent = 4;
        break;
      case 70:
        playerY = 575;
        playerCurrent = 5;
        break;
    }
    return false;
  }
}
// ----------


// ----- TRASH CAN? -----
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
