/**
 * @Author: V.Ming
 * @Date: 2022-01-26 15:19:45
 * @LastEditTime: 2022-02-11 10:52:24
 * @LastEditors: V.Ming
 * @Description: 
 * @FilePath: /Flipybird_And_TestBox2d/src/Testbed.js
 */
import { Stage } from "./Stage";
import * as PIXI from "pixi.js"
import Box2DFactory from 'box2d-wasm';
// import { makeDebugDraw } from './debugDraw';


const cameraOffsetMetres = {
    x: 0,
    y: 0
};
const PPM = 32;
const box = [
    {
        name: "ground",
        id: 'ground',
        shape: 'box',
        pType: 'static',
        width: 18,
        height: 0.5,
        gType: 'box',
        fill: 0x999999,
        x: 10,
        y: 18,
    },
    {
        name: "box",
        id: 'box',
        shape: 'box',
        pType: 'dynamic',
        width: 1,
        height: 1,
        gType: 'box',
        fill: 0x00ff00,
        x: 10,
        y: 6,
    }
]

const edge = [{
    id: 'edge',
    shape: 'edge',
    pType: 'static',
    startPos: { x: 0, y: 0 },
    endPos: { x: 18, y: 0 },
    gType: 'line',
    x: 1,
    y: 1,//line x,y means start pos x,y
}, {
    id: 'edge',
    shape: 'edge',
    pType: 'static',
    startPos: { x: 0, y: 0 },
    endPos: { x: 0, y: 17.25 },
    gType: 'line',
    x: 1,
    y: 1,
}, {
    id: 'edge',
    shape: 'edge',
    pType: 'static',
    startPos: { x: 0, y: 0 },
    endPos: { x: 0, y: 17.25 },
    gType: 'line',
    x: 19,
    y: 1,
},
]

const circle = [{
    id: 'circle',
    shape: 'circle',
    pType: 'dynamic',
    radius: 1,
    gType: 'circle',
    fill: 0xff0000,
    x: 9,
    y: 2,
},
]



const polygon = [{
    id: 'polygon',
    shape: 'polygon',
    pType: 'dynamic',
    gType: 'polygon',
    vertices: [
        [0, 0],
        [1, 0],
        [1, 2],
        [0, 1],
    ],
    fill: 0x0000ff,
    x: 5,
    y: 2,
},]

class Testbed {
    constructor(stage = {}, box2d = {}) {
        this.stage = stage;
        this.box2d = box2d
        this.StageContainer = stage.getcontainer();
        this.Box2dworld = box2d.getworld();
        this.map = new Map();
        this.node = null;//用于渲染器
        this.bd = null; //用于物理引擎
        this.body = null;
        this.taskRun = undefined;



    }

    async init() {
        //window 对象表示当前窗口
        window.Box2D = await Box2DFactory();
    }


    addEntity(entitylist = [], serial = 0, describe = {}) {
        //只能创建一样多个不同物体,不能改变物体的属性  entitylist里面是物体的类型
        //之后改进的话可以是同一类的不同物体

        for (let item in entitylist) {
            //eval("currentTest = new " + v + "();");\
            //渲染器
            console.log("this.#" + entitylist[item] + "creator(" + serial + ");")
            eval("this.#" + entitylist[item] + "creator(" + serial + ");");
            this.StageContainer.addChild(this.node);
        }
    }

    run() {
        //重复运行一个函数
        this.taskRun = setInterval(() => {
            /* void b2World::Step(float timeStep, int32 velocityIterations,int32 positionIterations )	 
            timeStep: the amount of time to simulate, this should not vary.
            velocityIterations: for the velocity constraint solver.
            positionIterations: for the position constraint solver.
            */
            this.box2d.step(1 / 60, 5, 5);

            this.map.forEach((body, node) => {
                //console.log(node);
                const pos = body.GetPosition();
                const angle = body.GetAngle();
                if (body.id === 'box') {
                    //console.log(body.id, pos.get_x(), pos.get_y(), angle)
                    // console.log("node.x" + node.x + "pos" + pos.get_x());
                    // console.log("node.y" + node.y + "pos" + pos.get_y());
                }

                node.x = pos.get_x() * PPM;
                node.y = pos.get_y() * PPM;
                node.rotation = angle;
            })

            if (this.debug) {
                this.draw();
            } else {
                this.stage.updateRender()
            }
        }, 1000 / 60)
    }

    stop() {
        clearInterval(this.taskRun);
    }


    openDebug() {

    }

    closeDebug() {

    }

    draw() {

    }




    deinit() {
        this.StageContainer = new PIXI.Container();
        this.stage.container = this.StageContainer;
        const gravity = new Box2D.b2Vec2(0, 10);
        this.box2d.world = new Box2D.b2World(gravity);
        this.Box2dworld = this.box2d.world;
        this.map = new Map();
        this.stage.updateRender();
    }








    #boxcreator(serial = 0) {

        //提取成员信息
        const { width, height, x, y, fill, pType, id } = box[serial];


        //渲染器部分 创建node
        this.node = new PIXI.Graphics();
        // this.node.lineStyle({width: 1, color: 0xFF3300, alpha: 1});
        this.node.beginFill(fill);
        // this.node.drawRect(0, 0, width * PPM, height * PPM);
        this.node.drawRect(-(width / 2) * PPM, -(height / 2) * PPM, width * PPM, height * PPM);
        this.node.endFill();
        this.node.x = x * PPM;
        this.node.y = y * PPM;


        //物理引起部分创建实体  
        this.bd = new Box2D.b2BodyDef();
        eval(" this.bd.set_type(Box2D.b2_" + pType + "Body);");//this.bd.set_type(Box2D.b2_pType+Body);设置bd的物理属性
        this.bd.set_position(new Box2D.b2Vec2(x, y));//const pos = new Box2D.b2Vec2(x, y)
        const fixtureDef = new Box2D.b2FixtureDef();
        fixtureDef.set_density(1.0);
        //Shape的话需要调用不同的函数此处是boxcreator
        const shape = new Box2D.b2PolygonShape();
        shape.SetAsBox(width / 2, height / 2);
        fixtureDef.set_shape(shape);
        this.body = this.Box2dworld.CreateBody(this.bd);
        this.body.id = id;
        this.body.CreateFixture(fixtureDef)

        this.map.set(this.node, this.body);//把得到的node和body联系起来

    }

    #edgecreator(serial = 0) {
        const { startPos, endPos, x, y, fill, pType, id } = edge[serial];

        //渲染器部分 /**/标识出公共部分
        /*  */this.node = new PIXI.Graphics();
        this.node.lineStyle({ width: 1, color: 0xFFFFFF, alpha: 1 });
        this.node.moveTo(startPos.x * PPM, startPos.y * PPM);
        this.node.lineTo(endPos.x * PPM, endPos.y * PPM);
        /*  */this.node.x = x * PPM;
        /*  */this.node.y = y * PPM;

        //物理引起部分创建实体  
        /*  */this.bd = new Box2D.b2BodyDef();
        /*  */eval(" this.bd.set_type(Box2D.b2_" + pType + "Body);");
        /*  */this.bd.set_position(new Box2D.b2Vec2(x, y));
        /*  */const fixtureDef = new Box2D.b2FixtureDef();
        /*  */fixtureDef.set_density(1.0);
        const shape = new Box2D.b2EdgeShape();
        shape.SetTwoSided(new Box2D.b2Vec2(startPos.x, startPos.y),
            new Box2D.b2Vec2(endPos.x, endPos.y));
        fixtureDef.set_shape(shape)
        /*  */this.body = this.Box2dworld.CreateBody(this.bd);
        /*  */this.body.id = id;
        /*  */this.body.CreateFixture(fixtureDef)

        /*  */this.map.set(this.node, this.body);
    }

    #circlecreator(serial = 0) {
        const { radius, x, y, fill, pType, id } = circle[serial];

        //渲染器部分 /**/标识出公共部分
        /*  */this.node = new PIXI.Graphics();
        this.node.beginFill(fill);
        this.node.drawCircle(0, 0, radius * PPM);
        this.node.endFill();
        /*  */this.node.x = x * PPM;
        /*  */this.node.y = y * PPM;

        //物理引起部分创建实体  
        /*  */this.bd = new Box2D.b2BodyDef();
        /*  */eval(" this.bd.set_type(Box2D.b2_" + pType + "Body);");
        /*  */this.bd.set_position(new Box2D.b2Vec2(x, y));
        /*  */const fixtureDef = new Box2D.b2FixtureDef();
        /*  */fixtureDef.set_density(1.0);
        const shape = new Box2D.b2CircleShape();
        shape.set_m_radius(radius + 2);
        fixtureDef.set_shape(shape);
        /*  */this.body = this.Box2dworld.CreateBody(this.bd);
        /*  */this.body.id = id;
        /*  */this.body.CreateFixture(fixtureDef);



        // const fixtureDef2 = new Box2D.b2FixtureDef();
        // fixtureDef2.set_density(1.0);
        // const shape2 = new Box2D.b2CircleShape();
        // shape2.set_m_radius(radius);
        // fixtureDef2.set_shape(shape2);
        // fixtureDef2.m_p = new Box2D.b2Vec2(x, y + 4);
        // this.body.CreateFixture(fixtureDef2);



        /*  */this.map.set(this.node, this.body);

    }

    #groundcreator(serial = 0) {

    }

    #polygoncreator(serial = 0) {
        const { vertices: verticesArray, x, y, fill, pType, id } = polygon[serial];

        //渲染器部分 /**/标识出公共部分
        /*  */this.node = new PIXI.Graphics();
        this.node.beginFill(fill);
        this.node.drawPolygon(verticesArray.flat().map(it => it * PPM));
        /*  */this.node.x = x * PPM;
        /*  */this.node.y = y * PPM;

        //物理引起部分创建实体  
        /*  */this.bd = new Box2D.b2BodyDef();
        /*  */eval(" this.bd.set_type(Box2D.b2_" + pType + "Body);");
        /*  */this.bd.set_position(new Box2D.b2Vec2(x, y));
        /*  */const fixtureDef = new Box2D.b2FixtureDef();
        /*  */fixtureDef.set_density(1.0);
        const vertices = verticesArray.map(it => new Box2D.b2Vec2(it[0], it[1]));
        const shape = createPolygonShape(vertices);
        fixtureDef.set_shape(shape);
        fixtureDef.set_restitution(1);
        //fixtureDef.set_filter(true);
        fixtureDef.set_friction(0);
        /*  */this.body = this.Box2dworld.CreateBody(this.bd);
        /*  */this.body.id = id;
        /*  */this.body.CreateFixture(fixtureDef)

        /*  */this.map.set(this.node, this.body);

    }

    creatmouseJiont() {
        mousejiontDef = new Box2D.b2MouseJointDef();
        mousejiontDef.bodyA = this.world.crea
    }




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
    Testbed,
}

