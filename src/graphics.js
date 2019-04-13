import Vector2 from './Vector2';
import Polygon from './Polygon';

export const playerGraphic = {
  outline: new Polygon([
    new Vector2(30, -20),
    new Vector2(-30, 0),
    new Vector2(30, 20),
  ]),
  base: new Polygon([
    new Vector2(20, 16),
    new Vector2(20, -16),
  ]),
  flame: new Polygon([
    new Vector2(20, -10),
    new Vector2(40, 0),
    new Vector2(20, 10),
  ]),
};

export const asteroidGraphics = {
  1: [
    new Polygon([
      new Vector2(0, -30),
      new Vector2(60, -90),
      new Vector2(90, -30),
      new Vector2(60, 0),
      new Vector2(90, 60),
      new Vector2(30, 90),
      new Vector2(-30, 90),
      new Vector2(-90, 30),
      new Vector2(-90, -30),
      new Vector2(-20, -90),
      new Vector2(0, -30),
    ]),
  ],
  2: [
    new Polygon([
      new Vector2(0, -1),
      new Vector2(2, -3),
      new Vector2(3, -1),
      new Vector2(2, 0),
      new Vector2(3, 2),
      new Vector2(1, 3),
      new Vector2(-1, 3),
      new Vector2(-3, 1),
      new Vector2(-3, -1),
      new Vector2(-1, -3),
      new Vector2(0, -1),
    ]),
  ],
  3: [
    new Polygon([
      new Vector2(0, -1),
      new Vector2(2, -3),
      new Vector2(3, -1),
      new Vector2(2, 0),
      new Vector2(3, 2),
      new Vector2(1, 3),
      new Vector2(-1, 3),
      new Vector2(-3, 1),
      new Vector2(-3, -1),
      new Vector2(-1, -3),
      new Vector2(0, -1),
    ]),
  ],
};

export const bullet = new Polygon([
  new Vector2(-4, 0),
  new Vector2(4, 0),
]);
