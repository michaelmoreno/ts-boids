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
        this.fillCircle(context, this.boid.position.x, this.boid.position.y, this.boid.radius, this.boid.color);
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
        projectedPoint.setMagnitude(distance);
        projectedPoint.add(this.boid.position);

        this.fillCircle(context, projectedPoint.x, projectedPoint.y, 3, "blue");
        this.strokeCircle(context, projectedPoint.x, projectedPoint.y, circleRadius, "orange");
        
        const theta = angle + this.boid.velocity.getAngle();
        const x = circleRadius * Math.cos(theta) + projectedPoint.x;
        const y = circleRadius * Math.sin(theta) + projectedPoint.y;
        const target = new Vector(x, y);

        this.fillCircle(context, target.x, target.y, 3, "red");
    }
}