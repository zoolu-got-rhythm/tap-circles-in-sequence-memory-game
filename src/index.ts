// import { tapEffectModule } from "./tapEffect";
// var c = document.getElementById("canvas");

import { Coords2d } from "./Coords2d";
import { deleteFinishedTapVisuals, Game, generatePoints } from "./game";
import { TapVisual } from "./TapVisual";

const circleRadius = 40;

const points = generatePoints(400, 400, 4, circleRadius);

var c = document.getElementById("canvas");
// @ts-ignore
var ctx = c.getContext("2d");

export {ctx};

const game = new Game(2500);

function touchEvent(canvas, e){
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var tapPosition: Coords2d = new Coords2d(x, y);
    game.userTapsBuffer.add(tapPosition);
}

// @ts-ignore
c.addEventListener("click", function(e){touchEvent(c, e)});


game.init();

