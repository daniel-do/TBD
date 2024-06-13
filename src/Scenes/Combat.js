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
        this.uiXCord = 400;
        this.uiYCord = 300;

        this.bgPanel = this.add.sprite(this.uiXCord, this.uiYCord, 'bgPanel').setOrigin(0.5);
        this.bgPanel.setDepth(1);

        this.combatText = this.add.text(400, 300, 'Choose: Fire, Water, Grass', { fontSize: '32px', fill: '#000000' }).setOrigin(0.5);
        this.combatText.setDepth(2);

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
            this.combatText.setText('You won! Enemy defeated.');
        } else if (result === 'lose') {
            this.playScene.playerHealth--;
            if (this.playScene.playerHealth <= 0) {
                this.playScene.scene.start('gameoverScene');
            } else {
                this.combatText.setText('You lost! Try again.');
            }
        } else {
            this.combatText.setText('It\'s a draw! Try again.');
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
}
