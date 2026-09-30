import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import Icon from './Icon';
import { IMAGES } from '../assets/images';
import { SHADOW } from '../theme';
import { useTheme } from '../context/ThemeContext';
import { STUDENT } from '../data';

interface HeaderProps {
  onPressNotification?: () => void;
  onPressProfile?: () => void;
  unreadCount?: number;
}

export default function Header({
  onPressNotification,
  onPressProfile,
  unreadCount = 2,
}: HeaderProps) {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <View style={s.row}>
      <View style={s.infoContainer}>
        <View style={s.helloRow}>
          <Text style={[s.hello, { color: colors.muted }]}>Xin chào 👋</Text>
          <View style={[s.statusPill, { backgroundColor: colors.successSoft }]}>
            <View style={[s.onlineDot, { backgroundColor: colors.success }]} />
            <Text style={[s.statusText, { color: colors.success }]}>Online</Text>
          </View>
        </View>

        <Text style={[s.name, { color: colors.text }]}>{STUDENT.name}</Text>
        <Text style={[s.meta, { color: colors.muted }]}>
          {STUDENT.studentId} • {STUDENT.class}
        </Text>
      </View>

      <View style={s.right}>
        {/* Dark Mode Toggle Button */}
        <Pressable
          onPress={toggleTheme}
          accessibilityLabel="Chuyển chế độ giao diện"
          style={({ pressed }) => [
            s.circleBtn,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
            pressed && s.pressed,
          ]}
        >
          <Icon
            name={isDark ? 'sun' : 'moon'}
            size={19}
            color={isDark ? '#FBBF24' : colors.primary}
          />
        </Pressable>

        {/* Notification Bell Button */}
        <Pressable
          onPress={onPressNotification}
          accessibilityLabel="Xem thông báo"
          style={({ pressed }) => [
            s.circleBtn,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
            pressed && s.pressed,
          ]}
        >
          <Icon name="bell" size={19} color={colors.text} />
          {unreadCount > 0 && (
            <View style={[s.badge, { backgroundColor: colors.danger }]}>
              <Text style={s.badgeText}>{unreadCount > 9 ? '9+' : unreadCount}</Text>
            </View>
          )}
        </Pressable>

        {/* Student Avatar */}
        <Pressable
          onPress={onPressProfile}
          accessibilityLabel="Xem hồ sơ sinh viên"
          style={({ pressed }) => [s.avatarWrap, pressed && s.pressed]}
        >
          <Image
            source={IMAGES.avatar}
            style={[s.avatar, { borderColor: colors.primary }]}
          />
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 4,
  },
  infoContainer: {
    flex: 1,
    marginRight: 12,
  },
  helloRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hello: {
    fontSize: 13,
    fontWeight: '500',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
    gap: 4,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginTop: 3,
  },
  meta: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  circleBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    ...SHADOW,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.94 }],
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
  },
});
