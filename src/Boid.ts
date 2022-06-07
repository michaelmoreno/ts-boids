import Vector from "./Vector";
import BoidGraphics from "./BoidGraphics";


function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function randomFloat(min: number, max: number) {
    return Math.random() * (max - min) + min;
}


export default class Boid {
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    maxSpeed: number;
    maxForce: number;
    radius: number;
    neighbors: Boid[];
    color: string;
    options: any;
    graphics: BoidGraphics;

    constructor(x: number, y: number, maxSpeed: number, maxForce: number, radius: number, color: string, options: any) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(1, 1);
        this.acceleration = new Vector(0, 0);
        this.maxSpeed = maxSpeed;
        this.maxForce = maxForce;
        this.radius = radius;
        this.neighbors = [];
        this.options = options;
        this.color = color;
        this.graphics = new BoidGraphics(this);
    }
    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limitMagnitude(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.multiply(0);
    }
    applyForce(force: Vector) {
        this.acceleration.add(force);
    }
    friction() {
        this.applyForce(Vector.multiply(this.velocity, -0.02));
    }
    seek(target: Vector) {
        const desired = Vector.subtract(target, this.position);
        desired.limitMagnitude(this.maxSpeed);
        const steer = Vector.subtract(desired, this.velocity);
        steer.limitMagnitude(this.maxForce);
        this.applyForce(desired);
    }
    wander() {
        const { distance, circleRadius, angle, displacement } = this.options.wander;

        const projectedPoint = this.velocity.copy();
        projectedPoint.setMagnitude(distance);
        projectedPoint.add(this.position);
        
        const theta = angle + this.velocity.getAngle();
        const x = circleRadius * Math.cos(theta) + projectedPoint.x;
        const y = circleRadius * Math.sin(theta) + projectedPoint.y;
        const target = new Vector(x, y);

        this.options.wander.angle += randomFloat(-displacement, displacement);
        
        this.seek(target);
    }
    render(context: CanvasRenderingContext2D) {
        this.graphics.renderBoid(context);
        this.graphics.renderVelocity(context, 10);
        this.graphics.renderWander(context);
    }
}
        
