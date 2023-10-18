class MovableObject extends Objects {
    x = 200;
    y = 270;
    img;
    width = 250;
    height = 210;
    otherDirection = false
    currentImage = 0;
    speedY = 0;
    acceleration = 5;
    lastHit = 0;
    speedX = 0

    /**
*if press key right and x position of object<this.world.level.level_end_x, increases x by adding this.speed.
Sets other direction
*/
    walkRight() {
        if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
            this.x += this.speed
            this.otherDirection = false
        }
    }


    /**
*if press key left decreases x by substracting this.speed.
Sets other direction
*/
    walkLeft() {
        this.x -= this.speed
        this.otherDirection = true
    }


    /**
*object hasn't been hit or was hit mor than 1 sec ago, decreases health number by -2, creates and plays wounded sound.
sets condition that health can't go below 0. If health is still>=0,sets the time of current hit
*/
    hit() {
        if (this.lastHit === undefined || (new Date().getTime() - this.lastHit) >= 1000) {
            this.health -= 2
            let woundedSound = new Audio('audio/wounded.mp3')
            woundedSound.play()
            if (this.health < 0) {
                this.health = 0
            } else {
                this.lastHit = new Date().getTime()
            }
        }
    }


    /**
*signals that object is dead
*/
    isDead() {
        return this.health === 0
    }


    /**
*counts how much time passed since last hit.
returns true if timePassed is <0.5
*/
    hurt() {
        let timePassed = new Date().getTime() - this.lastHit
        timePassed = timePassed / 1000
        return timePassed < 0.5
    }


    /**
*if objects y<280 or speedy>0, decreases speedY and then y position to get object fall back on the floor
*/
    applyGravity() {
        setInterval(() => {

            if (this.isAboveGround() || this.speedY > 0) {
                this.speedY -= this.acceleration
                this.y -= this.speedY;
            }
        }, 30)
    }


    /**
*Except for ThrowingCoconut class,checks if objects y position is <280.
*/
    isAboveGround() {
        if (this instanceof ThrowingCoconut) {
            return true
        } else {
            return this.y < 280
        }
    }


    /**
*checks if object is close enough to charachter to start play the right animation on time
*/
    checkAttacking(obj, character) {
        if (character.x + character.width - character.offset.right - obj.x + obj.offset.left > 50 &&
            character.x + character.width - character.offset.right - obj.x + obj.offset.left < 350 &&
            character.x + character.offset.left - obj.x + obj.width - obj.offset.right > 50
        ) return true;
    }


    /**
*sets modulo(never more then the length of array) as i, sets as path images[i], gets from imageCache the element with key path
and sets it as img, then increases currentImage
*/
    enemyMoves(images) {
        let i = this.currentImage % images.length
        let path = images[i]
        this.img = this.imageCache[path]
        this.currentImage++
    }


    checkForCollisions(obj) {
        return (
            this.x + this.width - this.offset.right > obj.x + obj.offset.left &&//right side of this, left side of object
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&//bottom side of this, top side of object
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&//left side of this, right side of object
            this.y - this.offset.top < obj.y + obj.height - obj.offset.bottom//top side of this, bottom side of object
        );
    }


    dying(images) {
        for (let i = 0; i < images.length; i++) {
            let path = images[i]
            this.img = this.imageCache[path]
        }
    }

}