export class Coords2d{
    x: number;
    y: number;
    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    getInterpolatedCoords2d(coords2d: Coords2d, fraction: number): Coords2d{
        const xOffset = coords2d.x - this.x; 
        const yOffset = coords2d.y - this.y;
        return new Coords2d(
            this.x + (xOffset * fraction),
            this.y + (yOffset * fraction)
        );
    }

    getDistance(coords2d: Coords2d): number{
        return Math.sqrt(Math.pow(this.x - coords2d.x, 2) + Math.pow(this.y - coords2d.y, 2));
    }
}