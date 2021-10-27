import { PhysicsSprite } from '@/types';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  private ball: PhysicsSprite;
  private paddle: PhysicsSprite;

  constructor() {
    super(sceneConfig);
  }

  public init() {}

  public preload() {
    this.scale.scaleMode = Phaser.Scale.ScaleModes.FIT;
    this.scale.autoCenter = Phaser.Scale.CENTER_BOTH;

    this.load.path = 'assets/';
    this.load.image('ball');
    this.load.image('paddle');
  }

  public create() {
    this.ball = this.add.sprite(
      this.sys.canvas.width * 0.5,
      this.sys.canvas.height - 25,
      'ball'
    ) as PhysicsSprite;
    this.physics.add.existing(this.ball);
    this.ball.body.setCollideWorldBounds(true, undefined, undefined, true);
    this.ball.body.setBounce(1, 1);
    this.ball.body.setVelocity(150, -150);

    this.paddle = this.add.sprite(
      this.sys.canvas.width * 0.5,
      this.sys.canvas.height - 5,
      'paddle'
    ) as PhysicsSprite;
    this.paddle.setOrigin(0.5, 1);
    this.physics.add.existing(this.paddle);
    this.paddle.body.immovable = true;

    // this.physics.world.checkCollision.down = false;

    this.physics.world.on(
      'worldbounds',
      function (
        body: Phaser.Physics.Arcade.Body,
        up: boolean,
        down: boolean,
        left: boolean,
        right: boolean
      ) {
        if (down) {
          alert('Game over!');
          location.reload();
        }
      }
    );
  }

  public update() {
    this.physics.collide(this.ball, this.paddle);
    this.paddle.x = this.input.x || this.sys.canvas.width * 0.5;
  }
}
