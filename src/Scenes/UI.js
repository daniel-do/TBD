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
            } else if (enemyCount > 0) {
                this.showDialogue("Defeat all enemies");
            } else if (enemyCount === 0) {
                this.showDialogue("Boss unlocked!");
            }
        }
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
