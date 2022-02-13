import { Scene } from '../Scene';
import * as samples from '../parts/samples';

class Falling extends Scene {
  constructor(options) {
    super(options);
    this.count = 0;
  }

  onInit() {
    // console.log(">>> FallingScene onInit")
    {
      const entityDef = {
        ...samples.edge,
        id: 'bottom',
        startPos: { x: 0, y: 0 },
        endPos: { x: 18, y: 0 },
        x: 1,
        y: 19,
      }

      this.addEntity(entityDef)
    }

    {
      const entityDef = {
        ...samples.edge,
        startPos: { x: 0, y: 0 },
        endPos: { x: 0, y: 18 },
        x: 1,
        y: 1,
      }

      this.addEntity(entityDef);
    }

    {
      const entityDef = {
        ...samples.edge,
        startPos: { x: 0, y: 0 },
        endPos: { x: 0, y: 18 },
        x: 19,
        y: 1,
      }

      this.addEntity(entityDef);
    }

    this.taskGen = setInterval(() => {
      if (this.count >= 2000) {
        clearInterval(this.taskGen)
        return;
      }
      // const entityDef = {
      //   ...samples.circle,
      //   id: `circle_${this.count}`,
      //   pType: 'dynamic',
      //   radius: 0.2,
      //   fill: 0xff0000,
      //   x: 5 + 10 * Math.random(),
      //   y: 2,
      // }
      const entityDef = {
        ...samples.box,
        id: `box_${this.count}`,
        pType: 'dynamic',
        width: 0.2,
        height: 0.2,
        fill: 0xff0000,
        x: 5 + 10 * Math.random(),
        y: 2,
      }
      this.addEntity(entityDef)
      this.count++;
    }, 1000/ 200)
  }

  onDeInit() {
    // console.log(">>> FallingScene onDeInit")
    clearInterval(this.taskGen)
  }

}

export {
  Falling,
}