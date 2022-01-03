import { Coords2d } from "./Coords2d";
import { Game } from "./game";
import { ScoreLocalStorage } from "./ScoreLocalStorage";

var c = document.getElementById("canvas");
// @ts-ignore
var ctx = c.getContext("2d");

export {ctx};

var memorizeC = document.getElementById("memorizeTime");
// @ts-ignore
var memorizeCtx = memorizeC.getContext("2d");

const scoreLocalStorage = new ScoreLocalStorage();
const game = new Game(2500, scoreLocalStorage);

memorizeCtx.textAlign = "center";
game.addGameListener((game: Game) => {
    memorizeCtx.clearRect(0,0,10000,10000);
    memorizeCtx.fillStyle = "lime";
    const memorizeTimeAsFraction = game.currentMemorizeTimeElapsed / game.maxMemorizeTime;
    if(game.currentMemorizeTimeElapsed / game.maxMemorizeTime < 1){
        memorizeCtx.fillRect(0,0, Math.ceil(400 * memorizeTimeAsFraction), 1000);
    }else{
        memorizeCtx.fillRect(0,0, Math.ceil(400), 1000);
    }

    memorizeCtx.font = 'bold 25px arial';
    memorizeCtx.fillStyle = "white";
    // memorizeCtx.fo
    memorizeCtx.fillText("memorize time ⧖", 200, 21);

});

function touchEvent(canvas, e){
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var tapPosition: Coords2d = new Coords2d(x, y);
    game.userTapsBuffer.add(tapPosition);
}


// @ts-ignore
document.getElementById("score").innerHTML += "high score = " + scoreLocalStorage.getScore();


// @ts-ignore
c.addEventListener("click", function(e){touchEvent(c, e)});

game.init();

