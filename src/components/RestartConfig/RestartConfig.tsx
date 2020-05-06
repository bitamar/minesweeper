// Handles the restart game form (Width, Height, Mines and restart button).

import React, { useState } from 'react';
import NumberInput from '../NumberInput/NumberInput';

import './RestartConfig.scss';

// Board boundaries
const MIN_SIZE = 1;
const MAX_SIZE = 300;

// Default config
export type TConfig = {
  width: number;
  height: number;
  mines: number;
};

export const initConfig: TConfig = Object.freeze({
  width: 10,
  height: 10,
  mines: 15,
});

type Props = {
  restart(config: TConfig): void;
};

export default function RestartConfig({ restart }: Props) {
  const [config, setConfig] = useState(initConfig);

  const onChange = ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
    const input = currentTarget;

    // Ignore empty string.
    if (input.value === '') return;

    // Ignore the new value when it's out of bounds.
    if (input.value < input.min || input.value > input.max) return;

    const value = parseInt(input.value);
    const newConfig: TConfig = { ...config };
    // FIXME: How to assign to newConfig[input.name] in a typesafe way without listing all options?
    switch (input.name) {
      case 'width':
        newConfig.width = value;
        break;
      case 'height':
        newConfig.height = value;
        break;
      case 'mines':
        newConfig.mines = value;
        break;
    }
    setConfig(newConfig);
  };

  const onSubmit = (event: React.FormEvent) => {
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
