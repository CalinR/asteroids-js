import Vector2 from './Vector2';
import Polygon from './Polygon';

export default class Projectile {
  constructor(parent, position = new Vector2(0, 0), rotation = 0, speed = 1, game) {
    this.type = 'projectile';
    this.parent = parent;
    this.position = new Vector2(position.x, position.y);
    this.rotation = rotation;
    this.speed = speed;
    this.game = game;
    this.object = {
      bullet: new Polygon([
        new Vector2(0, -4),
        new Vector2(0, 4),
      ]),
    };
  }

  update(deltaTime, gameObjects) {
    const radians = this.rotation * Math.PI / 180;

    this.position.x -= (Math.cos(radians) * this.speed) * deltaTime;
    this.position.y -= (Math.sin(radians) * this.speed) * deltaTime;

    if (this.position.x > this.game.width || this.position.x < 0 || this.position.y < 0 || this.position.y > this.game.height) {
      this.remove();
    }

    const asteroids = gameObjects.filter(gameObject => gameObject.type === 'asteroid');

    // console.log(asteroids);

    asteroids.forEach((asteroid) => {
      if (asteroid.object) {
        if (Polygon.pointWithinPolygon(this.position, asteroid.object, asteroid.position)) {
          asteroid.hit(this.position);
        }
      }
    });
  }

  remove() {
    const index = this.game.gameObjects.indexOf(this);
    this.game.gameObjects.splice(index, 1);
  }

  draw(context) {
    const rotation = (this.rotation - 90) % 360; // offset rotation by negative 90 degrees
    const radians = rotation * Math.PI / 180;

    context.save();
    context.lineWidth = 4;
    context.strokeStyle = '#fff';
    this.object.bullet.draw(context, this.position, radians);
    context.restore();
  }
}
