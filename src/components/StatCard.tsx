import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from './Icon';
import { IconName } from '../assets/images';
import { SHADOW } from '../theme';
import { useTheme } from '../context/ThemeContext';

interface Props {
  icon: IconName;
  value: number;
  label: string;
  subLabel?: string;
  isActive?: boolean;
  onPress?: () => void;
  accentColor?: string;
  accentBg?: string;
}

export default function StatCard({
  icon,
  value,
  label,
  subLabel,
  isActive = false,
  onPress,
  accentColor,
  accentBg,
}: Props) {
  const { colors } = useTheme();

  const iconColor = accentColor || colors.primary;
  const iconBackground = accentBg || colors.primarySoft;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        s.card,
        {
          backgroundColor: colors.card,
          borderColor: isActive ? iconColor : colors.border,
          borderWidth: isActive ? 2 : 1,
        },
        pressed && s.pressed,
      ]}
    >
      <View style={[s.iconBox, { backgroundColor: iconBackground }]}>
        <Icon name={icon} size={20} color={iconColor} />
      </View>
      <Text style={[s.value, { color: colors.text }]}>{value}</Text>
      <Text style={[s.label, { color: colors.muted }]} numberOfLines={1}>
        {label}
      </Text>
      {subLabel ? (
        <Text style={[s.subLabel, { color: colors.muted }]} numberOfLines={1}>
          {subLabel}
        </Text>
      ) : null}
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    ...SHADOW,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  value: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
  subLabel: {
    fontSize: 10,
    fontWeight: '400',
    marginTop: 1,
    textAlign: 'center',
    opacity: 0.8,
  },
});
