class GameObject{
    #id;
    #enabled;
    #name;
    #tag;
    #sortingOrder;
    #x;
    #y;
    #width;
    #height;

    /**
     * Constructs new GameObject with given parameters.
     * @param {number} x X-coordinate
     * @param {number} y Y-coordinate
     * @param {number} width Width on the grid
     * @param {number} height Height on the grid
     */
    constructor(x = 0, y = 0, width = 0, height = 0){
        if(typeof x !== "number")
            throw new Error("Coordinates must be a number!");
        if(typeof y !== "number")
            throw new Error("Coordinates must be a number!");
        if(typeof width !== "number")
            throw new Error("Param width must be a number!");
        if(typeof height !== "number")
            throw new Error("Param height must be a number!");
        this.#enabled = true;
        this.#id = crypto.getRandomValues(new Uint32Array(4)).join('-');
        this.#name = "New GameObject";
        this.#tag = undefined;
        this.#sortingOrder = 0;

        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
    }

    // Virtual functions

    /**
     * Method invoked at object initialization in game
     * @param {GameManager} gameManager Game Instance
     */
    OnStart(gameManager){}

    /**
     * Method invoked before destroying object
     * @param {GameManager} gameManager Game Instance
     */
    OnDestroy(gameManager){}

    /**
     * The first method called every frame if the GameObject is enabled
     * @param {number} deltaTime Frame render time
     * @param {GameManager} gameManager Game Instance
     */
    Update(deltaTime, gameManager){}

    /**
     * Method invoked at game loop when objects are drawing if the GameObject is enabled
     * @param {Renderer} renderer Game canvas renderer class
     * @param {GameManager} gameManager Game manager class
     */
    OnDraw(renderer, gameManager){}

    /**
     * The last method called every frame if the GameObject is enabled
     * @param {number} deltaTime Frame render time
     * @param {GameManager} gameManager Game Instance
     */
    FixedUpdate(deltaTime, gameManager){}

    /**
     * Method invoked when GameObject is clicked.
     * @param {Vector2} pos Mouse position
     * @param {GameManager} gameManager Game Instance
     * @returns {boolean} is handled event?
     */
    OnMouseClick(pos, gameManager){
        return false;
    }

    // Getters
    getId = () => this.#id;
    isEnabled = () => this.#enabled;
    getName = () => this.#name;
    getTag = () => this.#tag;
    getSortingOrder = () => this.#sortingOrder;
    getWidth = () => this.#width;
    getHeight = () => this.#height;

    /**
     * Gets the X-coordinate from position.
     * @returns {number} The X-coordinate
     */
    getX() {
        return this.#x;
    }

    /**
     * Gets the Y-coordinate from position.
     * @returns {number} The Y-coordinate
     */
    getY() {
        return this.#y;
    }

    /**
     * Gets the Vector2 from position.
     * @returns {Vector2} The Vector2
     */
    getVector2(){
        return new Vector2(this.#x, this.#y);
    }

    // Setters

    /**
     * Sets new value of enabled.
     * @param {boolean} value The new value.
     * @returns {GameObject} This reference.
     */
    setEnabled(value){
        if(typeof value != 'boolean')
            throw new Error("Enabled value must be boolean!");
        this.#enabled = value;
        return this;
    }

    /**
     * Sets new name.
     * @param {string} name The new name.
     * @returns {GameObject} This reference.
     */
    setName(name){
        if(typeof name != 'string')
            throw new Error("Name of object must be string!");
        this.#name = name;
        return this;
    }

    /**
     * Sets new tag.
     * @param {string} tag The new tag.
     * @returns {GameObject} This reference.
     */
    setTag(tag){
        if(typeof tag != 'string')
            throw new Error("Tag of object must be string!");
        this.#tag = tag;
        return this;
    }

    /**
     * Sets new sorting order.<br>
     * **WARN:** To update sorting order invoke <code>GameManager.updateSortingLayer()</code>.
     * @param {number} order The sorting order.
     * @returns {GameObject} This reference.
     */
    setSortingOrder(order){
        if(typeof order != 'number')
            throw new Error("Sorting order must be number!");
        this.#sortingOrder = order;
        return this;
    }

    /**
     * Adds X, Y coordinates to actual position.
     * @param {number} x X-coordinate.
     * @param {number} y Y-coordinate.
     */
    move(x, y){
        if(typeof x != 'number')
            throw new Error("Coordinates must be a number!");
        if(typeof y != 'number')
            throw new Error("Coordinates must be a number!");
        this.#x += x;
        this.#y += y;
    }

    /**
     * Sets the new X-coordinate and Y-coordinate by params.
     * @param {number} x The new X-coordinate.
     * @param {number} y The new Y-coordinate.
     * @returns {GameObject} This reference;
     */
    goTo(x, y){
        if(typeof x != 'number')
            throw new Error("Coordinates must be a number!");
        if(typeof y != 'number')
            throw new Error("Coordinates must be a number!");
        this.#x = x;
        this.#y = y;
        return this;
    }

    /**
     * Sets new X-coordinate.
     * @param {number} x The new X-coordinate.
     * @returns {GameObject} This reference;
     */
    setX(x){
        if(typeof x != 'number')
            throw new Error("Coordinates must be a number!");
        this.#x = x;
        return this;
    }

    /**
     * Sets new Y-coordinate.
     * @param {number} y The new Y-coordinate.
     * @returns {GameObject} This reference.
     */
    setY(y){
        if(typeof y != 'number')
            throw new Error("Coordinates must be a number!");
        this.#y = y;
        return this;
    }

    /**
     * Sets new width.
     * @param {number} width The new width.
     * @returns {GameObject} This reference.
     */
    setWidth(width){
        if(typeof width !== "number")
            throw new Error("Param width must be a number!");
        this.#width = width;
        return this;
    }

    /**
     * Sets new height.
     * @param {number} height The new height.
     * @return {GameObject} This reference.
     */
    setHeight(height){
        if(typeof height !== "number")
            throw new Error("Param width must be a number!");
        this.#height = height;
        return this;
    }
}