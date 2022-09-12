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
  background(249, 141 , 253);
  let spectrum = fft.analyze();
  //Get energy ger energy (volym) vid specifika frekvenser eller mellan frekvenser. Tänker att man kanske kan använda för styrning?
  let bassEnergy = fft.getEnergy("treble");
  text(bassEnergy, width/2, 20);
  
  for (let i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }


  //Kod för boll som styrs (i y-led) av volym
  /*micLevel = mic.getLevel();
    for (let i = 0; i< spectrum.length; i++){
    let y = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
    ellipse(width/2, y, 10, 10);
  }*/
}