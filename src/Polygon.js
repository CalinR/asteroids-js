import Vector2 from './Vector2';

export default class Polygon {
  constructor(points = []) {
    this.points = points;
  }

  draw(context, origin = new Vector2(0, 0), radians = 0) {
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    context.beginPath();
    this.points.forEach((point, i) => {
      const x = (cos * point.x) - (sin * point.y);
      const y = (sin * point.x) + (cos * point.y);

      if (i === 0) {
        context.moveTo(x + origin.x, y + origin.y);
      } else {
        context.lineTo(x + origin.x, y + origin.y);
      }
    });
    context.stroke();
    context.closePath();
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
