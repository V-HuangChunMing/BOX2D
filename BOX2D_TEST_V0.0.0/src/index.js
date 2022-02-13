/**
 * @Author: V.Ming
 * @Date: 2022-01-26 14:51:49
 * @LastEditTime: 2022-02-11 14:21:33
 * @LastEditors: V.Ming
 * @Description: public entrance with display box and control pano,该项目坐标原点在画面
 * @FilePath: /Flipybird_And_TestBox2d/src/index.js
 */

import { ControlBox } from './ControlBox'
import { Flipybird } from "./Flipybird"
import { Testbed } from "./Testbed"
import { Stage } from './Stage'
import { Graphics } from 'pixi.js'
import { Box2dworld } from './Box2dworld'
import Box2DFactory from 'box2d-wasm';



function init() {
    const controlBox = new ControlBox({
        displayBox: 'testbed',
        debugDraw: false,
        pause: false,
        restart: undefined,
        //'testbed': [['testbed', Testbed], ['flipybird', Flipybird],],
        'testbed': [['testbed', 'testbed'], ['flipybird', 'flipybird'],],
    })


    controlBox.init();
    testbed_main().then(result => controlBox.sence = result);


}

init();








async function testbed_main() {
    let stage = new Stage();
    let box2d = new Box2dworld();
    await box2d.init();
    let testbed = new Testbed(stage, box2d);
    testbed.init();
    testbed.addEntity(['box', 'circle', 'ground', 'polygon']);
    testbed.addEntity(['box'], 1, 'greenBox');
    for (let i = 0; i < 3; i++) {
        testbed.addEntity(['edge'], i, 'edge');
        testbed.addEntity(['polygon']);;
    }
    testbed.addEntity(['polygon']);
    //stage.updateRender();

    testbed.run();
    testbed.creatmouseJiont();





    return testbed;
}



export {
    testbed_main,
}