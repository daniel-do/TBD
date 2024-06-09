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
        this.load.setPath("../assets/"); // set load path
        
        // load tilemap info
        this.load.image("tilemap_pirates", "tilemap_packed_pirates.png");
        this.load.image("tilemap_rpg", "tilemap_packed.png");
        this.load.tilemapTiledJSON("firstchamber", "firstchamber.tmj");
    }

    create() {
        this.scene.start("menuScene");
    }
}