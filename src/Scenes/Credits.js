class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {
        
    }

    create() {
        this.uiXCord = screenWidth/2;
        this.uiYCord = screenHeight/2;

        this.bgPanel = this.add.sprite(this.uiXCord, this.uiYCord, 'bgPanel');
        this.bgPanel.setScale(1.25);

        this.add.bitmapText(game.config.width / 2, (game.config.height / 2) - 50, 'alagard', 'Created by Daniel Do, Em Ishida,').setOrigin(0.5);
        this.add.bitmapText(game.config.width / 2, (game.config.height / 2) - 20, 'alagard', 'and Scott Kuwahara').setOrigin(0.5);
        this.add.bitmapText(game.config.width / 2, (game.config.height / 2) + 50, 'alagard', 'Press SPACE to continue').setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("playScene");
        }
    }
}

// assets used:
// kenny monochrome pirates, kenny monochrome rpg, kenny tiny dungeon, alagard font (hewett tsoi)