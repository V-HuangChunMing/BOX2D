class Scene {
  constructor({ graphics, physics } = {}) {
    this.graphics = graphics;
    this.physics = physics;
    this.map = new Map();
  }

  init() {
    if (this.onInit) {
      this.onInit();
    }
  }

  deInit() {
    if (this.onDeInit) {
      this.onDeInit();
    }
    this.graphics.clear();
    this.physics.clear();
  }

  addEntity(entityDef) {
    const body = this.physics.addEntity(entityDef);
    const node = this.graphics.addEntity(entityDef);
    this.map.set(body, node)
  }
}

export {
  Scene
}