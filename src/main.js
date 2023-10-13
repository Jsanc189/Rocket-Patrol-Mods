let config = {
    type: Phaser.CANVAS, //pixel art is great on this  WEBGL is good for tinting images
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

//reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

let game = new Phaser.Game(config);


//set User Interface sizes
let borderUISize = game.config.height / 15;

let borderPadding = borderUISize / 3;