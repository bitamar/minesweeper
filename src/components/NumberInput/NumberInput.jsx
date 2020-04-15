// A "Seven segment" number input, either with onChange callback or disabled.

import React from 'react';
import PropTypes from 'prop-types';

import './NumberInput.scss';

function NumberInput({ name, label, value, onChange, min, max }) {
  // Disable the input when there's no onChange.
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

NumberInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
};

NumberInput.defaultProps = {
  name: null,
  onChange: null,
  min: null,
  max: null,
};

export default NumberInput;
