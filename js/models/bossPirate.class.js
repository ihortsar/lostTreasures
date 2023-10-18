class Boss extends MovableObject {

    IMAGES_WALKING = [

        'img/png_charachters/pirate3/3_3-PIRATE_WALK_001.png',
        'img/png_charachters/pirate3/3_3-PIRATE_WALK_002.png',
        'img/png_charachters/pirate3/3_3-PIRATE_WALK_003.png',
        'img/png_charachters/pirate3/3_3-PIRATE_WALK_004.png',
        'img/png_charachters/pirate3/3_3-PIRATE_WALK_005.png',
        'img/png_charachters/pirate3/3_3-PIRATE_WALK_006.png',
    ]

    IMAGES_ATTACKING = [
        'img/png_charachters/pirate3/3_3-PIRATE_ATTACK_000.png',
        'img/png_charachters/pirate3/3_3-PIRATE_ATTACK_001.png',
        'img/png_charachters/pirate3/3_3-PIRATE_ATTACK_002.png',
        'img/png_charachters/pirate3/3_3-PIRATE_ATTACK_003.png',
        'img/png_charachters/pirate3/3_3-PIRATE_ATTACK_004.png',
    ]

    IMAGES_DEAD = [
        'img/png_charachters/pirate3/3_3-PIRATE_DIE_000.png',
        'img/png_charachters/pirate3/3_3-PIRATE_DIE_001.png',
        'img/png_charachters/pirate3/3_3-PIRATE_DIE_002.png',
        'img/png_charachters/pirate3/3_3-PIRATE_DIE_003.png',
        'img/png_charachters/pirate3/3_3-PIRATE_DIE_004.png',
        'img/png_charachters/pirate3/3_3-PIRATE_DIE_005.png',
    ]
    x = 3000;
    height = 400;
    width = 300;
    y = 110
    leftAchieved = false
    speedX = 20

    offset = {
        top: 45,
        right: 48,
        bottom: 15,
        left: 80
    }

    constructor(enemies, character, objects) {
        super()
        this.objects = objects
        this.enemies = enemies
        this.mainCharacter = character
        this.speed = 2
        this.loadImage('img/png_charachters/pirate3/3_3-PIRATE_WALK_000.png')
        this.loadImages(this.IMAGES_ATTACKING)
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_DEAD)
        this.bossMoves()
    }



    /**
*if boss is dead plays images of dying. if not,checks if boss is close enough to main character. 
If yes-plays attacking images, if not-just walking images. By bossWalks() sets the speed for boss
*/
    bossMoves() {
        setInterval(() => {
            if (this.objects.bossHealth === 0) {
                this.dying(this.IMAGES_DEAD)
                this.speedX = 0
            } else {
                if (this.checkAttacking(this, this.mainCharacter)) {
                    this.enemyMoves(this.IMAGES_ATTACKING)
                    this.bossWalks()
                } else {
                    this.enemyMoves(this.IMAGES_WALKING)
                    this.bossWalks()
                }
            }
        }, 60);
    }


    /**
*depending if boss achieved left side or not- sets the speed
*/
    bossWalks() {
        this.checkForLeftAchieved()
        if (this.leftAchieved) {
            this.x += this.speedX
        } else {
            this.x -= this.speedX
        }
    }


    /**
*checks if boss achieved left side
*/
    checkForLeftAchieved() {
        if (this.x > -470 && this.x < -440)
            this.leftAchieved = true
        if (this.x < 2880 && this.x > 2850)
            this.leftAchieved = false
    }

}