class Renderer{
    #gridSettings;
    #canvas;
    #ctx;
    #gridSize;
    #canvasSize;
    #canvasWidth;
    #canvasHeight;

    /**
     * Constructs a new Renderer with given parameters.
     * @param {HTMLCanvasElement} canvas The renderer canvas.
     * @param {GridSettings} gridSettings The canvas grid resolution.
     * @param {number} canvasSize Screen percentage. Floating 0-1
     */
    constructor(canvas, gridSettings, canvasSize){
        if(!canvas instanceof HTMLCanvasElement)
            throw new Error("Param canvas must be HTMLCanvasElement!");
        if(!gridSettings instanceof GridSettings)
            throw new Error("Param gridSettings must be an GridSettings object!");
        if(typeof canvasSize !== "number")
            throw new Error("Param canvasSize must be a number!");

        this.#gridSettings = gridSettings;
        this.#canvas = canvas;
        this.#ctx = this.#canvas.getContext('2d', {willReadFrequently: true});
        this.#canvasSize = canvasSize;
    }

    // Getters

    /**
     * @returns {number}
     */
    getCanvasWidth = () => this.#canvasWidth;
    /**
     * @returns {number}
     */
    getCanvasHeight = () => this.#canvasHeight;
    /**
     * @returns {number}
     */
    getGridSettings = () => this.#gridSettings;
    /**
     * @param {number} a
     * @returns {number} a * gridSize
     */
    scaleToGrid = a => a * this.#gridSize;
    getGridPixelLength = () => this.scaleToGrid(1);
    /**
     * @returns {CanvasRenderingContext2D}
     */
    getRawContext = () => this.#ctx;
    /**
     * @returns {HTMLCanvasElement}
     */
    getCanvas = () => this.#canvas;

    // Functions

    /**
     * Scale canvas size to document
     */
    fitCanvas(){
        let width = (window.innerWidth * this.#canvasSize) / this.#gridSettings.getWidth();
        let height = (window.innerHeight * this.#canvasSize) / this.#gridSettings.getHeight();
        this.#gridSize = Math.floor(Math.min(width, height));
        this.#canvasWidth = this.scaleToGrid(this.#gridSettings.getWidth());
        this.#canvasHeight = this.scaleToGrid(this.#gridSettings.getHeight());
        this.#canvas.width = this.#canvasWidth;
        this.#canvas.height = this.#canvasHeight;
    }

    /**
     * Clears frame
     */
    clearFrame(){
        this.#ctx.clearRect(0, 0, this.#canvasWidth, this.#canvasHeight);
    }

    /**
     * Draw rectangle
     * @param {number} x raw canvas X
     * @param {number} y raw canvas Y
     * @param {number} width raw canvas width
     * @param {number} height raw canvas height
     * @param {string} color rect color
     * @param {boolean} stroke stroke?
     * @param {number} strokeSize stroke size
     * @param {string} strokeColor stroke color
     */
    drawRect(x, y, width, height, color, stroke = false, strokeSize = 2, strokeColor = "#000"){
        if(stroke){
            this.#ctx.lineWidth = strokeSize;
            this.#ctx.strokeStyle = strokeColor;
            this.#ctx.strokeRect(x, y, width, height);
        }
        this.#ctx.fillStyle = color;
        this.#ctx.fillRect(x, y, width, height);
    }

    /**
     * Draw rectangle
     * @param {number} x grid canvas X
     * @param {number} y grid canvas Y
     * @param {number} width grid canvas width
     * @param {number} height grid canvas height
     * @param {string} color rect color
     * @param {boolean} stroke stroke?
     * @param {number} strokeSize stroke size
     * @param {string} strokeColor stroke color
     */
    drawGridRect(x, y, width, height, color, stroke = false, strokeSize = 2, strokeColor = "#000"){
        this.drawRect(this.scaleToGrid(x), this.scaleToGrid(y), this.scaleToGrid(width), this.scaleToGrid(height), color, stroke, strokeSize, strokeColor);
    }

    /**
     * Draws circle
     * @param {number} x grid canvas X
     * @param {number} y grid canvas Y
     * @param {number} radius grid circle radius
     * @param {string} color circle fill color
     */
    drawCircle(x, y, radius, color = "#000"){
        this.#ctx.fillStyle = color;
        this.#ctx.beginPath();
        let r = this.scaleToGrid(radius/2);
        this.#ctx.arc(this.scaleToGrid(x)+r, this.scaleToGrid(y)+r, r, 0, Math.PI*2);
        this.#ctx.fill();
    }

    /**
     * Fills frame with color
     * @param {string} color
     */
    fill(color = "#000"){
        this.#ctx.fillStyle = color;
        this.#ctx.fillRect(0, 0, this.#canvasWidth, this.#canvasHeight);
    }

    /**
     *
     * @param {HTMLImageElement} image
     * @param {number} x raw canvas x
     * @param {number} y raw canvas y
     * @param {number} width raw canvas width
     * @param {number} height raw canvas height
     */
    drawImage(image, x = 0, y = 0, width, height){
        this.#ctx.drawImage(image, x, y, width, height);
    }

    /**
     * Fills frame with image
     * @param {HTMLImageElement} image
     */
    drawBackgroundImage(image){
        this.#ctx.drawImage(image, 0, 0, this.#canvasWidth, this.#canvasHeight);
    }

    /**
     * Draws Sprite GameObject
     * @param {Sprite} sprite
     */
    drawSprite(sprite){
        this.#ctx.drawImage(sprite.getImage(),
            this.scaleToGrid(sprite.getX()),
            this.scaleToGrid(sprite.getY()),
            this.scaleToGrid(sprite.getWidth()),
            this.scaleToGrid(sprite.getHeight()));
    }

}