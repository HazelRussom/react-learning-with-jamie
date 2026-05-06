import { MarsRoverController } from "./MarsRoverController.ts";
import { Coordinate } from "./Coordinate.ts";

import { vi } from "vitest";

vi.mock("./Coordinate");

describe("MarsRoverController", () => {
    it('should handle unrecognised command', () => {
        let controller = new MarsRoverController();

        expect(() => controller.execute("UL")).toThrow("Unrecognised command");
    });

    it.each([
        ["L", "W"],
        ["LL", "S"],
        ["LLL", "E"],
        ["LLLL", "N"],
        ["LLLLL", "W"],
        ["LLLLLL", "S"],
        ["LLLLLLLLLL", "S"],
    ])(
        "when command is %s, should turn left to face %s",
        (command, expectedDirection) => {
            let controller = new MarsRoverController();

            let pose = controller.execute(command);

            expect(pose.getDirection()).toBe(expectedDirection);
        }
    );

    it.each([
        ["R", "E"],
        ["RR", "S"],
        ["RRR", "W"],
        ["RRRR", "N"],
        ["RRRRR", "E"],
        ["RRRRRR", "S"],
        ["RRRRRRRRRR", "S"],
    ])(
        "when command is %s, should turn right to face %s",
        (command, expectedDirection) => {
            let controller = new MarsRoverController();

            let pose = controller.execute(command);

            expect(pose.getDirection()).toBe(expectedDirection);
        }
    );
    
    it.each([
        ["LR", "N"],
        ["LRRLLRL", "W"],
    ])(
        "when command is %s, should turn left and right to face %s",
        (command, expectedDirection) => {
            let controller = new MarsRoverController();

            let pose = controller.execute(command);

            expect(pose.getDirection()).toBe(expectedDirection);
        }
    );

    
    it("when command is M, should not throw an error", () => {
            let controller = new MarsRoverController();

            expect(() => controller.execute("M")).not.toThrow();
        }
    );

    
    it("when command is M, should tell coordinate to move", () => {
            let moveFunction = vi.fn();
        
            Coordinate.prototype.move = moveFunction;
            let controller = new MarsRoverController();
        
            controller.execute("M");
                
            expect(moveFunction).toHaveBeenCalledTimes(1);
        }
    );
    

    // it.each([
    //     ["M", 0, 1],
    // ])(
    //     "when command is %s, should move to %s, %s",
    //     (command, expectedX, expectedY) => {
    //         let controller = new MarsRoverController();

    //         let pose = controller.execute(command);

    //         let coordinate = pose.getCoordinate();
    //         expect(coordinate.x).toBe(expectedX);
    //         expect(coordinate.y).toBe(expectedY);
    //     }
    // );
    
    it("should maintain state after executing", ()  => {
            let expectedDirection = "S"
            let controller = new MarsRoverController();

            controller.execute("R");
            let pose = controller.execute("R");

            expect(pose.getDirection()).toBe(expectedDirection);
        }
    );
});