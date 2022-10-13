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
let delayInfo; // Div containing the delay text
let calibrateBox; // Container for the calibration
let calibrationInfo; // Container for the calibration text

let timeText; // Text displaying time remaining
let scoreText; // Text displaying score gained
let resultText; // Text displaying the results on end, ex. 20/20
let delayText; // Text during the delay, "3,2,1,GO!"
let calibrationText; // Text during the calibration

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
let beginPlaying; // The "Begin playing" button on the calibration popup
let beginPlayingOpac; // The transparent "Begin playing" button on the calibration popup
let startBtnCalibrate; // Button to start the calibration 

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
let septemberSound; // Plays when the game starts 
let fartSound; // Plays when game is over and the score is 0
let allstarSound; // Plays on the start screen


// Booleans (they are mostly being used when we want to run a function only once)
let running = false; // Whether the game is running or not
let hasPlayerStarted = false; // Runs when player starts the game, triggers delay before game starts
let isDelayOver = false; // Runs when the delay ends, triggers the start of the game
let hasGameStarted = false; // Runs when the game starts, triggers gameplay
let hasCalibrated = false; // Runs when the calibration is over, starts the game 
let showCircles = false; // Shows circles when the came starts 
let allstarPlay = true; // Starts the background when the game starts 
let hasCalibrationStarted = false; // Runs when the calibration has started, makes it possible to gather avgFreq

// Time
const gameLength = 30; // How long the game runs
const delayTime = 5; // How long the game is delayed before start
let timeStarter; // Starts the game timer
let delayStarter; // Starts the delay timer
let timeCounter; // Counts how many seconds the game has been running
let delayCounter; // Counts how many seconds the game has been delayed
let timeLeft; // How many seconds are left before the game ends
let noteSpeed; // The speed of the note (used if note speed should be the same for all displayed notes)
let spawnTime; // How many milliseconds between each note spawns
let nextSpawn; // Needed to spawn new notes
let speedMode; // Sets a new speed and spawn time
let calibrationCounter = 7; // Counter that is active during the calibration, 7 is just a random number separated from the time the calibration is active 


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
let freqArr = []; // Array of all the frequencies gathered during the calibration 

// Thresholds for the different position during the game 
let threshold1; 
let threshold2;
let avgFreq = 1000;
let threshold4;
let threshold5;

// Calibration wave things
let interval; 
let waveform;
let trigger;

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
  fartSound = loadSound('../assets/sound/fart.mp3');
  septemberSound = loadSound('../assets/sound/september.mp3');
  allstarSound = loadSound('../assets/sound/allstar.mp3');
  

  // Loaded images (these are bad as SVG is not supported here, which means images won't scale)
  noteImg = loadImage('../assets/note.svg');

  // Created images
  // NOTE: They are all layered! Later images are layered on top of earlier images
  startBG = createImg('../assets/startBG.svg',"").hide();
  positionHigh2 = createImg('../assets/position.svg',"").hide();
  positionHigh = createImg('../assets/position.svg',"").hide();
  positionLow = createImg('../assets/position.svg',"").hide();
  positionLow2 = createImg('../assets/position.svg',"").hide();
  legionenPlay = createImg('../assets/legionenPlay.svg',"").hide();
  kretsnPlay = createImg('../assets/kretsnPlay.svg',"").hide();
  nphadderietPlay = createImg('../assets/n-phadderietPlay.svg',"").hide();
  familjenPlay = createImg('../assets/familjenPlay.svg',"").hide();
  skurkerietPlay = createImg('../assets/skurkerietPlay.svg',"").hide();
  characters = [legionenPlay, kretsnPlay, nphadderietPlay, familjenPlay, skurkerietPlay];
  //noteImg = createImg('../assets/note.svg').hide();
  legionen = createImg('../assets/legionen.svg',"").hide();
  kretsn = createImg('../assets/kretsn.svg',"").hide();
  nphadderiet = createImg('../assets/n-phadderiet.svg',"").hide();
  familjen = createImg('../assets/familjen.svg',"").hide();
  skurkeriet = createImg('../assets/skurkeriet.svg',"").hide();
  startPlay = createImg('../assets/spela1.svg',"").hide();
  startHelp = createImg('../assets/hur1.svg',"").hide();
  startTitle = createImg('../assets/titel.svg',"").hide();
  startInfo = createImg('../assets/hurmanspelar.svg',"").hide();
  X = createImg('../assets/x.svg',"").hide();
  endBox = createImg('../assets/avklarad.svg',"").hide();
  endPlay = createImg('../assets/spelaigen1.svg',"").hide();
  endQuit = createImg('../assets/avsluta1.svg',"").hide();
  pauseBox = createImg('../assets/paus.svg',"").hide();
  pauseContinue = createImg('../assets/fortsatt1.svg',"").hide();
  pauseQuit = createImg('../assets/avsluta1.svg',"").hide();
  pauseIcon = createImg('../assets/pausikon.svg',"").hide();
  candy = createImg('../assets/note.svg',"").hide();
  timeBox = createImg('../assets/tid.svg',"").hide();
  scoreBox = createImg('../assets/score.svg',"").hide();
  calibrateBox = createImg('../assets/kalibrering.svg',"").hide();
  startBtnCalibrate = createImg('../assets/starta_kalibrering.svg',"").hide();
  textListening = createImg('../assets/lyssnar.svg',"").hide();
  calibrateCont = createImg('../assets/fortsatt1.svg',"").hide();
  beginPlaying = createImg('../assets/borjaspela.svg',"").hide();
  beginPlayingOpac = createImg('../assets/borjaspelaOpac.svg',"").hide();

  // Loaded images
  noteImg = loadImage('../assets/note.svg');

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
  delayInfo = createDiv(delayText)
  .style('font-family','Kaph-Regular')
  .style('font-size','80px')
  .style('color','#ff8484ff').hide();
  calibrationInfo = createDiv(calibrationText)
  .style('font-family','Kaph-Regular')
  .style('font-size','36px')
  .style('color','#ff8484ff');
}

// Setup
function setup() {
  canvas = createCanvas(1440, 810); // This sets the "size" of the game in pixels
  textFont(kaphFont); // Sets the custom font as default
  textSize(48); // Sets default font size

  // Audio setup
  audioContext = getAudioContext();
  canvas.mousePressed(userStartAudio);
  fft = new p5.FFT();
  mic = new p5.AudioIn();
  mic.start(listening);
  fft.setInput(mic);
  
  textAlign(CENTER);
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
// Loads pitch detection from ml5 and prints it to the console
function listening() {
  //console.log('Listening...');
  pitch = ml5.pitchDetection(
    model_url,
    audioContext,
    mic.stream,
    modelLoaded
    );
}

// Loads the model 
function modelLoaded() {
  //console.log('model loaded');
  pitch.getPitch(gotPitch);
}

// Function that checks if we have a pitch
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
    mic.stop();
    background(255);
    startBG.position(0,0).show();
    
    if (allstarPlay == true) {
      allstarSound.play();
      allstarPlay = false;
    }

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
    positionHigh2.hide();
    positionHigh.hide();
    positionLow.hide();
    positionLow2.hide();
    calibrateBox.hide();
    startBtnCalibrate.hide();
    textListening.hide();
    beginPlaying.hide();
    //playerImg.hide();

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
  startBG.hide();
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
  candy.position(786,250);
  results.position(511, 300);
  timeBox.position(547,15);
  scoreBox.position(727,15);
  timeText.position(619,30);
  scoreText.position(798,30);
  calibrateBox.position(428,175);
  startBtnCalibrate.position(50,0);
  textListening.position(-50,-450);
  calibrateCont.position(457,499);
  beginPlaying.position(457,499);
  beginPlayingOpac.position(457,499);
  //calibrationInfo.position(400,161);


  positionHigh2.position(positionX,89).hide();
  positionHigh.position(positionX,221).hide();
  positionLow.position(positionX,487).hide();
  positionLow2.position(positionX,620).hide();


  playerImg.position(playerX,playerY).hide();

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
  // Runs when the player has started the game. It starts a calibration before the delay begins
  if (hasPlayerStarted) {
    showCircles = false;
    calibrateVoice();
    mic.start(listening);
    hasPlayerStarted = false; // Disables this function so it doesn't run anymore
  }

  if (hasCalibrationStarted) {
    calibrationStarter = setInterval(calibrationTimer,1000);
    hasCalibrationStarted = false;
    calibrationCounter = 0;
    calibrationInfo.show();
    calibrationText = '';
    calibrationInfo.html(calibrationText);
  }

  // Code for the sound wave thing on the calibration
  if (calibrationCounter >= 0 && calibrationCounter < 6) {
    waveform = fft.waveform();
    beginShape();
    stroke('#ff8484ff');
    strokeWeight(15);
    for (let i = 0; i < waveform.length; i++) {

      let xA;
      let yA;

      xA = map(i, 0, waveform.length, 0, width);
      yA = map(waveform[i], -1, 1, height, 0);
      vertex(xA, yA);
    }
    endShape();
  }

  if (calibrationCounter >= 3 && calibrationCounter < 6) {
    calibrationInfo.position(610,384);
    calibrationText = 'LYSSNAR...';
    calibrationInfo.html(calibrationText);
    freqArr.push(freq);

  } else if (calibrationCounter == 6) {
    calibrationInfo.position(475,384);
    calibrationText = 'KALIBRERING FÄRDIG!';
    calibrationInfo.html(calibrationText);

    clearInterval(calibrationStarter);
    beginPlayingOpac.hide();
    beginPlaying.show();
    calibrationCounter = 7;

    // Calculate the average freq during the calibration 
    avgFreq = freqArr.reduce((a, b) => a + b, 0) / freqArr.length;
    // console.log("Average freq: " + Math.round(avgFreq));

    interval = (avgFreq-50)/3;

    threshold1 = avgFreq + 3.0*interval;
    threshold2 = avgFreq + 1.5*interval;
    threshold4 = avgFreq - 1.0*interval;
    threshold5 = avgFreq - 2.0*interval;

    // console.log("threshold1=" + Math.round(threshold1) + "\nthreshold2=" + Math.round(threshold2) + "\nthreshold4=" + Math.round(threshold4) + "\nthreshold5=" + Math.round(threshold5));
  }

  // Runs when delay starts
  if (hasCalibrated) {
    calibrationInfo.hide();
    delayInfo.show();
    showCircles = true;
    delayStarter = setInterval(delayTimer,1000); // Starts the delay timer
    hasCalibrated = false;
  }

  // Displays 3, 2, 1, GO! text before the gameplay starts
  switch (delayCounter) {
    case 0:
      delayText = '';
      delayInfo.html(delayText);
      break;
    case 1:
      delayInfo.position(681,356);
      delayText = '3';
      delayInfo.html(delayText);
      break;
    case 2:
      delayInfo.position(678,356);
      delayText = '2';
      delayInfo.html(delayText);
      break;
    case 3:
      delayInfo.position(693,357);
      delayText = '1';
      delayInfo.html(delayText);
      break;
    case 4:
      delayInfo.position(600,355);
      delayText = 'KÖR!';
      delayInfo.html(delayText);
      break;
  }
  startBtnCalibrate.mousePressed(calibrateVoice);
  beginPlaying.mousePressed(calibratedOver);

  if (showCircles) {
    positionHigh2.show();
    positionHigh.show();
    positionLow.show();
    positionLow2.show();
    playerImg.show();
  }

  // Runs when the delay is over. It starts running the game
  if (delayCounter == delayTime && isDelayOver == false) {
    delayInfo.hide();
    clearInterval(delayStarter); // Stops the delay timer
    running = true;
    isDelayOver = true; // Disables this function so it doesn't run anymore
  }

  // Runs when the game starts running. It starts the game timer
  if (hasGameStarted == false && running) {
    septemberSound.setVolume(0.4);
    septemberSound.play();
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

    // Character controller
    audioControl();  

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
      mic.stop();
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
  noteSpeed = 5;
  spawnTime = 2000;
  nextSpawn = spawnTime;
  timeCounter = 0;
  timeLeft = gameLength;
  notes = [];
  speedMode = 1;
  hasGameStarted = false;
  playerY = 307;
  playerCurrent = 3;
  playerImg = random(characters).hide();
  totalNotes = 0;
  delayCounter = 0;
  isDelayOver = false;
  septemberSound.stop(); // Stops the music so it can start again at start
}

// Switches between start screen and game screen
function screenChange() {
  buttonSound.play(); // Since the user clicked a button to come here, play sound
	
  if (screen == 0) { // Start -> Game
  	screen = 1;
    hasPlayerStarted = true; // Triggers the delay before the game starts
    allstarSound.stop();
  } else if (screen == 1) { // Game -> Start
    allstarPlay = true;
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

    // Sets speeds for notes depending on time remaining
    switch (speedMode) {
      case 1:
        noteSpeed = 5;
        break;
      case 2:
        noteSpeed = 7;
        break;
      case 3:
        noteSpeed = 9;
        break;
    }

  }
  update() { // Used to update the note's position (goes to the left)
    // If player hits the note
    if (30 < this.x && this.x < 180 && playerCurrent == this.current) {
      this.hitNote();
    }
    
    this.x -= noteSpeed; // Moves note to the left according to speed
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
  mic.stop();
}

// CalibrateBox that show before game starts 
function calibrate() {
  calibrateBox.show();
  startBtnCalibrate.show();
}

// Calibrates the voice of the player 
function calibrateVoice() {
  // Audiocontext will be created in the "suspended" state, and you will need to call resume() after the user gesture
  audioContext.resume();

  startBtnCalibrate.hide();
  
  calibrateBox.show();
  // textListening.show();
  beginPlayingOpac.show();

  hasCalibrationStarted = true;   
}

// Ends the calibration and starts the game 
function calibratedOver() {
  hasCalibrated = true;
  calibrateBox.hide();
  textListening.hide();
  beginPlaying.hide();
  
  // Resets the calibration variables 
  freqArr = [];
  calibrationCounter = 7;
}

function calibrationTimer() {
  calibrationCounter++;
}

// Continue the game from the pause popup and hidcalibratedFreqe it
function gameContinue() {
  buttonSound.play();
  running = true;
  pauseBox.hide();
  pauseContinue.hide();
  pauseQuit.hide();
  pauseIcon.show();
  mic.start(listening);
}

// On game end, hide gameplay items and show end popup items
function gameComplete() {
  running = !running;

  if (score == 0) {
    fartSound.play();
  } else {
    completeSound.play();
  }
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
  playerImg.hide();
  resetGame();
  hasPlayerStarted = false;
  hasCalibrated = true; 
  mic.start(listening);
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

function audioControl(){

  // console.log("Frek: " + Math.round(freq));

  // Keeps player in the center if calibration failed 
  if (avgFreq == 0){
    playerY = 307;
    playerCurrent = 3;
  }

  else {
    if(freq > threshold2){ // && threshold1 > - Can be used if we want to filter out higher frequencies 
      playerY = 45;
      playerCurrent = 1;
    }
    else if(threshold2 > freq && freq > avgFreq){
      playerY = 172;
      playerCurrent = 2;
    }
    else if(avgFreq > freq && freq >= threshold4){
      playerY = 438;
      playerCurrent = 4;
    }
    else if(threshold4 > freq && freq > threshold5 || freq > 50){ // freq > 50 - Is considered noise and is removed
      playerY = 575;
      playerCurrent = 5;
    }
    else {
      playerY = 307;
      playerCurrent = 3;
    }
  }
}

// // FOR DEBUG ONLY: Play the game with ASDF keyboard buttons
// function keyPressed() {
//   if (running) {
//     switch(keyCode) {
//       case 65:
//         playerY = 45;
//         playerCurrent = 1;
//         break;
//       case 83:
//         playerY = 172;
//         playerCurrent = 2;
//         break;
//       case 68:
//         playerY = 438;
//         playerCurrent = 4;
//         break;
//       case 70:
//         playerY = 575;
//         playerCurrent = 5;
//         break;
//     }
//     return false;
//   }
// }
// ----------