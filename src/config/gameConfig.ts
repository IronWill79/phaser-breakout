type GameConfig = {
  title: string;
  width?: number;
  height?: number;
  withPhysics?: boolean;
  backgroundColor?: string;
  scene:
    | Phaser.Scene
    | Phaser.Scene[]
    | Phaser.Types.Scenes.SettingsConfig
    | Phaser.Types.Scenes.SettingsConfig[]
    | Phaser.Types.Scenes.CreateSceneFromObjectConfig
    | Phaser.Types.Scenes.CreateSceneFromObjectConfig[]
    | Function
    | Function[];
};

export const gameConfig: ({
  backgroundColor,
  height,
  scene,
  title,
  width,
  withPhysics,
}: GameConfig) => Phaser.Types.Core.GameConfig = ({
  backgroundColor = '#000000',
  height = 600,
  scene,
  title,
  width = 800,
  withPhysics = true,
}) => {
  const config = {
    title,
    type: Phaser.AUTO,
    scale: {
      width,
      height,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    parent: 'game',
    backgroundColor,
    scene,
  };
  if (withPhysics) {
    return {
      ...config,
      physics: {
        default: 'arcade',
        arcade: {
          debug: true,
        },
      },
    };
  }
  return config;
};
