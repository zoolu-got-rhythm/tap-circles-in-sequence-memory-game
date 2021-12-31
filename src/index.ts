// import { tapEffectModule } from "./tapEffect";
// var c = document.getElementById("canvas");

import { Coords2d } from "./Coords2d";
import { deleteFinishedTapVisuals, Game, generatePoints } from "./game";
import { TapVisual } from "./TapVisual";

const circleRadius = 40;

// tapEffectModule(c);
const points = generatePoints(400, 400, 4, circleRadius);
console.log(points);



var c = document.getElementById("canvas");
// @ts-ignore
var ctx = c.getContext("2d");

export {ctx};

const game = new Game();


function touchEvent(canvas, e){
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var tapPosition: Coords2d = new Coords2d(x, y);
    game.userTapsBuffer.add(tapPosition);
}

// @ts-ignore
c.addEventListener("click", function(e){touchEvent(c, e)});

// let tapVisuals: TapVisual[] = [];
// for(let i = 0; i < 5; i++){
//     tapVisuals.push(new TapVisual(i,0,20));
// }
// tapVisuals[2].hasFinished = true;
// tapVisuals[4].hasFinished = true;
// // console.log(tapVisuals);
// deleteFinishedTapVisuals(tapVisuals);
// console.log(tapVisuals);


game.init();


// ctx.strokeStyle = "lime";
// ctx.textAlign = "center";
// points.forEach((point: Coords2d, i: number)=>{
//     ctx.font = '48px arial';
//     ctx.strokeText(i + 1, point.x, point.y);

//     ctx.beginPath();
//     ctx.arc(point.x, point.y, circleRadius, 0, 2 * Math.PI);
//     ctx.stroke();
// })
