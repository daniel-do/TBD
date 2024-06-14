class Boss extends Phaser.Scene {
    constructor() {
        super("bossScene");
    }

    preload() {
        // Load assets in Boot.js
    }

    create() {
        // Background music
        this.backgroundMusic = this.sound.add('bossMusic', { loop: true });
        this.backgroundMusic.setVolume(0.25);
        this.backgroundMusic.play();

        // loading the map
        // 16x16 tiles, 50 tiles wide 40 tiles tall
        this.map = this.add.tilemap("bosschamber", 16, 16, 50, 40);
        //this.physics.world.setBounds(0, 0, 80*16, 60*16);
        this.tilesetPirate = this.map.addTilesetImage("tilemap_packed_pirates", "tilemap_pirates");

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
        this.player = this.physics.add.sprite(340, 385, 'player_001').setScale(SCALE);
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

        // boss
        this.boss = this.physics.add.sprite(1330, 620, 'ghost_001').setScale(SCALE);
        this.boss.anims.play('boss_float', true);

        this.physics.add.collider(this.boss, this.bgLayer);
        this.physics.add.collider(this.boss, this.detailsLayer);
        this.physics.add.overlap(this.player, this.boss, this.startCombat, null, this);

        // movement vfx
        my.vfx.walking = this.add.particles(0, 0, "kenny-particles", {
            frame: ["symbol_01.png", "smoke_03.png"],
            addrandom: true,
            scale: {start: 0.08, end: 0.03}, 
            maxAliveParticles: 5,
            lifespan: 250,
            alpha: {start: 0.5, end: 0.1}, 
        });
        my.vfx.walking.stop();

        // Player health
        this.playerHealth = 3;
    }

    update() {
        if (gameover == false) {
            this.handlePlayerMovement();
            this.bossAlive();
        }
    }

    handlePlayerMovement() {
        this.player.setVelocity(0);

        if (this.wasd.left.isDown) {
            this.player.flipX = true;

            this.player.anims.play('player_walk', true);

            my.vfx.walking.startFollow(this.player, this.player.displayWidth-15, this.player.displayHeight - 23, false);
            my.vfx.walking.setParticleSpeed(3, 0);
            my.vfx.walking.start();

            this.player.setVelocityX(-200);
        } else if (this.wasd.right.isDown) {
            this.player.flipX = false;

            this.player.anims.play('player_walk', true);

            my.vfx.walking.startFollow(this.player, this.player.displayWidth-45, this.player.displayHeight - 23, false);
            my.vfx.walking.setParticleSpeed(3, 0);
            my.vfx.walking.start();

            this.player.setVelocityX(200);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.wasd.up.isDown) {
            this.player.anims.play('player_walk', true);

            my.vfx.walking.startFollow(this.player, this.player.displayWidth-35, this.player.displayHeight - 15, false);
            my.vfx.walking.setParticleSpeed(3, 0);
            my.vfx.walking.start();

            this.player.setVelocityY(-200);
        } else if (this.wasd.down.isDown) {
            this.player.anims.play('player_walk', true);

            my.vfx.walking.startFollow(this.player, this.player.displayWidth-35, this.player.displayHeight - 40, false);
            my.vfx.walking.setParticleSpeed(3, 0);
            my.vfx.walking.start();

            this.player.setVelocityY(200);
        } else {
            this.player.setVelocityY(0);
        }

        if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
            this.player.anims.stop('player_walk');
            my.vfx.walking.stop();
            this.player.setTexture('player_001');
        }
    }

    startCombat(player, enemy) {
        this.scene.pause();
        this.scene.launch("combatScene", { player: player, enemy: enemy, playScene: this });
    }

    bossAlive() {
        console.log(bossDefeated);
        if (this.boss.visible === false) {
            bossDefeated = true;
            gameover = true;
            this.scene.start('gameoverScene');
        }
    }
}
