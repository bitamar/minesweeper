// Handles the restart game form (Width, Height, Mines and restart button).

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NumberInput from '../NumberInput/NumberInput';

import './RestartConfig.scss';

// Board boundaries
const MIN_SIZE = 1;
const MAX_SIZE = 300;

// Default config
export const initConfig = Object.freeze({
  width: 10,
  height: 10,
  mines: 15,
});

export default function RestartConfig({ restart }) {
  const [config, setConfig] = useState(initConfig);

  const onChange = ({ currentTarget: input }) => {
    // Ignore empty string.
    if (input.value === '') return;

    const value = parseInt(input.value);
    // Ignore the new value when it's out of bounds.
    if (value < input.min || value > input.max) return;

    const newConfig = { ...config };
    newConfig[input.name] = value;
    setConfig(newConfig);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    restart(config);
  };

  // Require at least one cell without a mine, and don't allow more than 999,
  // so the number input design doesn't break.
  const maxMines = Math.min(config.width * config.height - 1, 999);

  return (
    <form onSubmit={onSubmit} className="restart-config">
      <NumberInput
        name="width"
        label="Width"
        value={config.width}
        onChange={onChange}
        min={MIN_SIZE}
        max={MAX_SIZE}
      />

      <NumberInput
        name="height"
        label="Height"
        value={config.height}
        onChange={onChange}
        min={MIN_SIZE}
        max={MAX_SIZE}
      />

      <NumberInput
        name="mines"
        label="Mines"
        value={config.mines}
        onChange={onChange}
        min={1}
        max={maxMines}
      />

      <label>
        Restart
        <button type="submit" className="restart embossed">
          <span className="smiley" />
        </button>
      </label>
    </form>
  );
}

RestartConfig.propTypes = {
  restart: PropTypes.func.isRequired,
};
