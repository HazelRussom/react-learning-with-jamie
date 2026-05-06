import { Compass } from "./Compass.ts";
import { Coordinate } from "./Coordinate.ts";

export class MarsRoverController {
    compass = new Compass("N");
    
    
    execute(command: string): Compass{
        for (const char of command) {
            if (char == "R") {
                this.compass.turnRight();
            } else if (char == "L") {
                this.compass.turnLeft();
            } else if (char == "M") {
                new Coordinate().move();
            } else {
                throw new Error(`Unrecognised command: ${char}`);
            }
        }

        return this.compass;
    }
}
