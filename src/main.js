// Daniel Do
// Created: 5/22/2024
// Phaser: 3.70.0
//
// Frosty Frenzy (CMPM 120 Gallery Shooter Project)
//
// A snowball fight shoot em up game made with Phaser
//
"use strict"

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
    width: 960,
    height: 640,
    scene: [Boot, Menu, Controls, Credits, Play, Gameover]
}

// Global variable to hold sprites
var my = {sprite: {}};
let score = 0;
let gameover = false;

const game = new Phaser.Game(config);

let keySPACE;