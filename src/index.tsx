import React from 'react';
import { render } from 'react-dom';
import App from './components/App/App';
import { register } from './serviceWorker';

import 'reset-css';
import './fonts/fonts.scss';

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

register();
