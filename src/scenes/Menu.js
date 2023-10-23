class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    preload() {
        //load audio
        this.load.audio('sfx_select', './assets/blip_select.wav');
        this.load.audio('sfx_explosion', './assets/explosion.wav');
        this.load.audio('sfx_explosion_2', './assets/explosion2.wav');
        this.load.audio('sfx_explosion_3', './assets/explosion3.wav');
        this.load.audio('sfx_explosion_4', './assets/explosion4.wav');
        this.load.audio('sfx_explosion_5', './assets/explosion5.wav');
        this.load.audio('sfx_rocket', './assets/rocket.wav');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '25px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top:5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding,
        'ROCKET PATROL', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2, 'Use <- -> arrows to move & (F) to fire',
        menuConfig).setOrigin(0.5);

        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';

        this.menuSelect = this.add.text(game.config.width/2, game.config.height/2 + borderUISize +
        borderPadding, 'Press <- for 1 Player or -> for 2 Players', menuConfig).setOrigin(0.5);

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.gameState = 0;
    }

    update() {
        if (this.gameState == 0) {
            this.player_select();

        }

        if (this.gameState == 1) {
            this.difficulty_select();

        }

        if (this.gameState == 2){
            this.difficulty_select();
        }
            
   }
    

    player_select() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //1 player
            this.sound.play('sfx_select');
            this.menuSelect.text = 'Press <- for easy mode or -> for Hard mode';
            this.gameState = 1;

        }
        
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.sound.play('sfx_select');
            this.menuSelect.text = 'Press <- for easy mode or -> for Hard mode';
            this.gameState = 2;
        }
    }

    difficulty_select() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //Easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //Hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 4500
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
        
}
