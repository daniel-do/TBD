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
        this.backgroundMusic.setVolume(0.5);
        this.backgroundMusic.play();

        // loading the map
        // 16x16 tiles, 80 tiles wide 60 tiles tall
        this.map = this.add.tilemap("firstchamber", 16, 16, 80, 60);
        this.tilesetPirate = this.map.addTilesetImage("tilemap_packed_pirates", "tilemap_pirates");
        this.tilesetRPG = this.map.addTilesetImage("tilemap_packed", "tilemap_rpg");

        // create layers
        this.bgLayer = this.map.createLayer("background", this.tilesetPirate, 0, 0);
        this.bgLayer.setScale(SCALE);
        this.ledgeLayer = this.map.createLayer("ledge", this.tilesetRPG, 0, 0);
        this.ledgeLayer.setScale(SCALE);
        this.detailsLayer = this.map.createLayer("details", this.tilesetPirate, 0, 0);
        this.detailsLayer.setScale(SCALE);
        this.shipLayer = this.map.createLayer("ship", this.tilesetPirate, 0, 0);
        this.shipLayer.setScale(SCALE);
        this.sailLayer = this.map.createLayer("sail", this.tilesetPirate, 0, 0);
        this.sailLayer.setScale(SCALE);
        this.sailLayer.setDepth(1);

        this.bgLayer.setCollisionByProperty({ collides: true });
        this.ledgeLayer.setCollisionByProperty({ collides: true });
        this.detailsLayer.setCollisionByProperty({ collides: true });
        this.shipLayer.setCollisionByProperty({ collides: true });

        // Player setup
        this.player = this.physics.add.sprite(500, 500, 'player').setScale(SCALE);
        this.player.setDepth(0);

        // Enable WASD input
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };

        // Camera
        this.cameras.main.setBounds(0, 0, totalWidth, totalHeight);
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(200, 200);

        // Collisions for player
        this.physics.add.collider(this.player, this.bgLayer);
        this.physics.add.collider(this.player, this.ledgeLayer);
        this.physics.add.collider(this.player, this.detailsLayer);
        this.physics.add.collider(this.player, this.shipLayer);

        // Enemies setup
        this.enemies = this.physics.add.group();
        this.spawnObjects(this.enemies, 'pirate_enemy_001', 5);

        // Set up the "enemy_walk" animation for all enemies
        this.enemies.children.iterate(function (enemy) {
            enemy.anims.play('enemy_walk', true);
        });

        // Collisions for enemies
        this.physics.add.collider(this.enemies, this.bgLayer);
        this.physics.add.collider(this.enemies, this.ledgeLayer);
        this.physics.add.collider(this.enemies, this.detailsLayer);
        this.physics.add.collider(this.enemies, this.shipLayer);
        this.physics.add.overlap(this.player, this.enemies, this.startCombat, null, this);

        // Collectibles setup
        this.collectibles = this.physics.add.group();
        this.spawnObjects(this.collectibles, 'collectible', 3);

        this.physics.add.overlap(this.player, this.collectibles, this.collectItem, null, this);

        // Find the staircase object
        const staircaseObject = this.map.findObject("Objects", obj => obj.name === "stairs");

        // Check if the object exists
        if (staircaseObject) {
            // Create a sprite for the stairs
            this.stairs = this.physics.add.sprite(1168.00 * 2, 464.67 * 2, "tilemap_sheet", 83);
            this.stairs.setScale(SCALE);
            this.stairs.visible = false;

            // Set physics properties for the stairs
            this.physics.world.enable(this.stairs, Phaser.Physics.Arcade.STATIC_BODY);

            // Trigger entering boss chamber
            this.physics.add.overlap(this.player, this.stairs, () => {
                if (this.stairs.visible === true) {
                    // boss chamber scene
                    this.backgroundMusic.stop();
                    this.scene.start("bossScene");
                }
            });
        }

        // Player health
        this.playerHealth = 5;
        this.createHealthBar();
    }

    update() {
        this.handlePlayerMovement();
        this.handleEnemyMovement();
        this.unlockBossChamber();

        if (bossUnlocked === true) {
            this.stairs.visible = true;
        }
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
        this.scene.launch("combatScene", { player: player, enemy: enemy, playScene: this });
    }

    collectItem(player, collectible) {
        collectible.destroy();
        // Restore health or give some other benefit
        if (this.playerHealth < 5) {
            this.playerHealth++;
            this.updateHealthBar();
        }
    }

    createHealthBar() {
        this.healthBar = this.add.group({
            key: 'collectible',
            repeat: 2,
            setXY: { x: screenWidth - 40, y: 20, stepX: -40 }
        });

        this.healthBar.children.iterate(function (child) {
            child.setScale(0.5);
        });
    }

    updateHealthBar() {
        this.healthBar.clear(true, true);

        for (let i = 0; i < this.playerHealth; i++) {
            let healthIcon = this.add.image(screenWidth - 40 - i * 40, 20, 'collectible');  
            healthIcon.setScale(0.5);
            this.healthBar.add(healthIcon);
        }
    }

    spawnObjects(group, spriteKey, count) {
        for (let i = 0; i < count; i++) {
            let x, y, tile;

            do {
                x = Phaser.Math.Between(0, totalWidth);
                y = Phaser.Math.Between(0, totalHeight);
                tile = this.map.getTileAtWorldXY(x, y, true, this.cameras.main, 'background');
            } while (!tile || tile.collides);

            let obj = this.physics.add.sprite(x, y, spriteKey).setScale(SCALE);
            group.add(obj);
        }
    }

    unlockBossChamber() {
        if (enemyCount === 0) {
            bossUnlocked = true;
        }
    }
}
   