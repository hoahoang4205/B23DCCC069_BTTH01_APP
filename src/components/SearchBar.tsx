import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from './Icon';
import { COLORS, SHADOW } from '../theme';

interface Props {
  value: string;
  onChangeText: (t: string) => void;
}

export default function SearchBar({ value, onChangeText }: Props) {
  return (
    <View style={s.wrap}>
      <Icon name="search" size={18} color={COLORS.muted} />
      <TextInput
        style={s.input}
        placeholder="Tìm kiếm môn học..."
        placeholderTextColor={COLORS.muted}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    marginVertical: 20,
    ...SHADOW,
  },
  input: { flex: 1, fontSize: 14, color: COLORS.text, padding: 0 },
});
