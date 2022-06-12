import Boid from "./Boid";
import Graphics from "./Graphics";
import Vector from "./Vector";

export default class BoidGraphics extends Graphics {
    boid: Boid;

    constructor(boid: Boid) {
        super();
        this.boid = boid;
    }
    renderBoid(context: CanvasRenderingContext2D) {
        // this.fillCircle(context, this.boid.position.x, this.boid.position.y, 10, this.boid.color);
        // this.
    }
    renderVelocity(context: CanvasRenderingContext2D, multipliedBy: number = 1) {
        const a = this.boid.position
        const b = Vector.add(this.boid.position, Vector.multiply(this.boid.velocity, multipliedBy));
        const c = new Vector(b.x, a.y)

        this.drawTriangle(context, a, b, c, "green", 1);
    }
    renderWander(context: CanvasRenderingContext2D) {
        const { distance, circleRadius, angle, displacement } = this.boid.options.wander;

        const projectedPoint = this.boid.velocity.copy();
        projectedPoint.magnitude = distance;
        projectedPoint.add(this.boid.position);

        this.fillCircle(context, projectedPoint.x, projectedPoint.y, 3, "blue");
        this.strokeCircle(context, projectedPoint.x, projectedPoint.y, circleRadius, "orange");
        
        const theta = angle + this.boid.velocity.getAngle();
        const x = circleRadius * Math.cos(theta) + projectedPoint.x;
        const y = circleRadius * Math.sin(theta) + projectedPoint.y;
        const target = new Vector(x, y);

        this.fillCircle(context, target.x, target.y, 3, "red");
    }
    renderVision(context: CanvasRenderingContext2D) {
        this.strokeCircle(context, this.boid.position.x, this.boid.position.y, this.boid.radius, "blue");
    }
    renderNeighbors(context: CanvasRenderingContext2D) {
        this.boid.neighbors.forEach(neighbor => {
            this.drawLine(context, this.boid.position.x, this.boid.position.y, neighbor.position.x, neighbor.position.y, "grey", 1);
        });
    }
}