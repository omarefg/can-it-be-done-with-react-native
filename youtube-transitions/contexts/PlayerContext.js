/**
 * @flow
 */

import { createContext } from 'react';
import type { Video } from '../db/videos';

type Value = {
    video: Video | null,
    setVideo: Function
}

export const PlayerContext = createContext<Value>({});
