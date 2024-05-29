class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        
    }

    create() {
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