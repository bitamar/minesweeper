import React from 'react';

import './Cell.scss';

export type TCell = {
  flagged: boolean;
  value: number;
  pressed: boolean;
};

export const CELL_EMPTY = 0;
export const CELL_MINE = -1;

type Props = {
  cell: TCell;
  xray: boolean;
  onClick: (event: React.MouseEvent) => void;
  onMouseDown: (event: React.MouseEvent) => void;
  onMouseUp: (event: React.MouseEvent) => void;
};
function Cell({ cell, xray, onClick, onMouseDown, onMouseUp }: Props) {
  const { flagged, value, pressed } = cell;

  const symbol = () => {
    if (flagged) return <span className="flag">f</span>;

    if (!xray && !pressed) return <></>;

    switch (value) {
      case CELL_MINE:
        return <span className="mine">X</span>;

      case CELL_EMPTY:
        return <></>;

      default:
        return <span className={`color-${value}`}>{value}</span>;
    }
  };

  const pressedClass = () => {
    // Returning undefined instead of empty string to avoid printing class=""
    // on all cells.
    if (!pressed) return undefined;
    if (value === CELL_MINE) return 'flat mine';
    return 'flat';
  };

  return (
    <button
      className={pressedClass()}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {symbol()}
    </button>
  );
}

export default Cell;
