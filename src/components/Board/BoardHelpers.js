import { CELL_EMPTY, CELL_MINE } from '../Cell/Cell';

// Run a callback on non-mine neighbors of a cell.
function neighbors(board, i, j, cellFn) {
  [-1, 0, 1].forEach((deltaI) => {
    [-1, 0, 1].forEach((deltaJ) => {
      if (!deltaI && !deltaJ) return;

      const neighborI = i + deltaI;
      const neighborJ = j + deltaJ;
      // Ignore coordinates out of bounds.
      if (!board[neighborI] || !board[neighborI][neighborJ]) return;

      if (board[neighborI][neighborJ].value !== CELL_MINE) {
        cellFn(board[neighborI][neighborJ], neighborI, neighborJ);
      }
    });
  });
}

// Create new board with random mines.
export function initBoard(width, height, mines) {
  const arrayFillMap = (length, map) => Array(length).fill(null).map(map);

  const board = arrayFillMap(height, () =>
    arrayFillMap(width, () => ({
      pressed: false,
      value: 0,
      flagged: false,
    })),
  );

  // Plant mines.
  [...Array(mines)].forEach(() => {
    // Keep creating random coordinates until an empty spot is found, then add
    // a mine there.
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const i = Math.floor(Math.random() * height);
      const j = Math.floor(Math.random() * width);
      if (board[i][j].value !== CELL_MINE) {
        board[i][j].value = CELL_MINE;

        neighbors(board, i, j, (cell) => {
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
export function setCell(board, i, j, pressed, value, flagged) {
  const newValue = value === null ? board[i][j].value : value;
  const newBoard = [...board];
  newBoard[i] = [...board[i]];
  newBoard[i][j] = { pressed, value: newValue, flagged };

  return newBoard;
}

// Create a copy of the board.
function copyBoard(board) {
  return board.map((row) =>
    row.map((cell) => ({
      pressed: cell.pressed,
      value: cell.value,
      flagged: cell.flagged,
    })),
  );
}

// Revealing the neighbors of empty cells.
export function floodEmptyCells(board, initI, initJ) {
  const newBoard = copyBoard(board);

  // For each empty cell, adding all of its empty neighbors to a queue, and
  // repeating until the queue is empty.
  // Initialize the queue with the empty cell clicked.
  const queue = [[initI, initJ]];
  while (queue.length) {
    const [i, j] = queue.shift();

    if (newBoard[i][j].pressed) {
      continue;
    }

    newBoard[i][j].pressed = true;

    neighbors(newBoard, i, j, (neighbor, neighborI, neighborJ) => {
      if (neighbor.flagged) return;

      // Reveal cell neighbors.
      // eslint-disable-next-line no-param-reassign
      if (neighbor.value > CELL_EMPTY) neighbor.pressed = true;

      // Add empty cells to the flood queue.
      if (neighbor.value === CELL_EMPTY) queue.push([neighborI, neighborJ]);
    });
  }
  return newBoard;
}

// Checks that each cell is either not a mine or a flagged mine.
export function allMinesFlagged(board) {
  const cellFlaggedOk = ({ flagged, value }) =>
    value !== CELL_MINE || (value === CELL_MINE && flagged);

  return board.every((row) => row.every(cellFlaggedOk));
}
