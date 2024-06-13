class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
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

        this.add.text(game.config.width / 2, (game.config.height * 1) / 4, 'Credits', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, (game.config.height * 2) / 4, 'Created by Daniel Do, Em Ishida, and Scott Kuwahara ', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, (game.config.height * 3) / 4, 'Press SPACE to start the game', menuConfig).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("playScene");
        }
    }
}

// assets used:
// kenny monochrome pirates, kenny monochrome rpg, kenny tiny dungeon, kenny fantasy ui, alagard font (hewett tsoi)