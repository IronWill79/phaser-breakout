const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  private gameObjects: Phaser.GameObjects.GameObject[];

  constructor() {
    super(sceneConfig);
  }

  public init() {}

  public preload() {}

  public create() {}

  public update() {}
}
