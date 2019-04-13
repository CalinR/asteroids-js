import Vector2 from './Vector2';
import convertAngleToRadians from './helpers';

export default class GameObject {
  constructor(position = new Vector2(0, 0), rotation = 0, type = 'gameObject', game) {
    this.type = type;
    this.position = position;
    this._rotation = rotation;
    this.radians = convertAngleToRadians(rotation);
    this.game = game;
  }

  get rotation() {
    return this._rotation;
  }

  set rotation(rotation) {
    const clampedRotation = rotation % 360;
    this._rotation = clampedRotation;
    this.radians = convertAngleToRadians(clampedRotation);
  }

  remove() {
    if (this.game) {
      const index = this.game.gameObjects.indexOf(this);
      index > -1 && this.game.gameObjects.splice(index, 1);
    }
  }
}
