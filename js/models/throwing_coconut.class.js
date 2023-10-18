class ThrowingCoconut extends MovableObject {

    /**
*takes overotherDirection, x and y position of mainCharachter
and
*/
    constructor(otherDirection, x, y) {
        super()
        this.otherDirection = otherDirection
        this.x = x
        this.y = y
        this.loadImage('img/status_icons/Coconut-PNG-Transparent-Background.png')
        this.height = 30
        this.width = 30
        this.throw()

    }


    /**
*checks the direction and sets speed for shooting
*/
    throw() {
        if (this.otherDirection) {
            this.x += 5
            setInterval(() => {
                this.x -= 40
            }, 10);
        } else {
            this.x += 200
            setInterval(() => {
                this.x += 40
            }, 10);
        }
    }


}