/**
 * @flow
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FooterIcon } from './FooterIcon';

const HEADER_HEIGHT = 80;

export const Footer = () => (
  <View style={styles.container}>
    <FooterIcon name="home" label="Home" />
    <FooterIcon name="trending-up" label="Trending" />
    <FooterIcon name="youtube" label="Subscriptions" />
    <FooterIcon name="mail" label="Inbox" />
    <FooterIcon name="folder" label="Folder" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});
