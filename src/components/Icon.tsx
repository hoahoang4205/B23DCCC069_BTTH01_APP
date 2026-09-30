import React, { useState } from 'react';
import { Image, ImageStyle, StyleProp, Text, View, StyleSheet } from 'react-native';
import { IMAGES, IconName } from '../assets/images';

interface Props {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<ImageStyle>;
}

const GLYPHS: Partial<Record<IconName, string>> = {
  bell: '🔔',
  books: '📚',
  task: '📝',
  check: '✓',
  home: '🏠',
  user: '👤',
  search: '🔍',
  code: '</>',
  database: '🗄️',
  algo: '⚡',
  java: '☕',
  network: '🌐',
  ai: '🤖',
  moon: '🌙',
  sun: '☀️',
  close: '✕',
  calendar: '📅',
  clock: '⏱',
  school: '🎓',
  award: '🏆',
  chevronRight: '›',
  filter: '⚡',
};

export default function Icon({ name, size = 22, color = '#000', style }: Props) {
  const [hasError, setHasError] = useState(false);
  const imageSource = IMAGES[name];

  if (!imageSource || hasError) {
    const glyph = GLYPHS[name] || '•';
    return (
      <View style={[s.fallbackContainer, { width: size, height: size }]}>
        <Text style={[s.fallbackText, { fontSize: size * 0.75, color }]}>{glyph}</Text>
      </View>
    );
  }

  return (
    <Image
      source={imageSource}
      style={[{ width: size, height: size, tintColor: color }, style]}
      resizeMode="contain"
      onError={() => setHasError(true)}
    />
  );
}

const s = StyleSheet.create({
  fallbackContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    fontWeight: '700',
    textAlign: 'center',
    includeFontPadding: false,
  },
});
