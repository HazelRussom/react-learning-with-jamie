import { render, screen, within } from "@testing-library/react";
import MarsGrid from "./MarsGrid";

describe("MarsGrid should", () => {
    it("Render a grid", () => {
        render(<MarsGrid />);

        expect(screen.getByLabelText("Mars rover grid")).toBeVisible();
    });

    it.each(
        [[0, 0], [0, 1], [2, 0], [9, 9]]
    )
        ('Render square inside grid at coordinates %s,%s', (xCoord: number, yCoord: number) => {
            render(<MarsGrid />);

            const grid = screen.getByLabelText("Mars rover grid")
            expect(within(grid).getByLabelText(`square at x${xCoord} y${yCoord}`)).toBeVisible();
        });

    it.each(
        [[0, 1], [2, 0], [9, 9]]
    )
        ('Render empty square inside grid at coordinates %s,%s', (xCoord: number, yCoord: number) => {
            render(<MarsGrid />);

            const grid = screen.getByLabelText("Mars rover grid")
            expect(within(grid).getByLabelText(`square at x${xCoord} y${yCoord}`)).toBeEmptyDOMElement();
        });

    it("Render the Mars Rover at coordinates 0, 0", () => {
        render(<MarsGrid />);

        const grid = screen.getByLabelText("Mars rover grid")
        const expectedRoverSquare = within(grid).getByLabelText("square at x0 y0");

        expect(expectedRoverSquare).toHaveTextContent("^");
    });

    it('Render 0,0 at the correct grid location', () => {
        render(<MarsGrid />);

        const ninetiethItem = screen.getAllByLabelText(/^square at/i)[90];

        expect(ninetiethItem).toHaveAttribute('aria-label', 'square at x0 y0');
    });
});