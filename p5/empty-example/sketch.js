let mic;

function setup() {

  // create canvas
  createCanvas(400, 400);

  // Initialize fft
  fft = new p5.FFT();

  // initialize mic 
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {

  background(220);

  let spectrum = fft.analyze();

  // draw the freq spectrum 
  noStroke();
  fill(255, 0, 255);
  for (let i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }
}