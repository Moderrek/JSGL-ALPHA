class GameManager{
    renderer;
    soundManager;
    #gameObjects;
    #playing;
    #update;
    #currentTime;
    #frameTime;

    /**
     * Constructs new GameManager with given parameters.
     * @param {HTMLCanvasElement} canvas The renderer canvas
     * @param {GridSettings} gridSettings The canvas grid resolution
     * @param {number} canvasSize floating 0-1, represents percentage of canvas to screen size.
     */
    constructor(canvas, gridSettings, canvasSize = 1){
        if(!canvas instanceof HTMLCanvasElement)
            throw new Error("Param canvas must be HTMLCanvasElement!");
        if(!gridSettings instanceof GridSettings)
            throw new Error("Param gridSettings must be an GridSettings object!");
        if(typeof canvasSize !== "number")
            throw new Error("Param canvasSize must be a number!");
        this.#gameObjects = [];
        this.renderer = new Renderer(canvas, gridSettings, canvasSize);
        this.soundManager = new SoundManager();
        this.#playing = false;
        this.#currentTime = 0;
        this.#frameTime = 0;
        this.#update = false;
        this.renderer.getCanvas().addEventListener('click', (event) => {
            this.#mouseClickEvent(event);
        }, false);
    }

    #mouseClickEvent (event) {
        let mousePos = new Vector2(event.offsetX, event.offsetY);
        for (let i = this.#gameObjects.length-1; i > 0; i--){
            const gameObject = this.#gameObjects[i];
            if(!gameObject.isEnabled())
                continue;
            if(gameObject instanceof Sprite && !gameObject.isVisible())
                continue;
            if(gameObject.getWidth() === 0 || gameObject.getHeight() === 0)
                continue;
            const gameObjectX = this.renderer.scaleToGrid(gameObject.getX());
            const gameObjectWidth = this.renderer.scaleToGrid(gameObject.getWidth());
            const gameObjectY = this.renderer.scaleToGrid(gameObject.getY());
            const gameObjectHeight = this.renderer.scaleToGrid(gameObject.getHeight());
            let isClickedAtSprite =
                Utils.isInRange(mousePos.x, gameObjectX, gameObjectX+gameObjectWidth) &&
                Utils.isInRange(mousePos.y, gameObjectY, gameObjectY+gameObjectHeight);
            if(!isClickedAtSprite)
                continue;
            let gridPos = mousePos.divide(this.renderer.getGridPixelLength());
            if(gameObject.OnMouseClick(new Vector2(Math.floor(gridPos.x), Math.floor(gridPos.y)), this))
                break;
        }
    }

    // Game Loop
    #loop = time => {
        // Calculation deltaTime
        let deltaTime = time - this.#currentTime;
        this.#currentTime = time;
        this.#frameTime = deltaTime;
        // Update
        for (const gameObject of this.#gameObjects) {
            if (!gameObject.isEnabled())
                return;
            try{
                gameObject.Update(deltaTime, this);
            }catch (e){
                console.warn(`Problem with executing Update @ ${gameObject.constructor.name} [${gameObject.getId()}]`)
                console.error(e.stack);
            }
        }
        // Fixed Update
        for (const gameObject of this.#gameObjects) {
            if (!gameObject.isEnabled())
                return;
            try{
                gameObject.FixedUpdate(deltaTime, this);
            }catch (e){
                console.warn(`Problem with executing FixedUpdate @ ${gameObject.constructor.name} [${gameObject.getId()}]`)
                console.error(e.stack);
            }
        }
        // Draw
        if (this.#update) {
            for (const gameObject of this.#gameObjects) {
                if (!gameObject.isEnabled())
                    return;
                try{
                    gameObject.OnDraw(this.renderer, this);
                }catch (e){
                    console.warn(`Problem with executing draw @ ${gameObject.constructor.name} [${gameObject.getId()}]`)
                    console.error(e.stack);
                }

            }
            this.#update = false;
        }
        // Continue loop
        if (this.#playing)
            window.requestAnimationFrame(this.#loop);
    };

    /**
     * Starts the game.
     */
    startGameLoop(){
        if(this.#playing) {
            console.warn("Cannot start new game loop when the game loop exists.")
            return;
        }
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(this.#loop.bind(this));
            this.#playing = true;
        });
    }

    /**
     * **CRITICAL WARNING!** Stops the game!
     */
    stopGameLoop(){
        console.warn("Stopped the game loop! Restarting the game loop will cause a time skip.");
        this.#playing = false;
    }

    // Getters
    /**
     * @returns {GridSettings}
     */
    getGridSettings = () => this.renderer.getGridSettings();

    // Functions

    /**
     * Method that tells the {@link Renderer} that the frame needs to be updated.
     */
    update() {
        this.#update = true;
    }

    /**
     * Sort game objects array by sorting order
     */
    #sortGameObjects(){
        this.#gameObjects.sort((a, b) => (a.getSortingOrder() > b.getSortingOrder()) ? 1 : ((b.getSortingOrder() > a.getSortingOrder()) ? -1 : 0));
    }

    /**
     * Updates the sorting layer
     */
    updateSortingLayer(){
        this.#sortGameObjects();
    }

    /**
     * Adds GameObject to game world
     * @param {GameObject} gameObject
     * @returns {GameObject}
     */
    addGameObject(gameObject){
        if(!gameObject instanceof GameObject)
            throw new Error("Cannot add not GameObject!");

        for(const otherGameObjects of this.#gameObjects){
            if(gameObject.getId() === otherGameObjects.getId())
                throw new Error("Cannot add this same GameObject!");
        }
        gameObject.setName(gameObject.constructor.name);
        this.#gameObjects.push(gameObject);
        this.#sortGameObjects();
        gameObject.OnStart(this);
        return gameObject;
    }

    /**
     * Removes GameObject from the game world
     * @param {GameObject} gameObject Reference of Game Object
     */
    destroyGameObjectByRef(gameObject){
        if(!gameObject instanceof GameObject)
            throw new Error("Param gameObject must be an GameObject object!");
        let index = this.#gameObjects.findIndex((element) => element.getId() === gameObject.getId());
        this.#gameObjects[index].OnDestroy(this);
        this.#gameObjects.splice(index, 1);
        this.#sortGameObjects();
    }

    /**
     * Removes GameObject from the game world
     * @param {string} id GameObject ID
     */
    destroyGameObjectById(id){
        if(typeof id !== "string")
            throw new Error("Param id must be string!");
        let gameObject = this.getGameObjectById(id);
        let index = this.#gameObjects.findIndex((element) => element.getId() === gameObject.getId());
        this.#gameObjects[index].OnDestroy(this);
        this.#gameObjects.splice(index, 1);
        this.#sortGameObjects();
    }

    /**
     * Removes GameObject from the game world
     * @param {number} index Index of GameObject in GameObjects array
     */
    destroyGameObjectByIndex(index){
        if(typeof index !== "number")
            throw new Error("Param index must be number!");
        if(index < 0)
            throw new Error("Index cannot be lower than 0!");
        if(index >= this.#gameObjects.length)
            throw new Error("Index cannot be bigger than maximum index!");
        this.#gameObjects[index].OnDestroy(this);
        this.#gameObjects.splice(index, 1);
        this.#sortGameObjects();
    }

    /**
     * Returns GameObjects by the Type argument.
     * @param {Object} type Type Class
     * @returns {GameObject[]} All GameObject have type equal to type in the argument
     */
    getGameObjectsByType(type){
        if(typeof type != 'function' || !type instanceof Object)
            throw new Error("Type must be an object!");
        let result = [];
        for (const gameObject of this.#gameObjects) {
            if(gameObject instanceof type)
                result.push(gameObject);
        }
        return result;
    }

    /**
     * Returns GameObjects by the name argument.
     * @param {string} name
     * @returns {GameObject[]} All GameObject have type equal to name in the argument
     */
    getGameObjectsByName(name){
        if(typeof name != 'string')
            throw new Error("Name of object must be string!");
        let result = [];
        for (const gameObject of this.#gameObjects) {
            if(gameObject.getName() === name)
                result.push(gameObject);
        }
        return result;
    }

    /**
     * Returns GameObjects by the tag in argument.
     * @param {string} tag
     * @returns {GameObject[]} All GameObject have type equal to tag in the argument
     */
    getGameObjectsByTag(tag){
        if(typeof tag != 'string')
            throw new Error("Name of object must be string!");
        let result = [];
        for (const gameObject of this.#gameObjects) {
            if(gameObject.getTag() === tag)
                result.push(gameObject);
        }
        return result;
    }

    /**
     * Returns GameObject by id
     * @param {string} id GameObject ID
     * @returns {GameObject} If found returns the game object, if not returns undefined
     */
    getGameObjectById(id){
        if(typeof id !== "string")
            throw new Error("Param id must be a string!");
        for(const gameObject of this.#gameObjects){
            if(gameObject.getId() === id)
                return gameObject;
        }
        return undefined;
    }

    /**
     * Returns all GameObjects
     * @returns {GameObject[]}
     */
    getGameObjects(){
        return this.#gameObjects;
    }
}