class Objects {
    img;
    imageCache = {};
    currentImage = 0;
    x = 200;
    y = 270;
    width = 250;
    height = 210;
    health = 10
    ammunition = 0
    bossHealth = 6
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0

    }
    ctx;



    /**
*draws objects from arrays
*/
    addObjects(objects, ctx) {
        this.ctx = ctx
        objects.forEach(obj => {
            this.ctx.save();
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(obj.img, -obj.x - obj.width, obj.y, obj.width, obj.height);
            this.ctx.restore();
        });
    }



    /**
*creates an img and sets src for that
*/
    loadImage(path) {
        this.img = new Image()
        this.img.src = path
    }



    /**
*takes each path from array, creates an img, sets path as source for the img and saves the img in imageCache mit key path
*/
    loadImages(images) {
        images.forEach((path) => {
            let img = new Image()
            img.src = path
            this.imageCache[path] = img
        })
    }

/**
*returns number of ammunition
*/
    countAmmunition() {
        return this.ammunition
    }


    /**
*returns number of bossHealth
*/
    countBossHealth() {
        return this.bossHealth
    }



    /**
*sets modulo(never more then the length of array) as i, sets as path images[i], gets from imageCache the element with key path
and sets it as img, then increases currentImage
*/
    playAnimation(images) {
        let i = this.currentImage % images.length
        let path = images[i]
        this.img = this.imageCache[path]
        this.currentImage++
    }
}