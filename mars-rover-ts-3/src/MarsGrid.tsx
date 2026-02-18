import { ReactElement } from "react";

function MarsGrid() {
    const xLimit = 10;
    const yLimit = 10;

    let squares: ReactElement[] = [];

    function buildGrid() {
        for (let yCoord = yLimit - 1; yCoord >= 0; yCoord--) {
            squares.push(...buildRow(yCoord));
        }
    }

    function buildRow(yCoord: number): ReactElement[] {
        let row = [];
        for (let xCoord = 0; xCoord < xLimit; xCoord++) {
            row.push(buildSquare(xCoord, yCoord));
        }
        return row;
    }

    function buildSquare(xCoord: number, yCoord: number) {
        return <span
            aria-label={`square at x${xCoord} y${yCoord}`}
            key={`${xCoord}-${yCoord}`}
            className="border-2 p-1 size-12">
            {(xCoord == 0 && yCoord == 0) && "^"}
        </span>
    }

    buildGrid();

    return (<div className='grid grid-cols-10' aria-label={`Mars rover grid`}>
        {squares}
    </div>);
}

export default MarsGrid;