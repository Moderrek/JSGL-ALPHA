class Vector2{
    x;
    y;

    /**
     * Constructs a new Vector2 with the given coordinates.
     * @param {number} x X-coordinate
     * @param {number} y Y-coordinate
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Sets the x-coordinate.
     * @param {number} x new X-coordinate value
     * @returns {Vector2}
     */
    setX(x){
        this.x = x;
        return this;
    }

    /**
     * Sets the y-coordinate.
     * @param {number} y new Y-coordinate value
     * @returns {Vector2}
     */
    setY(y){
        this.y = y;
        return this;
    }

    /**
     * Gets the x-coordinate.
     * @returns {number}
     */
    getX(){
        return this.x;
    }

    /**
     * Gets the y-coordinate.
     * @returns {number}
     */
    getY(){
        return this.y;
    }

    /**
     * Adds the X-coordinate by param.
     * @param {number} x param
     * @returns {Vector2}
     */
    addX(x){
        this.x += x;
        return this;
    }

    /**
     * Adds the Y-coordinate by param.
     * @param {number} y param
     * @returns {Vector2}
     */
    addY(y){
        this.y += y;
        return this;
    }

    /**
     * Adds the vector by another.
     * @param {Vector2} v The another vector
     * @returns {Vector2}
     */
    add(v){
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    /**
     * Performs subtraction components from the other vector components.
     * @param {Vector2} v The other vector
     * @returns {Vector2}
     */
    subtract(v){
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    /**
     * Performs scalar multiplication, multiplying all components with scalar.
     * @param {number} m Scalar
     * @returns {Vector2}
     */
    multiply(m){
        this.x *= m;
        this.y *= m;
        return this;
    }

    /**
     * Performs scalar divination, dividing all components with scalar.
     * @param {number} d Scalar
     * @returns {Vector2}
     */
    divide(d){
        this.x /= d;
        this.y /= d;
        return this;
    }

    /**
     * Gets the distance between this vector and another.
     * @param {Vector2} v The other vector.
     * @returns {number} The distance
     */
    distance(v){
        return Math.sqrt(Math.pow(Math.abs(this.x - v.x), 2) + Math.pow(Math.abs(this.y - v.y), 2));
    }

    toString(){
        return `${this.constructor.name}{x:${this.x},y:${this.y}}`;
    }

}