export class TapVisual{
    x: number;
    y: number;
    maxRadius: number;
    currentRadius: number;
    hasFinished: boolean;
    UPDATE_SPEED: number = 1000 / 60;
    INCREMENT_SPEED: number = 1.2;
    lastTime: number; 
    delta: number;

    constructor(x: number, y: number, maxRadius: number){
        this.x = x;
        this.y = y;
        this.maxRadius = maxRadius;
        this.currentRadius = 0;
        this.lastTime = Date.now();
        this.hasFinished = false;
        this.delta = 0;
        console.log("new");
    }

    // examine logic here, something may be wrong
    update(time: number){
        if(this.hasFinished)
            return;
        const timeElapsed = time - this.lastTime;
        // console.log(timeElapsed);
        if(timeElapsed >= (this.UPDATE_SPEED) && this.currentRadius < this.maxRadius){
            this.delta = timeElapsed - this.UPDATE_SPEED;
            this.currentRadius += this.INCREMENT_SPEED;
         
            if(this.currentRadius >= this.maxRadius)
                this.hasFinished = true;
            this.lastTime = time;
        }
    }

    draw2dWeb(ctx: CanvasRenderingContext2D){
        if(this.currentRadius >= this.maxRadius)
            return;
        ctx.beginPath();
        ctx.strokeStyle = "cyan";
        ctx.lineWidth = 7;
        ctx.arc(this.x, this.y, this.currentRadius * window.devicePixelRatio , 0, 2*Math.PI);
        ctx.stroke();  
    }
}


