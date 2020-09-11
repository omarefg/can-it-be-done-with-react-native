// @flow
import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Video } from 'expo-av';
import Constants from 'expo-constants';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { type Video as VideoModel } from './videos';
import VideoContent from './VideoContent';
import PlayerControls from './PlayerControls';

const { width, height } = Dimensions.get('window');
const { statusBarHeight } = Constants;
const shadow = {
  alignItems: 'center',
  elevation: 1,
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.18,
  shadowRadius: 2
};

type VideoModalProps = {
  video: VideoModel,
};

function runSpring(clock, value, dest) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  };

  const config = {
    damping: 20,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 0.5,
    toValue: new Value(0)
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, 0),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position
  ];
}

export default class VideoModal extends React.PureComponent<VideoModalProps> {
  translationY = new Animated.Value(0)

  velocityY = new Animated.Value(0)

  gestureState = new Animated.Value(State.UNDETERMINED)

  onGestureEvent: $Call<event>;

  constructor(props: VideoModalProps) {
    super(props);
    const {
      translationY, velocityY, gestureState
    } = this;
    this.onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationY,
            velocityY,
            state: gestureState
          }
        }
      ],
      { useNativeDriver: true },
    );
  }

  render() {
    const { onGestureEvent, translationY: translateY } = this;
    const { video } = this.props;
    return (
      <>
        <View
          style={{
            height: statusBarHeight,
            backgroundColor: 'black'
          }}
        />
        <PanGestureHandler
          onHandlerStateChange={onGestureEvent}
          {...{ onGestureEvent }}
        >
          <Animated.View
            style={{
              transform: [{ translateY }],
              ...shadow
            }}
          >
            <View style={{ backgroundColor: 'white', width }}>
              <View style={{ ...StyleSheet.absoluteFillObject }}>
                <PlayerControls title={video.title} onPress={() => true} />
              </View>
              <Video
                source={video.video}
                style={{ width, height: width / 1.78 }}
                resizeMode={Video.RESIZE_MODE_COVER}
                shouldPlay
              />
            </View>
            <View style={{ backgroundColor: 'white', width, height }}>
              <View>
                <VideoContent {...{ video }} />
              </View>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </>
    );
  }
}
