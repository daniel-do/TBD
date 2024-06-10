class Controls extends Phaser.Scene {
    constructor() {
        super("controlsScene");
    }

    preload() {

    }
    init() {
        this.TILESIZE = 16;
        this.SCALE = 2.0;
        this.TILEWIDTH = 40;
        this.TILEHEIGHT = 25;
    }

    create() {
        
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: 'white',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width / 2, (game.config.height * 1) / 4, 'TBD', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, (game.config.height * 2) / 4, 'Controls', menuConfig).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //need to input tiled assets where the quotations are
        this.map = this.add.tilemap("", this.TILESIZE, this.TILESIZE, this.TILEHEIGHT, this.TILEWIDTH);
        //here as well
        this.tileset = this.map.addTilesetImage("", "");
        //input layers for tiled assets
        this./** */ = this.map.createLayer("", this.tileset, 0, 0);
        this./** */ = this.map.createLayer("", this.tileset, 0, 0);
        this./** */ = this.map.createLayer("", this.tileset, 0, 0);

        my.sprite./**characterSprite */ = this.add.sprite(this.tileXtoWorld(5), this.tileYtoWorld(5), /** */).setOrigin(0,0);

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setZoom(this.SCALE);

        let /** tiled map grid*/ = this.layersToGrid([this./**layer 1 */, this./**layer 2 */, this./**layer 3 */]);

        let walkables = [1, 2, 3, 30, 40, 41, 42, 43, 44, 95, 13, 14, 15, 25, 26, 27, 37, 38, 39, 70, 84];

        this.finder = new EasyStar.js();

        this.finder.setGrid(tinyTownGrid);

        this.finder.setAcceptableTiles(walkables);

        this.activeCharacter = my.sprite.purpleTownie;
        this.input.on('pointerup',this.handleClick, this);

        this.cKey = this.input.keyboard.addKey('C');
        this.lowCost = false;
        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.cKey)) {
            if (!this.lowCost) {
                this.setCost(this.tileset);
                this.lowCost = true;
            } else {
                this.resetCost(this.tileset);
                this.lowCost = false;
            }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("creditsScene");
        }
      }
    }
    resetCost(tileset) {
        for (let tileID = tileset.firstgid; tileID < tileset.total; tileID++) {
            let props = tileset.getTileProperties(tileID);
            if (props != null) {
                if (props.cost != null) {
                    this.finder.setTileCost(tileID, 1);
                }
            }
        }
    }

    tileXtoWorld(tileX) {
        return tileX * this.TILESIZE;
    }

    tileYtoWorld(tileY) {
        return tileY * this.TILESIZE;
    }

    layersToGrid(layers) {
        let grid = [];

        for (let y = 0; y < this.TILEHEIGHT; y++) {
            let row = [];
            for (let x = 0; x < this.TILEWIDTH; x++) {
                row.push(0); 
            }
            grid.push(row);
        }

        for (let layer of layers) {
            for (let y = 0; y < this.TILEHEIGHT; y++) {
                for (let x = 0; x < this.TILEWIDTH; x++) {
                    let tile = layer.getTileAt(x, y);
                    if (tile !== null) {
                        grid[y][x] = tile.index; 
                    }
                }
            }
        }

        return grid;
    }

    handleClick(pointer) {
        let x = pointer.x / this.SCALE;
        let y = pointer.y / this.SCALE;
        let toX = Math.floor(x/this.TILESIZE);
        var toY = Math.floor(y/this.TILESIZE);
        var fromX = Math.floor(this.activeCharacter.x/this.TILESIZE);
        var fromY = Math.floor(this.activeCharacter.y/this.TILESIZE);
        console.log('going from ('+fromX+','+fromY+') to ('+toX+','+toY+')');
    
        this.finder.findPath(fromX, fromY, toX, toY, (path) => {
            if (path === null) {
                console.warn("Path was not found.");
            } else {
                console.log(path);
                this.moveCharacter(path, this.activeCharacter);
            }
        });
        this.finder.calculate(); 
    }
    
    moveCharacter(path, character) {
        var tweens = [];
        for(var i = 0; i < path.length-1; i++){
            var ex = path[i+1].x;
            var ey = path[i+1].y;
            tweens.push({
                x: ex*this.map.tileWidth,
                y: ey*this.map.tileHeight,
                duration: 200
            });
        }
    
        this.tweens.chain({
            targets: character,
            tweens: tweens
        });

    }

    setCost(tileset) {
        for (let tileID = tileset.firstgid; tileID < tileset.firstgid + tileset.total; tileID++) {
            let props = tileset.getTileProperties(tileID);
            if (props != null && props.cost != null) {
                this.finder.setTileCost(tileID, props.cost);
            }
        }
    }
}