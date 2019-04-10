export default class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  multiply(multiple) {
    this.x *= multiple;
    this.y *= multiple;
  }
}
