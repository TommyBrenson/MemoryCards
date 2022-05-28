import * as px from 'pixi.js';
import { Actions, Interpolations } from 'pixi-actions';
import { DropShadowFilter } from 'pixi-filters';
import { sound } from '@pixi/sound';

export default class Card extends px.AnimatedSprite {

    public isFlipped: boolean = true;
    public isPaired: boolean = false;
    
    constructor(textureFace: px.Texture, textureBack: px.Texture) {
        super([textureFace, textureBack]);
        
        this.interactive = true;
        this.buttonMode = true;

        this.width = this.width * .23;
        this.height = this.height * .23;

        this.filters = [new DropShadowFilter({ blur: 0.1, distance: 15, alpha: 0.5 })];

        this.loop = false;
    }

    public flip(): void {
        let scale = this.scale;
        Actions.sequence(
            Actions.scaleTo(this, 0, scale.y, .30, Interpolations.smooth),
            Actions.runFunc(() => {
                
                sound.play("flip", { singleInstance: true, volume: 0.2 });
                if (!this.isFlipped) {
                    this.gotoAndStop(0);
                }
                else {
                    this.gotoAndStop(1);
                }
            }),
            Actions.scaleTo(this, .23, scale.y, .30, Interpolations.smooth),
            Actions.runFunc(() => this.isFlipped = !this.isFlipped),
            ).play();
    }
    



}