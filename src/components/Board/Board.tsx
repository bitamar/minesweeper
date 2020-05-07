import React, { useState, useEffect } from 'react';

import Cell, { CELL_EMPTY, CELL_MINE, TCell } from '../Cell/Cell';
import {
  initBoard,
  allMinesFlagged,
  setCell,
  floodEmptyCells,
  Coordinate,
} from './BoardHelpers';

import './Board.scss';

export type GameState = 'ongoing' | 'clicking' | 'won' | 'lost';

type Props = {
  restartFlag: boolean;
  width: number;
  height: number;
  mines: number;
  xray: boolean;
  flags: number;
  setFlags: (flags: number) => void;
  setAlert: (alert: string) => void;
  gameState: GameState;
  setGameState: (state: GameState) => void;
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

  const coordinateKey = ({ row, cell }: Coordinate) => `${row}_${cell}`;

  // Rebuild the board when the config changes, or when new game is started
  // (restart flag flips).
  useEffect(() => {
    setBoard(initBoard(width, height, mines));
  }, [restartFlag, width, height, mines]);

  const pressCell = (coordinate: Coordinate) => {
    // Ignore press on flagged and pressed cells.
    const { flagged, pressed, value } = board[coordinate.row][coordinate.cell];
    if (flagged || pressed) return;

    switch (value) {
      case CELL_MINE:
        setGameState('lost');
        setBoard(setCell(board, coordinate, true, null, false));
        setAlert('game over');
        break;

      case CELL_EMPTY:
        // "Flood fill" empty cells.
        setBoard(floodEmptyCells(board, coordinate));
        break;

      default:
        // Pressed a mine neighbour. Mark it as pressed.
        setBoard(setCell(board, coordinate, true, null, false));
    }
  };

  const toggleFlag = (coordinate: Coordinate) => {
    const { flagged, pressed } = board[coordinate.row][coordinate.cell];

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
    const boardNew = setCell(board, coordinate, false, null, !flagged);
    setBoard(boardNew);
    // Check if all mines are flagged correctly when all flags are used.
    if (flagsNew === mines && allMinesFlagged(boardNew)) {
      setGameState('won');
      setAlert('game won');
    }
  };

  const renderCell = (coordinate: Coordinate) => {
    const cell = board[coordinate.row][coordinate.cell];

    const onClick = (event: React.MouseEvent) => {
      if (gameState !== 'ongoing') return;

      if (event.shiftKey) toggleFlag(coordinate);
      else pressCell(coordinate);
    };

    const onMouseDown = (event: React.MouseEvent) => {
      if (gameState !== 'ongoing' || event.shiftKey) return;
      if (cell.pressed || cell.flagged) return;
      setGameState('clicking');
    };

    const onMouseUp = () => {
      if (gameState !== 'clicking') return;
      setGameState('ongoing');
    };

    return (
      <Cell
        key={coordinateKey(coordinate)}
        cell={cell}
        xray={xray}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
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
