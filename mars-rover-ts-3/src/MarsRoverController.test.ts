import { MarsRoverController } from "./MarsRoverController.ts";
import { Coordinate } from "./Coordinate.ts";

import { vi } from "vitest";
import {Pose} from "./Pose.ts";
import { Compass } from "./Compass.ts";

vi.mock("./Pose");

describe("MarsRoverController", () => {
    let defaultPose = new Pose(new Compass("N"));
    let turnRightFunction = vi.fn();
    let turnLeftFunction = vi.fn();

    beforeEach(() => {
        turnLeftFunction = vi.fn(function (this: Pose) {
            return this;
        });
        Pose.prototype.turnLeft = turnLeftFunction;

        turnRightFunction = vi.fn(function (this: Pose) {
            return this;
        });
        Pose.prototype.turnRight = turnRightFunction;

        defaultPose = new Pose(new Compass("N"));
    })

    it('should handle unrecognised command', () => {
        let controller = new MarsRoverController();

        expect(() => controller.execute("UL", defaultPose)).toThrow("Unrecognised command");
    });

    it.each([
        ["L", 1],
        ["LL", 2],
        ["LLL", 3],
        ["LLLL", 4],
        ["LLLLL", 5],
        ["LLLLLL", 6],
        ["LLLLLLLLLL", 10],
    ])(
        "when command is %s, should turn left %d times",
        (command, expectedTurnCount) => {
           let controller = new MarsRoverController();

            controller.execute(command, defaultPose);

            expect(turnLeftFunction).toHaveBeenCalledTimes(expectedTurnCount);
        }
    );

    it.each([
        ["R", 1],
        ["RR", 2],
        ["RRR", 3],
        ["RRRR", 4],
        ["RRRRR", 5],
        ["RRRRRR", 6],
        ["RRRRRRRRRR", 10],
    ])(
        "when command is %s, should turn right to face %s",
        (command, expectedTurnCount) => {
            let controller = new MarsRoverController();

            controller.execute(command, defaultPose);

            expect(turnRightFunction).toHaveBeenCalledTimes(expectedTurnCount);
        }
    );
    
    it.each([
        ["LR", 1, 1],
        ["LRRLLRL", 4, 3],
    ])(
        "when command is %s, should turn left %d times and right %d times",
        (command, expectedLeftTurns, expectedRightTurns) => {
            let controller = new MarsRoverController();

            controller.execute(command, defaultPose);

            expect(turnRightFunction).toHaveBeenCalledTimes(expectedRightTurns);
            expect(turnLeftFunction).toHaveBeenCalledTimes(expectedLeftTurns);
        }
    );

    
    it.skip("when command is M, should not throw an error", () => {
            let controller = new MarsRoverController();

            expect(() => controller.execute("M", defaultPose)).not.toThrow();
        }
    );

    
    it.skip("when command is M, should tell coordinate to move", () => {
            let moveFunction = vi.fn();
        
            Coordinate.prototype.move = moveFunction;
            let controller = new MarsRoverController();
        
            controller.execute("M", defaultPose);
                
            expect(moveFunction).toHaveBeenCalledTimes(1);
        }
    );

    // it.each([
    //     ["M", 0, 1],
    // ])(
    //     "when command is %s, should move to %s, %s",
    //     (command, expectedX, expectedY) => {
    //         let controller = new MarsRoverController();
    //
    //         let pose = controller.execute(command);
    //
    //         let coordinate = pose.getCoordinate();
    //         expect(coordinate.x).toBe(expectedX);
    //         expect(coordinate.y).toBe(expectedY);
    //     }
    // );
    
    it.skip("should maintain state after executing", ()  => {
        
        let expectedDirection = "S"
        let controller = new MarsRoverController();
        let mockedPose = vi.mocked(Pose);
            let poseInstance = mockedPose.mock.instances[-1];
            
            controller.execute("R", defaultPose);
            let pose = controller.execute("R", defaultPose);

            expect(poseInstance.turnRight).toHaveBeenCalledTimes(2);

            // expect(pose.getDirection()).toBe(expectedDirection);
        }
    );
});