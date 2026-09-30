import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from './Icon';
import { IMAGES } from '../assets/images';
import { COLORS, SHADOW } from '../theme';
import { Course } from '../types';

interface Props {
  course: Course;
  onPress?: () => void;
}

export default function CourseCard({ course, onPress }: Props) {
  const percent = Math.round(course.progress * 100);
  const done = course.progress >= 1;

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: COLORS.primarySoft }}
      style={({ pressed }) => [s.card, pressed && s.pressed]}
    >
      <View style={s.row}>
        <View style={s.iconBox}>
          <Icon name={course.icon as keyof typeof IMAGES} size={24} color={COLORS.primary} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={s.name} numberOfLines={1}>
            {course.name}
          </Text>
          <Text style={s.sub}>{course.lessons} bài học</Text>
        </View>

        {done ? (
          <View style={s.badge}>
            <Icon name="check" size={12} color={COLORS.success} />
            <Text style={s.badgeText}>Hoàn thành</Text>
          </View>
        ) : (
          <Text style={s.percent}>{percent}%</Text>
        )}
      </View>

      <View style={s.track}>
        <View
          style={[
            s.fill,
            { width: `${percent}%`, backgroundColor: done ? COLORS.success : COLORS.primary },
          ]}
        />
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    ...SHADOW,
  },
  pressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  sub: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
  percent: { fontSize: 14, fontWeight: '700', color: COLORS.primary },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: { color: COLORS.success, fontSize: 11, fontWeight: '600' },
  track: {
    height: 6,
    backgroundColor: '#EEF1F6',
    borderRadius: 3,
    marginTop: 12,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: 3 },
});
