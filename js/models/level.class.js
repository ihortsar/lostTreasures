class Level {

    bgObjects;
    ammunition;
    level_end_x = 720 * 4 + 50;
    audio;
    enemies

    constructor(bgObjects, ammunition, enemies) {
        this.bgObjects = bgObjects;
        this.ammunition = ammunition
        this.enemies = enemies
    }


}