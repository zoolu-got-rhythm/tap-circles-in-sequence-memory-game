export class TapVisual{
    x: number;
    y: number;
    maxRadius: number;
    currentRadius: number;
    hasFinished: boolean;
    UPDATE_SPEED: number = 1000 / 60;
    INCREMENT_SPEED: number = 2;
    lastTime: number; 

    constructor(x: number, y: number, maxRadius: number){
        this.x = x;
        this.y = y;
        this.maxRadius = maxRadius;
        this.currentRadius = 0;
        this.lastTime = 0;
        this.hasFinished = false;
    }

    update(time: number, delta?: number){
        const timeElapsed = time - this.lastTime;
        this.lastTime = time;
        if(timeElapsed >= this.UPDATE_SPEED && this.currentRadius < this.maxRadius){
            this.currentRadius += this.INCREMENT_SPEED;
            if(this.currentRadius == this.maxRadius)
                this.hasFinished = true;
        }
    }

    draw2dWeb(ctx: CanvasRenderingContext2D){
        if(this.currentRadius >= this.maxRadius)
            return;
        ctx.beginPath();
        ctx.strokeStyle = "cyan";
        ctx.lineWidth = 7;
        ctx.arc(this.x,this.y,this.currentRadius,0,2*Math.PI);
        ctx.stroke();  
    }
}


