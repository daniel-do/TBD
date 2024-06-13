class Combat extends Phaser.Scene {
    constructor() {
        super("combatScene");
    }

    init(data) {
        this.player = data.player;
        this.enemy = data.enemy;
        this.playScene = data.playScene;
    }

    create() {
        this.uiXCord = screenWidth/2;
        this.uiYCord = screenHeight/2;

        this.bgPanel = this.add.sprite(this.uiXCord, this.uiYCord, 'bgPanel');
        this.bgPanel.setScale(1.25);
        this.bgPanel.visible = false;

        this.showDialogue("Choose: Fire, Water, or Grass");

        // this.combatText = this.add.text(400, 300, 'Choose: Fire, Water, Grass', { fontSize: '32px', fill: '#000000' }).setOrigin(0.5);
        // this.combatText.setDepth(2);


        this.input.keyboard.on('keydown-F', () => this.resolveCombat('fire'));
        this.input.keyboard.on('keydown-W', () => this.resolveCombat('water'));
        this.input.keyboard.on('keydown-G', () => this.resolveCombat('grass'));
    }

    resolveCombat(playerChoice) {
        const choices = ['fire', 'water', 'grass'];
        const enemyChoice = choices[Math.floor(Math.random() * 3)];
        const result = this.getResult(playerChoice, enemyChoice);

        if (result === 'win') {
            this.enemy.destroy();
            this.showDialogue('You won! Enemy defeated.');
        } else if (result === 'lose') {
            this.playScene.playerHealth--;
            if (this.playScene.playerHealth <= 0) {
                this.playScene.scene.start('gameoverScene');
            } else {
                this.showDialogue('You lost! Try again.');
            }
        } else {
            this.showDialogue('It\'s a draw! Try again.');
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
