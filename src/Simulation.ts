import Boid from "./Boid";
import Renderer from "./Renderer";
import Vector from "./Vector";

function randomRange(min:number, max:number) {
    return Math.random() * (max - min) + min;
}

// type CanvasContext = '2d'|'webgl'|'webgl2';
const colors = ["green", "blue", "red", "yellow", "orange", "purple", "pink", "brown", "black"];
function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}



export default class Simulation {
    boids: Boid[] = [];
    // updater: Updater;
    renderer: Renderer;

    constructor(context: CanvasRenderingContext2D, boidAmount: number = 1) {
        this.renderer = new Renderer(context);
        this.populate(boidAmount);
    }
    start() {
        this.frameLoop();
    }
    frameLoop() { 
        for (const boid of this.boids) {
            boid.updateNeighbors(this.boids);
            boid.keepInBounds(this.renderer.width, this.renderer.height);
            boid.align();
        }
        for (const boid of this.boids) {
            boid.update();
        }
        
        this.renderer.render();
        requestAnimationFrame(() => this.frameLoop());
    }
    addBoid(boid: Boid) {
        this.boids.push(boid);
        this.renderer.entities.push(boid);
    }
    populate(amount: number) {
        for (let i = 0; i < amount; i++) {
            const x = randomRange(-this.renderer.width / 2, this.renderer.width / 2);
            const y = randomRange(-this.renderer.height / 2, this.renderer.height / 2);
            const color = 'blue';
            const options = {
                wander: {
                    distance: 120,
                    circleRadius: 15,
                    angle: 0,
                    displacement: 0.1,
                }
            }
            const boid = new Boid(x, y, 3, 1, 200, color, options);
            this.addBoid(boid);
        }
    }
}

