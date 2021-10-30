declare interface IBallSprite extends Phaser.GameObjects.Sprite {}

declare namespace Phaser.GameObjects {
  interface GameObjectFactory {
    ballSprite(): IBallSprite;
  }
}
