import { features } from "process";
import { AnalyticsRecorder } from "./interfaces/AnalyticsRecorder";
import { Coords2d } from "./Coords2d";
import { Game } from "./game";
import { GoogleAnalyticsRecorder } from "./GoogleAnalyticsRecorder";
import { ScoreLocalStorage } from "./ScoreLocalStorage";

const scoreLocalStorage = new ScoreLocalStorage();
let analyticsRecorder: AnalyticsRecorder;

fetch("./featureToggle.json")
    .then(response => response.json())
    .then(featureToggleDataObject => {
        if(featureToggleDataObject.analytics){
            console.log("activating google analytics");
            analyticsRecorder = new GoogleAnalyticsRecorder(scoreLocalStorage);
        }else{
            console.log("google analytics off");
            // assign empty class implementation of Analytics interface if feature toggle for analytics is turned off - 
            // this prevents me from having to write if or else statements everywhere in code, instead i can just write one initial -
            // if/else statement at start here
            analyticsRecorder = new class implements AnalyticsRecorder{
                recordPageVisit(): void {}
                recordUserScore(): void {}
            };
        }
        
        analyticsRecorder.recordPageVisit(); // collect browser visited from aswell
        // and create a uuid for user and store in local storage or re-use if already exists
    });



var c = document.getElementById("canvas");
// @ts-ignore
var ctx = c.getContext("2d");

export {ctx};

ctx.textAlign = "center";
ctx.font = 'bold 28px arial';
ctx.fillStyle = "lime";
ctx.fillText("click to start", 200, 200);

var memorizeC = document.getElementById("memorizeTime");
// @ts-ignore
var memorizeCtx = memorizeC.getContext("2d");

scoreLocalStorage.addScoreChangeListener(() => {
    // @ts-ignore
    document.getElementById("score").innerHTML = "high score = " + scoreLocalStorage.getScore();
    analyticsRecorder.recordUserScore();
});

const game = new Game(2500, scoreLocalStorage);

game.addGameListener((game: Game) => {
    memorizeCtx.clearRect(0,0,10000,10000);
    memorizeCtx.fillStyle = "lime";
    const memorizeTimeAsFraction = game.currentMemorizeTimeElapsed / game.maxMemorizeTime;
    if(game.currentMemorizeTimeElapsed / game.maxMemorizeTime < 1){
        memorizeCtx.fillRect(0,0, 400 * memorizeTimeAsFraction, 1000);
    }else{
        memorizeCtx.fillRect(0,0, 400, 1000);
    }

    memorizeCtx.textAlign = "center";
    memorizeCtx.font = 'bold 25px arial';
    memorizeCtx.fillStyle = "white";
    // memorizeCtx.fo
    memorizeCtx.fillText("memorize time ⧖", 200, 21);
});



function touchEvent(canvas, e){
    if(game.gameOver)
        game.restart = true;
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

let gameStarted = false;
// @ts-ignore
c.addEventListener("click", function(e){
    if(!gameStarted){
        game.init();
        gameStarted = true;
    }
})


