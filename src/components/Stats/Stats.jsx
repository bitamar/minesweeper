// Handles status messages and configs that can be changed without restarting.

import React from 'react';
import PropTypes from 'prop-types';
import NumberInput from '../NumberInput/NumberInput';
import StickyButton from '../StickyButton/StickyButton';

import './Stats.scss';

export default function Stats({ flags, mines, xray, setXray, alert }) {
  const flagsRemaining = mines - flags;

  return (
    <section className="stats">
      <NumberInput label="Flags" value={flagsRemaining} />

      <StickyButton label="X-ray" pressed={xray} setPressed={setXray} />

      <p className="alert">{alert}</p>
    </section>
  );
}

Stats.propTypes = {
  // Flags in use count
  flags: PropTypes.number.isRequired,
  // Mines count
  mines: PropTypes.number.isRequired,
  xray: PropTypes.bool.isRequired,
  setXray: PropTypes.func.isRequired,
  // Display message
  alert: PropTypes.string.isRequired,
};
