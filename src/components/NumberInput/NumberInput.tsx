// A "Seven segment" number input, either with onChange callback or disabled.

import React from 'react';

import './NumberInput.scss';

type Props = {
  name: string;
  label: string;
  value: number;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
};
function NumberInput({ name, label, value, onChange, min, max }: Props) {
  // Disable the input when there's no onChange callback.
  const enabled = Boolean(onChange);

  return (
    <label className="number-input">
      {label}
      <input
        name={name}
        type="number"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        disabled={!enabled}
      />
    </label>
  );
}

NumberInput.defaultProps = {
  name: null,
  onChange: null,
  min: null,
  max: null,
};

export default NumberInput;
