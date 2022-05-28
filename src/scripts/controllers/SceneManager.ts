import * as px from 'pixi.js';


export default class SceneManager {
    [name: string]: any;
    private stage?: px.Container;
    private current?: any;
    
    constructor(stage?: px.Container) {
        this.stage = stage;
        this.current = null;
    }

    public add(name?: string, scene?: px.Container): void {
        if (name in this) {
            console.log(`Scene ${name} has already been added!`);
            return ;
        }

        this[name] = scene;
    }

    public start(name?: string, options?: any): void {
        
        if (!(name in this)) {
            console.log(`Scene ${name} hasn't been found!`);
            return ;
         }

        this.stage.removeChildren();
        this.current = new this[name](options);
        this.stage.addChild(this.current);

    }

    public update(delta?: Function) {
        global.app.resize();

        if (!('update' in this.current)) {
            return ;
        }
        
        this.current.update(delta);
    }
}