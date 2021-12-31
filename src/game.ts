import { BufferGeneric } from "./BufferGeneric";
import { Coords2d } from "./Coords2d";
import { ctx } from ".";
import { TapVisual } from "./TapVisual";

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

    constructor(){
        this.userTapsBuffer = new BufferGeneric(10);
    }

    gameOver(){

    }

    init(){
        // start update loop here
        this.time = Date.now();
        this.update(); // start via window request animation frame instead?
    }

    update(){
        this.draw();
        const currentTime = Date.now();
        const delta = currentTime - this.time;
        this.time = currentTime;

        if(this.userTapsBuffer.buffer.length > 0){
            const point: Coords2d | undefined = this.userTapsBuffer.get();
            if(point)
                this.tapVisuals.push(new TapVisual(point.x, point.y, 20));
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
    ctx.clearRect(0, 0, 10000, 10000);
    game.tapVisuals.forEach((tapVisual: TapVisual, i) => {
        tapVisual.draw2dWeb(ctx);
    });
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