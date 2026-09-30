import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from './Icon';
import { IconName } from '../assets/images';
import { NAV } from '../data';
import { useTheme } from '../context/ThemeContext';
import { SHADOW } from '../theme';

interface Props {
  active?: string;
  onChange?: (id: string) => void;
}

export default function BottomNav({ active = 'home', onChange }: Props) {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        s.bar,
        {
          backgroundColor: colors.tabBarBg,
          borderTopColor: colors.border,
          paddingBottom: Math.max(insets.bottom, 10),
        },
      ]}
    >
      {NAV.map((tab) => {
        const isSelected = tab.id === active;

        return (
          <Pressable
            key={tab.id}
            onPress={() => onChange?.(tab.id)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={tab.label}
            style={({ pressed }) => [s.item, pressed && s.pressed]}
          >
            {/* Tab Icon with potential badge */}
            <View style={s.iconWrapper}>
              <Icon
                name={tab.icon as IconName}
                size={22}
                color={isSelected ? colors.primary : colors.muted}
              />
              {tab.badge && tab.badge > 0 && !isSelected ? (
                <View
                  style={[
                    s.badge,
                    {
                      backgroundColor: colors.danger,
                      borderColor: colors.tabBarBg,
                    },
                  ]}
                >
                  <Text style={s.badgeText}>{tab.badge}</Text>
                </View>
              ) : null}
            </View>

            {/* Label */}
            <Text
              style={[
                s.label,
                {
                  color: isSelected ? colors.primary : colors.muted,
                  fontWeight: isSelected ? '700' : '500',
                },
              ]}
            >
              {tab.label}
            </Text>

            {/* Active Indicator Dot */}
            {isSelected && (
              <View
                style={[
                  s.activeDot,
                  { backgroundColor: colors.primary },
                ]}
              />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    paddingTop: 10,
    borderTopWidth: 1,
    ...SHADOW,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 2,
  },
  pressed: {
    opacity: 0.7,
  },
  iconWrapper: {
    position: 'relative',
    marginBottom: 4,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  label: {
    fontSize: 11,
    letterSpacing: -0.1,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 3,
  },
});
