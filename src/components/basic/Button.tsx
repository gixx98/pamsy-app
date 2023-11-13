import React from 'react';
import { Text, StyleSheet, Pressable, GestureResponderEvent, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as color from '../../assets/style/colors';
import { subheader } from '../../assets/style/typography';

interface Button {
  onPress: any,
  title: string,
  disabled?: boolean,
  loading?: boolean
}

export default function Button(props: Button) {
  const { onPress, title, disabled, loading } = props;
  return (
    <TouchableOpacity disabled={disabled} style={[styles.button, disabled && styles.disabledButton]} onPress={onPress}>
      {loading ? (
        <ActivityIndicator size={"small"} color={'#FFF'} />
      ) : (
        <Text style={[subheader.x30, { color: 'white' }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 44,
    paddingHorizontal: 32,
    borderRadius: 16,
    elevation: 3,
    backgroundColor: color.primary.s600,
  },
  disabledButton: {
    opacity: 0.4
  },
});