import * as Phaser from 'phaser';
import { gameConfig, GameConfig } from '@/config';
import { GameScene } from '@/scenes';

const config: GameConfig = {
  scene: new GameScene(),
  title: 'Phaser game',
  backgroundColor: '#000000',
  height: 320,
  width: 480,
};

export const game = new Phaser.Game(gameConfig(config));
