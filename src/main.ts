import * as Phaser from 'phaser';
import { PreloadAssets, PlayGame } from '@/scenes';
import { GameOptions } from '@/config';

// object to initialize the Scale Manager
const scaleObject: Phaser.Types.Core.ScaleConfig = {
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  parent: 'game',
  width: GameOptions.gameSize.width,
  height: GameOptions.gameSize.height,
};

// object to initialize Arcade physics
const physicsObject: Phaser.Types.Core.PhysicsConfig = {
  default: 'arcade',
  arcade: {
    debug: process.env.NODE_ENV === 'production' ? false : true,
  },
};

// game configuration object
const configObject: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: 0x444444,
  scale: scaleObject,
  scene: [PreloadAssets, PlayGame],
  physics: physicsObject,
  pixelArt: true,
};

export const game = new Phaser.Game(configObject);
