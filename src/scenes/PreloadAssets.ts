import { BallSprite, PaddleSprite } from '@/entities';

export class PreloadAssets extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadAssets' });
  }

  preload(): void {
    this.load.path = 'assets/';
    BallSprite.preloadAssets(this);
    PaddleSprite.preloadAssets(this);

    this.load.image('brick');
    this.load.spritesheet('button', 'button.png', {
      frameHeight: 40,
      frameWidth: 120,
    });
  }

  create(): void {
    this.scene.start('PlayGame');
  }
}
