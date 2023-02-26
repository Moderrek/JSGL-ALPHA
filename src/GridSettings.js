class GridSettings{
    #width;
    #height;

    /**
     * Constructs new GridSettings with given parameters.
     * @param {number} width The grid columns count
     * @param {number} height The grid rows count
     */
    constructor(width, height){
        if(typeof width !== "number" || width <= 0)
            throw new Error("Cannot construct new object. Width must be a positive number!");
        if(typeof height !== "number" || height <= 0)
            throw new Error("Cannot construct new object. Width must be a positive number!");
        this.#width = width;
        this.#height = height;
    }

    /**
     * Gets the counts of columns.
     * @returns {number}
     */
    getWidth(){
        return this.#width;
    }

    /**
     * Gets the count of rows.
     * @returns {number}
     */
    getHeight(){
        return this.#height;
    }
}