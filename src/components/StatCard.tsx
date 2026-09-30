import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from './Icon';
import { IMAGES } from '../assets/images';
import { COLORS, SHADOW } from '../theme';

interface Props {
  icon: keyof typeof IMAGES;
  value: number;
  label: string;
}

export default function StatCard({ icon, value, label }: Props) {
  return (
    <View style={s.card}>
      <View style={s.iconBox}>
        <Icon name={icon} size={20} color={COLORS.primary} />
      </View>
      <Text style={s.value}>{value}</Text>
      <Text style={s.label}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    ...SHADOW,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  value: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  label: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
});
