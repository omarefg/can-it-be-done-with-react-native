// @flow
import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Video } from 'expo-av';
import Constants from 'expo-constants';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { type Video as VideoModel } from './videos';
import VideoContent from './VideoContent';
import PlayerControls, { PLACEHOLDER_WIDTH } from './PlayerControls';

const AnimatedVideo = Animated.createAnimatedComponent(Video);

const { width, height } = Dimensions.get('window');
const { statusBarHeight } = Constants;
const minHeight = 64;
const midBound = height - 3 * minHeight;
const upperBound = midBound + minHeight;
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
    finished: new Animated.Value(0),
    velocity: new Animated.Value(0),
    position: new Animated.Value(0),
    time: new Animated.Value(0)
  };

  const config = {
    damping: 20,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 0.5,
    toValue: new Animated.Value(0)
  };

  return [
    Animated.cond(Animated.clockRunning(clock), 0, [
      Animated.set(state.finished, 0),
      Animated.set(state.velocity, 0),
      Animated.set(state.position, value),
      Animated.set(config.toValue, dest),
      Animated.startClock(clock)
    ]),
    Animated.spring(clock, state, config),
    Animated.cond(state.finished, Animated.stopClock(clock)),
    state.position
  ];
}

export default class VideoModal extends React.PureComponent<VideoModalProps> {
  translationY = new Animated.Value(0)

  velocityY = new Animated.Value(0)

  offsetY = new Animated.Value(0)

  gestureState = new Animated.Value(State.UNDETERMINED)

  onGestureEvent: $Call<event>;

  translateY: Animated.Value;

  constructor(props: VideoModalProps) {
    super(props);
    const {
      translationY, velocityY, gestureState, offsetY
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

    const clockY = new Animated.Clock();
    const finalTranslateY = Animated.add(translationY, Animated.multiply(0.2, velocityY));
    const translationThreshold = height / 2;
    const snapPoint = Animated.cond(
      Animated.lessThan(finalTranslateY, translationThreshold),
      0,
      upperBound,
    );

    this.translateY = Animated.cond(
      Animated.eq(gestureState, State.END),
      [
        Animated.set(translationY, runSpring(clockY, Animated.add(offsetY, translationY), snapPoint)),
        Animated.set(offsetY, translationY),
        translationY
      ],
      [
        Animated.cond(
          Animated.eq(gestureState, State.BEGAN),
          Animated.stopClock(clockY)
        ),
        Animated.add(offsetY, translationY)
      ],
    );
  }

  render() {
    const { onGestureEvent, translateY } = this;
    const { video } = this.props;

    const playerControlsOpacity = Animated.interpolate(translateY, {
      inputRange: [midBound, upperBound],
      outputRange: [0, 1],
      extrapolate: Animated.Extrapolate.CLAMP
    });

    const videoContainerWidth = Animated.interpolate(translateY, {
      inputRange: [0, midBound],
      outputRange: [width, width - 16],
      extrapolate: Animated.Extrapolate.CLAMP
    });

    const videoWidth = Animated.interpolate(translateY, {
      inputRange: [0, midBound, upperBound],
      outputRange: [width, width - 16, PLACEHOLDER_WIDTH],
      extrapolate: Animated.Extrapolate.CLAMP
    });

    const videoHeight = Animated.interpolate(translateY, {
      inputRange: [0, midBound],
      outputRange: [width / 1.78, minHeight]
    });

    const contentOpacity = Animated.interpolate(translateY, {
      inputRange: [0, upperBound - 100],
      outputRange: [1, 0],
      extrapolate: Animated.Extrapolate.CLAMP
    });

    const contentWidth = Animated.interpolate(translateY, {
      inputRange: [0, midBound],
      outputRange: [width, width - 16],
      extrapolate: Animated.Extrapolate.CLAMP
    });

    const contentHeight = Animated.interpolate(translateY, {
      inputRange: [0, upperBound],
      outputRange: [height, 0],
      extrapolate: Animated.Extrapolate.CLAMP
    });

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
            <Animated.View style={{ backgroundColor: 'white', width: videoContainerWidth }}>
              <Animated.View style={{ ...StyleSheet.absoluteFillObject, opacity: playerControlsOpacity }}>
                <PlayerControls title={video.title} onPress={() => true} />
              </Animated.View>
              <AnimatedVideo
                source={video.video}
                style={{ width: videoWidth, height: videoHeight }}
                resizeMode={Video.RESIZE_MODE_COVER}
                shouldPlay
              />
            </Animated.View>
            <Animated.View style={{ backgroundColor: 'white', width: contentWidth, height: contentHeight }}>
              <Animated.View style={{ opacity: contentOpacity }}>
                <VideoContent {...{ video }} />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </>
    );
  }
}
