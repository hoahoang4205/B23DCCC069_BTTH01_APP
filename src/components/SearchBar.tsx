import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import Icon from './Icon';
import { SHADOW } from '../theme';
import { useTheme } from '../context/ThemeContext';

interface Props {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  totalResults?: number;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Tìm kiếm môn học theo tên, mã môn...',
  totalResults,
}: Props) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={s.container}>
      <View
        style={[
          s.wrap,
          {
            backgroundColor: colors.card,
            borderColor: isFocused ? colors.primary : colors.border,
            borderWidth: 1.5,
          },
        ]}
      >
        <Icon
          name="search"
          size={18}
          color={isFocused ? colors.primary : colors.muted}
        />
        <TextInput
          style={[s.input, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {value.length > 0 && (
          <Pressable
            onPress={() => onChangeText('')}
            hitSlop={8}
            style={({ pressed }) => [s.clearBtn, { backgroundColor: colors.border }, pressed && s.pressed]}
          >
            <Icon name="close" size={12} color={colors.muted} />
          </Pressable>
        )}
      </View>

      {value.trim().length > 0 && totalResults !== undefined && (
        <View style={s.resultBadge}>
          <Text style={[s.resultText, { color: colors.muted }]}>
            Tìm thấy <Text style={{ fontWeight: '700', color: colors.primary }}>{totalResults}</Text> môn học
          </Text>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    marginVertical: 14,
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    ...SHADOW,
  },
  input: {
    flex: 1,
    fontSize: 14,
    padding: 0,
    fontWeight: '500',
  },
  clearBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
  resultBadge: {
    marginTop: 6,
    paddingHorizontal: 4,
  },
  resultText: {
    fontSize: 12,
  },
});
