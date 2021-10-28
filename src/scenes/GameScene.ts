import { AnimatedPhysicsSprite, PhysicsSprite } from '@/types';

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
  private ball: AnimatedPhysicsSprite;
  private paddle: PhysicsSprite;
  private bricks: Phaser.GameObjects.Group;
  private scoreText: Phaser.GameObjects.Text;
  private score: number = 0;
  private lives = 3;
  private livesText: Phaser.GameObjects.Text;
  private lifeLostText: Phaser.GameObjects.Text;
  private playing = false;
  private startButton: Phaser.GameObjects.Sprite;

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
    this.load.spritesheet('wobble', 'wobble.png', {
      frameWidth: 20,
      frameHeight: 20,
    });
    this.load.spritesheet('button', 'button.png', {
      frameWidth: 120,
      frameHeight: 40,
    });
  }

  public create() {
    this.ball = this.add.sprite(
      this.sys.canvas.width * 0.5,
      this.sys.canvas.height - 25,
      'ball'
    ) as PhysicsSprite & Phaser.Animations.AnimationState;
    this.anims.create({
      key: 'wobble',
      frames: this.ball.anims.generateFrameNumbers('wobble', {
        frames: [0, 1, 0, 2, 0, 1, 0, 2, 0],
      }),
      frameRate: 12,
    });
    this.physics.add.existing(this.ball);
    this.ball.body.setCollideWorldBounds(true, undefined, undefined, true);
    this.ball.body.setBounce(1, 1);

    this.paddle = (
      this.add.sprite(
        this.sys.canvas.width * 0.5,
        this.sys.canvas.height - 5,
        'paddle'
      ) as PhysicsSprite
    ).setOrigin(0.5, 1);
    this.physics.add.existing(this.paddle);
    this.paddle.body.immovable = true;

    this.physics.world.on('worldbounds', this.ballLeaveScreen.bind(this));

    this.initBricks();

    const textStyle = { font: '18px Arial', color: '#0095DD' };

    this.scoreText = this.add.text(5, 5, 'Points: 0', textStyle);

    this.livesText = this.add
      .text(this.sys.canvas.width - 5, 5, `Lives: ${this.lives}`, textStyle)
      .setOrigin(1, 0);

    this.lifeLostText = this.add
      .text(
        this.sys.canvas.width * 0.5,
        this.sys.canvas.height * 0.5,
        'Life lost, click to continue'
      )
      .setOrigin(0.5, 0.5)
      .setVisible(false);

    this.startButton = this.add
      .sprite(
        this.sys.canvas.width * 0.5,
        this.sys.canvas.height * 0.5,
        'button',
        0
      )
      .setInteractive()
      .on('pointerover', () => {
        this.startButton.setFrame(1);
      })
      .on('pointerdown', () => {
        this.startButton.setFrame(2);
        this.startGame();
      })
      .on('pointerout', () => {
        this.startButton.setFrame(0);
      })
      .setOrigin(0.5, 0.5);
  }

  public update() {
    if (this.playing) {
      this.physics.collide(
        this.ball,
        this.paddle,
        this.ballHitPaddle.bind(this)
      );
      this.physics.collide(
        this.ball,
        this.bricks,
        this.ballHitBrick.bind(this)
      );
      this.paddle.x = this.input.x || this.sys.canvas.width * 0.5;
    }
  }

  private ballHitPaddle(): void {
    this.anims.play('wobble', this.ball);
    this.ball.body.setVelocityX(-1 * 5 * (this.paddle.x - this.ball.x));
  }

  private ballHitBrick(ball: PhysicsSprite, brick: PhysicsSprite): void {
    const onCompleteHandler = (
      tween: Phaser.Tweens.Tween,
      targets: any[],
      brick: PhysicsSprite
    ): Phaser.Types.Tweens.TweenOnCompleteCallback => {
      brick.destroy();
      tween.stop();
      if (this.score == 210) {
        alert('You won the game, congratulations!');
        location.reload();
      }
      return;
    };

    let killTween = this.tweens.add({
      targets: brick,
      scale: 0,
      duration: 200,
      onComplete: onCompleteHandler,
      onCompleteParams: [brick],
    });

    this.score += 10;
    this.scoreText = this.scoreText.setText(`Points: ${this.score}`);
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

  private ballLeaveScreen(
    body: Phaser.Physics.Arcade.Body,
    up: boolean,
    down: boolean,
    left: boolean,
    right: boolean
  ): void {
    if (down) {
      this.lives--;
      if (this.lives) {
        this.livesText = this.livesText.setText(`Lives: ${this.lives}`);
        this.lifeLostText.setVisible(true);
        this.ball.setPosition(
          this.sys.canvas.width * 0.5,
          this.sys.canvas.height - 25
        );
        this.ball.body.setVelocity(0, 0);
        this.paddle.setPosition(
          this.sys.canvas.width * 0.5,
          this.sys.canvas.height - 5
        );
        this.input.once('pointerdown', () => {
          this.lifeLostText.setVisible(false);
          this.ball.body.setVelocity(150, -150);
        });
      } else {
        alert('You lost, game over!');
        location.reload();
      }
    }
  }

  private startGame(): void {
    this.startButton.destroy();
    this.ball.body.setVelocity(150, -150);
    this.playing = true;
  }
}
