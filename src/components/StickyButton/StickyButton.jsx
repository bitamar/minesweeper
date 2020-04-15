// A toggleable button.

import React from 'react';
import PropTypes from 'prop-types';

import './StickyButton.scss';

function StickyButton({ label, pressed, setPressed }) {
  const pressedClass = pressed ? 'debossed' : 'embossed';

  const onClick = () => setPressed(!pressed);

  return (
    <button className={`sticky-button ${pressedClass}`} onClick={onClick}>
      {label}
    </button>
  );
}

StickyButton.propTypes = {
  label: PropTypes.string.isRequired,
  pressed: PropTypes.bool.isRequired,
  setPressed: PropTypes.func.isRequired,
};

export default StickyButton;
