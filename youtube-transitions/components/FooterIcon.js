/**
 * @flow
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  name: string;
  label: string,
};

export const FooterIcon = (props: Props) => {
  const { name, label } = props;
  return (
    <View style={styles.container}>
      <Feather style={styles.icon} {...{ name }} />
      <Text style={styles.label}>{label.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: 'center'
  },
  icon: {
    fontSize: 24,
    color: 'gray'
  },
  label: {
    color: 'gray',
    marginTop: 8,
    fontSize: 8,
    fontWeight: '500'
  }
});
