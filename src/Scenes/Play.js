class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // Load assets in Boot.js
    }

    create() {
        // Background music
        this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
        this.backgroundMusic.play();

        // Create tilemap and layers
        const map = this.make.tilemap({ key: "firstchamber" });
        const tileset = map.addTilesetImage("tilemap_packed", "tilemap_rpg");

        // Ensure these names match the names in your tilemap JSON file
        const groundLayer = map.createLayer("background", tileset);
        const obstaclesLayer = map.createLayer("ship", tileset);

        if (!groundLayer || !obstaclesLayer) {
            console.error('Invalid tilemap layer names. Valid names are:', map.layers.map(l => l.name));
            return;
        }

        obstaclesLayer.setCollisionByProperty({ collides: true });

        // Player setup
        this.player = this.physics.add.sprite(100, 100, 'player').setScale(SCALE);

        // Enable WASD input
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };

        // Collisions
        this.physics.add.collider(this.player, obstaclesLayer);

        // Enemies setup
        this.enemies = this.physics.add.group();
        for (let i = 0; i < 5; i++) {
            let enemy = this.physics.add.sprite(200 + i * 100, 200, 'enemy').setScale(SCALE);
            this.enemies.add(enemy);
        }
        this.physics.add.collider(this.enemies, obstaclesLayer);
        this.physics.add.overlap(this.player, this.enemies, this.startCombat, null, this);

        // Collectibles setup
        this.collectibles = this.physics.add.group();
        for (let i = 0; i < 3; i++) {
            let collectible = this.physics.add.sprite(300 + i * 150, 300, 'collectible');
            this.collectibles.add(collectible);
        }
        this.physics.add.overlap(this.player, this.collectibles, this.collectItem, null, this);

        // Player health
        this.playerHealth = 3;
    }

    update() {
        this.handlePlayerMovement();
        this.handleEnemyMovement();
    }

    handlePlayerMovement() {
        this.player.setVelocity(0);

        if (this.wasd.left.isDown) {
            this.player.setVelocityX(-200);
        } else if (this.wasd.right.isDown) {
            this.player.setVelocityX(200);
        }

        if (this.wasd.up.isDown) {
            this.player.setVelocityY(-200);
        } else if (this.wasd.down.isDown) {
            this.player.setVelocityY(200);
        }
    }

    handleEnemyMovement() {
        this.enemies.children.iterate(function (enemy) {
            let randX = Phaser.Math.Between(-1, 1) * 100;
            let randY = Phaser.Math.Between(-1, 1) * 100;
            enemy.setVelocity(randX, randY);
        });
    }

    startCombat(player, enemy) {
        this.scene.pause();
        this.scene.launch('combatScene', { player: player, enemy: enemy, playScene: this });
    }

    collectItem(player, collectible) {
        collectible.destroy();
        // Restore health or give some other benefit
        if (this.playerHealth < 3) {
            this.playerHealth++;
        }
    }
}
