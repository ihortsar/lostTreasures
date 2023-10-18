class Ammunition extends Objects {
    x = 90 + Math.random() * 2000
    y = 20 + Math.random() * 200;
    img;
    height = 35;
    width = 30

    constructor() {
        super()
        this.loadImage('img/status_icons/Coconut-PNG-Transparent-Background.png')
    }
}