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
        this.velocity = new Vector(randomInt(-10, 10), randomInt(-10, 10));
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
        this.applyForce(steer);
    }
    wander() {
        const { distance, circleRadius, angle, displacement } = this.options.wander;

        const projectedPoint = this.velocity.copy();
        projectedPoint.magnitude = distance;
        projectedPoint.add(this.position);
        
        const theta = angle + this.velocity.getAngle();
        const x = circleRadius * Math.cos(theta) + projectedPoint.x;
        const y = circleRadius * Math.sin(theta) + projectedPoint.y;
        const target = new Vector(x, y);

        this.options.wander.angle += randomFloat(-displacement, displacement);
        this.seek(target);
    }
    addNeighbors(boids: Boid[]) {
        for (const boid of boids) {
            const notSelf = boid !== this;
            const inRange = Vector.distance(this.position, boid.position) < this.radius;
            const notAlreadyAdded = !this.neighbors.includes(boid);
            if (notSelf && inRange && notAlreadyAdded) {
                this.neighbors.push(boid);
            }
        }
    }
    pruneNeighbors() {
        this.neighbors = this.neighbors.filter(boid => {
            const inRange = Vector.distance(this.position, boid.position) < this.radius;
            return inRange;
        })
    }
    updateNeighbors(boids: Boid[]) {
        this.pruneNeighbors();
        this.addNeighbors(boids);
    }
    keepInBounds(width: number, height: number) {
        if (this.position.x < 0 - width / 2) {
            this.position.x = 0 + width / 2;
        }
        if (this.position.x > width/2) {
            this.position.x = 0 - width / 2;
        }
        if (this.position.y < 0 - height / 2) {
            this.position.y = 0 + height / 2;
        }
        if (this.position.y > height/2) {
            this.position.y = 0 - height / 2;
        }
    }
    align() {
        if (this.neighbors.length === 0) {
            return;
        }
        const averageVelocity = Vector.average(this.neighbors.map(boid => boid.velocity));
        averageVelocity.limitMagnitude(this.maxForce);
        this.applyForce(averageVelocity);
    }
    cohesion() {
        if (this.neighbors.length === 0) {
            return;
        }
        const averagePosition = Vector.average(this.neighbors.map(boid => boid.position));
        this.seek(averagePosition);
    }
    separation() {
        if (this.neighbors.length === 0) {
            return;
        }
        const tooClose = 180;
        const desired = new Vector(0, 0);
        for (const boid of this.neighbors) {
            const distance = Vector.distance(this.position, boid.position);
            if (distance > tooClose) {
                continue;
            }
            const difference = Vector.subtract(this.position, boid.position);
            difference.normalize();
            difference.multiply(1 / distance);
            desired.add(difference);
        }

        this.applyForce(desired);
    }
    render(context: CanvasRenderingContext2D) {
        this.graphics.renderBoid(context);
        this.graphics.renderVelocity(context, 10);
        // this.graphics.renderWander(context);
        // this.graphics.renderVision(context);
        // this.graphics.rendeerNeighbors(context);
    }
}
        
