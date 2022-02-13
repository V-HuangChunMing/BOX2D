/**
 * @Author: V.Ming
 * @Date: 2022-01-27 13:48:43
 * @LastEditTime: 2022-01-27 22:13:24
 * @LastEditors: V.Ming
 * @Description: 
 * @FilePath: /Flipybird_And_TestBox2d/src/Stage.js
 */

import * as PIXI from "pixi.js"
import { Testbed } from "./Testbed"
//import 

class Stage {
    constructor({
        backgroundColor = 0x292929,
        width = 640,
        height = 640,
        antialias = true,
        resolution = 1,
        autoResize = true,
        zIndex = -1,
        margin = "0 auto"
    } = {}
    ) {
        //设置渲染器
        this.renderer = new PIXI.Renderer({
            backgroundColor: backgroundColor,
            width: width,
            height: height,
            antialias: antialias,
            resolution: resolution,
            autoResize: autoResize,
        });
        this.renderer.view.style.display = "block";
        this.renderer.view.width = width;
        this.renderer.view.height = height;
        this.renderer.view.style.zIndex = zIndex;//层叠顺序
        this.renderer.view.style.margin = margin;
        this.renderer.autoDensity = true;
        //this.resizeTo = window;//

        //设置pixi容器
        this.container = new PIXI.Container();

        document.body.appendChild(this.renderer.view);

        this.renderer.render(this.container)//使用这个命令在图上画画(更新页面)

    }


    getcontainer() {
        return this.container;
    }

    updateRender() {
        this.renderer.render(this.container);
    }

}


export {
    Stage,
}