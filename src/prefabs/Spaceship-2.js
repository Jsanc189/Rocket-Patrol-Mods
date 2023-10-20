class Spaceship_2 extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);  //adds to the existing scene
        this.points = pointValue;  //store this objects Point value
        this.moveSpeed = 5;
    }

    update() {
        //move this to the right
        this.x += this.moveSpeed;
        //wrap around from right edge to the left edge
        if(this.x >= game.config.width){
            this.reset();
        }
    }

    reset() {
        this.x = 0;
    }
}