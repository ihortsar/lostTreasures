class MainCharacter extends MovableObject {

    IMAGES_WALKING = ['img/png_charachters/pirate2/2_entity_000_WALK_001.png',
        'img/png_charachters/pirate2/2_entity_000_WALK_002.png',
        'img/png_charachters/pirate2/2_entity_000_WALK_003.png',
        'img/png_charachters/pirate2/2_entity_000_WALK_004.png',
        'img/png_charachters/pirate2/2_entity_000_WALK_005.png'
    ];
    IMAGES_JUMPING = [
        'img/png_charachters/pirate2/2_entity_000_JUMP_000.png',
        'img/png_charachters/pirate2/2_entity_000_ATTACK_001.png',
        'img/png_charachters/pirate2/2_entity_000_JUMP_006.png',
    ];
    IMAGES_HURT = [
        'img/png_charachters/pirate2/2_entity_000_HURT_001.png',
        'img/png_charachters/pirate2/2_entity_000_HURT_002.png',
        'img/png_charachters/pirate2/2_entity_000_HURT_003.png',
        'img/png_charachters/pirate2/2_entity_000_HURT_004.png',
        'img/png_charachters/pirate2/2_entity_000_HURT_005.png'
    ]


    IMAGES_DYING = [
        'img/png_charachters/pirate2/2_entity_000_DIE_000.png',
        'img/png_charachters/pirate2/2_entity_000_DIE_003.png',
        'img/png_charachters/pirate2/2_entity_000_DIE_006.png',
    ]

    IMAGES_ATTACKING = [

        'img/png_charachters/pirate2/2_entity_000_ATTACK_002.png',
        'img/png_charachters/pirate2/2_entity_000_ATTACK_006.png'
    ]


    world;
    speed = 10;
    offset = {
        top: 37,
        right: 115,
        bottom: 15,
        left: 40
    }
    walkingSound = new Audio('audio/walkingSound.mp3')



    constructor(x, y) {
        super()

        this.x = 100
        this.y = 275
        this.loadImage('img/png_charachters/pirate2/2_entity_000_WALK_001.png')
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_JUMPING)
        this.loadImages(this.IMAGES_HURT)
        this.loadImages(this.IMAGES_DYING)
        this.loadImages(this.IMAGES_ATTACKING)
        this.animate()
        this.checkIfOnRoof()
        this.applyGravity()


    }


    /**
* moves and animates the charachter on canvas
*/
    animate() {
        setInterval(() => {
            this.moveCharacter()
        }, 1000 / 100)
        setInterval(() => {
            this.playImagesOfCharacter()
        }, 50)
    }


    /**
*makes sure charachter doesn't cross the end of canvas and moves him playing walking sound
*/
    moveCharacter() {
        if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
            this.walkRight()
            this.walkingSound.play()
        }
        if (this.world.keyboard.left && this.x > -520) {
            this.walkLeft()
            this.walkingSound.play()
        }
        if (!this.isAboveGround() && this.world.keyboard.jump) {
            this.jump()
        }
        this.world.moveCamera = -this.x + 200
    }


    /**
*plays animation checking before in which state is the character
*/
    playImagesOfCharacter() {
        if (this.world.keyboard.throwObj) { this.playAnimation(this.IMAGES_ATTACKING) }
        else if (!this.isDead() && this.world.keyboard.right || this.world.keyboard.left)
            this.playAnimation(this.IMAGES_WALKING)
        else if (!this.isAboveGround() && this.world.keyboard.jump) {
            this.playAnimation(this.IMAGES_JUMPING)
        }
        else if (this.hurt())
            this.playAnimation(this.IMAGES_HURT)
        else if (this.isDead()) {
            this.charachterDead()
        }
    }


    /**
*stops music, makes sure character is on the ground, stops intervals, plays dying images, plays animation of game over
*/
    charachterDead() {
        this.world.mainTheme.pause()
        this.y = 280
        this.world.clearAllIntervals()
        this.dying(this.IMAGES_DYING)
        setTimeout(() => {
            this.world.playGameOverAnimationLost()
        }, 400);
    }


    /**
*jump animation for character
*/
    jump() {
        this.speedY = 50
        let i = this.currentImage % this.IMAGES_JUMPING.length
        let path = this.IMAGES_JUMPING[i]
        this.img = this.imageCache[path]
        this.currentImage++
    }


    /**
*checks if charaters x is close to roofs x position, sets the height of jump and the speedY,
to make sure he doesn't fall from the roof
*/
    checkIfOnRoof() {
        if (this.x >= -330 && this.x < -130 && this.y < 80 || this.x >= 390 && this.x < 560 && this.y < 80 || this.x >= 1110 && this.x < 1280 && this.y < 80 || this.x >= 1850 && this.x < 2040 && this.y < 80 || this.x >= 2550 && this.x < 2720 && this.y < 80) {
            this.y = 60
            this.speedY = 0
        }
    }
}

