let mic;

 function setup(){
  let cnv = createCanvas(400, 400);
  cnv.mousePressed(userStartAudio);
  textAlign(CENTER);
  fft = new p5.FFT();
  mic = new p5.AudioIn();
  mic.start();
  fft.setInput(mic);
}


function draw() {
  background(220);
  //fill(255);
  //text('tap to start', width/2, 20);
  let spectrum = fft.analyze();
  for (let i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }

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