// App renders the main game markup, and manages the global states.

import React, { useState } from 'react';
import RestartConfig, {
  TConfig,
  initConfig,
} from '../RestartConfig/RestartConfig';
import Board, { GameState } from '../Board/Board';
import Stats from '../Stats/Stats';

import './App.scss';

export default function () {
  // Board() initiates the board when this flag changes. There's no meaning to
  // its value.
  const [restartFlag, setRestartFlag] = useState(false);

  // The config state is held separately inside RestartConfig(), to allow
  // adjusting the inputs and only change the board after restart.
  const [config, setConfig] = useState(initConfig);

  // Count flags currently in use.
  const [flags, setFlags] = useState(0);

  // Alert for allowing the Board to display text messages on Stats().
  const [alert, setAlert] = useState('');

  // Track the game state (won | lost | ongoing), for the smiley on the
  // start button, and for locking the cells when game is over.
  const [gameState, setGameState] = useState<GameState>('ongoing');

  // For the "Superman mode".
  const [xray, setXray] = useState(false);

  // Start a new game: Change restartFlag and reset other states.
  const restart = (newConfig: TConfig) => {
    setRestartFlag(!restartFlag);
    setConfig(newConfig);
    setFlags(0);
    setAlert('');
    setGameState('ongoing');
  };

  return (
    <section className={`app embossed ${gameState}`}>
      <header>
        <div className="debossed settings">
          <RestartConfig restart={restart} />
          <Stats
            flags={flags}
            mines={config.mines}
            xray={xray}
            setXray={setXray}
            alert={alert}
          />
        </div>
      </header>

      <Board
        restartFlag={restartFlag}
        width={config.width}
        height={config.height}
        mines={config.mines}
        xray={xray}
        flags={flags}
        setFlags={setFlags}
        setAlert={setAlert}
        gameState={gameState}
        setGameState={setGameState}
      />
    </section>
  );
}
