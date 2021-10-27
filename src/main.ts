import * as Phaser from 'phaser';
import { gameConfig } from '@/config';
import { GameScene } from '@/scenes';

const config = {
  scene: new GameScene(),
  title: 'Phaser game',
  backgroundColor: '#000000',
};

export const game = new Phaser.Game(gameConfig(config));
