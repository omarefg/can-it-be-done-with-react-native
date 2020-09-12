/**
 * @flow
 */

import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar
} from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { useStateCallback } from '../hooks';
import { PlayerContext } from '../contexts';
import { VideoModal } from '../components';
import type { Video } from '../schemas/Video';

const { height } = Dimensions.get('window');

type Props = {
  children: React.Node,
};

export const PlayerProvider = (props: Props) => {
  const { children } = props;
  const animation = new Animated.Value(0);
  const toggleVideo = () => Animated.timing(animation, {
    duration: 300,
    toValue: 1,
    easing: Easing.inOut(Easing.ease)
  }).start();
  const [video, setVideo] = useStateCallback<Video | null>(null, toggleVideo);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0]
  });

  return (
    <PlayerContext.Provider value={{ video, setVideo }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={StyleSheet.absoluteFill}>
          {children}
        </View>
        <Animated.View style={{ transform: [{ translateY }] }}>
          {video && <VideoModal {...{ video }} />}
        </Animated.View>
      </View>
    </PlayerContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
