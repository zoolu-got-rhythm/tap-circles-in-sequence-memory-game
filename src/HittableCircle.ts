import { Coords2d } from "./Coords2d";

export class HittableCircle{
    coords2d: Coords2d;
    radius: number;
    isHit: boolean;
    constructor(coords2d: Coords2d, radius: number){
        this.coords2d = coords2d;
        this.radius = radius;
        this.isHit = false;
    }
}