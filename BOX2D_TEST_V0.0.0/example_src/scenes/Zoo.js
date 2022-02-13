import { Scene } from '../Scene';
import * as samples from '../parts/samples'

class Zoo extends Scene {
  onInit() {
    Object.values(samples)
    .forEach(it => {
      this.addEntity(it)
    })
  }

  onDeInit() {

  }
}

export {
  Zoo,
}