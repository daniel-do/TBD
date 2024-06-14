class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        
    }

    create() {
        playerHealth = 5;
        bossHealth = 3;
        enemyCount = 5;
        initEnemyCount = 5;
        enteredBoss = false;
        bossDefeated = false;
        gameover = true;

        this.playTitleScale = 0.75;

        this.uiXCord = screenWidth/2;
        this.uiYCord = screenHeight/2;

        this.bgPanel = this.add.sprite(this.uiXCord, this.uiYCord, 'bgPanel');
        this.bgPanel.setScale(1.25);

        this.smallPanel = this.add.sprite(game.config.width / 2, (game.config.height / 2) + 50, 'smallPanel');
        this.smallPanel.setScale(0.5);

        this.title = this.add.bitmapText(game.config.width / 2, (game.config.height / 2) - 50, 'alagard', 'Welcome to TB DUNGEON').setOrigin(0.5);
        this.playTitle = this.add.bitmapText(game.config.width / 2, (game.config.height / 2) + 50, 'alagard', 'Press SPACE to begin').setOrigin(0.5).setScale(this.playTitleScale);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("creditsScene");
        }

        if (this.playTitle) {
            this.playTitle.destroy();
        }

        this.playTitle = this.add.bitmapText(game.config.width / 2, (game.config.height / 2) + 50, 'alagard', 'Press SPACE to begin').setScale(this.playTitleScale);
        this.playTitle.setOrigin(0.5);

        this.playTitleScale = 0.75 + Math.abs((Math.sin(this.game.loop.frame * 0.04) * 0.1));
        this.smallPanel.setScale(0.5 + Math.abs((Math.sin(this.game.loop.frame * 0.04) * 0.1)));

        //this.title.y = (game.config.height / 2) - 50 + (Math.sin(this.game.loop.frame * 0.04) * 20);
    }
}
