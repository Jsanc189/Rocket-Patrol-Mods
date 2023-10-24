// Name:Jackie Sanchez
// Rocket Patrol with MODS
// Create 4 new explosion sounds with randome plays on impact of ship (3)
// Display time remaining (in seconds) on the screen. (3)
// Create a new enemy ship type w/ new art (smaller, faster and worth more points)  (5)
// Implement a new timing scoring where the timer extends with a ship hit (5)
// Implement a 2 player mode

// Date: 10/20/23

// floss.booktype.pro/learn-javascript-with-phaser/game-mechanic-add-a-countdown-timer/ 
// used to make timer appear onscreen

//stackoverflow.com/questions/29148886/show-hide-sprites-texts-in-phaser
//used to show and hide text between player rounds


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