function preload() {
  background1 = loadImage('assets/test.png');
  character = new Entity(25,0,[['assets/mario-pose2.png',390,517,1]],['rectangle',0,0,50,50],updtChar,100);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30); //30
  //FIX THE INFINITE JUMP
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
}

function movePlayer() { //Get keycodes from keycode.info website
  if (keyIsDown(87)){//Jump
    character.yspd = -5; //TODO: FIX: Holding up moves up forever
  }
  if (keyIsDown(65)) { //Move Left
    character.xspd = -5;
  } else if (keyIsDown(68)) { //Move Right
    character.xspd = 5;
  }
}

function draw() {
  background(51);

  image(background1, 0, 0); //loads background image
  background1.resize(windowWidth, windowHeight);

  character.update();
  character.draw();
}
