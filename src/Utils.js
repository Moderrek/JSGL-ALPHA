class Utils{

    /**
     * Gives random element from any array.
     * @param {*[]} arr The array
     * @returns {*} The random array element
     */
    static getRandomElementFromArray = arr => arr[Math.floor(Math.random() * arr.length)];

    /**
     * Gives random integer in range.
     * @param {number} min The range minimum
     * @param {number} max The range maximum
     * @returns {number} The random integer in range.
     */
    static getRandomNumber(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * Converts RGB to HEX color with hash at the start.
     * @param {number} r The red channel
     * @param {number} g The green channel
     * @param {number} b The blue channel
     * @returns {string} #RRGGBB
     */
    static RgbToHex(r, g, b) {
        if (r > 255 || r < 0 || g > 255 || g < 0 || b > 255 || b < 0)
            throw new Error("Number out of range!");
        return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`.toUpperCase();
    }

    /**
     * Checks if the number `a` is in range.
     * @param {number} a The number to check
     * @param {number} min The range minimum
     * @param {number} max The range maximum
     * @returns {boolean} is the number to check in range?
     */
    static isInRange(a, min, max){
        return a >= min && a <= max;
    }

    /**
     * Creates new image element.
     * @param imagePath The image source
     * @returns {HTMLImageElement} The image element
     */
    createImage(imagePath) {
        let image = new Image();
        image.src = imagePath;
        return image;
    }
    
}