import { CELL_EMPTY, CELL_MINE, TCell as Cell } from '../Cell/Cell';

export type Coordinate = { row: number; cell: number };

type Board = Cell[][];

// Run a callback on non-mine neighbors of a cell.
function neighbors(
  board: Board,
  { row, cell }: Coordinate,
  cellFn: (cell: Cell, coordinate: Coordinate) => void
) {
  [-1, 0, 1].forEach((deltaRow) => {
    [-1, 0, 1].forEach((deltaCell) => {
      if (!deltaRow && !deltaCell) return;

      const neighbor = { row: row + deltaRow, cell: cell + deltaCell };

      // Ignore coordinates out of bounds.
      if (!board[neighbor.row] || !board[neighbor.row][neighbor.cell]) return;

      if (board[neighbor.row][neighbor.cell].value !== CELL_MINE) {
        cellFn(board[neighbor.row][neighbor.cell], neighbor);
      }
    });
  });
}

// Create new board with random mines.
export function initBoard(width: number, height: number, mines: number): Board {
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
  board: Board,
  { row, cell }: Coordinate,
  pressed: boolean,
  value: number | null,
  flagged: boolean
): Board {
  const newValue = value === null ? board[row][cell].value : value;
  const newBoard = [...board];
  newBoard[row] = [...board[row]];
  newBoard[row][cell] = { pressed, value: newValue, flagged };

  return newBoard;
}

// Create a copy of the board.
function copyBoard(board: Board): Board {
  return board.map((row) =>
    row.map((cell) => ({
      pressed: cell.pressed,
      value: cell.value,
      flagged: cell.flagged,
    }))
  );
}

// Revealing the neighbors of empty cells.
export function floodEmptyCells(board: Board, start: Coordinate): Board {
  const newBoard = copyBoard(board);

  // For each empty cell, adding all of its empty neighbors to a queue, and
  // repeating until the queue is empty.
  // Initialize the queue with the empty cell clicked.
  const queue: Coordinate[] = [start];
  while (queue.length) {
    const coordinate = queue.shift();
    // This condition is just to prevent a "possibly undefined" warning. The
    // queue is only shifted when not empty.
    if (!coordinate) break;

    if (newBoard[coordinate.row][coordinate.cell].pressed) continue;

    newBoard[coordinate.row][coordinate.cell].pressed = true;

    neighbors(newBoard, coordinate, (neighbor, neighborCoordinate) => {
      if (neighbor.flagged) return;

      // Reveal cell neighbors.
      // eslint-disable-next-line no-param-reassign
      if (neighbor.value > CELL_EMPTY) neighbor.pressed = true;

      // Add empty cells to the flood queue.
      if (neighbor.value === CELL_EMPTY) queue.push(neighborCoordinate);
    });
  }
  return newBoard;
}

// Checks that each cell is either not a mine or a flagged mine.
export function allMinesFlagged(board: Board): boolean {
  const cellFlaggedOk = ({ flagged, value }: Cell) =>
    value !== CELL_MINE || (value === CELL_MINE && flagged);

  return board.every((row) => row.every(cellFlaggedOk));
}
