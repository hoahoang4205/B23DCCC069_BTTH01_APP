import React from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from './Icon';
import { NotificationItem } from '../types';
import { useTheme } from '../context/ThemeContext';
import { SHADOW } from '../theme';

interface Props {
  visible: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
}

export default function NotificationModal({
  visible,
  onClose,
  notifications,
  onMarkAllAsRead,
}: Props) {
  const { colors, isDark } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={s.backdrop}>
        <Pressable style={s.overlay} onPress={onClose} />

        <View
          style={[
            s.modalBox,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          {/* Header */}
          <View style={s.header}>
            <View style={s.titleRow}>
              <Icon name="bell" size={20} color={colors.primary} />
              <Text style={[s.title, { color: colors.text }]}>Thông báo</Text>
            </View>

            <Pressable
              onPress={onClose}
              hitSlop={8}
              style={({ pressed }) => [
                s.closeBtn,
                { backgroundColor: colors.borderLight },
                pressed && s.pressed,
              ]}
            >
              <Icon name="close" size={14} color={colors.muted} />
            </Pressable>
          </View>

          {/* List */}
          <ScrollView style={s.list} showsVerticalScrollIndicator={false}>
            {notifications.map((item) => {
              const iconColor =
                item.type === 'urgent'
                  ? colors.danger
                  : item.type === 'grade'
                  ? colors.success
                  : colors.info;

              const bgColor =
                item.type === 'urgent'
                  ? colors.dangerSoft
                  : item.type === 'grade'
                  ? colors.successSoft
                  : colors.infoSoft;

              return (
                <View
                  key={item.id}
                  style={[
                    s.notifItem,
                    {
                      backgroundColor: item.read
                        ? colors.card
                        : isDark
                        ? `${colors.primarySoft}50`
                        : colors.primarySoft,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <View style={[s.itemIcon, { backgroundColor: bgColor }]}>
                    <Icon
                      name={
                        item.type === 'urgent'
                          ? 'clock'
                          : item.type === 'grade'
                          ? 'award'
                          : 'bell'
                      }
                      size={18}
                      color={iconColor}
                    />
                  </View>

                  <View style={s.itemContent}>
                    <View style={s.itemHeader}>
                      <Text
                        style={[
                          s.itemTitle,
                          {
                            color: colors.text,
                            fontWeight: item.read ? '600' : '800',
                          },
                        ]}
                      >
                        {item.title}
                      </Text>
                      {!item.read && (
                        <View
                          style={[
                            s.unreadDot,
                            { backgroundColor: colors.primary },
                          ]}
                        />
                      )}
                    </View>

                    <Text style={[s.itemText, { color: colors.textSecondary }]}>
                      {item.content}
                    </Text>

                    <Text style={[s.itemTime, { color: colors.muted }]}>
                      {item.time}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>

          {/* Footer Action */}
          <View style={s.footer}>
            <Pressable
              onPress={onMarkAllAsRead}
              style={({ pressed }) => [
                s.markReadBtn,
                { backgroundColor: colors.primarySoft },
                pressed && s.pressed,
              ]}
            >
              <Text style={[s.markReadText, { color: colors.primary }]}>
                Đánh dấu đã đọc tất cả
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
  },
  modalBox: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
    ...SHADOW,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  list: {
    maxHeight: 360,
  },
  notifItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    gap: 12,
  },
  itemIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContent: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 13,
    flex: 1,
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginLeft: 6,
  },
  itemText: {
    fontSize: 12,
    lineHeight: 17,
  },
  itemTime: {
    fontSize: 11,
    marginTop: 6,
  },
  footer: {
    marginTop: 10,
  },
  markReadBtn: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  markReadText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
