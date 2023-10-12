let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

//reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

let game = new Phaser.Game(config);


//set User Interface sizes
let borderUISize = game.config.height / 15;

let borderPAdding = borderUISize / 3;