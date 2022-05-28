import * as px from 'pixi.js';

// Excess class for game loop management

export default class UpdateManager {
    private updates: {name: string, callback: Function}[];
    
    constructor() {
        this.updates = [];
    }
    
    public add(name: string, callback: Function) {
        this.updates.push({ name, callback })
    }
    
    public remove() {
            
    }

    public checkName() {

    }

    public checkCallback() {

    }
}