import * as Phaser from 'phaser';
import { gameConfig } from '@/config';
import { GameScene } from '@/scenes';

const config = { scene: new GameScene(), title: 'Phaser game' };

export const game = new Phaser.Game(gameConfig(config));
