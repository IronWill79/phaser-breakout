export type Animated<T> = T & Phaser.Animations.AnimationState;
export type AnimatedGameObject = Animated<Phaser.GameObjects.GameObject>;

export type Physics<T> = T & { body: Phaser.Physics.Arcade.Body };
export type PhysicsGameObject = Physics<Phaser.GameObjects.GameObject>;

export type PhysicsRectangle = Physics<Phaser.GameObjects.Rectangle>;
export type PhysicsEllipse = Physics<Phaser.GameObjects.Ellipse>;
export type PhysicsSprite = Physics<Phaser.GameObjects.Sprite>;

export type AnimatedPhysicsSprite = Animated<PhysicsSprite>;
