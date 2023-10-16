class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    preload() {
        //load audio
        this.preload.audio('sfx_select', './assets/blip_select.wav');
        this.preload.audio('sfx_explosion', './assets/explosion.wav');
        this.preload.audio('sfx_rocket', './assets/rocket.wav');
    }

    create() {
        this.add.text(20, 20, "Rocket Patrol Menu");
        this.scene.start("playScene");
    }
}