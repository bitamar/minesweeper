// Handles status messages and configs that can be changed without restarting.

import React from 'react';

import NumberInput from '../NumberInput/NumberInput';
import StickyButton from '../StickyButton/StickyButton';

import './Stats.scss';

type Props = {
  flags: number;
  mines: number;
  xray: boolean;
  setXray: (xray: boolean) => void;
  alert: string;
};
export default function Stats({ flags, mines, xray, setXray, alert }: Props) {
  const flagsRemaining = mines - flags;

  return (
    <section className="stats">
      <NumberInput label="Flags" value={flagsRemaining} />

      <StickyButton label="X-ray" pressed={xray} setPressed={setXray} />

      <p className="alert">{alert}</p>
    </section>
  );
}
