/**
 * @flow
 */

import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableWithoutFeedback, TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PlayerContext } from '../contexts';

const { width } = Dimensions.get('window');
export const PLACEHOLDER_WIDTH = width / 3;

type Props = {
  title: string,
  onPress: () => mixed,
};

export const PlayerControls = (props: Props) => {
  const { title, onPress } = props;
  const { setVideo } = useContext(PlayerContext);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.placeholder} />
        <Text style={styles.title}>{title}</Text>
        <Feather style={styles.icon} name="play" />
        <TouchableOpacity onPress={() => setVideo(null)}>
          <Feather style={styles.icon} name="x" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    paddingLeft: 8
  },
  placeholder: {
    width: PLACEHOLDER_WIDTH
  },
  icon: {
    fontSize: 24,
    color: 'gray',
    padding: 8
  }
});
