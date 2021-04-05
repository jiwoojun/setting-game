/**
 * pirate things:
 * 
 * 1.find treasure!
 * 
 * 2.follow maps
 * 
 * 3.avoid krakens
 */
function loadGame () {
    thePlayer.setPosition(blockSettings.readNumber("playerX"), blockSettings.readNumber("playerY"))
}
function saveGame () {
    blockSettings.writeNumber("playerX", thePlayer.x)
    blockSettings.writeNumber("playerY", thePlayer.y)
}
let thePlayer: Sprite = null
tiles.setTilemap(tilemap`level1`)
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
controller.moveSprite(thePlayer)
scene.cameraFollowSprite(thePlayer)
loadGame()
game.onUpdateInterval(1000, function () {
    saveGame()
})
