// Daniel Do
// Created: 5/22/2024
// Phaser: 3.70.0
//
// Frosty Frenzy (CMPM 120 Gallery Shooter Project)
//
// A snowball fight shoot em up game made with Phaser
//
"use strict"

const screenWidth = 800; // Width of one screen
const totalWidth = 1280 * 2; // Total width of the game world
const screenHeight = 600; // Height of the screen
const totalHeight = 960 * 2 // Total height of game world

var enemyCount = 0; // Total number of enemies that must be defeated
var bossUnlocked = false; // Sealing off the boss chamber

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    physics: {
        default: 'arcade',
        arcade: {
          debug: false
        }
    },
    width: screenWidth,
    height: screenHeight,
    scene: [Boot, Menu, Controls, Play, Credits, Gameover, Combat, Collectible, Boss]
}

// Global variable to hold sprites
var my = {sprite: {}, vfx: {}};
let score = 0;
let gameover = false;
const SCALE = 2.0;

const game = new Phaser.Game(config);

let keySPACE;
