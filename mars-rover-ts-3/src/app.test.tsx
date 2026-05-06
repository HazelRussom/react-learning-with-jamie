import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App.tsx";
import { MarsRoverController } from "./MarsRoverController";
import { vi } from "vitest";
import Mock = jest.Mock;
import { Compass } from "./Compass.ts";

vi.mock("./MarsRoverController");

vi.mock("./MarsGrid", () => ({
    default: ({ compass }: { compass: string }) => (
        <span data-testid="grid">{compass}</span>
    )
}));

let executeFunction: Mock<any, any>;

describe("App should", () => {
    beforeEach(() => {
        executeFunction = vi.fn();
        executeFunction.mockReturnValue(new Compass("N"));
        MarsRoverController.prototype.execute = executeFunction;
    });

    it("Render a grid", () => {
        render(<App />);

        const grid = screen.getByTestId("grid");

        expect(grid).toBeVisible();
    });

    it("Start with an empty command list", () => {
        render(<App />);

        const commandString = screen.getByLabelText("Command:");

        expect(commandString).toHaveValue("");
        expect(commandString).toBeDisabled();
    });

    it.each([
        [1, "L"],
        [2, "LL"],
        [5, "LLLLL"],
    ])(
        "Adds L to the command when we click Left",
        async (clickCount, expectedCommand) => {
            render(<App />);

            clickLeftButton(clickCount);

            assertCommandIs(expectedCommand);
        }
    );

    it.each([
        [1, "R"],
        [2, "RR"],
        [5, "RRRRR"],
    ])(
        "Adds R to the command when we click Right",
        async (clickCount, expectedCommand) => {
            render(<App />);

            clickRightButton(clickCount);

            assertCommandIs(expectedCommand);
        }
    );

    it.each([
        [1, "M"],
        [2, "MM"],
        [5, "MMMMM"],
    ])(
        "Adds M to the command when we click Move",
        async (clickCount, expectedCommand) => {
            render(<App />);

            clickMoveButton(clickCount);

            assertCommandIs(expectedCommand);
        }
    );


    it("sends an empty execute command to the controller", () => {
        render(<App />);

        clickExecuteButton();

        expect(executeFunction).toHaveBeenCalledTimes(1);

        expect(executeFunction).toHaveBeenCalledWith("");
    });

    it("sends execute command of M to the controller", () => {
        render(<App />);

        clickLeftButton();

        clickExecuteButton();

        expect(executeFunction).toHaveBeenCalledTimes(1);
        expect(executeFunction).toHaveBeenCalledWith("L");
    });

    it("should render grid with default starting coordinate", () => {
        render(<App />);

        const grid = screen.getByTestId("grid");

        expect(grid).toHaveTextContent("N");
    });

    it("should render grid with given coordinate", () => {
        executeFunction.mockReturnValue(new Compass("E"));

        render(<App />);

        clickExecuteButton();

        const grid = screen.getByTestId("grid");

        expect(grid).toHaveTextContent("E");
    });
});

function clickLeftButton(clickCount: number = 1) {
    const button = screen.getByRole("button", { name: "Left" });
    clickButton(button, clickCount);
}

function clickRightButton(clickCount: number = 1) {
    const button = screen.getByRole("button", { name: "Right" });
    clickButton(button, clickCount);
}

function clickMoveButton(clickCount: number = 1) {
    const button = screen.getByRole("button", { name: "Move" });
    clickButton(button, clickCount);
}

function clickExecuteButton() {
    const button = screen.getByRole("button", { name: "Execute" });
    clickButton(button, 1);
}

function clickButton(button: HTMLElement, clickCount: number = 1) {
    for (let i = 0; i < clickCount; i++) {
        fireEvent.click(button);
    }
}

function assertCommandIs(expectedCommand: string) {
    const commandString = screen.getByLabelText("Command:");
    expect(commandString).toHaveValue(expectedCommand);
}
