class Gameover extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }

    preload() {
        
    }

    create() {
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

        this.add.text(game.config.width / 2, (game.config.height * 1) / 4, 'Game Over', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, (game.config.height * 2) / 4, 'You have been defeated.', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, (game.config.height * 3) / 4, 'Press SPACE to return to menu', menuConfig).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("menuScene");
        }
    }
}
