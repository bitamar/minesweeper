# React minesweeper

Run tests with `yarn test`

## Components

- App: Game container

  - RestartConfig: Configuration for starting a new game.

    - NumberInput: Single input

  - Stats: Shows remaining flags, X-ray button and status message

    - StickyButton: A toggleable button, for controlling X-ray mode

  - Board: Game logic and rendering cells

    - Cell: Displays a single cell
