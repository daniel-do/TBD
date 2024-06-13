class Boot extends Phaser.Scene {
    constructor() {
        super("bootScene");
    }

    init() {
        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: 'white',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width / 2, game.config.height / 2, "loading...", menuConfig).setOrigin(0.5);
    }

    preload() {
        this.load.setPath("assets"); // set load path
        
        // load tilemap info
        this.load.image("tilemap_pirates", "tilemap_packed_pirates.png");
        this.load.image("tilemap_rpg", "tilemap_packed.png");
        this.load.tilemapTiledJSON("firstchamber", "firstchamber.tmj");

        // Load assets
        this.load.image('player', 'wizard.png');
        this.load.image('enemy', 'badguy.png');
        this.load.image('collectible', 'collectible.png');

        // Load UI assets
        this.load.image('dialogueBox', 'dialogueBox.png');
        //this.load.image('bgPanel', 'ui-panel.png');
        this.load.image('bgPanel', 'ui box tbd.png');

        // Load sound effects
        this.load.audio('backgroundMusic', 'backgroundMusic.mp3');
        this.load.audio('combatSound', 'combatSound.mp3');

        // Load bitmap font
        this.load.bitmapFont('alagard', 'alagard.png', 'alagard.xml');
    }

    create() {
        this.scene.start("menuScene");
    }
}
