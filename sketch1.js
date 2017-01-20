
var bird;
var pipes = [];
var mic;
var sliderTop;
var sliderBottom;
var clapping = false;

function setup() {
  createCanvas(600, 600);
  mic = new p5.AudioIn();
  mic.start();
  bird = new Bird();
  pipes.push(new Pipe());
  sliderTop = createSlider(0, 1, 0.3, 0.01);
  sliderBottom = createSlider(0, 1, 0.1, 0.01);
}

function draw() {
  background(0);

  var vol = mic.getLevel();


  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log("HIT");
    }


    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }


  }

  bird.update();
  bird.show();

  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }

  var thresholdTop = sliderTop.value();
  var thresholdBottom = sliderBottom.value();

  if (vol > thresholdTop && !clapping) {
    bird.up();
    clapping = true;
  }

  if (vol < thresholdBottom) {
    clapping = false;
  }

  fill(0, 255, 0);
  //console.log(vol);
  noStroke();
  var y = map(vol, 0, 1, height, 0);
  rect(width - 20, y, 20, height - y);

  var ty = map(thresholdTop, 0, 1, height, 0);
  stroke(250, 56, 56);
  strokeWeight(4);
  line(width - 20, ty, width, ty);

  var by = map(thresholdBottom, 0, 1, height, 0);
  stroke(255, 255, 255);
  strokeWeight(2);
  line(width - 20, by, width, by);


}

function keyPressed(evt) {
  evt = evt || window.event;
  var keyCode = evt.keyCode;
  if (keyCode == 65) {
    bird.up();
  }
}
