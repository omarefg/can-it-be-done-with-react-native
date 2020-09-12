/**
 * @flow
 */

import moment from 'moment';
import type { ImageSource } from 'react-native/Libraries/Image/ImageSource';

export type Video = {
  id: string,
  thumbnail: ImageSource,
  video: ImageSource,
  title: string,
  username: string,
  avatar: ImageSource,
  views: number,
  published: typeof moment,
};
