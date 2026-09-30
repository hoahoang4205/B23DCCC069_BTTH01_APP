import React from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from './Icon';
import { IconName } from '../assets/images';
import { Course } from '../types';
import { useTheme } from '../context/ThemeContext';
import { SHADOW } from '../theme';

interface Props {
  course: Course | null;
  visible: boolean;
  onClose: () => void;
}

export default function CourseDetailModal({ course, visible, onClose }: Props) {
  const { colors, isDark } = useTheme();

  if (!course) return null;

  const percent = Math.min(100, Math.round(course.progress * 100));
  const isCompleted = course.progress >= 1.0;
  const courseColor = course.color || colors.primary;

  const handleStudy = () => {
    Alert.alert(
      'Vào học môn: ' + course.name,
      `Đang mở bài giảng tiếp theo cho môn học ${course.code}...\nGiảng viên: ${course.instructor}`,
      [{ text: 'Đồng ý', onPress: onClose }],
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={s.backdrop}>
        <Pressable style={s.overlay} onPress={onClose} />

        <View
          style={[
            s.modalContent,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          {/* Modal Handle */}
          <View style={[s.handle, { backgroundColor: colors.border }]} />

          {/* Modal Header */}
          <View style={s.headerRow}>
            <View
              style={[
                s.iconBox,
                {
                  backgroundColor: isDark
                    ? `${courseColor}30`
                    : `${courseColor}18`,
                },
              ]}
            >
              <Icon
                name={course.icon as IconName}
                size={28}
                color={courseColor}
              />
            </View>

            <View style={{ flex: 1 }}>
              <View style={s.categoryRow}>
                <View
                  style={[
                    s.categoryPill,
                    { backgroundColor: colors.primarySoft },
                  ]}
                >
                  <Text style={[s.categoryText, { color: colors.primary }]}>
                    {course.category || 'Môn học'}
                  </Text>
                </View>
                {isCompleted && (
                  <View
                    style={[
                      s.completedPill,
                      { backgroundColor: colors.successSoft },
                    ]}
                  >
                    <Icon name="check" size={11} color={colors.success} />
                    <Text style={[s.completedText, { color: colors.success }]}>
                      Đã hoàn thành
                    </Text>
                  </View>
                )}
              </View>
              <Text style={[s.name, { color: colors.text }]}>{course.name}</Text>
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

          <ScrollView showsVerticalScrollIndicator={false} style={s.scroll}>
            {/* Progress Card */}
            <View
              style={[
                s.progressCard,
                {
                  backgroundColor: colors.cardSecondary,
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={s.progressRow}>
                <Text style={[s.progressLabel, { color: colors.text }]}>
                  Tiến độ học tập
                </Text>
                <Text
                  style={[
                    s.progressPercent,
                    { color: isCompleted ? colors.success : courseColor },
                  ]}
                >
                  {percent}%
                </Text>
              </View>

              <View
                style={[
                  s.track,
                  { backgroundColor: isDark ? colors.card : '#E2E8F0' },
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

              <View style={s.lessonsRow}>
                <Text style={[s.lessonDetail, { color: colors.muted }]}>
                  Đã học {course.completedLessons}/{course.lessons} bài học
                </Text>
                <Text style={[s.statusNote, { color: colors.muted }]}>
                  {isCompleted
                    ? 'Xuất sắc! Bạn đã hoàn thành 100%'
                    : `Còn ${course.lessons - course.completedLessons} bài cần hoàn thành`}
                </Text>
              </View>
            </View>

            {/* Course Details Info Table */}
            <Text style={[s.sectionTitle, { color: colors.text }]}>
              Thông tin học phần
            </Text>

            <View
              style={[
                s.infoBox,
                {
                  backgroundColor: colors.cardSecondary,
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={s.infoRow}>
                <Text style={[s.infoKey, { color: colors.muted }]}>Mã học phần</Text>
                <Text style={[s.infoVal, { color: colors.text }]}>{course.code}</Text>
              </View>

              <View style={[s.divider, { backgroundColor: colors.border }]} />

              <View style={s.infoRow}>
                <Text style={[s.infoKey, { color: colors.muted }]}>Số tín chỉ</Text>
                <Text style={[s.infoVal, { color: colors.text }]}>{course.credits} tín chỉ</Text>
              </View>

              <View style={[s.divider, { backgroundColor: colors.border }]} />

              <View style={s.infoRow}>
                <Text style={[s.infoKey, { color: colors.muted }]}>Giảng viên</Text>
                <Text style={[s.infoVal, { color: colors.text }]}>{course.instructor}</Text>
              </View>

              <View style={[s.divider, { backgroundColor: colors.border }]} />

              <View style={s.infoRow}>
                <Text style={[s.infoKey, { color: colors.muted }]}>Lịch học</Text>
                <Text style={[s.infoVal, { color: colors.text }]}>{course.schedule}</Text>
              </View>

              <View style={[s.divider, { backgroundColor: colors.border }]} />

              <View style={s.infoRow}>
                <Text style={[s.infoKey, { color: colors.muted }]}>Phòng học</Text>
                <Text style={[s.infoVal, { color: colors.text }]}>{course.room}</Text>
              </View>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={s.actionsRow}>
            <Pressable
              onPress={handleStudy}
              style={({ pressed }) => [
                s.primaryBtn,
                { backgroundColor: courseColor },
                pressed && s.pressed,
              ]}
            >
              <Text style={s.primaryBtnText}>
                {isCompleted ? 'Ôn tập lại môn học' : 'Vào học tiếp'}
              </Text>
            </Pressable>

            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                s.secondaryBtn,
                {
                  backgroundColor: colors.cardSecondary,
                  borderColor: colors.border,
                },
                pressed && s.pressed,
              ]}
            >
              <Text style={[s.secondaryBtnText, { color: colors.text }]}>Đóng</Text>
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
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlay: {
    flex: 1,
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    maxHeight: '80%',
    borderWidth: 1,
    borderBottomWidth: 0,
    ...SHADOW,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  categoryPill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
  },
  completedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  completedText: {
    fontSize: 10,
    fontWeight: '700',
  },
  name: {
    fontSize: 17,
    fontWeight: '800',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  scroll: {
    maxHeight: 380,
  },
  progressCard: {
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    marginBottom: 16,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: '800',
  },
  track: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
  lessonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonDetail: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusNote: {
    fontSize: 11,
    fontWeight: '400',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  infoBox: {
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    marginBottom: 18,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  infoKey: {
    fontSize: 13,
    fontWeight: '500',
  },
  infoVal: {
    fontSize: 13,
    fontWeight: '700',
    maxWidth: '65%',
    textAlign: 'right',
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  primaryBtn: {
    flex: 2,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  secondaryBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
