class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init() {
        this.SCALE = 2.0;
    }

    preload() {
        this.load.setPath("../assets/"); // set load path
    }

    create() {

        // loading the map
        // 16x16 tiles, 80 tiles wide 60 tiles tall
        this.map = this.add.tilemap("firstchamber", 16, 16, 80, 60);
        this.physics.world.setBounds(0, 0, 80*16, 60*16);
        this.tilesetPirate = this.map.addTilesetImage("tilemap_packed_pirates", "tilemap_pirates")

        // create layers
        this.bgLayer = this.map.createLayer("background", this.tilesetPirate, 0, 0);
        this.shipLayer = this.map.createLayer("ship", this.tilesetPirate, 0, 0);
        this.sailLayer = this.map.createLayer("sail", this.tilesetPirate, 0, 0);

        // menu text configuration
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

        // show menu text
        this.add.text(game.config.width / 2, (game.config.height * 1) / 4, 'TBD', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, (game.config.height * 2) / 4, 'Play', menuConfig).setOrigin(0.5);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("gameoverScene");
        }
      }
}