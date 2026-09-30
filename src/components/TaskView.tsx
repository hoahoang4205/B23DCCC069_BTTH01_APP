import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import Icon from './Icon';
import { ASSIGNMENTS } from '../data';
import { Assignment } from '../types';
import { useTheme } from '../context/ThemeContext';
import { SHADOW } from '../theme';

export default function TaskView() {
  const { colors, isDark } = useTheme();
  const [filter, setFilter] = useState<'all' | 'pending' | 'graded'>('all');

  const filteredTasks = ASSIGNMENTS.filter((item) => {
    if (filter === 'pending') return item.status === 'pending';
    if (filter === 'graded') return item.status === 'graded';
    return true;
  });

  const handleSubmit = (task: Assignment) => {
    Alert.alert(
      'Nộp bài tập',
      `Bạn muốn gửi bài nộp cho: "${task.title}"?`,
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xác nhận nộp bài', onPress: () => Alert.alert('Thành công', 'Bài tập đã được gửi thành công lên hệ thống LMS PTIT!') },
      ],
    );
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={[s.title, { color: colors.text }]}>Danh sách bài tập</Text>
        <Text style={[s.subtitle, { color: colors.muted }]}>
          Quản lý tiến độ bài tập và deadline học phần
        </Text>
      </View>

      {/* Filter Chips */}
      <View style={s.chipsRow}>
        {(
          [
            { key: 'all', label: 'Tất cả (12)' },
            { key: 'pending', label: 'Cần nộp (7)' },
            { key: 'graded', label: 'Đã chấm (3)' },
          ] as const
        ).map((chip) => {
          const active = filter === chip.key;
          return (
            <Pressable
              key={chip.key}
              onPress={() => setFilter(chip.key)}
              style={[
                s.chip,
                {
                  backgroundColor: active ? colors.primary : colors.card,
                  borderColor: active ? colors.primary : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  s.chipText,
                  {
                    color: active ? '#FFFFFF' : colors.muted,
                    fontWeight: active ? '700' : '500',
                  },
                ]}
              >
                {chip.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.listContent}
        renderItem={({ item }) => {
          const isPending = item.status === 'pending';
          const isGraded = item.status === 'graded';

          return (
            <View
              style={[
                s.card,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={s.cardTop}>
                <View
                  style={[
                    s.courseBadge,
                    { backgroundColor: colors.primarySoft },
                  ]}
                >
                  <Text style={[s.courseCode, { color: colors.primary }]}>
                    {item.courseCode}
                  </Text>
                </View>

                {isPending ? (
                  <View
                    style={[
                      s.statusBadge,
                      { backgroundColor: colors.dangerSoft },
                    ]}
                  >
                    <Icon name="clock" size={11} color={colors.danger} />
                    <Text style={[s.statusText, { color: colors.danger }]}>
                      Chưa nộp
                    </Text>
                  </View>
                ) : isGraded ? (
                  <View
                    style={[
                      s.statusBadge,
                      { backgroundColor: colors.successSoft },
                    ]}
                  >
                    <Icon name="award" size={11} color={colors.success} />
                    <Text style={[s.statusText, { color: colors.success }]}>
                      Điểm: {item.score}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={[
                      s.statusBadge,
                      { backgroundColor: colors.infoSoft },
                    ]}
                  >
                    <Icon name="check" size={11} color={colors.info} />
                    <Text style={[s.statusText, { color: colors.info }]}>
                      Đã nộp
                    </Text>
                  </View>
                )}
              </View>

              <Text style={[s.taskTitle, { color: colors.text }]}>
                {item.title}
              </Text>
              <Text style={[s.courseName, { color: colors.muted }]}>
                {item.courseName}
              </Text>

              <View style={[s.divider, { backgroundColor: colors.border }]} />

              <View style={s.cardBottom}>
                <View style={s.dueRow}>
                  <Icon name="calendar" size={13} color={colors.muted} />
                  <Text style={[s.dueText, { color: colors.muted }]}>
                    Hạn: {item.dueDate}
                  </Text>
                </View>

                {isPending && (
                  <Pressable
                    onPress={() => handleSubmit(item)}
                    style={({ pressed }) => [
                      s.submitBtn,
                      { backgroundColor: colors.primary },
                      pressed && s.pressed,
                    ]}
                  >
                    <Text style={s.submitText}>Nộp bài</Text>
                  </Pressable>
                )}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  header: {
    marginBottom: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 3,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 18,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    ...SHADOW,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  courseBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  courseCode: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 4,
  },
  courseName: {
    fontSize: 12,
  },
  divider: {
    height: 1,
    marginVertical: 10,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dueText: {
    fontSize: 11,
    fontWeight: '500',
  },
  submitBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
});
