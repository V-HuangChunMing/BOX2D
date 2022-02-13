/**
 * @Author: V.Ming
 * @Date: 2022-01-27 20:41:14
 * @LastEditTime: 2022-02-07 16:56:59
 * @LastEditors: V.Ming
 * @Description:
 * @FilePath: /Flipybird_And_TestBox2d/src/Box2dworld.js
 */
import Box2DFactory from 'box2d-wasm';
import { CompressedTextureLoader } from 'pixi.js';
//import { makeDebugDraw } from './debugDraw';

class Box2dworld {
    constructor() {
        this.stepCount = 0;
        this.world = undefined;

    }

    async init() {
        //此处Box2dFactory必须要先运行才能调用Box2D.b2Vec2
        //window 对象表示当前窗口
        window.Box2D = await Box2DFactory();

        const gravity = new Box2D.b2Vec2(0, 10);
        this.world = new Box2D.b2World(gravity);

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

    getworld() {
        return this.world;
    }



}
export {
    Box2dworld,
}