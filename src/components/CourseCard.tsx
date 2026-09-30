import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from './Icon';
import { IconName } from '../assets/images';
import { SHADOW } from '../theme';
import { Course } from '../types';
import { useTheme } from '../context/ThemeContext';

interface Props {
  course: Course;
  onPress?: () => void;
}

export default function CourseCard({ course, onPress }: Props) {
  const { colors, isDark } = useTheme();
  const percent = Math.min(100, Math.round(course.progress * 100));
  const isCompleted = course.progress >= 1.0;

  // Custom accent color for course icon box
  const courseColor = course.color || colors.primary;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Môn học ${course.name}, tiến độ ${percent}%`}
      style={({ pressed }) => [
        s.card,
        {
          backgroundColor: colors.card,
          borderColor: isCompleted
            ? isDark
              ? 'rgba(52, 211, 153, 0.3)'
              : 'rgba(16, 185, 129, 0.2)'
            : colors.border,
        },
        pressed && s.pressed,
      ]}
    >
      <View style={s.topRow}>
        {/* Subject Icon Box */}
        <View
          style={[
            s.iconBox,
            {
              backgroundColor: isDark
                ? `${courseColor}25`
                : `${courseColor}15`,
            },
          ]}
        >
          <Icon
            name={course.icon as IconName}
            size={24}
            color={courseColor}
          />
        </View>

        {/* Course Info */}
        <View style={s.info}>
          <Text style={[s.name, { color: colors.text }]} numberOfLines={1}>
            {course.name}
          </Text>
          <Text style={[s.meta, { color: colors.muted }]} numberOfLines={1}>
            {course.code} • {course.credits} tín chỉ • {course.completedLessons}/{course.lessons} bài
          </Text>
        </View>

        {/* Status / Percentage Badge */}
        {isCompleted ? (
          <View
            style={[
              s.badgeSuccess,
              {
                backgroundColor: colors.successSoft,
                borderColor: colors.success,
              },
            ]}
          >
            <Icon name="check" size={12} color={colors.success} />
            <Text style={[s.badgeText, { color: colors.success }]}>
              Hoàn thành
            </Text>
          </View>
        ) : (
          <View
            style={[
              s.badgeProgress,
              {
                backgroundColor: colors.primarySoft,
              },
            ]}
          >
            <Text style={[s.percentText, { color: colors.primary }]}>
              {percent}%
            </Text>
          </View>
        )}
      </View>

      {/* Progress Track */}
      <View
        style={[
          s.track,
          {
            backgroundColor: isDark ? colors.cardSecondary : '#E2E8F0',
          },
        ]}
      >
        <View
          style={[
            s.fill,
            {
              width: `${percent}%`,
              backgroundColor: isCompleted ? colors.success : courseColor,
            },
          ]}
        />
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    ...SHADOW,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  meta: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 3,
  },
  badgeSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  badgeProgress: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
  },
  percentText: {
    fontSize: 13,
    fontWeight: '800',
  },
  track: {
    height: 7,
    borderRadius: 3.5,
    marginTop: 12,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3.5,
  },
});
