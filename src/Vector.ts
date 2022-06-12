type Quantities = [Vector|number, Vector|number, ...(Vector|number)[]]

export default class Vector {
    protected _x: number;
    protected _y: number;
    protected _magnitude: number;
    
    constructor(x: number, y: number) {
        this._x = x; 
        this._y = y;
        this._magnitude = this.calcMagnitude();
    }
    get x(): number { return this._x; }
    set x(x: number) {
        this._x = x;
        this._magnitude = this.calcMagnitude();
    }
    get y(): number { return this._y; }
    set y(y: number) {
        this._y = y;
        this._magnitude = this.calcMagnitude();
    }
    calcMagnitude(): number {
        return Math.sqrt(Math.abs(this.x * this.x) + Math.abs(this.y * this.y));
    }
    get magnitude(): number {
        return this._magnitude;
    }
    set magnitude(magnitude: number) {
        const ratio = magnitude / this.magnitude;
        this._magnitude = magnitude;
        this._x *= ratio;
        this._y *= ratio;
    }
    limitMagnitude(max: number) {
        if (this.magnitude > max) {
            this.magnitude = max;
        }
    }
    normalize() {
        this.magnitude = 1;
    }
    static distance(a: Vector, b: Vector) {
        const dx = a._x - b._x;
        const dy = a._y - b._y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    static sum(vectors: Vector[]) {
        return vectors.reduce((sum, vector) => sum.add(vector), new Vector(0, 0));
    }
    static average(vectors: Vector[]) {
        return Vector.sum(vectors).divide(vectors.length);
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
        return this;
    }
    subtract(quantity: Vector | number) {
        if (quantity instanceof Vector) {
            this.x -= quantity.x;
            this.y -= quantity.y;
        } else {
            this.x -= quantity;
            this.y -= quantity;
        }
        return this;
    }
    multiply(quantity: Vector | number) {
        if (quantity instanceof Vector) {
            this.x *= quantity.x;
            this.y *= quantity.y;
        } else {
            this.x *= quantity;
            this.y *= quantity;
        }
        return this;
    }
    divide(quantity: Vector | number) {
        if (quantity instanceof Vector) {
            this.x /= quantity.x;
            this.y /= quantity.y;
        } else {
            this.x /= quantity;
            this.y /= quantity;
        }
        return this;
    }
    getAngle() {
        return Math.atan2(this.y, this.x);
    }
    copy(): Vector {
        return new Vector(this.x, this.y);
    }
}
