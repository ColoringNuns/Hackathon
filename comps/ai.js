class BasicMonster{
  constructor (x,y, character) {
    this.ent = new Entity(x, y,[],['rectangle',0,0,50,50],()=>{},10)

    this.startX = x;
    this.endX = x+500;
    this.char = character;
  }

  draw() {
    this.ent.draw();
  }
  
  update() {
    var distanceToPlayer = this.ent.sprite.position.x - this.char.sprite.position.x;
    if (distanceToPlayer > 200){
      if (this.ent.sprite.position.x > this.endX){
        this.ent.xspd = -6;
      } else if (this.ent.sprite.position.x <= this.startX){
        this.ent.xspd = 6;
      }
    }else if (this.ent.sprite.position.x < this.char.sprite.position.x) {
      this.ent.xspd = Math.min(this.ent.xspd + 0.1,6);
    } else if (this.ent.sprite.position.x > this.char.sprite.position.x) {
      this.ent.xspd = Math.max(this.ent.xspd - 0.1,-6);
    }

    this.ent.sprite.position.y += this.ent.yspd;
    this.ent.sprite.position.x += this.ent.xspd;

    this.ent.yspd += 1; //GRAVITY

    //Ground Collision
    var ground = height - (this.ent.sprite.height / 2);
    if (this.ent.sprite.position.y >= ground) {
      this.ent.yspd = 0;
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