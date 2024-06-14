class Controls extends Phaser.Scene {
    constructor() {
        super("controlsScene");
    }

    preload() {

    }

    create() {
        this.uiXCord = screenWidth/2;
        this.uiYCord = screenHeight/2;

        this.bgPanel = this.add.sprite(this.uiXCord, this.uiYCord, 'bgPanel');
        this.bgPanel.setScale(1.25);

        this.add.bitmapText(game.config.width / 2, (game.config.height / 2) - 50, 'alagard', 'Use WASD to move').setOrigin(0.5);
        this.add.bitmapText(game.config.width / 2, (game.config.height / 2) - 20, 'alagard', '[1] Fire, [2] Water, [3] Grass').setOrigin(0.5);
        this.add.bitmapText(game.config.width / 2, (game.config.height / 2) + 50, 'alagard', 'Press SPACE to continue').setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("creditsScene");
        }
    }
}
