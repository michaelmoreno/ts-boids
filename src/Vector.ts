type Quantities = [Vector|number, Vector|number, ...(Vector|number)[]]

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
        return this._magnitude;
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
    normalize() {
        this.setMagnitude(1);
    }
    static add(...quantities: Quantities): Vector {
        const [first, ...rest] = quantities;
        let [x, y] = first instanceof Vector ? [first.x, first.y] : [first, first];
        for (const quantity of rest) {
            x += quantity instanceof Vector ? quantity.x : quantity;
            y += quantity instanceof Vector ? quantity.y : quantity;
        }
        return new Vector(x, y);
    }
    static subtract(...quantities: Quantities): Vector {
        const [first, ...rest] = quantities;
        let [x, y] = first instanceof Vector ? [first.x, first.y] : [first, first];
        for (const quantity of rest) {
            x -= quantity instanceof Vector ? quantity.x : quantity;
            y -= quantity instanceof Vector ? quantity.y : quantity;
        }
        return new Vector(x, y);
    }
    static multiply(...quantities: Quantities): Vector {
        const [first, ...rest] = quantities;
        let [x, y] = first instanceof Vector ? [first.x, first.y] : [first, first];
        for (const quantity of rest) {
            x *= quantity instanceof Vector ? quantity.x : quantity;
            y *= quantity instanceof Vector ? quantity.y : quantity;
        }
        return new Vector(x, y);
    }
    static divide(...vectors: Quantities): Vector {
        const [first, ...rest] = vectors;
        let [x, y] = first instanceof Vector ? [first.x, first.y] : [first, first];
        for (const quantity of rest) {
            x /= quantity instanceof Vector ? quantity.x : quantity;
            y /= quantity instanceof Vector ? quantity.y : quantity;
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
