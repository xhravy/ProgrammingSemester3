let moles = []; // ARRAY
let score = 0;
let selectedColor = 'blue';
let backgroundColor = 220;
let moleSize = 50;
let GameSpeed = 250;
let gameSpeedInterval;
let GameSpeedSlider;
let cnv;
let timer = 30; 

function setup() {
  cnv = createCanvas(1450, 915);
  cnv.parent('main-container');
  cnv.class('canvasclass');
  cnv.id('canvasid');

  // Game Ctrl Header

  let ch = createP('Game Settings');
  ch.parent("sidebar");
  ch.class("ctrlheaders");
  ch.id("chid");

  // BGD COLOUR

  let bc = createP('Background Brightness');
  bc.parent("sidebar");
  bc.class("ctrlheaders");
  bc.id("bcid");

  let bgColorSlider = createSlider(0, 255, backgroundColor);
  bgColorSlider.input(changeBackgroundColor);
  bgColorSlider.parent('sidebar');
  bgColorSlider.class('sliders');
  bgColorSlider.id('bgColorSlider');

  // CIRCLE SIZE SLIDER

  
  let ms = createP('Mole Size');
  ms.parent("sidebar");
  ms.class("ctrlheaders");
  ms.id("msid");

  let moleSizeSlider = createSlider(20, 100, moleSize);
  moleSizeSlider.input(changeMoleSize);
  moleSizeSlider.parent('sidebar');
  moleSizeSlider.class('sliders');
  moleSizeSlider.id('moleSizeSlider');


  // GAME SPEED SLIDER


  let gs = createP('Difficulty');
  gs.parent("sidebar");
  gs.class("ctrlheaders");
  gs.id("gsid");

  GameSpeedSlider = createSlider(50, 500, GameSpeed);
  GameSpeedSlider.input(changeGameSpeed);
  GameSpeedSlider.parent('sidebar');
  GameSpeedSlider.class('sliders');
  GameSpeedSlider.id('GameSpeedSLider');


  //INITIALIZE MOLE []

  for (let i = 0; i < 5; i++) {
    moles.push(new Mole(selectedColor, moleSize));
  }

  // DROPDOWN
  let mc = createP('Mole Colour');
  mc.parent("sidebar");
  mc.class("ctrlheaders");
  mc.id("mcid");

  let colorDropdown = createSelect();
  colorDropdown.option('Blue', 'blue');
  colorDropdown.option('Red', 'red');
  colorDropdown.option('Green', 'green');
  colorDropdown.option('Purple', 'purple');
  colorDropdown.option('Brown', 'brown'); 

  colorDropdown.changed(changeColor);
  colorDropdown.parent('sidebar');
  colorDropdown.class('ColDropdown');
  colorDropdown.id('ColDropdown');


  // START TIMER

  startTimer();
}

function changeGameSpeed() {
  GameSpeed = GameSpeedSlider.value();
  GameSpeed = GameSpeed;
  clearInterval(gameSpeedInterval);
  gameSpeedInterval = setInterval(() => {
    moles.push(new Mole(selectedColor, moleSize));
  }, GameSpeed);
}



function startTimer() {
  const timerInterval = setInterval(() => {
    timer--;
    if (timer === 0) {
      clearInterval(timerInterval);
      noLoop(); // STOP GAME T-0
    }
  }, 1000); // TIMER COUNTDOWN INTERVAL
}

function draw() {
  background(backgroundColor);

  // CIRCLE UPDATE FUNC
  for (let mole of moles) {
    mole.update();
    mole.display();
  }

  // SCORE DISPLAY


  textSize(30);
  textStyle(BOLD);
  textFont('monospace');
  let outlineThickness = 3;
  fill(0);
  stroke(255);
  strokeWeight(outlineThickness);
  text(`Score: ${score}`, 10, 30);

  // TIMER DISPLAY


  textSize(30);
  textStyle(BOLD);
  textFont('monospace');
  fill(0);
  stroke(255);
  strokeWeight(3);
  text(`Time: ${timer}`, 10, 70);
}

// CONTACT + SPLICE CMD (ref W3S)


function mousePressed() {
  for (let i = moles.length - 1; i >= 0; i--) {
    if (moles[i].hit(mouseX, mouseY)) {
      score++;
      moles.splice(i, 1);
    }
  }
}

// DROPDOWN COLOUR CHANGE


function changeColor() {
  selectedColor = this.value();
  for (let mole of moles) {
    mole.setColor(selectedColor);
  }
}

// SLIDER BGD COLOUR DAY TO NIGHT


function changeBackgroundColor() {
  backgroundColor = this.value();
  background(backgroundColor);
}

// CIRCLE MOLE DIAMETER ADJUSTMENT


function changeMoleSize() {
  moleSize = this.value();
  for (let mole of moles) {
    mole.setSize(moleSize);
  }
}

// CIRCLE CATEGORY, VISIBILITY AND RANDOMIZE

class Mole {
  constructor(color, size) {
    this.x = random(width - size);
    this.y = random(height - size);
    this.diameter = size;
    this.visible = true;
    this.color = color;
  }

  update() {
    if (random(1) < 0.01) {
      this.visible = !this.visible;
    }
  }

  display() {
    if (this.visible) {
      fill(this.color);
      ellipse(this.x, this.y, this.diameter);
    }
  }

  hit(x, y) {
    let d = dist(x, y, this.x, this.y);
    return d < this.diameter / 2;
  }

  setColor(color) {
    this.color = color;
  }

  setSize(size) {
    this.diameter = size;
  }
}
