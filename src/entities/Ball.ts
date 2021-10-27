export class Ball extends Phaser.GameObjects.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number
  ) {
    scene.load.image('ball');
    super(scene, x, y, texture, frame);
  }
}
