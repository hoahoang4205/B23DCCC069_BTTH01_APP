import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import Icon from './Icon';
import { IMAGES } from '../assets/images';
import { COLORS, SHADOW } from '../theme';

export default function Header() {
  return (
    <View style={s.row}>
      <View>
        <Text style={s.hello}>Xin chào 👋</Text>
        <Text style={s.name}>Hoàng Thị Hòa</Text>
      </View>

      <View style={s.right}>
        <Pressable style={({ pressed }) => [s.bell, pressed && s.pressed]}>
          <Icon name="bell" size={20} color={COLORS.text} />
          <View style={s.dot} />
        </Pressable>

        <Image source={IMAGES.avatar} style={s.avatar} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  hello: { fontSize: 13, color: COLORS.muted },
  name: { fontSize: 20, fontWeight: '700', color: COLORS.text, marginTop: 2 },
  right: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  bell: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW,
  },
  pressed: { opacity: 0.7 },
  dot: {
    position: 'absolute',
    top: 11,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.danger,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: COLORS.primarySoft,
  },
});
