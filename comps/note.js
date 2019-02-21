class Note {
  constructor (x,y,animations,collider,player,textBox) {
    this.sprite = createSprite(x,y,50,50);
    this.loadAnims(animations);
    this.sprite.setCollider(...collider);
    this.sprite.debug = true;
    this.player = player;
    this.textBox = textBox;
  }

  collCheck() {
    if (this.sprite.overlap(this.player.sprite)) {
        console.log("hi")
    }
  }

  loadAnims(anims) {
    for (let i = 0; i < anims.length; i++) {
      const anim = loadSpriteSheet(...anims[i]);
      loadAnimation(anim);
      this.sprite.addAnimation("animation" + i, anim);
    }
  }
  
  draw() {
    drawSprite(this.sprite);
  }
}