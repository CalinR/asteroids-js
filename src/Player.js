import Vector2 from './Vector2';
import Polygon from './Polygon';
import Projectile from './Projectile';

/* eslint-disable class-methods-use-this */
const controls = {
  UP: 'w',
  LEFT: 'a',
  RIGHT: 'd',
  SHOOT: ' ',
};

export default class Player {
  constructor(x = 0, y = 0, game) {
    this.game = game;
    this.axis = new Vector2(0, 0);
    this.shooting = false;
    this.velocity = new Vector2(0, 0);
    this.position = new Vector2(x, y);
    this.object = {
      outline: new Polygon([
        new Vector2(-20, 30),
        new Vector2(0, -30),
        new Vector2(20, 30),
      ]),
      base: new Polygon([
        new Vector2(16, 20),
        new Vector2(-16, 20),
      ]),
      flame: new Polygon([
        new Vector2(-10, 20),
        new Vector2(0, 40),
        new Vector2(10, 20),
      ]),
    };
    this.hitbox = {
      width: 40,
      height: 60,
    };
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

    this.velocity.multiply(this.inertia);

    if (this.position.x < -this.hitbox.width) {
      this.position.x = this.game.width + this.hitbox.width;
    } else if (this.position.x > this.game.width + this.hitbox.width) {
      this.position.x = -this.hitbox.width;
    }

    if (this.position.y < -this.hitbox.height) {
      this.position.y = this.game.height + this.hitbox.height;
    } else if (this.position.y > this.game.height + this.hitbox.height) {
      this.position.y = -this.hitbox.height;
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

    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(rotation * Math.PI / 180);
    context.lineWidth = 2;
    context.strokeStyle = '#fff';
    this.object.outline.draw(context);
    this.object.base.draw(context);
    if (this.frameCount > 4 && this.axis.y < 0) {
      this.object.flame.draw(context);
    }
    context.restore();

    this.frameCount++;
    this.frameCount %= 8;
  }
}
