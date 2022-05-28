import { sound, filters } from '@pixi/sound';
import { Timer } from 'eventemitter3-timer';
import { Actions } from 'pixi-actions';
import * as px from 'pixi.js';

import Table from '../entities/Table';
import { textStyle } from '../helpers/constants';
import Scene from './Scene';

export default class MainGame extends Scene {

    private table?: Table;
    private timer?: Timer;
    private wrapper?: px.Container;

    constructor(options?: any) {
        super();
        
        console.log("Main scene.");
        
        this.initTimer();

        this.background = new px.Sprite(app.loader.resources.background.texture);
        app.stage.addChild(this.background);
        
        this.table = new Table();
        app.stage.addChild(this.table);
        
        // Initializing wrapper for displaying elapsed time
        this.wrapper = new px.Container();
        this.wrapper.position.set(3 * app.stage.width / 4 - 30, 20);
        this.wrapper.addChild(new px.Text("00 : 00", textStyle));
        app.stage.addChild(this.wrapper);

        sound.play("started", { volume: 0.2, filters: [new filters.ReverbFilter(1, 1)]});
        
        setTimeout(() => {
            this.timer.start();
            this.table.flipAllCards();
        }, 5000);


    }

    public initTimer() {
        this.timer = new Timer(1000);
        
        this.timer.loop = true;

        this.timer.on("repeat", (elapsed, repeat) => {
            this.wrapper.removeChildren();
            this.wrapper.addChild(new px.Text(`${String(Math.floor(repeat / 60)).padStart(2, "0")} : ${String(repeat % 60).padStart(2, "0")}`, new px.TextStyle(textStyle)));
        });
    }

    public update(): void {
        let solved = this.table.isSolved();
        
        if (solved) {
            this.timer.stop();
            this.timer.remove();

            app.ticker.stop();

            sound.play("ended", { volume: 0.15 });
            
            setTimeout(() => {
                app.scene.start("EndGame");
            }, 5000);
        }

        else {

            let pair = this.table.activePair;    
        
            if (!pair.includes(undefined)) {
        
                if (pair[0].textures[0] == pair[1].textures[0] && pair[0] !== pair[1]) {

                    pair.forEach((card) => {
                        card.interactive = false; 
                        card.isPaired = true;
                    });
        
                }
        
                else {
                    Actions.parallel(
                        Actions.runFunc(() => {
                            pair[1].isPaired = false;
                            pair[1].flip();
                            pair[1].interactive = true;
                        }),
                        Actions.runFunc(() => {
                            pair[0].isPaired = false;
                            pair[0].flip();
                            pair[0].interactive = true;
                        })
                    ).play();
                }
                
                this.table.activePair = Array(2);
            
            }
            
        }

    }

}