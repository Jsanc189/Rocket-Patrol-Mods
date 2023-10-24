class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload() {
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spaceship-2', './assets/spaceship-2.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, starFrame: 0, endFrame:9});
    }

    create() {
        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0 ,640, 480, 'starfield').setOrigin(0, 0);

        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0);
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    
        //add Rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5,0);

        //add spaceships (X3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0,0);

        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);

        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        this.ship04 = new Spaceship_2(this, game.config.width - borderUISize, borderUISize *7 + borderPadding*5, 'spaceship-2', 0, 50).setOrigin(0,0);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}), 
            frameRate: 30
        });

        this.p1Score = 0;
        this.p2Score = 0;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top:5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        
        if(game.settings.playerCount == 2){
            console.log("I have 2 players");
            this.scoreRight = this.add.text(borderUISize + borderPadding * 40, borderUISize + borderPadding*2, this.p2Score, scoreConfig);

        }
        

        this.gameOver = false;

        this.gameTimer = this.time.addEvent({
            delay: 1000,
            loop: true,
            callback:this.tick,
            callbackScope: this
        })

        this.timeLimit = 60;
        this.gameTimeText = '00:' + this.timeLimit.toString();
        this.PlayerTimer = this.add.text(borderUISize+borderPadding * 22.5, borderUISize + borderPadding*2, this.gameTimeText, scoreConfig);


        //this.timeLimit = 60;
        //this.PlayerTimer = this.(60000, this.tick, this);
        //60-second play clock

        //this.timer_right = this.add.text(borderUISize+borderPadding * 22.5, borderUISize + borderPadding*2, this.timer / 1000, scoreConfig);
        //this.timeText.anchor.set(0.5, 0.5);
        //this.timer = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);

        scoreConfig.fixedWidth = 0;
        // this.clock = this.time.delayedCall(this.timer, () => {
        //     this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        //     this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <= for Menu', scoreConfig).setOrigin(0.5);
        //     this.gameOver = true;
        // }, null, this);

        

    }

    update() {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;

        if (!this.gameOver) {
            this.p1Rocket.update();         //update the rocket

            this.ship01.update();           //update the ships
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }
        

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            //console.log('kaboom ship 03');
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            //console.log('kaboom ship 02');
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            //console.log('kaboom ship 01');
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
    }

    checkCollision(rocket, ship) {
        //simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
            }
        else {
            return false;
        }
    }

    shipExplode(ship) {
        //temprorarily hide ship
        ship.alpha = 0;

        //sound effects list
        let sound_effects = ['sfx_explosion', 'sfx_explosion_2', 'sfx_explosion_3', 'sfx_explosion_4', 'sfx_explosion_5'];
        
        //random number
        let random_num = Math.floor(Math.random()*5);
        //console.log(random_num)

        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, sound_effects[random_num]).setOrigin(0,0);
        boom.anims.play('explode');         //play explode animation
        boom.on('animationcomplete', () =>{ //calback after anim completes
            ship.reset();                   //reset ship position
            ship.alpha = 1;                 //make ship visible again
            boom.destroy();                 //remove explosion sprite
        });

        this.p1Score += ship.points;
        this.timeLimit += ship.points / 10;
        

        this.scoreLeft.text = this.p1Score;
        this.sound.play(sound_effects[random_num]);
    }

    tick (){
        this.timeLimit--;
        var minutes = Math.floor(this.timeLimit / 60);
        var seconds = this.timeLimit - (minutes * 60);
        var timeString = this.addZeros(minutes) + ':' + this.addZeros(seconds);
        this.gameTimeText = timeString;
        console.log(this.gameTimeText);
        this.PlayerTimer.text = this.gameTimeText;
        if(this.timeLimit == 0) {
            this.outOfTime();
        }
    }

    addZeros(num){
        if(num < 10) {
            num = "0" + num;
        }
        return num;
    }

    outOfTime() {
        let gameOverConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top:5,
                bottom:5
            },
            fixedWidth: 200
        }
        let optionsConfig = {
            fontFamily: 'Courier',
            fontSize: '25px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top:5,
                bottom: 5,
            },
            fixedWidth: 550
        };

        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <= for Menu', optionsConfig).setOrigin(0.5);
        this.gameOver = true;
    }





}