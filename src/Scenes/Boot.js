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
        this.load.tilemapTiledJSON("bosschamber", "bosschamber.tmj");

        // Load the tilemap as a spritesheet
        this.load.spritesheet("tilemap_sheet", "tilemap_packed.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        // Load player assets for animation
        this.load.image('player_001', 'wizard_001.png');
        this.load.image('player_002', 'wizard_002.png');
        this.load.image('player_003', 'wizard_003.png');
        this.load.image('player_004', 'wizard_004.png');

        // load enemy assets for animation
        this.load.image('pirate_enemy_001', 'pirate_enemy_001.png');
        this.load.image('pirate_enemy_002', 'pirate_enemy_002.png');
        this.load.image('pirate_enemy_003', 'pirate_enemy_003.png');
        this.load.image('pirate_enemy_004', 'pirate_enemy_004.png');

        this.load.image('collectible', 'collectible.png');

        // load assets for boss animation
        this.load.image('ghost_001', 'ghost_001.png');
        this.load.image('ghost_002', 'ghost_002.png');
        this.load.image('ghost_003', 'ghost_003.png');
        this.load.image('ghost_004', 'ghost_004.png');

        // Load UI assets
        this.load.image('dialogueBox', 'dialogueBox.png');
        this.load.image('bgPanel', 'ui box tbd.png');

        // Load sound effects
        this.load.audio('backgroundMusic', 'backgroundMusic.mp3');
        this.load.audio('bossMusic', 'bossMusic.mp3');
        this.load.audio('combatSound', 'combatSound.mp3');

        // Load bitmap font
        this.load.bitmapFont('alagard', 'alagard.png', 'alagard.xml');

    }

    create() {
        // player animation
        this.anims.create({
            key: 'player_walk',
            frames: [
                { key: "player_001" },
                { key: "player_002" },
                { key: "player_003" },
                { key: "player_004" }
            ],
            frameRate: 8,
            repeat: -1
        });

        // enemy animation
        this.anims.create({
            key: 'enemy_walk',
            frames: [
                { key: "pirate_enemy_001" },
                { key: "pirate_enemy_002" },
                { key: "pirate_enemy_003" },
                { key: "pirate_enemy_004" }
            ],
            frameRate: 8,
            repeat: -1
        });

        // boss animation
        this.anims.create({
            key: 'boss_float',
            frames: [
                { key: "ghost_001" },
                { key: "ghost_002" },
                { key: "ghost_003" },
                { key: "ghost_004" }
            ],
            frameRate: 4,
            repeat: -1
        });

        // move to next scene
        this.scene.start("menuScene");
    }
}
