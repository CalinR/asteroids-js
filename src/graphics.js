import Vector2 from './Vector2';
import Polygon from './Polygon';

export const playerGraphic = {
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
