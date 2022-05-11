export default class Renderer {
    context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.setup();
    }
    setup() {
        document.body.appendChild(this.context.canvas);
        const setSize = () => {
            this.context.canvas.width = window.innerWidth;
            this.context.canvas.height = window.innerHeight;
            return setSize
        }
        document.addEventListener('resize', setSize());
    }

    render() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.fillRect(200,200,100,100);
    }
}