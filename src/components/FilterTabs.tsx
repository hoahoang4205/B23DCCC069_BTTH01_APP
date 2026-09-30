import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export type CourseFilter = 'all' | 'in_progress' | 'completed';

interface Props {
  activeFilter: CourseFilter;
  onSelect: (filter: CourseFilter) => void;
  counts: {
    all: number;
    in_progress: number;
    completed: number;
  };
}

export default function FilterTabs({ activeFilter, onSelect, counts }: Props) {
  const { colors } = useTheme();

  const tabs: { key: CourseFilter; label: string; count: number }[] = [
    { key: 'all', label: 'Tất cả', count: counts.all },
    { key: 'in_progress', label: 'Đang học', count: counts.in_progress },
    { key: 'completed', label: 'Hoàn thành', count: counts.completed },
  ];

  return (
    <View style={s.container}>
      {tabs.map((tab) => {
        const isActive = activeFilter === tab.key;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onSelect(tab.key)}
            style={({ pressed }) => [
              s.tab,
              {
                backgroundColor: isActive ? colors.primary : colors.card,
                borderColor: isActive ? colors.primary : colors.border,
              },
              pressed && s.pressed,
            ]}
          >
            <Text
              style={[
                s.label,
                {
                  color: isActive ? '#FFFFFF' : colors.muted,
                  fontWeight: isActive ? '700' : '500',
                },
              ]}
            >
              {tab.label}
            </Text>
            <View
              style={[
                s.countPill,
                {
                  backgroundColor: isActive
                    ? 'rgba(255, 255, 255, 0.25)'
                    : colors.borderLight,
                },
              ]}
            >
              <Text
                style={[
                  s.countText,
                  {
                    color: isActive ? '#FFFFFF' : colors.muted,
                  },
                ]}
              >
                {tab.count}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  pressed: {
    opacity: 0.8,
  },
  label: {
    fontSize: 12,
  },
  countPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 10,
    fontWeight: '700',
  },
});
