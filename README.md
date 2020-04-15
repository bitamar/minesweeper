# React minesweeper

Run tests with `npm test` (After `npm i`)

## Components

- App: Game container

  - RestartConfig: Configuration for starting a new game.

    - NumberInput: Single input

  - Stats: Shows remaining flags, X-ray button and status message

    - StickyButton: A togglable button, for controling X-ray mode

  - Board: Game logic and rendering cells

    - Cell: Displays a single cell
