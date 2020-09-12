import React from 'react';

import { Home } from './views';
import { PlayerProvider } from './providers';

const App = () => (
  <PlayerProvider>
    <Home />
  </PlayerProvider>
);

export default App;
