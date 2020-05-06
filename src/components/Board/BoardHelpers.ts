import { CELL_EMPTY, CELL_MINE, TCell } from '../Cell/Cell';

export type TCoordinate = { row: number; cell: number };

type TBoard = TCell[][];

// Run a callback on non-mine neighbors of a cell.
function neighbors(
  board: TBoard,
  c: TCoordinate,
  cellFn: (cell: TCell, c: TCoordinate) => void
) {
  [-1, 0, 1].forEach((deltaRow) => {
    [-1, 0, 1].forEach((deltaCell) => {
      if (!deltaRow && !deltaCell) return;

      const neighbor = { row: c.row + deltaRow, cell: c.cell + deltaCell };

      // Ignore coordinates out of bounds.
      if (!board[neighbor.row] || !board[neighbor.row][neighbor.cell]) return;

      if (board[neighbor.row][neighbor.cell].value !== CELL_MINE) {
        cellFn(board[neighbor.row][neighbor.cell], neighbor);
      }
    });
  });
}

// Create new board with random mines.
export function initBoard(
  width: number,
  height: number,
  mines: number
): TBoard {
  // FIXME: What's a nice way to init a matrix of objects?
  const board = Array(height)
    .fill(null)
    .map(() =>
      Array(width)
        .fill(null)
        .map(() => ({
          pressed: false,
          value: 0,
          flagged: false,
        }))
    );

  // Plant mines.
  [...Array(mines)].forEach(() => {
    // Keep creating random coordinates until an empty spot is found, then add
    // a mine there.
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const c = {
        row: Math.floor(Math.random() * height),
        cell: Math.floor(Math.random() * width),
      };

      if (board[c.row][c.cell].value !== CELL_MINE) {
        board[c.row][c.cell].value = CELL_MINE;

        neighbors(board, c, (cell) => {
          // eslint-disable-next-line no-param-reassign
          cell.value += 1;
        });
        break;
      }
    }
  });
  return board;
}

// Return a copy of the board, with one cell changed.
export function setCell(
  board: TBoard,
  c: TCoordinate,
  pressed: boolean,
  value: number | null,
  flagged: boolean
): TBoard {
  const newValue = value === null ? board[c.row][c.cell].value : value;
  const newBoard = [...board];
  newBoard[c.row] = [...board[c.row]];
  newBoard[c.row][c.cell] = { pressed, value: newValue, flagged };

  return newBoard;
}

// Create a copy of the board.
function copyBoard(board: TBoard): TBoard {
  return board.map((row) =>
    row.map((cell) => ({
      pressed: cell.pressed,
      value: cell.value,
      flagged: cell.flagged,
    }))
  );
}

// Revealing the neighbors of empty cells.
export function floodEmptyCells(board: TBoard, initC: TCoordinate): TBoard {
  const newBoard = copyBoard(board);

  // For each empty cell, adding all of its empty neighbors to a queue, and
  // repeating until the queue is empty.
  // Initialize the queue with the empty cell clicked.
  const queue: TCoordinate[] = [initC];
  while (queue.length) {
    const c = queue.shift();
    // This condition is just to satisfy the compiler. The queue is only
    // shifted when not empty.
    if (!c) break;

    if (newBoard[c.row][c.cell].pressed) {
      continue;
    }

    newBoard[c.row][c.cell].pressed = true;

    neighbors(newBoard, c, (neighbor, neighborC) => {
      if (neighbor.flagged) return;

      // Reveal cell neighbors.
      // eslint-disable-next-line no-param-reassign
      if (neighbor.value > CELL_EMPTY) neighbor.pressed = true;

      // Add empty cells to the flood queue.
      if (neighbor.value === CELL_EMPTY) queue.push(neighborC);
    });
  }
  return newBoard;
}

// Checks that each cell is either not a mine or a flagged mine.
export function allMinesFlagged(board: TBoard): boolean {
  const cellFlaggedOk = ({ flagged, value }: TCell) =>
    value !== CELL_MINE || (value === CELL_MINE && flagged);

  return board.every((row) => row.every(cellFlaggedOk));
}
