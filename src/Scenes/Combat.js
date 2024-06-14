class Combat extends Phaser.Scene {
    constructor() {
        super("combatScene");
    }

    init(data) {
        this.player = data.player;
        this.enemy = data.enemy;
        this.playScene = data.playScene;
        this.choiceMenu = true;
    }

    create() {
        this.uiXCord = screenWidth/2;
        this.uiYCord = screenHeight/2;

        // sound effects
        this.combatStartSound = this.sound.add('combatStart');
        this.combatStartSound.setVolume(0.5);
        this.combatStartSound.setRate(1.5);
        this.combatStartSound.play();

        this.combatWinSound = this.sound.add('combatWin');
        this.combatWinSound.setVolume(0.8);

        this.combatLoseSound = this.sound.add('combatLose');
        this.combatLoseSound.setVolume(0.75);

        this.bgPanel = this.add.sprite(this.uiXCord, this.uiYCord, 'bgPanel');
        this.bgPanel.setScale(1.25);
        this.bgPanel.visible = false;

        this.showDialogue("Enemy encountered!\n\nPress number to choose\nan element to fight with\n\n[1] Fire\n[2] Water\n[3] Grass");
    }

    update()
    {
        if (this.choiceMenu == true) {
            keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
            keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
            keyTHREE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);

            if (Phaser.Input.Keyboard.JustDown(keyONE)) {
                this.resolveCombat('fire')
            } else if (Phaser.Input.Keyboard.JustDown(keyTWO)) {
                this.resolveCombat('water')
            } else if (Phaser.Input.Keyboard.JustDown(keyTHREE)) {
                this.resolveCombat('grass')
            }
        } else {
            keyONE = null;
            keyTWO = null;
            keyTHREE = null;
        }
    }

    resolveCombat(playerChoice) {
        const choices = ['fire', 'water', 'grass'];
        const enemyChoice = choices[Math.floor(Math.random() * 3)];
        const result = this.getResult(playerChoice, enemyChoice);

        if (result === 'win') {
            this.enemy.destroy();
            this.combatWinSound.play();
            this.showDialogue('You won! Enemy defeated.');
            this.choiceMenu = false;
            if (bossUnlocked === false) {
                enemyCount --;
            }
            console.log(enemyCount);
        } else if (result === 'lose') {
            this.combatLoseSound.play();
            this.playScene.playerHealth--;
            if (this.playScene.playerHealth <= 0) {
                this.showDialogue('');
                this.choiceMenu = false;
                this.bgPanel.visible = false;
                gameover = true;
                this.playScene.scene.start('gameoverScene');
            } else {
                this.showDialogue('You lost! -1 HP Try again.');
                this.choiceMenu = false;
            }
        } else {
            this.showDialogue('It\'s a draw! Try again.');
            this.choiceMenu = false;
        }

        this.time.delayedCall(2000, () => {
            this.playScene.scene.resume();
            this.scene.stop();
        });
    }

    getResult(playerChoice, enemyChoice) {
        if (playerChoice === enemyChoice) {
            return 'draw';
        }

        if (
            (playerChoice === 'fire' && enemyChoice === 'grass') ||
            (playerChoice === 'water' && enemyChoice === 'fire') ||
            (playerChoice === 'grass' && enemyChoice === 'water')
        ) {
            return 'win';
        } else {
            return 'lose';
        }
    }

    // Function to show the dialogue box with given text
    showDialogue(text) {
        this.bgPanel.visible = true;

        // Clear previous text object, if exists
        if (this.textObj) {
            this.textObj.destroy();
        }

        // Add text to the dialogue box
        this.textObj = this.add.bitmapText(this.bgPanel.x, this.bgPanel.y, 'alagard', text); // Adjust the text position based on the bgPanel's size
        this.textObj.setOrigin(0.5); // Center the text
    }
}
