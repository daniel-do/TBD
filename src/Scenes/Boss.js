class Boss extends Phaser.Scene {
    constructor() {
        super("bossScene");
    }

    preload() {
        // Load assets in Boot.js
    }

    create() {
        // Background music
        this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
        this.backgroundMusic.play();

        // loading the map
        // 16x16 tiles, 80 tiles wide 60 tiles tall
        this.map = this.add.tilemap("bosschamber", 16, 16, 50, 40);
        //this.physics.world.setBounds(0, 0, 80*16, 60*16);
        this.tilesetPirate = this.map.addTilesetImage("tilemap_packed_pirates", "tilemap_pirates")
        this.tilesetRPG = this.map.addTilesetImage("tilemap_packed", "tilemap_rpg");

        // create layers
        // bg
        this.bgLayer = this.map.createLayer("background", this.tilesetPirate, 0, 0);
        this.bgLayer.setScale(SCALE);
        // details
        this.detailsLayer = this.map.createLayer("details", this.tilesetPirate, 0, 0);
        this.detailsLayer.setScale(SCALE);

        this.bgLayer.setCollisionByProperty({ collides: true });
        this.detailsLayer.setCollisionByProperty({ collides: true });

        // Player setup
        this.player = this.physics.add.sprite(200, 200, 'player').setScale(SCALE);
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

        // Collisions
        this.physics.add.collider(this.player, this.bgLayer);
        this.physics.add.collider(this.player, this.detailsLayer);

        // this.physics.add.collider(this.enemies, this.bgLayer);
        // this.physics.add.collider(this.enemies, this.ledgeLayer);
        // this.physics.add.collider(this.enemies, this.detailsLayer);
        // this.physics.add.collider(this.enemies, this.shipLayer);
        // this.physics.add.overlap(this.player, this.enemies, this.startCombat, null, this);

        // Player health
        this.playerHealth = 3;
    }

    update() {
        this.handlePlayerMovement();
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

    startCombat(player, enemy) {
        this.scene.pause();
        this.scene.launch("combatScene", { player: player, enemy: enemy, playScene: this });
    }
}
