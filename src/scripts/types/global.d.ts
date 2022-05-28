import App from "../App";
import * as pixi from "pixi.js";

declare global {
    var app: App;
    
    interface Resizable {
        resize(): void;
    }    
}




export {};