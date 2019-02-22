function preload() {
  background1 = loadImage('assets/pixelartcity.png');
  character = new Entity(25,0,[],['rectangle',0,0,50,50],updtChar,100);
  obstTest = new Obstacle(200,200,['rectangle',0,0,200,50]);
  monsterTest = new BasicMonster(300,0,character);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  backgroundWidth = windowWidth;
  firstNote = new TextBox(windowWidth/4,windowHeight/10, windowWidth/2, windowHeight/5, "The world is crumbling. Order has fallen. We are on our own.");
  noteTest = new Note(300,400,[],['rectangle',0,0,50,50],character,firstNote);
  noSmooth();
}

function updtChar() {
  movePlayer();

  character.sprite.position.y += character.yspd;
  character.sprite.position.x += character.xspd;

  character.yspd += 1; //GRAVITY
  character.xspd *= 0.95; //FRICTION

  character.sprite.collide(obstTest.obst, ()=> {
    if (character.sprite.touching.bottom) {
      character.yspd = 0;
      character.xspd = 0;
      character.jumpCount = 0;
    }
  });

  //Ground Collision
  var ground = height - (character.sprite.height / 2);
  if (character.sprite.position.y >= ground) {
    character.yspd = 0;
    character.xspd = 0;
    character.sprite.position.y = ground;
    character.jumpCount = 0;
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
  if (keyCode == 87 && character.jumpCount < 2) {
    character.yspd = -15;
    character.jumpCount++;
  }
}

function movePlayer() { //Get keycodes from keycode.info website
  if (keyIsDown(65)) {  //Move Left
    character.xspd = -5;
  }
  if (keyIsDown(68)) { //Move Right
    character.xspd = 5;
  }
  if (keyIsDown(65) && keyIsDown(68)) {
    character.xspd = 0;
  }
}

var backgroundWidth;

function draw() {
  background(51);
  background1.resize(windowWidth, windowHeight);
  scroll();
  character.update();
  character.draw();
  obstTest.draw();
  monsterTest.update();
  monsterTest.draw();
  firstNote.draw();
  noteTest.draw();
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