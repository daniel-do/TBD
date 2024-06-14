class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {
        
    }

    create() {
        this.uiXCord = screenWidth/2;
        this.uiYCord = screenHeight/2;

        this.playTitleScale = 0.75;

        this.bgPanel = this.add.sprite(this.uiXCord, this.uiYCord, 'bgPanel');
        this.bgPanel.setScale(1.25);

        this.smallPanel = this.add.sprite(game.config.width / 2, (game.config.height / 2) + 50, 'smallPanel');
        this.smallPanel.setScale(0.5);

        this.add.bitmapText(game.config.width / 2, (game.config.height / 2) - 50, 'alagard', 'Created by Daniel Do, Em Ishida,').setOrigin(0.5);
        this.add.bitmapText(game.config.width / 2, (game.config.height / 2) - 20, 'alagard', 'and Scott Kuwahara').setOrigin(0.5);
        this.playTitle = this.add.bitmapText(game.config.width / 2, (game.config.height / 2) + 50, 'alagard', 'Press SPACE to continue').setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("controlsScene");
        }

        if (this.playTitle) {
            this.playTitle.destroy();
        }
        
        this.playTitle = this.add.bitmapText(game.config.width / 2, (game.config.height / 2) + 50, 'alagard', 'Press SPACE to continue').setScale(this.playTitleScale);
        this.playTitle.setOrigin(0.5);

        this.playTitleScale = 0.75 + Math.abs((Math.sin(this.game.loop.frame * 0.04) * 0.1));
        this.smallPanel.setScale(0.5 + Math.abs((Math.sin(this.game.loop.frame * 0.04) * 0.1)));
    }
}

// assets used:
// kenny monochrome pirates, kenny monochrome rpg, kenny tiny dungeon, alagard font (hewett tsoi), kenny particles