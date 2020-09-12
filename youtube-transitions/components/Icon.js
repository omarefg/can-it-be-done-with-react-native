/**
 * @flow
 */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  name: string,
  label: string,
};

export const Icon = (props: Props) => {
  const { name, label } = props;

  return (
    <View style={styles.container}>
      <Feather style={styles.icon} {...{ name }} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  icon: {
    fontSize: 24,
    color: 'gray'
  },
  label: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 8
  }
});
