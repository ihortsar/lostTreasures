class Status extends Objects {

    constructor(path, x, y, width, height, id) {
        super()
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.path = path
        this.loadImage(this.path)
  
    }



}