import Vector2 from './Vector2';
import Projectile from './Projectile';
import { playerGraphic } from './graphics';
import GameObject from './GameObject';

/* eslint-disable class-methods-use-this */
const controls = {
  UP: 'w',
  LEFT: 'a',
  RIGHT: 'd',
  SHOOT: ' ',
};

export default class Player extends GameObject {
  constructor(position, rotation, game) {
    super(position, rotation, 'player', game);
    this.axis = new Vector2(0, 0);
    this.shooting = false;
    this.velocity = new Vector2(0, 0);
    this.shape = playerGraphic;
    this.moveSpeed = 8;
    this.rotateSpeed = 64;
    this.inertia = 0.99;
    this.frameCount = 0;
    this.projectiles = [];
    this.timeBetweenShots = 500; // milliseconds
    this.lastShot = Date.now();

    this.bindKeys();
  }

  bindKeys() {
    document.addEventListener('keydown', e => this.keyDownHandler(e));
    document.addEventListener('keyup', e => this.keyUpHandler(e));
  }

  keyDownHandler(event) {
    switch (event.key) {
      case controls.UP:
        this.axis.y = -1;
        break;
      case controls.LEFT:
        this.axis.x = -1;
        break;
      case controls.RIGHT:
        this.axis.x = 1;
        break;
      case controls.SHOOT:
        this.shooting = true;
        break;
      default:
    }
  }

  keyUpHandler(event) {
    switch (event.key) {
      case controls.UP:
        this.axis.y = 0;
        break;
      case controls.LEFT:
        this.axis.x = 0;
        break;
      case controls.RIGHT:
        this.axis.x = 0;
        break;
      case controls.SHOOT:
        this.shooting = false;
        break;
      default:
    }
  }

  update(deltaTime) {
    const { width, height } = this.shape.outline;

    this.rotation += ((this.rotateSpeed * this.axis.x) * deltaTime) % 360;

    this.velocity.x += (Math.cos(this.radians) * this.axis.y) * this.moveSpeed;
    this.velocity.y += (Math.sin(this.radians) * this.axis.y) * this.moveSpeed;

    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;

    // Apply friction to velocity and use bitwise shift to round number
    this.velocity.x = (this.velocity.x * this.inertia) << 0;
    this.velocity.y = (this.velocity.y * this.inertia) << 0;

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

    if (this.shooting && Date.now() > this.lastShot + this.timeBetweenShots) {
      this.shoot();
      this.lastShot = Date.now();
    }
  }

  shoot() {
    const { x, y } = this.position;
    const bullet = new Projectile(new Vector2(x, y), this.rotation, 500, this, this.game);
    this.game.addObject(bullet);
  }

  draw(context) {
    context.save();
    context.lineWidth = 2;
    context.strokeStyle = '#fff';
    this.shape.outline.draw(context, this.position, this.radians);
    this.shape.base.draw(context, this.position, this.radians);
    if (this.frameCount > 4 && this.axis.y < 0) {
      this.shape.flame.draw(context, this.position, this.radians);
    }
    context.restore();

    this.frameCount++;
    this.frameCount %= 8;
  }
}
