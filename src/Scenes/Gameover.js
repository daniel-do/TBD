class Gameover extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }

    preload() {
        
    }

    create() {
        this.uiXCord = screenWidth/2;
        this.uiYCord = screenHeight/2;

        this.bgPanel = this.add.sprite(this.uiXCord, this.uiYCord, 'bgPanel');
        this.bgPanel.setScale(1.25);

        this.add.bitmapText(game.config.width / 2, (game.config.height / 2) - 50, 'alagard', 'Game Over').setOrigin(0.5);
        this.add.bitmapText(game.config.width / 2, (game.config.height / 2) + 50, 'alagard', 'Press SPACE to return to menu').setOrigin(0.5);
        
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("menuScene");
        }
    }
}
