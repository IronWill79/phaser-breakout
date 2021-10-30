export default class BallSprite extends Phaser.GameObjects.Sprite {
  // ball physics body
  body: Phaser.Physics.Arcade.Body;

  static preloadAssets(scene: Phaser.Scene) {
    scene.load.image('ball');
    scene.load.spritesheet('wobble', 'wobble.png', { frameWidth: 20 });
  }

  constructor(scene: Phaser.Scene) {
    const { height, width } = scene.sys.canvas;

    super(scene, width * 0.5, height - 25, 'ball');

    scene.anims.create({
      key: 'wobble',
      frames: this.anims.generateFrameNumbers('wobble', {
        frames: [0, 1, 0, 2, 0, 1, 0, 2, 0],
      }),
      frameRate: 12,
    });
    scene.add.existing(this);

    scene.physics.add.existing(this);

    this.body.setCollideWorldBounds(true, undefined, undefined, true);
    this.body.setBounce(1, 1);
  }
}
