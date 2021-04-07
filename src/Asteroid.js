// import Vector2 from './Vector2';
import GameObject from './GameObject';
import { asteroidGraphics } from './graphics';
import Vector2 from './Vector2';
import Polygon from './Polygon';

export default class Asteroid extends GameObject {
  constructor(position, rotation, speed = 20, spinSpeed = 20, size = 1, game) {
    super(position, rotation, 'asteroid', game);
    this.speed = speed;
    this.spin = 0;
    this.spinSpeed = spinSpeed;
    this.size = size;
    this.shape = this.getNewShape();
  }

  getNewShape() {
    const shapes = asteroidGraphics[this.size];
    const shapeIndex = Math.floor((Math.random() * shapes.length));
    const shape = shapes[shapeIndex];

    return shape;
  }

  checkForCollision(poly) {
    const rotatedShape = this.shape.getRotatedPoints();
    let collision = null;

    poly.points.forEach((point) => {
      collision = Polygon.pointWithinPolygon(point, rotatedShape, this.position);
    });

    return collision;
  }

  update(deltaTime) {
    const width = this.shape.width / 2;
    const height = this.shape.height / 2;

    this.spin += (this.spinSpeed * deltaTime) % 360;

    this.position.x -= (Math.cos(this.radians) * this.speed) * deltaTime;
    this.position.y -= (Math.sin(this.radians) * this.speed) * deltaTime;

    if (this.position.x < -width) {
      this.position.x = this.game.width + width;
    } else if (this.position.x > this.game.width + width) {
      this.position.x = -width;
    }

    if (this.position.y < -height) {
      this.position.y = this.game.height + height;
    } else if (this.position.y > this.game.height + height) {
      this.position.y = -height;
    }
  }

  hit(hitPoint = new Vector2(0, 0)) {
    console.log(hitPoint);

    super.remove();
  }

  draw(context) {
    context.save();
    context.lineWidth = 2;
    context.strokeStyle = '#fff';
    this.shape.draw(context, this.position, this.radians);
    context.restore();
  }
}
