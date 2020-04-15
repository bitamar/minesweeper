import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cell, { CELL_EMPTY, CELL_MINE } from '../Cell/Cell';
import {
  initBoard,
  allMinesFlagged,
  setCell,
  floodEmptyCells,
} from './BoardHelpers';

import './Board.scss';

export const GameState = Object.freeze({
  ongoing: 'ongoing',
  won: 'won',
  lost: 'lost',
});

export default function Board({
  restartFlag,
  width,
  height,
  mines,
  xray,
  flags,
  setFlags,
  setAlert,
  gameState,
  setGameState,
}) {
  const [board, setBoard] = useState(initBoard(width, height, mines));

  const coordinateKey = (i, j) => `${i}_${j}`;

  // Rebuild the board when the config changes, or when new game is started
  // (restart flag flips).
  useEffect(() => {
    setBoard(initBoard(width, height, mines));
  }, [restartFlag, width, height, mines]);

  const pressCell = (i, j) => {
    // Ignore press on flagged and pressed cells.
    const { flagged, pressed, value } = board[i][j];
    if (flagged || pressed) return;

    switch (value) {
      case CELL_MINE:
        setGameState(GameState.lost);
        setBoard(setCell(board, i, j, true, null, false));
        setAlert('game over');
        break;

      case CELL_EMPTY:
        // "Flood fill" empty cells.
        setBoard(floodEmptyCells(board, i, j));
        break;

      default:
        // Pressed a mine neighbour. Mark it as pressed.
        setBoard(setCell(board, i, j, true, null, false));
    }
  };

  const toggleFlag = (i, j) => {
    const { flagged, pressed } = board[i][j];

    // Don't allow flagging pressed cells.
    if (pressed) return;
    // Don't allow adding more flags than mines.
    if (!flagged && mines <= flags) {
      setAlert('no more flags');
      return;
    }
    // Clear the "no flags" alert, update the flags counter and toggle the flag
    // on the board.
    setAlert('');
    const flagsNew = flags + (flagged ? -1 : 1);
    setFlags(flagsNew);
    const boardNew = setCell(board, i, j, false, null, !flagged);
    setBoard(boardNew);
    // Check if all mines are flagged correctly when all flags are used.
    if (flagsNew === mines && allMinesFlagged(boardNew)) {
      setGameState(GameState.won);
      setAlert('game won');
    }
  };

  const renderCell = (i, j) => {
    const onClick = (event) => {
      if (gameState !== GameState.ongoing) return;

      if (event.shiftKey) {
        toggleFlag(i, j);
      } else {
        pressCell(i, j);
      }
    };

    return (
      <Cell
        key={coordinateKey(i, j)}
        cell={board[i][j]}
        xray={xray}
        onClick={onClick}
      />
    );
  };

  const renderRow = (row, i) => (
    <div key={i} className="row">
      {row.map((_, j) => renderCell(i, j))}
    </div>
  );

  return <div className="board debossed">{board.map(renderRow)}</div>;
}

Board.propTypes = {
  restartFlag: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  mines: PropTypes.number.isRequired,
  xray: PropTypes.bool.isRequired,
  flags: PropTypes.number.isRequired,
  setFlags: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  gameState: PropTypes.string.isRequired,
  setGameState: PropTypes.func.isRequired,
};
