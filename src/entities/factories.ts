import BallSprite from './ballSprite';

Phaser.GameObjects.GameObjectFactory.register(
  'ballSprite',
  function (this: Phaser.GameObjects.GameObjectFactory) {
    const ballSprite = new BallSprite(this.scene);

    return ballSprite;
  },
);
