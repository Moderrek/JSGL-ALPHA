class Sprite extends GameObject{
    #image;
    #visible;

    constructor(x = 0, y = 0, width = 0, height = 0){
        super(x, y, width, height);
        this.#visible = false;
    }

    OnDraw(renderer, gameManager) {
        if(this.#visible)
            renderer.drawSprite(this);
    }

    // Getters
    isVisible = () => this.#visible;
    getImage = () => this.#image;

    // Setters
    setVisible(visible){
        this.#visible = visible;
        return this;
    }
    switchVisible(){
        this.#visible = !this.#visible;
        return this;
    }
    setImage(image){
        this.#image = image;
        return this;
    }
}