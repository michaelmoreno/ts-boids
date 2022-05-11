export default class Vector {
    x: number;
    y: number;
    protected _magnitude: number;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this._magnitude = this.calcMagnitude();
    }
    calcMagnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get magnitude(): number {
        return this.calcMagnitude();
    }
    setMagnitude(magnitude: number) {
        const ratio = magnitude / this.magnitude;
        this.multiply(ratio);
    }
    limitMagnitude(max: number) {
        if (this.magnitude > max) {
            this.setMagnitude(max);
        }
    }
    static add(...vectors: Vector[]): Vector {
        let x = 0;
        let y = 0;
        for (const vector of vectors) {
            x += vector.x;
            y += vector.y;
        }
        return new Vector(x, y);
    }
    static subtract(...vectors: Vector[]): Vector {
        let x = 0;
        let y = 0;
        for (const vector of vectors) {
            x -= vector.x;
            y -= vector.y;
        }
        return new Vector(x, y);
    }
    static multiply(...vectors: Vector[]): Vector {
        let x = 0;
        let y = 0;
        for (const vector of vectors) {
            x *= vector.x;
            y *= vector.y;
        }
        return new Vector(x, y);
    }
    static divide(...vectors: Vector[]): Vector {
        let x = 0;
        let y = 0;
        for (const vector of vectors) {
            x /= vector.x;
            y /= vector.y;
        }
        return new Vector(x, y);
    }
    add(quantity: Vector | number) {
        if (quantity instanceof Vector) {
            this.x += quantity.x;
            this.y += quantity.y;
        } else {
            this.x += quantity;
            this.y += quantity;
        }
    }
    subtract(quantity: Vector | number) {
        if (quantity instanceof Vector) {
            this.x -= quantity.x;
            this.y -= quantity.y;
        } else {
            this.x -= quantity;
            this.y -= quantity;
        }
    }
    multiply(quantity: Vector | number) {
        if (quantity instanceof Vector) {
            this.x *= quantity.x;
            this.y *= quantity.y;
        } else {
            this.x *= quantity;
            this.y *= quantity;
        }
    }
    divide(quantity: Vector | number) {
        if (quantity instanceof Vector) {
            this.x /= quantity.x;
            this.y /= quantity.y;
        } else {
            this.x /= quantity;
            this.y /= quantity;
        }
    }
}
