import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from './Icon';
import { IMAGES } from '../assets/images';
import { COLORS, SHADOW } from '../theme';
import { NAV } from '../data';

interface Props {
  active?: string;
  onChange?: (id: string) => void;
}

export default function BottomNav({ active = 'home', onChange }: Props) {
  return (
    <View style={s.bar}>
      {NAV.map((tab) => {
        const on = tab.id === active;
        return (
          <Pressable key={tab.id} onPress={() => onChange?.(tab.id)} style={s.item}>
            <Icon name={tab.icon as keyof typeof IMAGES} size={22} color={on ? COLORS.primary : COLORS.muted} />
            <Text style={[s.label, on && s.labelOn]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOW,
  },
  item: { flex: 1, alignItems: 'center', gap: 3 },
  label: { fontSize: 11, color: COLORS.muted },
  labelOn: { color: COLORS.primary, fontWeight: '600' },
});
