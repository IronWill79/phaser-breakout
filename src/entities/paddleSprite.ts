export default class PaddleSprite extends Phaser.GameObjects.Sprite {
  static preloadAssets(scene: Phaser.Scene) {
    scene.load.image('paddle');
  }

  constructor(scene: Phaser.Scene) {
    const { height, width } = scene.sys.canvas;
    super(scene, width / 2, height - 5, 'paddle');
  }
}
