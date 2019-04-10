import Vector2 from './Vector2';
import Polygon from './Polygon';

export default class Projectile {
  constructor(parent, position = new Vector2(0, 0), rotation = 0, speed = 1, game) {
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

  update(deltaTime) {
    const radians = this.rotation * Math.PI / 180;

    this.position.x -= (Math.cos(radians) * this.speed) * deltaTime;
    this.position.y -= (Math.sin(radians) * this.speed) * deltaTime;

    if (this.position.x > this.game.width || this.position.x < 0 || this.position.y < 0 || this.position.y > this.game.height) {
      this.remove();
    }
  }

  remove() {
    const index = this.game.gameObjects.indexOf(this);
    this.game.gameObjects.splice(index, 1);
  }

  draw(context) {
    const rotation = (this.rotation - 90) % 360; // offset rotation by negative 90 degrees

    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(rotation * Math.PI / 180);
    context.lineWidth = 4;
    context.strokeStyle = '#fff';
    this.object.bullet.draw(context);
    context.restore();
  }
}
