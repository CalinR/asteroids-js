export default class Polygon {
  constructor(points = []) {
    this.points = points;
  }

  draw(context) {
    context.beginPath();
    this.points.forEach((point, i) => {
      if (i === 0) {
        context.moveTo(point.x, point.y);
      } else {
        context.lineTo(point.x, point.y);
      }
    });
    context.stroke();
    context.closePath();
  }
}
