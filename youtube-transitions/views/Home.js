/**
 * @flow
 */

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Footer, VideoThumbnail } from '../components';
import { videos } from '../db';

export const Home = () => (
  <>
    <ScrollView style={styles.container}>
      {videos.map((video) => (
        <VideoThumbnail key={video.id} {...{ video }} />
      ))}
    </ScrollView>
    <Footer />
  </>
);

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight
  }
});
