/**
 * @Author: V.Ming
 * @Date: 2022-01-26 19:28:04
 * @LastEditTime: 2022-02-11 10:48:19
 * @LastEditors: V.Ming
 * @Description: 
 * @FilePath: /Flipybird_And_TestBox2d/src/ControlBox.js
 */

import { Pane } from "tweakpane";
import { Flipybird } from "./Flipybird"
import { Testbed } from "./Testbed"
import { testbed_main } from "./index"

class ControlBox {

    constructor(param = {}) {
        this.controlBox_param = param;
        this.pane = new Pane()
        this.sence = undefined;

    }
    /******* 
     * @description: 
     * @param {*} this.pane:pane object,
     * @return {*}
     */
    init() {
        for (let item in this.controlBox_param) {
            //if (typeof (this.controlBox_param[item]) === 'string') continue;
            console.log("creating this.controlBox_param " + item.toString());
            switch (this.controlBox_param[item]) {
                case false:
                case true:
                    this.pane.addInput(this.controlBox_param, item.toString()).on('change', () => {
                        this.#CallBack(item.toString());
                    })
                    break;
                case undefined:
                    this.pane.addButton({
                        title: item.toString(),
                    }).on('click', () => {
                        this.#CallBack(item.toString());
                    })
                    break;
                default:
                    if (typeof (this.controlBox_param[item]) === 'string') {
                        this.pane.addInput(this.controlBox_param, item.toString(), {
                            options: Object.fromEntries(new Map(this.controlBox_param[this.controlBox_param[item]]))
                        }).on('change', () => {
                            this.#CallBack(item.toString());
                        })
                    } else {
                        console.log("other item");
                        break;
                    }
            }
        }
    }


    #CallBack(item) {
        // displayBox: 'testbed',
        // debugDraw: false,
        // pause: false,
        // restart: undefined,
        switch (item) {
            case 'displayBox':
                this.#displayBox_CallBack();
                break;
            case 'debugDraw':
                this.#debugDraw_CallBack();
                break;
            case 'pause':
                this.#pause_CallBack();
                break;
            case 'restart':
                this.#restart_CallBack();
                break;
            default:
                console.log("controlBoxCallBackfuc error")
        }
    }


    #displayBox_CallBack() {
        this.sence.stop();
        this.sence.deinit();
        console.log(this.controlBox_param.displayBox)
        switch (this.controlBox_param.displayBox) {
            case 'testbed':
                testbed_main();
                break;
            case 'fliypybird':
                console.log(this.controlBox_param.displayBox)
                //filypy_main();
                break;
            default:

        }
    }

    #debugDraw_CallBack() {
        if (this.controlBox_param.debugDraw) {
            this.sence.openDebug();
        } else {
            this.sence.closeDebug();
        }
    }

    #pause_CallBack() {
        //console.log(this.sence);
        if (this.controlBox_param.pause) {
            this.sence.stop();
            //this.sence.deinit();
        } else {
            this.sence.run();
        }
    }

    #restart_CallBack() {
        this.sence.stop();
        this.sence.deinit();
        this.sence.addEntity(['box', 'circle', 'ground', 'polygon']);
        this.sence.addEntity(['box'], 1, 'greenBox');
        for (let i = 0; i < 3; i++) {
            this.sence.addEntity(['edge'], i, 'edge');
        }
        this.sence.run();

    }




}

export {
    ControlBox,
}