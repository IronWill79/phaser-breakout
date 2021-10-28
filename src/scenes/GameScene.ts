import { PhysicsSprite } from '@/types';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

type BrickInfo = {
  width: number;
  height: number;
  count: {
    row: number;
    col: number;
  };
  offset: {
    top: number;
    left: number;
  };
  padding: number;
};

export class GameScene extends Phaser.Scene {
  private ball: PhysicsSprite;
  private paddle: PhysicsSprite;
  private bricks: Phaser.GameObjects.Group;
  private scoreText: Phaser.GameObjects.Text;
  private score: number = 0;

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
    this.load.image('brick');
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

    this.initBricks();

    this.scoreText = this.add.text(5, 5, 'Points: 0', {
      font: '18px Arial',
      color: '#0095DD',
    });
  }

  public update() {
    this.physics.collide(this.ball, this.paddle);
    this.physics.collide(this.ball, this.bricks, this.ballHitBrick.bind(this));
    this.paddle.x = this.input.x || this.sys.canvas.width * 0.5;
  }

  private ballHitBrick(ball: PhysicsSprite, brick: PhysicsSprite): void {
    brick.destroy();
    this.score += 10;
    this.scoreText = this.scoreText.setText(`Points: ${this.score}`);

    let count_alive = 0;
    for (let i = 0; i < this.bricks.children.size; i++) {
      if (this.bricks.children.entries[i].active == true) {
        count_alive++;
      }
    }
    if (count_alive == 0) {
      alert('You won the game, congratulations!');
      location.reload();
    }
  }

  private initBricks(): void {
    const brickInfo: BrickInfo = {
      width: 50,
      height: 20,
      count: {
        row: 3,
        col: 7,
      },
      offset: {
        top: 50,
        left: 60,
      },
      padding: 10,
    };

    this.bricks = this.add.group();

    for (let c = 0; c < brickInfo.count.col; c++) {
      for (let r = 0; r < brickInfo.count.row; r++) {
        let brickX =
          c * (brickInfo.width + brickInfo.padding) + brickInfo.offset.left;
        let brickY =
          r * (brickInfo.height + brickInfo.padding) + brickInfo.offset.top;
        const newBrick = this.add.sprite(
          brickX,
          brickY,
          'brick'
        ) as PhysicsSprite;
        this.physics.add.existing(newBrick);
        newBrick.body.immovable = true;
        newBrick.setOrigin(0.5, 0.5);
        this.bricks.add(newBrick);
      }
    }
  }
}
