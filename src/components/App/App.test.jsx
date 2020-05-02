import React from 'react';
import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
  test('width input is shown', () => {
    const { getByLabelText } = render(<App />);
    const widthInput = getByLabelText('Width');
    expect(widthInput).toBeInTheDocument();
  });

  // TODO: Fix it.
  // test('restart after changing config', async () => {
  //   const { getAllByText, getByLabelText } = render(<App />);
  //   const widthInput = getByLabelText('Width');
  //   widthInput.value = 20;
  //   const restartButton = getAllByText('Restart');
  //   userEvent.click(restartButton);
  // expect(container.querySelector('.cells .row').childNodes.length).toBe(20);
  // });
});
