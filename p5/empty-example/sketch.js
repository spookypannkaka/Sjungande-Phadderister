let mic;

function setup() {


  // create canvas
  createCanvas(400, 400);

  // Initialize fft
  fft = new p5.FFT();

  // initialize mic 
  mic = new p5.AudioIn();
  mic.start();
  fft.setInput(mic);
}

function draw() {

  background(0, 200, 0);

  let spectrum = fft.analyze();
  
  // konstanter 
  const spectrumLength = spectrum.length;
  const halfSpectrumLength = spectrum.length/2;
  const quarterSpectrumLength = spectrum.length/4;

  // arrayer som är till för downsampling  
  const downsample1 = new Array(spectrumLength).fill(100); // byt till fill(0)
  const downsample2 = new Array(spectrumLength).fill(100); // byt till fill(0)

  // första downsample 
  for(let i = 0; i < halfSpectrumLength; i++){
    downsample1[i] = (spectrum[2*i] + spectrum[2*i+1])/2;
  }

  // andra downsample 
  for(let i = 0; i < quarterSpectrumLength; i++){
    downsample2[i] = (downsample1[2*i] + downsample1[2*i+1])/2;
  }

  // draw the freq spectrum 
  noStroke();
  fill(255, 0, 255);
  
  for (let i = 0; i< spectrumLength; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(downsample2[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }
}