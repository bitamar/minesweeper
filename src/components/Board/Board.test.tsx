import { floodEmptyCells, allMinesFlagged } from './BoardHelpers';

describe('Board logic', () => {
  test('auto pressing cells around empty cell', () => {
    const board = [
      [
        { value: 0, pressed: false, flagged: false },
        { value: 1, pressed: false, flagged: false },
        { value: 1, pressed: false, flagged: false },
      ],
      [
        { value: 0, pressed: false, flagged: false },
        { value: 1, pressed: false, flagged: false },
        { value: 1, pressed: false, flagged: false },
      ],
    ];

    // Pressing the top left cell should press the empty cells and their
    // neighbors.
    const newBoard = floodEmptyCells(board, { row: 0, cell: 0 });

    const expectedBoard = [
      [
        { value: 0, pressed: true, flagged: false },
        { value: 1, pressed: true, flagged: false },
        { value: 1, pressed: false, flagged: false },
      ],
      [
        { value: 0, pressed: true, flagged: false },
        { value: 1, pressed: true, flagged: false },
        { value: 1, pressed: false, flagged: false },
      ],
    ];
    expect(newBoard).toEqual(expectedBoard);
  });

  test('checking whether all mines are flagged', () => {
    const nonMineFlagged = [
      [
        { value: 1, pressed: false, flagged: true },
        { value: -1, pressed: false, flagged: false },
      ],
    ];
    expect(allMinesFlagged(nonMineFlagged)).toEqual(false);

    const mineFlagged = [
      [
        { value: 1, pressed: false, flagged: false },
        { value: -1, pressed: false, flagged: true },
      ],
    ];
    expect(allMinesFlagged(mineFlagged)).toEqual(true);
  });
});
