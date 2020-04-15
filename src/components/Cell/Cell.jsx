import React from 'react';
import PropTypes from 'prop-types';

import './Cell.scss';

export const CELL_EMPTY = 0;
export const CELL_MINE = -1;

function Cell({ cell, xray, onClick }) {
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
    if (!pressed) return null;
    if (value === CELL_MINE) return 'flat mine';
    return 'flat';
  };

  return (
    <button className={pressedClass()} onClick={onClick}>
      {symbol()}
    </button>
  );
}

Cell.propTypes = {
  cell: PropTypes.shape({
    pressed: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
    flagged: PropTypes.bool.isRequired,
  }).isRequired,
  xray: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Cell;
