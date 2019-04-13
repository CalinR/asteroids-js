import Vector2 from './Vector2';
import Projectile from './Projectile';
import { playerGraphic } from './graphics';

/* eslint-disable class-methods-use-this */
const controls = {
  UP: 'w',
  LEFT: 'a',
  RIGHT: 'd',
  SHOOT: ' ',
};

export default class Player {
  constructor(x = 0, y = 0, game) {
    this.type = 'player';
    this.game = game;
    this.axis = new Vector2(0, 0);
    this.shooting = false;
    this.velocity = new Vector2(0, 0);
    this.position = new Vector2(x, y);
    this.object = playerGraphic;
    this.width = 40;
    this.height = 60;
    this.rotation = 90;
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

  /**
   * @param {number} deltaTime
   */
  update(deltaTime) {
    this.rotation += ((this.rotateSpeed * this.axis.x) * deltaTime) % 360;
    const radians = this.rotation * Math.PI / 180;

    this.velocity.x += (Math.cos(radians) * this.axis.y) * this.moveSpeed;
    this.velocity.y += (Math.sin(radians) * this.axis.y) * this.moveSpeed;

    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;

    // Apply friction to velocity and use bitwise shift to round number
    this.velocity.x = (this.velocity.x * this.inertia) << 0;
    this.velocity.y = (this.velocity.y * this.inertia) << 0;

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

    if (this.shooting && Date.now() > this.lastShot + this.timeBetweenShots) {
      this.shoot();
      this.lastShot = Date.now();
    }
  }

  shoot() {
    const bullet = new Projectile(this, this.position, this.rotation, 500, this.game);
    this.game.addObject(bullet);
  }

  /**
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    const rotation = (this.rotation - 90) % 360; // offset rotation by negative 90 degrees
    const radians = rotation * Math.PI / 180;

    context.save();
    context.lineWidth = 2;
    context.strokeStyle = '#fff';
    this.object.outline.draw(context, this.position, radians);
    this.object.base.draw(context, this.position, radians);
    if (this.frameCount > 4 && this.axis.y < 0) {
      this.object.flame.draw(context, this.position, radians);
    }
    context.restore();

    this.frameCount++;
    this.frameCount %= 8;
  }
}
