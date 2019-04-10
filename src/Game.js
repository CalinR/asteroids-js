import Player from './Player';

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
    this.player = new Player(this.width / 2, this.height / 2, this);
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
