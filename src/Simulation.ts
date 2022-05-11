import Renderer from "./Renderer";

export default class Simulation {
    // boids: Boid[];
    // updater: Updater;
    renderer: Renderer;

    constructor(context: CanvasRenderingContext2D) {
        this.renderer = new Renderer(context);
    }

    start() {
        this.frameLoop();
    }
    frameLoop() { 
        this.renderer.render();
        requestAnimationFrame(() => this.frameLoop());
    }
}

