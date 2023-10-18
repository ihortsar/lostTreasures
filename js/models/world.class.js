class World {
    mainTheme = new Audio('audio/mainTheme.mp3')

    mainCharacter = new MainCharacter();
    objects = new Objects(this.mainCharacter)
    level = LEVEL1;
    ctx;
    lastShot = 0
    canvas;
    keyboard;
    moveCamera = 0;

    boss
    treasure = new Treasure()
    coconuts = []
    status = [
        new Status('img/status_icons/icon_health.png', 60, 10, 50, 50),
        new Status('img/status_icons/Coconut-PNG-Transparent-Background.png', 160, 24, 30, 30),
        new Status('img/png_charachters/pirate3/3_3-PIRATE_WALK_002.png', 210, -10, 100, 100),
    ]
    openTreasure
    gameWonSound

    constructor(canvas, keyboard) {
        this.canvas = canvas
        this.keyboard = keyboard
        this.ctx = canvas.getContext('2d')
        this.run()
        this.setWorldForCharacters()
        this.draw()
        this.mainTheme.play()
    }


/**
 * if boss already created draws him and checks for collisions
 */
    drawBosss() {
        if (this.boss) {
            this.drawBoss()
            this.isCollidingWithBoss()
        }
    }


/**
 * creates boss
 */
    createBoss() {
        if (this.level.enemies.length <= 2 && this.boss == undefined) {
            this.boss = new Boss(this.level.enemies, this.mainCharacter, this.objects)
        }
    }


 /**
 * draws elements repeating constantly with self.draw() function
 */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.moveCamera, 0)
        this.mainCharacter.checkIfOnRoof()
        this.objects.addObjects(this.level.bgObjects, this.ctx);
        //space for static objects
        this.drawStaticObjects()
        //
        this.mainTheme.volume = globalVolume
        this.objects.addObjects(this.coconuts, this.ctx)
        this.objects.addObjects(this.level.enemies, this.ctx)
        this.drawMainCharacter()
        this.drawBosss()
        this.objects.addObjects(this.level.ammunition, this.ctx)
        this.createBoss()
        this.afterBossDead()
        this.ctx.translate(-this.moveCamera, 0)
        const self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


/**
* draws elements that remain static on canvas
*/
    drawStaticObjects() {
        this.ctx.translate(-this.moveCamera, 0)
        this.styleStatusNumbers()
        this.objects.addObjects(this.status, this.ctx);
        this.ctx.translate(this.moveCamera, 0)
        this.turnObject(this.treasure)
    }


/**
 * defines world for some elements
 */
    setWorldForCharacters() {
        this.mainCharacter.world = this;
        for (let i = 0; i < this.level.bgObjects.length; i++) {
            this.level.bgObjects[i].world = this
        }
        for (let i = 0; i < this.level.enemies.length; i++) {
            this.level.enemies[i].world = this
        }
    }


/**
 * checks the direction of mainCharachter and draws him depending from that
 */
    drawMainCharacter() {
        if (this.mainCharacter.otherDirection == true) {
            this.turnObject(this.mainCharacter)
        } else {
            this.drawObject(this.mainCharacter)
        }
    }


/**
* checks the direction of boss and draws him depending from that
* checks if the boss wounded or shot
*/
    drawBoss() {
        if (!this.boss.leftAchieved) {
            this.turnObject(this.boss)

        } else {
            this.drawObject(this.boss)
        }
        this.shotBoss()
    }


 /**
* turns object on canvas
*/
    turnObject(obj) {
        this.ctx.save();
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(obj.img, -obj.x - obj.width, obj.y, obj.width, obj.height);
        this.ctx.restore();
    }


/**
 * draws object on canvas
 */
    drawObject(obj) {
        this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
    }


 /**
* styles the statuses on the top of canvas
*/
    styleStatusNumbers() {
        this.ctx.fillStyle = "red";
        this.ctx.font = "normal 30px Arial";
        this.ctx.fillText(this.objects.countAmmunition(), 200, 50)
        this.ctx.fillText(this.countHealth(), 100, 50)
        this.ctx.fillText(this.objects.countBossHealth(), 300, 50)
    }


/**
* checks if the main charachter collides with enemy, if he shoots and if he collides with coconuts(ammunition)
*/
    run() {
        setInterval(() => {
            this.isColliding(this.mainCharacter, this.level.enemies)
            this.checkForThrowing()
            this.gatherAmmunition(this.mainCharacter, this.level.ammunition)
        }, 50);
    }


/**
* checks if the boss was shot, then sets his health and starts the sound of wounded boss
*/
    shotBoss() {
        if (this.checkIfEnemyShot(this.boss)) {
            if (this.objects.bossHealth <= 0) {
                this.objects.bossHealth = 0
            } else {
                this.objects.bossHealth -= 1
                let bossWounded = new Audio('audio/bossWounded.mp3')
                bossWounded.play()
            }
        }
    }


/**
 * if boss is dead increases the end of canvas, checks if main charachter arrived till certain x position, 
 * creates the treasure object(golden coins), draws it.
 * this.playGameWonMusic() creates and plays music if won, stops main theme,
 * plays animation for winning and clears intervals after a delay of 2 seconds
 */
    afterBossDead() {
        if (this.objects.bossHealth == 0) {
            this.level.level_end_x = 720 * 4 + 250;
            if (this.mainCharacter.x >= 720 * 4 + 200) {
                this.openTreasure = new OpenTreasure()
                this.drawObject(this.openTreasure)
                if (this.gameWonSound == undefined) {
                    this.playGameWonMusic()
                }
                this.mainTheme.pause()
                setTimeout(() => {
                    this.playGameOverAnimationWin()
                    this.clearAllIntervals()
                }, 2000);
            }
        }
    }


/**
*creates and plays music if won
*/
    playGameWonMusic() {
        this.gameWonSound = new Audio('audio/gameWon.mp3')
        this.gameWonSound.play()
    }


/**
*displays game over window showing just 'you won' on top of that
*/
    playGameOverAnimationWin() {
        document.getElementById('gameOver').classList.remove('displayNone')
        document.getElementById('gameOver').classList.add('gameOver')
        document.getElementById('youwon').classList.remove('displayNone')
        document.getElementById('youwon').classList.add('youwon')
    }


/**
*displays game over window showing just 'you lost' on top of that
*/
    playGameOverAnimationLost() {
        document.getElementById('gameOver').classList.remove('displayNone')
        document.getElementById('gameOver').classList.add('gameOver')
        document.getElementById('youlost').classList.remove('displayNone')
        document.getElementById('youlost').classList.add('youwon')

    }


/**
*checks collisions while shooting and removes from coconuts if collided 
*/
    checkIfEnemyShot(obj) {
        return this.coconuts.some((coconut) => {
            if (coconut.x + coconut.width - coconut.offset.right > obj.x + obj.offset.left &&//right side of coconut, left side of object
                coconut.y + coconut.height - coconut.offset.bottom > obj.y + obj.offset.top &&//bottom side of coconut, top side of object
                coconut.x + coconut.offset.left < obj.x + obj.width - obj.offset.right &&//left side of coconut, right side of object
                coconut.y - coconut.offset.top < obj.y + obj.height - obj.offset.bottom//top side of coconut, bottom side of object
            ) {
                this.coconuts.splice(coconut)
                return true
            }
        });
    }


/**
*checks collisions of main character and enemy and if main characters y>280,
*if so, means main charachter jumps on the enemy, so the smash sound is created, played and enemy removed from array
*/
    enemySmashed() {
        this.level.enemies.some((enemy, index) => {
            if (this.mainCharacter.checkForCollisions(enemy) && this.mainCharacter.isAboveGround()) {
                enemy.loadImage('img/png_charachters/pirate1/1_entity_000_DIE_005.png')
                let smashedSound = new Audio('audio/smashed.mp3')
                smashedSound.play()
                this.level.enemies.splice(index, 1)
            }
        });
    }


/**
*checks general collisions, then if object is instanceof Enemy and main character.y>280and speedY<0 to set the moment for smashing enemy.
*if object instanceof Enemy calls hit()
*/
    isColliding(character, objects) {
        objects.forEach((object) => {
            if (character.checkForCollisions(object)) {
                if (object instanceof Enemy && character.isAboveGround() && character.speedY < 0) {
                    this.enemySmashed()
                } else if (object instanceof Enemy) {
                    character.hit();
                }
            }
        });
    }


/**
*checks if boss is alive and colliding with main charachter- calls hit() for main charachter
*/
    isCollidingWithBoss() {
        if (this.objects.bossHealth > 0 && this.mainCharacter.checkForCollisions(this.boss))
            this.mainCharacter.hit();
    }


/**
*checks for collisions of main charachter and ammunition, and if main character is jumping
*if so,creates and plays sound for coconut gathering. Increases ammunition number and removes coconut from array
*/
    gatherAmmunition(character, objects) {
        objects.forEach((object, index) => {
            if (character.checkForCollisions(object) && this.mainCharacter.isAboveGround()) {
                let cocoSound = new Audio('audio/coco.mp3')
                cocoSound.play()
                this.objects.ammunition += 1;
                objects.splice(index, 1);
            }
        })
    }


/**
*checks if throwObj pressed and ammunition number is > 0
if so, creates let with current time. if time between current time and last shot is >1 sec, creates new 
ThrowingCoconut for shooting, creates sound, decreases the number of available ammunition and saves time of last shot
*/
    checkForThrowing() {
        if (this.keyboard.throwObj && this.objects.ammunition > 0) {
            let currentTime = new Date().getTime()
            if (currentTime - this.lastShot > 1000) {
                let coco = new ThrowingCoconut(this.mainCharacter.otherDirection, this.mainCharacter.x, this.mainCharacter.y + 80)
                let shootSound = new Audio('audio/shoot.mp3')
                shootSound.play()
                this.coconuts.push(coco)
                this.objects.ammunition -= 1
                this.lastShot = currentTime
            }
        }
    }


/**
*returns health of mainCharacter
*/
    countHealth() {
        return this.mainCharacter.health
    }


/**
*stops intervals
*/
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

}
