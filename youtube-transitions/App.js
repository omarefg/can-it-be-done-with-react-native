import React, { useState, useEffect, useCallback } from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';

import { Home } from './views';
import { videos } from './db';
import { PlayerProvider } from './providers';

const App = () => {
  const [ready, setReady] = useState(false);

  const loadVideos = useCallback(async () => {
    await Promise.all(
      videos.map((video) => Promise.all([
        Asset.loadAsync(video.video),
        Asset.loadAsync(video.avatar),
        Asset.loadAsync(video.thumbnail)
      ]))
    );
    setReady(true);
  }, []);

  useEffect(() => { loadVideos(); }, []);

  if (!ready) {
    return <AppLoading />;
  }

  return (
    <PlayerProvider>
      <Home />
    </PlayerProvider>
  );
};

export default App;
