namespace SpriteKind {
    export const bottle = SpriteKind.create()
    export const treature = SpriteKind.create()
    export const compass = SpriteKind.create()
}
function clearSave () {
    blockSettings.clear()
    game.reset()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    clearSave()
})
function createBottle () {
    if (!(foundBottle)) {
        messageInABottle = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . e e . . . . . . . 
            . . . . . . 1 1 1 1 . . . . . . 
            . . . . . 1 1 9 9 1 1 . . . . . 
            . . . . . 1 9 d d 9 1 . . . . . 
            . . . . . 1 9 d d 9 1 . . . . . 
            . . . . . 1 9 d d 9 1 . . . . . 
            . . . . . 1 9 d d 9 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.bottle)
        tiles.placeOnRandomTile(messageInABottle, assets.tile`myTile`)
        while (Math.abs(thePlayer.x - messageInABottle.x) > 200 || Math.abs(thePlayer.y - messageInABottle.y) > 200) {
            tiles.placeOnRandomTile(messageInABottle, assets.tile`myTile`)
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.bottle, function (sprite, otherSprite) {
    foundBottle = true
    otherSprite.destroy()
    createTreature()
})
function createTreature () {
    theTreature = sprites.create(img`
        2 2 . . . . . . . . . . . . 2 2 
        2 2 2 . . . . . . . . . . 2 2 2 
        . 2 2 2 . . . . . . . . 2 2 2 . 
        . . 2 2 2 . . . . . . 2 2 2 . . 
        . . . 2 2 2 . . . . 2 2 2 . . . 
        . . . . 2 2 2 . . 2 2 2 . . . . 
        . . . . . 2 2 2 2 2 2 . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . 2 2 2 2 2 2 . . . . . 
        . . . . 2 2 2 . . 2 2 2 . . . . 
        . . . 2 2 2 . . . . 2 2 2 . . . 
        . . 2 2 2 . . . . . . 2 2 2 . . 
        . 2 2 2 . . . . . . . . 2 2 2 . 
        2 2 2 . . . . . . . . . . 2 2 2 
        2 2 . . . . . . . . . . . . 2 2 
        `, SpriteKind.treature)
    tiles.placeOnRandomTile(theTreature, assets.tile`myTile0`)
    theCompass.setImage(compassImages[0])
}
function loadGame () {
    thePlayer.setPosition(blockSettings.readNumber("playerX"), blockSettings.readNumber("playerY"))
    foundBottle = blockSettings.readNumber("foundBottle") == 1
    if (foundBottle) {
        createTreature()
        thePlayer.setPosition(blockSettings.readNumber("treatureX"), blockSettings.readNumber("treatureY"))
    }
}
function saveGame () {
    blockSettings.writeNumber("playerX", thePlayer.x)
    blockSettings.writeNumber("playerY", thePlayer.y)
    if (foundBottle) {
        blockSettings.writeNumber("foundBottle", 1)
        blockSettings.writeNumber("treatureX", theTreature.x)
        blockSettings.writeNumber("treatureY", theTreature.y)
    } else {
        blockSettings.writeNumber("foundBottle", 0)
    }
}
let theTreature: Sprite = null
let messageInABottle: Sprite = null
let foundBottle = false
let theCompass: Sprite = null
let thePlayer: Sprite = null
let compassImages: Image[] = []
tiles.setTilemap(tilemap`level1`)
compassImages = [
img`
    . . . . e e e e e e e . . . . . 
    . . e e 1 1 1 1 1 1 1 e e . . . 
    . e 1 1 1 1 1 f 1 1 1 1 1 e . . 
    . e 1 8 1 1 1 f 1 1 1 8 1 e . . 
    e 1 1 1 8 1 1 f 1 1 8 1 1 1 e . 
    e 1 1 1 1 1 1 f 1 1 1 1 1 1 e . 
    e 1 1 1 1 1 1 f 1 1 1 1 1 1 e . 
    e 1 8 8 1 1 1 5 1 1 1 8 8 1 e . 
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 e . 
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 e . 
    e 1 1 1 8 1 1 1 1 1 8 1 1 1 e . 
    . e 1 8 1 1 1 8 1 1 1 8 1 e . . 
    . e 1 1 1 1 1 8 1 1 1 1 1 e . . 
    . . e e 1 1 1 1 1 1 1 e e . . . 
    . . . . e e e e e e e . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . e e e e e e e . . . . . 
    . . e e 1 1 1 1 1 1 1 e e . . . 
    . e 1 1 1 1 1 2 1 1 1 1 1 e . . 
    . e 1 8 1 1 1 2 1 1 1 f 1 e . . 
    e 1 1 1 8 1 1 1 1 1 f 1 1 1 e . 
    e 1 1 1 1 1 1 1 1 f 1 1 1 1 e . 
    e 1 1 1 1 1 1 1 f 1 1 1 1 1 e . 
    e 1 8 8 1 1 1 5 1 1 1 8 8 1 e . 
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 e . 
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 e . 
    e 1 1 1 8 1 1 1 1 1 8 1 1 1 e . 
    . e 1 8 1 1 1 8 1 1 1 8 1 e . . 
    . e 1 1 1 1 1 8 1 1 1 1 1 e . . 
    . . e e 1 1 1 1 1 1 1 e e . . . 
    . . . . e e e e e e e . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . e e e e e e e . . . . . 
    . . e e 1 1 1 1 1 1 1 e e . . . 
    . e 1 1 1 1 1 2 1 1 1 1 1 e . . 
    . e 1 8 1 1 1 2 1 1 1 8 1 e . . 
    e 1 1 1 8 1 1 1 1 1 8 1 1 1 e . 
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 e . 
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 e . 
    e 1 8 8 1 1 1 5 f f f f f 1 e . 
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 e . 
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 e . 
    e 1 1 1 8 1 1 1 1 1 8 1 1 1 e . 
    . e 1 8 1 1 1 8 1 1 1 8 1 e . . 
    . e 1 1 1 1 1 8 1 1 1 1 1 e . . 
    . . e e 1 1 1 1 1 1 1 e e . . . 
    . . . . e e e e e e e . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . e e e e e e e . . . . . 
    . . e e 1 1 1 1 1 1 1 e e . . . 
    . e 1 1 1 1 1 2 1 1 1 1 1 e . . 
    . e 1 8 1 1 1 2 1 1 1 8 1 e . . 
    e 1 1 1 8 1 1 1 1 1 8 1 1 1 e . 
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 e . 
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 e . 
    e 1 8 8 1 1 1 5 1 1 1 8 8 1 e . 
    e 1 1 1 1 1 1 1 f 1 1 1 1 1 e . 
    e 1 1 1 1 1 1 1 1 f 1 1 1 1 e . 
    e 1 1 1 8 1 1 1 1 1 f 1 1 1 e . 
    . e 1 8 1 1 1 8 1 1 1 f 1 e . . 
    . e 1 1 1 1 1 8 1 1 1 1 1 e . . 
    . . e e 1 1 1 1 1 1 1 e e . . . 
    . . . . e e e e e e e . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . e e e e e e e . . . . . 
    . . e e 1 1 1 1 1 1 1 e e . . . 
    . e 1 1 1 1 1 2 1 1 1 1 1 e . . 
    . e 1 8 1 1 1 2 1 1 1 8 1 e . . 
    e 1 1 1 8 1 1 1 1 1 8 1 1 1 e . 
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 e . 
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 e . 
    e 1 8 8 1 1 1 5 1 1 1 8 8 1 e . 
    e 1 1 1 1 1 1 f 1 1 1 1 1 1 e . 
    e 1 1 1 1 1 1 f 1 1 1 1 1 1 e . 
    e 1 1 1 8 1 1 f 1 1 8 1 1 1 e . 
    . e 1 8 1 1 1 f 1 1 1 8 1 e . . 
    . e 1 1 1 1 1 f 1 1 1 1 1 e . . 
    . . e e 1 1 1 1 1 1 1 e e . . . 
    . . . . e e e e e e e . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . e e e e e e e . . . . . 
    . . e e 1 1 1 1 1 1 1 e e . . . 
    . e 1 1 1 1 1 2 1 1 1 1 1 e . . 
    . e 1 8 1 1 1 2 1 1 1 8 1 e . . 
    e 1 1 1 8 1 1 1 1 1 8 1 1 1 e . 
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 e . 
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 e . 
    e 1 8 8 1 1 1 5 1 1 1 8 8 1 e . 
    e 1 1 1 1 1 f 1 1 1 1 1 1 1 e . 
    e 1 1 1 1 f 1 1 1 1 1 1 1 1 e . 
    e 1 1 1 f 1 1 1 1 1 8 1 1 1 e . 
    . e 1 f 1 1 1 8 1 1 1 8 1 e . . 
    . e 1 1 1 1 1 8 1 1 1 1 1 e . . 
    . . e e 1 1 1 1 1 1 1 e e . . . 
    . . . . e e e e e e e . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . e e e e e e e . . . . . 
    . . e e 1 1 1 1 1 1 1 e e . . . 
    . e 1 1 1 1 1 2 1 1 1 1 1 e . . 
    . e 1 8 1 1 1 2 1 1 1 8 1 e . . 
    e 1 1 1 8 1 1 1 1 1 8 1 1 1 e . 
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 e . 
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 e . 
    e 1 f f f f f 5 1 1 1 8 8 1 e . 
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 e . 
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 e . 
    e 1 1 1 8 1 1 1 1 1 8 1 1 1 e . 
    . e 1 8 1 1 1 8 1 1 1 8 1 e . . 
    . e 1 1 1 1 1 8 1 1 1 1 1 e . . 
    . . e e 1 1 1 1 1 1 1 e e . . . 
    . . . . e e e e e e e . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . e e e e e e e . . . . . 
    . . e e 1 1 1 1 1 1 1 e e . . . 
    . e 1 1 1 1 1 2 1 1 1 1 1 e . . 
    . e 1 f 1 1 1 2 1 1 1 8 1 e . . 
    e 1 1 1 f 1 1 1 1 1 8 1 1 1 e . 
    e 1 1 1 1 f 1 1 1 1 1 1 1 1 e . 
    e 1 1 1 1 1 f 1 1 1 1 1 1 1 e . 
    e 1 8 8 1 1 1 5 1 1 1 8 8 1 e . 
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 e . 
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 e . 
    e 1 1 1 8 1 1 1 1 1 8 1 1 1 e . 
    . e 1 8 1 1 1 8 1 1 1 8 1 e . . 
    . e 1 1 1 1 1 8 1 1 1 1 1 e . . 
    . . e e 1 1 1 1 1 1 1 e e . . . 
    . . . . e e e e e e e . . . . . 
    . . . . . . . . . . . . . . . . 
    `
]
thePlayer = sprites.create(img`
    . . . . . . e e e . . . . . . . 
    . . . . 1 1 1 e 1 1 1 . . . . . 
    . . . . 1 1 1 e f f 1 . . . . . 
    . . . . 1 1 1 e f f 1 . . . . . 
    . . . . 1 1 1 e 1 1 1 . . . . . 
    . . . . 1 1 1 1 1 1 1 . . . . . 
    . . . . 1 1 1 1 1 1 1 . . . . . 
    . . . . . . . e . . . . . . . . 
    . . . . . . . e . . . . . . . b 
    b b . . . . e e . . . . . b b b 
    e e e e e e e e e e e e e e e b 
    b b b b b b b b b b b b b b b . 
    . e e e e e e e e e e e e e . . 
    . b b b b b b b b b b b b b . . 
    . . e e e e e e e e e e e . . . 
    . . . . 1 1 1 1 1 1 1 . . . . . 
    `, SpriteKind.Player)
theCompass = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.compass)
theCompass.setFlag(SpriteFlag.RelativeToCamera, true)
theCompass.setPosition(150, 110)
controller.moveSprite(thePlayer)
scene.cameraFollowSprite(thePlayer)
foundBottle = false
loadGame()
createBottle()
/**
 * pirate things:
 * 
 * 1.find treasure!
 * 
 * 2.follow maps
 * 
 * 3.avoid krakens
 */
/**
 * player .x - bottle .x < 80
 * 
 * AND
 * 
 * player .y - bottle .y < 60
 */
game.onUpdate(function () {
    if (thePlayer.tileKindAt(TileDirection.Center, assets.tile`myTile`)) {
        thePlayer.setImage(img`
            . . . . . . e e e . . . . . . . 
            . . . . 1 1 1 e 1 1 1 . . . . . 
            . . . . 1 1 1 e f f 1 . . . . . 
            . . . . 1 1 1 e f f 1 . . . . . 
            . . . . 1 1 1 e 1 1 1 . . . . . 
            . . . . 1 1 1 1 1 1 1 . . . . . 
            . . . . 1 1 1 1 1 1 1 . . . . . 
            . . . . . . . e . . . . . . . . 
            . . . . . . . e . . . . . . . b 
            b b . . . . e e . . . . . b b b 
            e e e e e e e e e e e e e e e b 
            b b b b b b b b b b b b b b b . 
            . e e e e e e e e e e e e e . . 
            . b b b b b b b b b b b b b . . 
            . . e e e e e e e e e e e . . . 
            . . . . 1 1 1 1 1 1 1 . . . . . 
            `)
    } else {
        thePlayer.setImage(img`
            . . . . . f f f f f . . . . . . 
            . . . . f f 1 1 1 f f . . . . . 
            . . . . f 1 f 1 f 1 f . . . . . 
            . . . . f 1 1 1 1 1 f . . . . . 
            . 5 5 . f f 1 f 1 f f . 5 5 . . 
            . f 5 5 f f f f f f f 5 5 f . . 
            . f f f f f f f f f f f f f . . 
            . . . . b b 1 b 1 b b . . . . . 
            . . . 2 b b b b b b b . . . . . 
            . . . 7 . b b b b b . . . . . . 
            . . . 2 2 2 2 2 2 2 2 2 . . . . 
            . . e . e e e e e e e . e . . . 
            . . 2 . 2 2 2 2 2 2 2 . 2 . . . 
            . . 5 . e e e e e e e . b . . . 
            . . . . 8 8 8 8 8 8 8 . . . . . 
            . . . . . 8 . . . e . . . . . . 
            `)
    }
})
game.onUpdateInterval(1000, function () {
    saveGame()
})
