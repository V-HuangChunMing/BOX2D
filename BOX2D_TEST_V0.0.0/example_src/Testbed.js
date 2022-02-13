import { Pane } from 'tweakpane';
import { Graphics } from './Graphics';
import { Physics, PPM } from './Physics';
import { Zoo } from './scenes/Zoo';
import { Falling } from './scenes/Falling';

const sceneMap = new Map([
  ['zoo', Zoo],
  ['falling', Falling],
])

class Testbed {
  constructor() {
    this.graphics = undefined;
    this.physics = undefined;
  }

  async init() {
    this.testOptions = {
      scene: 'zoo',
      debugDraw: false,
      pause: false,
    };

    //tweakpane控件
    const pane = new Pane();

    //前两个参数是配置默认选项,后面
    pane.addInput(this.testOptions, 'scene', {
      options: Object.fromEntries(sceneMap)
    }).on('change', () => {
      this.onChangeScene();
    })

    pane.addInput(this.testOptions, 'debugDraw')
      .on('change', () => {
        this.onChangeDebug();
      })

    pane.addInput(this.testOptions, 'pause')
      .on('change', () => {
        this.onChangePause();
      })

    pane.addButton({
      title: 'restart',
    }).on('click', () => {
      this.onClickRestart();
    })

    this.physics = new Physics();
    await this.physics.init();

    if (this.testOptions.debugDraw) {
      this.physics.openDebug();
    } else {
      this.graphics = new Graphics();
    }

    // if (this.testOptions.debugDraw) {
    //   this.physics.openDebug();
    // } else { 
    //   this.graphics = new Graphics();
    // }
    const Scene = this.testOptions.scene;
    this.scene = new Scene({
      graphics: this.graphics,
      physics: this.physics,
    });

    this.scene.init();
    this.run();
  }

  run() {
    this.taskRun = setInterval(() => {
      this.physics.step(1 / 60, 5, 5);

      this.scene.map.forEach((node, body) => {
        // console.log(body)
        const pos = body.GetPosition();
        const angle = body.GetAngle();
        if (body.id === 'polygon') {
          // console.log(body.id, pos.get_x(), pos.get_y(), angle)
        }
        node.x = pos.get_x() * PPM;
        node.y = pos.get_y() * PPM;
        node.rotation = angle;
      })

      if (this.physics.debug) {
        this.physics.draw();
      } else {
        this.graphics.render();
      }
    }, 1000 / 60)
  }

  stop() {
    clearInterval(this.taskRun)
  }

  onChangeScene() {
    this.stop();
    this.scene.deInit();
    const Scene = this.testOptions.scene;
    this.scene = new Scene({
      graphics: this.graphics,
      physics: this.physics,
    })
    this.scene.init();
    if (!this.testOptions.pause) {
      this.run();
    }
  }

  onChangeDebug() {
    if (this.testOptions.debugDraw) {
      this.physics.openDebug();
    } else {
      this.physics.closeDebug();
    }
  }

  onChangePause() {
    if (this.testOptions.pause) {
      this.stop();
    } else {
      this.run();
    }
  }

  onClickRestart() {
    this.stop();
    this.scene.deInit();
    const Scene = this.testOptions.scene;
    this.scene = new Scene({
      graphics: this.graphics,
      physics: this.physics,
    })
    this.scene.init();
    if (!this.testOptions.pause) {
      this.run();
    }
  }
}

export {
  Testbed,
}