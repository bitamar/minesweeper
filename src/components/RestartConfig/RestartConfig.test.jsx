import React from 'react';
import { render } from '@testing-library/react';
import RestartConfig from './RestartConfig';

test('restart callback triggered on config submit and has the defaults', () => {
  let restartsCount = 0;
  const restart = (config) => {
    restartsCount += 1;
    expect(config).toEqual({ width: 10, height: 10, mines: 15 });
  };

  const { getByRole } = render(<RestartConfig restart={restart} />);
  getByRole('button').click();

  expect(restartsCount).toEqual(1);
});
