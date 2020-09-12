/**
 * @flow
 */

import { createContext } from 'react';
import type { Video } from '../schemas/Video';

type Value = {
    video: Video | null,
    setVideo: Function
}

export const PlayerContext = createContext<Value>({});
