// A toggleable button.

import React from 'react';

import './StickyButton.scss';

type Props = {
  label: string;
  pressed: boolean;
  setPressed: (pressed: boolean) => void;
};
function StickyButton({ label, pressed, setPressed }: Props) {
  const pressedClass = pressed ? 'debossed' : 'embossed';

  const onClick = () => setPressed(!pressed);

  return (
    <button className={`sticky-button ${pressedClass}`} onClick={onClick}>
      {label}
    </button>
  );
}

export default StickyButton;
