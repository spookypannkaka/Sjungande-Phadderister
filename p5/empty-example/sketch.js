let mic;

 function setup(){
  let cnv = createCanvas(400, 400);
  cnv.mousePressed(userStartAudio);
  textAlign(CENTER);
  mic = new p5.AudioIn();
  mic.start();
}


function draw() {
  background(0);
  fill(255);
  text('tap to start', width/2, 20);

  micLevel = mic.getLevel();
  let y = height - micLevel * height;
  ellipse(width/2, y, 10, 10);
}