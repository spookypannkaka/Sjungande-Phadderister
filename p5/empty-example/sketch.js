let mic;
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/'
let pitch;
let audioContext;
let freq = 0;

//Setup av starta lyssna, ladda in mic osv
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

//Fixa harmonic product spectrum... 
function draw() {
  background(43, 236, 82);
  //Teststorlek samt freq.toFixed skriver ut frekvensen
  textSize(64);
  text(freq.toFixed(2), width/2, height/2);

  //FFTn (som egentligen inte ens används)
  let spectrum = fft.analyze();
  for (let i = 0; i< spectrum.length; i++){
    fill(0, 0, 255);
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }
}
