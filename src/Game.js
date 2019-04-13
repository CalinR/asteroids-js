import Player from './Player';
import Asteroid from './Asteroid';
import Vector2 from './Vector2';

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.lastUpdate = Date.now();
    this.gameObjects = [];
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  addObject(object) {
    this.gameObjects.push(object);
  }

  init() {
    this.player = new Player(new Vector2(this.width / 2, this.height / 2), 90, this);
    const asteroid = new Asteroid(new Vector2(100, 100), 120, 100, 20, 1, this);

    this.addObject(asteroid);
    window.requestAnimationFrame(() => this.update());
  }

  update() {
    const now = Date.now();
    const deltaTime = (now - this.lastUpdate) / 1000.0;
    this.lastUpdate = now;

    this.player.update(deltaTime);
    this.render(deltaTime);
    this.gameObjects.forEach((gameObject) => {
      gameObject.update(deltaTime, this.gameObjects);
    });
    window.requestAnimationFrame(() => this.update());
  }

  render() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.player.draw(this.context);
    this.gameObjects.forEach((gameObject) => {
      gameObject.draw(this.context);
    });
  }
}
