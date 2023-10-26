import React from 'react';
import { Text, StyleSheet, Pressable, GestureResponderEvent, TouchableOpacity } from 'react-native';
import * as color from '../../assets/style/colors';
import { subheader } from '../../assets/style/typography';

interface Button {
    onPress: any,
    title: string
}

export default function Button(props: Button) {
  const { onPress, title = 'Save' } = props;
  return (
    <TouchableOpacity disabled={!title} style={styles.button} onPress={onPress}>
      <Text style={[subheader.x30, {color: 'white'}]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 3,
    marginTop: 12,
    backgroundColor: color.primary.s600,
  }
});