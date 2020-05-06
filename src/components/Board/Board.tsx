import React, { useState, useEffect } from 'react';

import Cell, { CELL_EMPTY, CELL_MINE, TCell } from '../Cell/Cell';
import {
  initBoard,
  allMinesFlagged,
  setCell,
  floodEmptyCells,
  TCoordinate,
} from './BoardHelpers';

import './Board.scss';

export const GameState = Object.freeze({
  ongoing: 'ongoing',
  won: 'won',
  lost: 'lost',
});

type Props = {
  restartFlag: boolean;
  width: number;
  height: number;
  mines: number;
  xray: boolean;
  flags: number;
  setFlags: (flags: number) => void;
  setAlert: (alert: string) => void;
  gameState: string;
  setGameState: (state: string) => void;
};

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
}: Props) {
  const [board, setBoard] = useState(initBoard(width, height, mines));

  const coordinateKey = (c: TCoordinate) => `${c.row}_${c.cell}`;

  // Rebuild the board when the config changes, or when new game is started
  // (restart flag flips).
  useEffect(() => {
    setBoard(initBoard(width, height, mines));
  }, [restartFlag, width, height, mines]);

  const pressCell = (c: TCoordinate) => {
    // Ignore press on flagged and pressed cells.
    const { flagged, pressed, value } = board[c.row][c.cell];
    if (flagged || pressed) return;

    switch (value) {
      case CELL_MINE:
        setGameState(GameState.lost);
        setBoard(setCell(board, c, true, null, false));
        setAlert('game over');
        break;

      case CELL_EMPTY:
        // "Flood fill" empty cells.
        setBoard(floodEmptyCells(board, c));
        break;

      default:
        // Pressed a mine neighbour. Mark it as pressed.
        setBoard(setCell(board, c, true, null, false));
    }
  };

  const toggleFlag = (c: TCoordinate) => {
    const { flagged, pressed } = board[c.row][c.cell];

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
    const boardNew = setCell(board, c, false, null, !flagged);
    setBoard(boardNew);
    // Check if all mines are flagged correctly when all flags are used.
    if (flagsNew === mines && allMinesFlagged(boardNew)) {
      setGameState(GameState.won);
      setAlert('game won');
    }
  };

  const renderCell = (c: TCoordinate) => {
    const onClick = (event: React.MouseEvent) => {
      if (gameState !== GameState.ongoing) return;

      if (event.shiftKey) toggleFlag(c);
      else pressCell(c);
    };

    return (
      <Cell
        key={coordinateKey(c)}
        cell={board[c.row][c.cell]}
        xray={xray}
        onClick={onClick}
      />
    );
  };

  const renderRow = (row: TCell[], rowIndex: number) => (
    <div key={rowIndex} className="row">
      {row.map((_, cell) => renderCell({ row: rowIndex, cell }))}
    </div>
  );

  return <div className="board debossed">{board.map(renderRow)}</div>;
}
