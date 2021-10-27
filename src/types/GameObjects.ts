export type PhysicsBody<T> = T & { body: Phaser.Physics.Arcade.Body };
export type PhysicsGameObject = PhysicsBody<Phaser.GameObjects.GameObject>;

export type PhysicsRectangle = PhysicsBody<Phaser.GameObjects.Rectangle>;
export type PhysicsEllipse = PhysicsBody<Phaser.GameObjects.Ellipse>;
