let mic, filter;

function setup() {
  

  // create canvas
  createCanvas(1024, 700);

  // Initialize fft
  fft = new p5.FFT();

  // initialize mic 
  mic = new p5.AudioIn();
  mic.start();
  fft.setInput(mic);
}

function draw() {

  background(0, 200, 0);

  // analyserar frekvensspektrumet
  let spectrum = fft.analyze();

  // konstanter 
  const spectrumLength = spectrum.length;
  const halfSpectrumLength = spectrum.length/2;
  const quarterSpectrumLength = spectrum.length/4;

  // tar bort frek. < 50 Hz då det anses vara brus http://musicweb.ucsd.edu/~trsmyth/analysis/Harmonic_Product_Spectrum.html
  const maxFreq = 22050; 
  const cutoff = 50;
  let interval = maxFreq/spectrumLength;
  let index = cutoff/interval;
 
  for(let i = 0; i < index; i++){
    spectrum[i] = 0;
  }

  // arrayer som är till för downsampling  
  const downsample1 = new Array(spectrumLength).fill(0); // byt till fill(0)
  const downsample2 = new Array(spectrumLength).fill(0); // byt till fill(0)
  const product = new Array(spectrumLength).fill(0); // byt till fill(0)

  // första downsample 
  for(let i = 0; i < halfSpectrumLength; i++){ 
    // beräknar medelvärdet mellan två indexes och sparar det till downsample arrayn
    downsample1[i] = (spectrum[2*i] + spectrum[2*i+1])/2;
  }

  // andra downsample 
  for(let i = 0; i < quarterSpectrumLength; i++){
    downsample2[i] = (downsample1[2*i] + downsample1[2*i+1])/2;
  }

  // beräknar produkten av alla spektrum
  for(let i = 0; i < spectrumLength; i++){
    product[i] = spectrum[i] * downsample1[i] * downsample2[i];
    product[i] = product[i]/5000;
  }

  // max freq
  const max = Math.max(...product);
  const index2 = product.indexOf(max);
  console.log(round(index2*interval));

  // draw the freq spectrum 
  noStroke();
  fill(255, 0, 255);
  
  for (let i = 0; i< spectrumLength; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(product[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }
}