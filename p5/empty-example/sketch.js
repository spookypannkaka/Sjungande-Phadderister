let mic;
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/'
let pitch;
let audioContext;
let freq = 0;
 function setup(){
  let cnv = createCanvas(400, 400);
  audioContext = getAudioContext();
  cnv.mousePressed(userStartAudio);
  textAlign(CENTER);
  fft = new p5.FFT();
  mic = new p5.AudioIn();
  mic.start(listening);
  fft.setInput(mic);
}

function listening(){
  console.log('Listening...');
  pitch = ml5.pitchDetection(
    model_url,
    audioContext,
    mic.stream,
    modelLoaded);

}

function modelLoaded() {
  console.log('model loaded');
  pitch.getPitch(gotPitch)
}

function gotPitch(error, frequency){
  if(error){
    console.log(error);
  }
  if(frequency){
    freq = frequency;
  }
}

//Fixa harmonic product spectrum... 
function draw() {
  background(220);
  //fill(255);
  pitch.getPitch(gotPitch);
  textSize(64);
  text(freq.toFixed(2), width/2, height/2);
  let spectrum = fft.analyze();
  for (let i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }
  

  
  //console.log('ml5 version:', ml5.version);

 /* micLevel = mic.getLevel();
  let y = height - micLevel * height;
  ellipse(width/2, y, 10, 10);*/
}

/*function draw(){
  background(220);

    
  noStroke();
  fill(255, 0, 255);
  for (let i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }*/