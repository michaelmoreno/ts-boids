import Vector from "./Vector";

export default abstract class Graphics {
    drawLine(context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, thickness?: number) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineWidth = thickness || 1;
        context.strokeStyle = color;
        context.stroke();
    }
    drawDottedLine(context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, thickness?: number) {
        context.beginPath();
        context.setLineDash([5, 5]);
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineWidth = thickness || 1;
        context.strokeStyle = color;
        context.stroke();
        context.setLineDash([]);
    }
    strokeCircle(context: CanvasRenderingContext2D, x1: number, y1: number, radius: number, color: string) {
        context.beginPath();
        context.arc(x1, y1, radius, 0, 2 * Math.PI);
        context.strokeStyle = color;
        context.stroke();
    }
    fillCircle(context: CanvasRenderingContext2D, x1: number, y1: number, radius: number, color: string) {
        context.beginPath();
        context.arc(x1, y1, radius, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
    }
    drawTriangle(context: CanvasRenderingContext2D, a: Vector, b: Vector, c: Vector, color: string, thickness?: number) {
        context.beginPath();
        context.strokeStyle = color;
        context.setLineDash([]);
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
        context.setLineDash([5, 5])
        context.lineWidth = thickness || 1;
        context.lineTo(c.x, c.y);
        context.strokeStyle = color;
        context.stroke();
        context.closePath();
    }
}