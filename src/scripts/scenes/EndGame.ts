import Scene from './Scene';

export default class EndGame extends Scene {
    
    constructor(options?: any) {
        super();
        console.log("End scene.");
        
        // Delayed start of a new game

        setTimeout(() => {
            app.ticker.start(); 
            app.scene.start("MainGame") 
        }, 5000);
    }

    public update(): void {
        
    }


}