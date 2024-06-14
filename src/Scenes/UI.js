class UI extends Phaser.Scene {
    constructor() {
        super("uiDetailScene");
    }

    preload() {
        // Load assets in Boot.js
    }

    create() {
        this.uiXCord = screenWidth/2;
        this.uiYCord = screenHeight - 60;

        this.smallPanel = this.add.sprite(this.uiXCord, this.uiYCord, 'smallPanel');
        this.smallPanel.setScale(0.75);

        this.healthPanel = this.add.sprite(screenWidth/8, screenHeight/16, 'smallPanel');
        this.healthPanel.setScale(0.25);

        this.healthText = this.add.bitmapText(screenWidth/8, screenHeight/16, 'alagard', 'Health: ' + playerHealth, -16);
        this.healthText.setOrigin(0.5);

        this.bossHealthPanel = this.add.sprite((screenWidth*7)/8, screenHeight/16, 'smallPanel');
        this.bossHealthPanel.setScale(0.25);
        this.bossHealthPanel.visible = false;

        this.bossHealthText = this.add.bitmapText((screenWidth*7)/8, screenHeight/16, 'alagard', 'Boss Health: ' + bossHealth, -16);
        this.bossHealthText.setOrigin(0.5);
        this.bossHealthText.visible = false;
    }

    update() {
        // checking if combat is active
        let combatScene = this.scene.get('combatScene');

        if (combatScene.scene.isActive()) {
            this.showDialogue('');
            this.smallPanel.visible = false;
        } else {
            // first quest
            if (enteredBoss === true) {
                this.showDialogue('Defeat the boss');
                this.bossHealthPanel.visible = true;
                this.bossHealthText.visible = true;

                if (this.bossHealthText) {
                    this.bossHealthText.destroy();
                }
        
                this.bossHealthText = this.add.bitmapText((screenWidth*7)/8, screenHeight/16, 'alagard', 'Boss Health: ' + bossHealth, -16);
                this.bossHealthText.setOrigin(0.5);
            } else if (enemyCount >= initEnemyCount) {
                this.showDialogue("Defeat all enemies");
            } else if ((enemyCount > 1) && (enemyCount != initEnemyCount)) {
                this.showDialogue(enemyCount + " enemies remain");
            } else if (enemyCount === 1) {
                this.showDialogue(enemyCount + " enemy remains");
            } else if (enemyCount === 0) {
                this.showDialogue("Boss unlocked!");
            }
        }

        if (this.healthText) {
            this.healthText.destroy();
        }

        this.healthText = this.add.bitmapText(screenWidth/8, screenHeight/16, 'alagard', 'Health: ' + playerHealth, -16);
        this.healthText.setOrigin(0.5);
    }

    // Function to show the dialogue box with given text
    showDialogue(text) {
        this.smallPanel.visible = true;

        // Clear previous text object, if exists
        if (this.textObj) {
            this.textObj.destroy();
        }

        // Add text to the dialogue box
        this.textObj = this.add.bitmapText(this.smallPanel.x, this.smallPanel.y, 'alagard', text); // Adjust the text position based on the bgPanel's size
        this.textObj.setOrigin(0.5); // Center the text
    }
}
