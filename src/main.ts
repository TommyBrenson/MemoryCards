import App from "./scripts/App";
import MainGame from "./scripts/scenes/MainGame";
import EndGame from "./scripts/scenes/EndGame";


let app = new App({
    document: document.getElementById("container"),
});

global.app = app;

function startGame(): void {

    app.scene.add('MainGame', MainGame);
    app.scene.add('EndGame', EndGame);
    app.scene.start('MainGame');

}

export default startGame;