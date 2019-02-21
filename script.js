function preload() {
  background1 = loadImage('assets/test.png');
  character = new Entity(25,0,[],['rectangle',0,0,50,50],updtChar,100);
  obstTest = new Obstacle(200,200,['rectangle',0,0,200,50]);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  backgroundWidth = windowWidth;
}

function updtChar() {
  movePlayer();

  character.sprite.position.y += character.yspd;
  character.sprite.position.x += character.xspd;

  character.yspd += 1; //GRAVITY
  character.xspd *= 0.95; //FRICTION

  //Ground Collision
  var ground = height - (character.sprite.height / 2);
  if (character.sprite.position.y >= ground) {
    character.yspd = 0;
    character.xspd = 0;
    character.sprite.position.y = ground;
  }
  //Ceiling Collision NOT NECESSARY. REMOVED FOR BETTER BEHAVIOUR.
  /*var ceiling = character.sprite.height / 2;
  if (character.sprite.position.y <= ceiling) {
    character.sprite.position.y = ceiling;
  }*/

  //Left Edge Collision
  var leftEdge = character.sprite.width / 2;
  if (character.sprite.position.x <= leftEdge) {
    character.xpd = 0;
    character.sprite.position.x = leftEdge;
  }
}

function keyPressed() {
  if (keyCode == 87) {
    character.yspd = -10;
  }
}

function movePlayer() { //Get keycodes from keycode.info website
  if (keyIsDown(65)) { //Move Left
    character.xspd = -5;
  } else if (keyIsDown(68)) { //Move Right
    character.xspd = 5;
  }
}

var backgroundWidth;

function draw() {
  background(51);
  //centerCanvas();

  background1.resize(windowWidth, windowHeight);
  //image(background1, 0, 0); //loads background image
  scroll();
  character.update();
  character.draw();
  obstTest.draw();
}

function scroll() {
  if (character.sprite.position.x >= width / 4) { //BEGIN SCROLL ONCE REACHES QUARTER OF WIDTH.
    camera.position.x = character.sprite.position.x + width / 4;
  }
  image(background1, backgroundWidth, 0);
  image(background1, backgroundWidth-windowWidth, 0);
  image(background1, backgroundWidth-(2*windowWidth), 0);

  if (backgroundWidth - character.sprite.position.x <= windowWidth/2) {
    backgroundWidth += windowWidth;
  }

  if (backgroundWidth - windowWidth > character.sprite.position.x) {
    backgroundWidth -= windowWidth;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
