import Box2DFactory from 'box2d-wasm';
import { makeDebugDraw } from './debugDraw';

const PPM = 32;
const cameraOffsetMetres = {
  x: 0,
  y: 0
};

class Physics {
  constructor() {
    this.debug = false;
    this.stepCount = 0;
  }

  async init() {
    //window 对象表示当前窗口
    window.Box2D = await Box2DFactory();

    const gravity = new Box2D.b2Vec2(0, 10);
    this.world = new Box2D.b2World(gravity);
  }

  openDebug() {
    this.closeDebug();
    const canvas = document.createElement('canvas');
    canvas.id = 'debug-canvas';
    canvas.width = 640;
    canvas.height = 640;
    document.body.appendChild(canvas);
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    ctx.scale(PPM, PPM);
    const debugDraw = makeDebugDraw(ctx, PPM, Box2D);
    this.world.SetDebugDraw(debugDraw);
    this.debug = true;
  }

  closeDebug() {
    let canvas = document.getElementById('debug-canvas');
    if (canvas) {
      document.body.removeChild(canvas)
      this.canvas = null;
    }
    this.world.SetDebugDraw(undefined)
    this.debug = false;
  }

  addEntity(entityDef) {
    if (!entityDef.shape) {
      return;
    }

    const bd = new Box2D.b2BodyDef();
    switch (entityDef.pType) {
      case 'static': {
        bd.set_type(Box2D.b2_staticBody);
        break;
      }
      case 'dynamic': {
        bd.set_type(Box2D.b2_dynamicBody);
        break;
      }
      case 'kinematic': {
        bd.set_type(Box2D.b2_kinematicBody);
        break;
      }
      default: {
        bd.set_type(Box2D.b2_dynamicBody);
      }
    }
    const pos = new Box2D.b2Vec2(entityDef.x, entityDef.y)
    bd.set_position(pos);

    const fixtureDef = new Box2D.b2FixtureDef();
    fixtureDef.set_density(1.0);

    switch (entityDef.shape) {
      case 'edge': {
        const shape = new Box2D.b2EdgeShape();
        const { startPos, endPos } = entityDef;
        shape.SetTwoSided(new Box2D.b2Vec2(startPos.x, startPos.y),
          new Box2D.b2Vec2(endPos.x, endPos.y));

        fixtureDef.set_shape(shape)
        break;
      }
      case 'circle': {
        const shape = new Box2D.b2CircleShape();
        shape.set_m_radius(entityDef.radius);
        fixtureDef.set_shape(shape)

        break;
      }
      case 'box': {
        const shape = new Box2D.b2PolygonShape();
        const { width, height } = entityDef;
        shape.SetAsBox(width / 2, height / 2);
        fixtureDef.set_shape(shape)

        break;
      }
      case 'polygon': {
        const { vertices: verticesArray } = entityDef;
        const vertices = verticesArray.map(it => new Box2D.b2Vec2(it[0], it[1]));
        const shape = createPolygonShape(vertices);
        // const fixtureDef = new Box2D.b2FixtureDef();
        fixtureDef.set_shape(shape);
        // shape = fixtureDef;

        break;
      }
      default: {
        console.log(`unrecognized entity shape: ${entityDef.shape}`)
        return null;
      }
    }

    const body = this.world.CreateBody(bd)
    body.id = entityDef.id;
    body.CreateFixture(fixtureDef)
    // body.CreateFixture(shape, entityDef.density || 1.0)

    return body;
  }

  step(deltaTime, vIter, pIter) {
    const current = Date.now();
    this.world.Step(deltaTime, vIter, pIter)
    const stepCalcTime = (Date.now() - current);
    this.stepCount++;
    if (this.stepCount % 90 === 0) {
      console.log(`t: ${stepCalcTime}, n: ${this.world.GetBodyCount()}`)
    }
  }

  clear() {
    const gravity = new Box2D.b2Vec2(0, 10);
    this.world = new Box2D.b2World(gravity);
  }

  draw() {
    if (!this.canvas) {
      console.log("no valid canvas context")
      return;
    }

    const { canvas, world } = this;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    // ctx.scale(PPM, PPM);
    const { x, y } = cameraOffsetMetres;
    ctx.translate(x, y);
    ctx.lineWidth /= PPM;

    ctx.fillStyle = 'rgb(255,255,0)';
    world.DebugDraw();

    ctx.restore();
  };
}

function createPolygonShape(vertices) {
  var shape = new Box2D.b2PolygonShape();
  var buffer = Box2D._malloc(vertices.length * 8);
  var offset = 0;
  for (var i = 0; i < vertices.length; i++) {
    Box2D.HEAPF32[buffer + offset >> 2] = vertices[i].get_x();
    Box2D.HEAPF32[buffer + (offset + 4) >> 2] = vertices[i].get_y();
    offset += 8;
  }
  var ptr_wrapped = Box2D.wrapPointer(buffer, Box2D.b2Vec2);
  shape.Set(ptr_wrapped, vertices.length);
  return shape;
}

export {
  Physics,
  PPM,
}