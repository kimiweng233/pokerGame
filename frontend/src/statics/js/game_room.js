const maxHeight = window.screen.availHeight
const maxWidth = window.screen.availWidth * 0.9
var game = document.getElementById("game")

game.style.height = maxHeight.toString() + "px"
game.style.width = maxWidth.toString() + "px"

reportWindowSize()

function reportWindowSize(){
    var heightProportion = window.innerHeight / maxHeight
    var widthProportion = window.innerWidth / maxWidth
    game.style.transform = "translate(-50%, -50%)scale("+Math.min(heightProportion, widthProportion).toString()+")"
}

window.onresize = reportWindowSize;
