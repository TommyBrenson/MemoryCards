import * as px from 'pixi.js';
import { runInThisContext } from 'vm';
import startGame from '../main';
import SceneManager from './controllers/SceneManager';
import { Actions } from 'pixi-actions';
import { Timer } from 'eventemitter3-timer';

export default class App extends px.Application {

    public document?: HTMLElement;
    public renderer: px.Renderer;
    public stage: px.Container;
    public ticker: px.Ticker;
    public loader: px.Loader;

    public scene?: any;

    constructor(options: any = {}) {
        super({ resizeTo: window, antialias: true });
        this.document = options.document || document.body;
        
        this.renderer = new px.Renderer();
        this.stage = new px.Container();
        this.ticker = new px.Ticker();
        this.loader = new px.Loader();
        
        this.scene = new SceneManager(this.stage);

        this.loadResources();
    }

    public init(): void {
        this.resize();
        
        this.ticker.add(this.render.bind(this), px.UPDATE_PRIORITY.LOW);
        this.ticker.add((delta) => this.scene.update(delta));
        this.ticker.add((delta) => Actions.tick(delta / 60));
        this.ticker.add(() => Timer.timerManager.update(this.ticker.elapsedMS), document)

        this.ticker.start();

        this.document.appendChild(this.view);
        startGame();
    }


    public render(): void {
        this.renderer.render(this.stage);
    }

    public resize(): void {
        const { clientWidth: width, clientHeight: height } = this.document;
        this.stage.position.set(width / 2, height / 2);
        this.renderer.resize(width, height);
    }

    public loadResources(): void {
        this.loader
            .add("background", "assets/images/background.png")
            .add("cards", "assets/images/cards_deck.json")
            .add("flip", "assets/sounds/card_flip.mp3")
            .add("started", "assets/sounds/game_started.wav")
            .add("ended", "assets/sounds/game_ended.wav")
            .load(this.init.bind(this));
    }

}
    