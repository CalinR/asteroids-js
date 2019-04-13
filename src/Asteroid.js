import Vector2 from './Vector2';
import { asteroidGraphics } from './graphics';

export default class Asteroid {
  constructor(x = 0, y = 0, rotation = 90, speed = 20, rotationSpeed = 20, size = 1, game) {
    this.type = 'asteroid';
    this.position = new Vector2(x, y);
    this.rotation = rotation;
    this.spin = 0;
    this.speed = speed;
    this.rotationSpeed = rotationSpeed;
    this.size = size;
    this.game = game;
    this.object = Asteroid.getShape(size);
    this.height = 90;
    this.width = 90;
  }

  static getShape(size = 1) {
    const shapes = asteroidGraphics[size];
    const shapeIndex = Math.floor((Math.random() * shapes.length));

    return shapes[shapeIndex];
  }

  update(deltaTime) {
    this.spin += (this.rotationSpeed * deltaTime) % 360;
    const radians = this.rotation * Math.PI / 180;

    this.position.x -= (Math.cos(radians) * this.speed) * deltaTime;
    this.position.y -= (Math.sin(radians) * this.speed) * deltaTime;

    if (this.position.x < -this.width) {
      this.position.x = this.game.width + this.width;
    } else if (this.position.x > this.game.width + this.width) {
      this.position.x = -this.width;
    }

    if (this.position.y < -this.height) {
      this.position.y = this.game.height + this.height;
    } else if (this.position.y > this.game.height + this.height) {
      this.position.y = -this.height;
    }
  }

  hit(hitPoint = new Vector2(0, 0)) {
    console.log(hitPoint);

    this.remove();
  }

  remove() {
    const index = this.game.gameObjects.indexOf(this);
    this.game.gameObjects.splice(index, 1);
  }

  draw(context) {
    const radians = this.spin * Math.PI / 180;

    context.save();
    context.lineWidth = 2;
    context.strokeStyle = '#fff';
    this.object.draw(context, this.position, radians);
    context.restore();
  }
}
