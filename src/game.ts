import { BufferGeneric } from "./BufferGeneric";
import { Coords2d } from "./Coords2d";
import { ctx } from ".";
import { TapVisual } from "./TapVisual";
import { HittableCircle } from "./HittableCircle";

function generateRandomPointWithinRect(width: number, height: number, boxPadding: number){
    const x = boxPadding + Math.round(Math.random() * (width - (boxPadding * 2)));
    const y = boxPadding + Math.round(Math.random() * (height - (boxPadding * 2)));
    return new Coords2d(x, y);
}

export function generatePoints(width: number, height: number, n: number, radius: number): Coords2d[]{
    let points: Coords2d[] = [];

    for(let i = 0; i < n; i++){
        while(true){
            let isValidPoint = true;
            const point = generateRandomPointWithinRect(width, height, radius);
            for(let j = 0; j < points.length; j++){
                if(point.getDistance(points[j]) < radius * 2){
                    isValidPoint = false;
                    break;
                }
            }
            if(isValidPoint){
                points.push(point);   
                break;
            }
        }
    }
    return points;
}

export class Game{
    // timeToCompleteLevel: number;
    // maxNumberOfMissTapsAloud: number;
    userTapsBuffer: BufferGeneric<Coords2d>;
    tapVisuals: TapVisual[] = [];
    time: any;
    currentTime: any;
    hittableCircles: HittableCircle[];
    legalHittableCircleIndex: number = 0;
    gameOver: boolean = false;
    maxMemorizeTime: number; // in milliseconds
    startingMemorizeTime: number;
    currentMemorizeTimeElapsed: number;
    nOfHittableCircles: number; 
    levelComplete: boolean;

    constructor(maxMemorizeTime){
        this.userTapsBuffer = new BufferGeneric(10);
        this.hittableCircles = [];
        this.maxMemorizeTime = maxMemorizeTime;
        this.startingMemorizeTime = 0;
        this.currentMemorizeTimeElapsed = 0;
        this.nOfHittableCircles = 2; // start game with just 2 hittable circles
        this.levelComplete = false;
    }

    init(){
        // start update loop here
        this.time = Date.now();
        this.hittableCircles = generatePoints(400, 400, this.nOfHittableCircles, 40).map(
            (coords2d: Coords2d) => {
                return new HittableCircle(coords2d, 40);
            });
        this.legalHittableCircleIndex = 0;
        this.gameOver = false;
        this.startingMemorizeTime = Date.now();
        this.currentMemorizeTimeElapsed = 0;
        this.levelComplete = false;
        this.update(); // start via window request animation frame instead?
    }

    processPointIfCollidesWithCircles(point: Coords2d){
        this.hittableCircles.forEach((hittableCircle: HittableCircle, i: number) => {
            if(point.getDistance(hittableCircle.coords2d) < hittableCircle.radius){
                hittableCircle.isHit = true;

                if(i == this.legalHittableCircleIndex){
                    this.legalHittableCircleIndex++;
                }else{
                    this.gameOver = true;
                    console.log("gameover");
                    const score: string | null = localStorage.getItem("score");
                    console.log(score);
                    const scoreAsNumber: number | null = score ? Number(score) : null;

                    if(!score){
                        console.log("set score");
                        localStorage.setItem("score", String(this.nOfHittableCircles - 1));
                    }

                    if(scoreAsNumber){
                        console.log("update score");
                        if(this.nOfHittableCircles > scoreAsNumber){
                            localStorage.setItem("score", String(this.nOfHittableCircles - 1));
                        }
                    }
                }
                
                // win
                if(this.legalHittableCircleIndex == this.hittableCircles.length){
                    this.nOfHittableCircles++;
                    this.levelComplete = true;
                }
            }
        })
    }

    update(){
        this.draw();
        if(this.gameOver){
            window.alert("GAME OVER! refresh page to try again!");
            return;
        }

        if(this.levelComplete){
            return this.init();
        }

        // time
        const currentTime = Date.now();
        const delta = currentTime - this.time;
        this.time = currentTime;

        this.currentMemorizeTimeElapsed = Date.now() - this.startingMemorizeTime;

        if(this.userTapsBuffer.buffer.length > 0){
            const point: Coords2d | undefined = this.userTapsBuffer.get();
            if(point){
                if(this.currentMemorizeTimeElapsed > this.maxMemorizeTime){
                    this.processPointIfCollidesWithCircles(point);
                }
                this.tapVisuals.push(new TapVisual(point.x, point.y, 20));
            }
        }

        deleteFinishedTapVisuals(this.tapVisuals);

        this.tapVisuals.forEach((tapVisual: TapVisual, i) => {
            tapVisual.update(this.time);
        });

        window.requestAnimationFrame(_ => this.update());
    }

    draw(){
        draw2d(this);
    }
}


function draw2d(game: Game){
    ctx.save();
    ctx.clearRect(0, 0, 10000, 10000);
    game.hittableCircles.forEach((hittableCircle: HittableCircle, i: number) => {
        ctx.beginPath();
        ctx.strokeStyle = "lime";
        ctx.textAlign = "center";
        ctx.lineWidth = 4;
        if(game.currentMemorizeTimeElapsed < game.maxMemorizeTime || hittableCircle.isHit){
            ctx.font = '48px arial';
            ctx.strokeText(i + 1, hittableCircle.coords2d.x, hittableCircle.coords2d.y);
        }
        

        ctx.arc(hittableCircle.coords2d.x, hittableCircle.coords2d.y, 
            hittableCircle.radius, 0, 2 * Math.PI);
        ctx.stroke();
    });

    game.tapVisuals.forEach((tapVisual: TapVisual, i) => {
        tapVisual.draw2dWeb(ctx);
    });
    ctx.restore();
}

// deletes (mutuates original array) tap visual objects from array which are marked with hasFinished = true
export function deleteFinishedTapVisuals(tapVisuals: TapVisual[]){
    let indicesOfVisualObjectsThatNeedDeletion: number[] = [];
    tapVisuals.forEach((tapVisual: TapVisual, i) => {
        if(tapVisual.hasFinished)
            indicesOfVisualObjectsThatNeedDeletion.push(i);
    });

    let indiciesOfTapVisualsToRemoveReverse = indicesOfVisualObjectsThatNeedDeletion.reverse();
    for(let i = 0; i < indiciesOfTapVisualsToRemoveReverse.length; i++){
        tapVisuals.splice(indiciesOfTapVisualsToRemoveReverse[i], 1);
    }
}