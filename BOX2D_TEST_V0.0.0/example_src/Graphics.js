import * as PIXI from "pixi.js";
import { PPM } from './Physics';

class Graphics {
  constructor() {
    this.renderer = new PIXI.Renderer({
      backgroundColor: 0x292929,
      width: 640,
      height: 630,
      antialias: true,
      resolution: 1,
      autoResize: true
    })

    this.renderer.view.style.position = "absolute";
    this.renderer.view.style.display = "block";
    this.renderer.view.width = 640;
    this.renderer.view.height = 640;
    this.renderer.view.style.zIndex = -1;
    this.renderer.autoDensity = true;
    this.resizeTo = window;

    document.body.appendChild(this.renderer.view);

    this.scene = new PIXI.Container();
  }

  addEntity(entityDef) {
    let node = null;

    switch(entityDef.gType) {
      case 'line': {
        node = new PIXI.Graphics();
        node.lineStyle({width: 1, color: 0xFFFFFF, alpha: 1});
        node.moveTo(entityDef.startPos.x * PPM, entityDef.startPos.y * PPM);
        node.lineTo(entityDef.endPos.x * PPM, entityDef.endPos.y * PPM);
        node.x = entityDef.x * PPM;
        node.y = entityDef.y * PPM;

        break;
      }
      case 'circle': {
        const { radius, x, y, fill } = entityDef;

        node = new PIXI.Graphics();
        node.beginFill(fill);
        node.drawCircle(0, 0, radius * PPM);
        node.endFill();

        node.x = x * PPM;
        node.y = y * PPM;

        break;
      }
      case 'box': {
        const { width, height, x, y, fill } = entityDef;

        node = new PIXI.Graphics();
        // node.lineStyle({width: 1, color: 0xFF3300, alpha: 1});
        node.beginFill(fill);
        // node.drawRect(0, 0, width * PPM, height * PPM);
        node.drawRect(-(width / 2) * PPM, -(height / 2) * PPM, width * PPM, height * PPM);
        node.endFill();
        node.x = x * PPM;
        node.y = y * PPM;

        break;
      }
      case 'polygon': {
        const { vertices, fill, x, y } = entityDef;

        node = new PIXI.Graphics();
        node.beginFill(fill);
        node.drawPolygon(vertices.flat().map(it => it * PPM))
        node.x = x * PPM;
        node.y = y * PPM;

        break;
      }
      default: {
        console.log(`unrecognized entity graphic: ${entityDef.graphic}`)
        return null;
      }
    }

    this.scene.addChild(node);
    return node;
  }

  render() {
    this.renderer.render(this.scene)
  }

  clear() {
    this.scene = new PIXI.Container();
  }
}

export {
  Graphics,
}