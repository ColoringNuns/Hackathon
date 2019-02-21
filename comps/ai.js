class BasicMonster{
  constructor (x,y, character) {
    this.ent = new Entity(x, y,[],['rectangle',0,0,50,50],()=>{},10)

    this.char = character;
  }

  draw() {
    this.ent.draw();
  }
  
  update() {
    if (this.ent.sprite.position.x < this.char.sprite.position.x) {
      this.ent.xspd = 3;
    } else if (this.ent.sprite.position.x > this.char.sprite.position.x){
      this.ent.xspd = -3;
    } else {
      this.ent.xspd = 0;
    }

    this.ent.sprite.position.y += this.ent.yspd;
    this.ent.sprite.position.x += this.ent.xspd;

    this.ent.yspd += 1; //GRAVITY
    this.ent.xspd *= 0.95; //FRICTION

    //Ground Collision
    var ground = height - (this.ent.sprite.height / 2);
    if (this.ent.sprite.position.y >= ground) {
      this.ent.yspd = 0;
      this.ent.xspd = 0;
      this.ent.sprite.position.y = ground;
    }
    //Left Edge Collision
    var leftEdge = this.ent.sprite.width / 2;
    if (this.ent.sprite.position.x <= leftEdge) {
      this.ent.xspd = 0;
      this.ent.sprite.position.x = leftEdge;
    }
  }
}