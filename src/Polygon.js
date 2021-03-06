import Vector2 from './Vector2';

export default class Polygon {
  constructor(points = []) {
    this.points = points;
  }

  draw(context, origin = new Vector2(0, 0), radians = 0) {
    const rotatedPoly = this.getRotatedPoints(radians);

    context.beginPath();
    rotatedPoly.points.forEach((point, i) => {
      if (i === 0) {
        context.moveTo(point.x + origin.x, point.y + origin.y);
      } else {
        context.lineTo(point.x + origin.x, point.y + origin.y);
      }
    });
    context.stroke();
    context.closePath();
  }

  getRotatedPoints(radians) {
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    return new Polygon(this.points.map((point) => {
      const x = (cos * point.x) - (sin * point.y);
      const y = (sin * point.x) + (cos * point.y);
      return { x, y };
    }));
  }

  get width() {
    const xMin = this.points.reduce((min, p) => (p.x < min ? p.x : min), Infinity);
    const xMax = this.points.reduce((max, p) => (p.x > max ? p.x : max), -Infinity);

    return xMax - xMin;
  }

  get height() {
    const yMin = this.points.reduce((min, p) => (p.y < min ? p.y : min), Infinity);
    const yMax = this.points.reduce((max, p) => (p.y > max ? p.y : max), -Infinity);

    return yMax - yMin;
  }

  static pointWithinPolygon(point = new Vector2(0, 0), poly = new Polygon(), polyPosition = new Vector2(0, 0)) {
    let inside = false;
    const p = poly.points;

    for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
      const xi = p[i].x + polyPosition.x;
      const yi = p[i].y + polyPosition.y;
      const xj = p[j].x + polyPosition.x;
      const yj = p[j].y + polyPosition.y;
      // eslint-disable-next-line no-mixed-operators
      const intersect = ((yi > point.y) !== (yj > point.y)) && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }

    return inside;
  }
}
