class Enemy extends MovableObject {
    ENEMIES_WALKING = [
        'img/png_charachters/pirate1/1_entity_000_WALK_001.png',
        'img/png_charachters/pirate1/1_entity_000_WALK_002.png',
        'img/png_charachters/pirate1/1_entity_000_WALK_003.png',
        'img/png_charachters/pirate1/1_entity_000_WALK_004.png',
        'img/png_charachters/pirate1/1_entity_000_WALK_005.png',
    ]

    ENEMIES_ATTACKING = [
        'img/png_charachters/pirate1/1_entity_000_ATTACK_002.png',
        'img/png_charachters/pirate1/1_entity_000_ATTACK_004.png',
        'img/png_charachters/pirate1/1_entity_000_ATTACK_005.png',
        'img/png_charachters/pirate1/1_entity_000_ATTACK_006.png',
    ]

    ENEMIES_DYING = [
        'img/png_charachters/pirate1/1_entity_000_DIE_002.png',
        'img/png_charachters/pirate1/1_entity_000_DIE_003.png',
        'img/png_charachters/pirate1/1_entity_000_DIE_004.png',
        'img/png_charachters/pirate1/1_entity_000_DIE_005.png',
    ]

    offset = {
        top: 45,
        right: 48,
        bottom: 15,
        left: 80
    }

    constructor() {
        super()
        this.offset
        this.speed = 6 + Math.random() * 12;
        this.x = 700 + Math.random() * 3400
        this.loadImage('img/png_charachters/pirate1/1_entity_000_WALK_000.png');
        this.loadImages(this.ENEMIES_WALKING)
        this.loadImages(this.ENEMIES_ATTACKING)
        this.loadImages(this.ENEMIES_DYING)
        this.enemyAttacks()

    }


    enemyWalks() {
        this.x -= this.speed
    }


    enemyGone() {
        if (this.x < -720) {
            let index = this.world.level.enemies.indexOf(this);
            if (index !== -1) {
                this.world.level.enemies.splice(index, 1);
            }
        }
    }


    enemyAttacks() {
        setInterval(() => {
            this.enemyGone()
            let isAttacking = this.checkAttacking(this, this.world.mainCharacter);
            if (isAttacking) {
                this.enemyWalks(this);
                this.enemyMoves(this.ENEMIES_ATTACKING);
            } else if (this.world.mainCharacter.checkForCollisions(this) && this.world.mainCharacter.isAboveGround()) {
                this.loadImage('img/png_charachters/pirate1/1_entity_000_DIE_006.png');
                this.speed = 0
            } else {
                this.enemyWalks(this);
                this.enemyMoves(this.ENEMIES_WALKING);
            }

        }, 70);
    }
}