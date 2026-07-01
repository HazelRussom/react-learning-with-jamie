import { Coordinate } from "./Coordinate.ts";
import {Pose} from "./Pose.ts";

// TODO: make Pose immutable - see MR2.
export class MarsRoverController {
    execute(command: string, startingPose: Pose): Pose {
        for (const char of command) {
            if (char == "R") {
                startingPose = startingPose.turnRight();
            } else if (char == "L") {
                startingPose = startingPose.turnLeft();
            } else if (char == "M") {
                new Coordinate().move();
            } else {
                throw new Error(`Unrecognised command: ${char}`);
            }
        }

        return startingPose;
    }
}
