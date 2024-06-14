// Em Ishida, Scott Kuwahara, and Daniel Do
// Created: 6/13/2024
// Phaser: 3.70.0
//
// TB Dungeon (CMPM 120 Final Game Project)
//
// An RPG style dungeon with rock-paper-scissors-like combat
//
"use strict"

const screenWidth = 800; // Width of one screen
const totalWidth = 1280 * 2; // Total width of the game world
const screenHeight = 600; // Height of the screen
const totalHeight = 960 * 2 // Total height of game world

var enemyCount = 5; // Total number of enemies that must be defeated
var bossUnlocked = false; // Sealing off the boss chamber
var enteredBoss = false; // checking to see if player has entered boss chamber
var bossDefeated = false; // checking if the boss has been defeated

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
    scene: [Boot, Menu, Credits, Controls, Play, Boss, Gameover, Combat, Collectible, UI]
}

// Global variable to hold sprites
var my = {sprite: {}, vfx: {}};
let score = 0;
let gameover = false;
let playerHealth = 5;
const SCALE = 2.0;

const game = new Phaser.Game(config);

let keySPACE, keyONE, keyTWO, keyTHREE;
