interface Renderable {
    render(context: CanvasRenderingContext2D): void;
}

export default class Renderer {
    context: CanvasRenderingContext2D;
    entities: Renderable[];
    protected _width: number;
    protected _height: number;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.entities = [];
        this._width = this.context.canvas.width;
        this._height = this.context.canvas.height;
        this.setup();
    }
    get width() {
        return this._width;
    }
    set width(width: number) {
        this.context.canvas.width = width;
        this._width = width;
    }
    get height() {
        return this._height;
    }
    set height(height: number) {
        this.context.canvas.height = height;
        this._height = height; 
    }
    centerOrigin() {
        this.context.translate(this.width/2, this.height/2);
    }
    flipVertical() {
        this.context.scale(1, -1);
    }
    fitCanvasToWindow() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }
    activateResizing() {
        this.fitCanvasToWindow();
        document.addEventListener('resize', () => this.fitCanvasToWindow());
    }
    setup() {
        document.body.appendChild(this.context.canvas);
        this.activateResizing();
        this.centerOrigin();
        this.flipVertical();
    }
    eraseCanvas() {
        this.context.clearRect(0-this.width/2, 0-this.height/2, this.width, this.height);
    }
    render() {
        this.eraseCanvas();
        for (const entity of this.entities) {
            entity.render(this.context);
        }
    }
}