class BgObjects extends MovableObject {
    i = BgObjects[this.i];


    constructor(path, height, y, speed, x) {

        super()

        this.loadImage(path)
        this.width = 720;
        this.height = height
        this.x = x
        this.y = y
        this.speed = speed
        this.moveLeft()
    }

    moveLeft() {
        setInterval(() => {
            this.walkLeft()
        }, 20);
    }




}