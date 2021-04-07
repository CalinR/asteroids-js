import GameObject from './GameObject';
import { bullet } from './graphics';
import Polygon from './Polygon';

export default class Projectile extends GameObject {
  constructor(position, rotation, speed = 20, parent, game) {
    super(position, rotation, 'bullet', game);
    this.speed = speed;
    this.parent = parent;
    this.shape = bullet;
  }

  update(deltaTime, gameObjects) {
    this.position.x -= (Math.cos(this.radians) * this.speed) * deltaTime;
    this.position.y -= (Math.sin(this.radians) * this.speed) * deltaTime;

    if (this.position.x > this.game.width || this.position.x < 0 || this.position.y < 0 || this.position.y > this.game.height) {
      super.remove();
    }

    const asteroids = gameObjects.filter(gameObject => gameObject.type === 'asteroid');
    const collisionPoly = new Polygon([this.shape.points[0]]);

    asteroids.forEach((asteroid) => {
      const collision = asteroid.checkForCollision(collisionPoly);
      if (collision) {
        asteroid.hit(collision);
      }
    });
  }

  draw(context) {
    context.save();
    context.lineWidth = 4;
    context.strokeStyle = '#fff';
    this.shape.draw(context, this.position, this.radians);
    context.restore();
  }
}
