import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Header from '../components/Header';
import StatCard from '../components/StatCard';
import SearchBar from '../components/SearchBar';
import FilterTabs, { CourseFilter } from '../components/FilterTabs';
import CourseCard from '../components/CourseCard';
import CourseDetailModal from '../components/CourseDetailModal';
import NotificationModal from '../components/NotificationModal';
import BottomNav from '../components/BottomNav';
import Icon from '../components/Icon';

import { COURSES, NOTIFICATIONS, ASSIGNMENTS } from '../data';
import { Course, NotificationItem } from '../types';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  // Navigation tab state (Chỉ yêu cầu dựng giao diện, không yêu cầu chuyển màn hình)
  const [activeTab, setActiveTab] = useState<string>('home');

  // Search & filter state
  const [keyword, setKeyword] = useState('');
  const [activeFilter, setActiveFilter] = useState<CourseFilter>('all');

  // Modal states
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);

  // Unread notifications count
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Dynamic course counts
  const totalCourses = COURSES.length;
  const inProgressCourses = COURSES.filter((c) => c.progress < 1.0).length;
  const completedCourses = COURSES.filter((c) => c.progress >= 1.0).length;

  // Filtered course list
  const filteredCourses: Course[] = COURSES.filter((c) => {
    const matchesKeyword =
      c.name.toLowerCase().includes(keyword.toLowerCase()) ||
      c.code.toLowerCase().includes(keyword.toLowerCase());

    if (!matchesKeyword) return false;

    if (activeFilter === 'in_progress') return c.progress < 1.0;
    if (activeFilter === 'completed') return c.progress >= 1.0;
    return true;
  });

  // Handler for stat card press
  const handleStatPress = (type: 'courses' | 'assignments' | 'completed') => {
    if (type === 'courses') {
      setActiveFilter('all');
      setKeyword('');
    } else if (type === 'assignments') {
      // Filter or highlight in-progress courses
      setActiveFilter('in_progress');
    } else if (type === 'completed') {
      setActiveFilter((prev) => (prev === 'completed' ? 'all' : 'completed'));
    }
  };

  // Home List Header
  const renderHomeHeader = () => (
    <>
      {/* a. Phần Header */}
      <Header
        unreadCount={unreadCount}
        onPressNotification={() => setShowNotifications(true)}
      />

      {/* b. Khu vực thống kê (Tối thiểu 3 thẻ: Tổng số môn học, Số bài tập, Số môn đã hoàn thành) */}
      <View style={s.statsRow}>
        <StatCard
          icon="books"
          value={totalCourses}
          label="Tổng môn học"
          subLabel="Kỳ 1"
          isActive={activeFilter === 'all' && keyword === ''}
          onPress={() => handleStatPress('courses')}
          accentColor={colors.primary}
          accentBg={colors.primarySoft}
        />
        <StatCard
          icon="task"
          value={ASSIGNMENTS.length}
          label="Số bài tập"
          subLabel="7 cần nộp"
          isActive={activeFilter === 'in_progress'}
          onPress={() => handleStatPress('assignments')}
          accentColor="#D97706"
          accentBg={isDark ? '#78350F30' : '#FEF3C7'}
        />
        <StatCard
          icon="check"
          value={completedCourses}
          label="Đã hoàn thành"
          subLabel="100% tiến độ"
          isActive={activeFilter === 'completed'}
          onPress={() => handleStatPress('completed')}
          accentColor={colors.success}
          accentBg={colors.successSoft}
        />
      </View>

      {/* c. Ô tìm kiếm môn học */}
      <SearchBar
        value={keyword}
        onChangeText={setKeyword}
        totalResults={filteredCourses.length}
      />

      {/* Quick Filter Tabs */}
      <FilterTabs
        activeFilter={activeFilter}
        onSelect={setActiveFilter}
        counts={{
          all: totalCourses,
          in_progress: inProgressCourses,
          completed: completedCourses,
        }}
      />

      {/* d. Tiêu đề danh sách môn học */}
      <View style={s.sectionHeader}>
        <Text style={[s.sectionTitle, { color: colors.text }]}>
          Danh sách môn học
        </Text>
        <Text style={[s.sectionCount, { color: colors.muted }]}>
          ({filteredCourses.length}/{totalCourses})
        </Text>
      </View>
    </>
  );

  // Empty Search Component
  const renderEmptyList = () => (
    <View style={s.emptyContainer}>
      <View style={[s.emptyIconBox, { backgroundColor: colors.cardSecondary }]}>
        <Icon name="search" size={28} color={colors.muted} />
      </View>
      <Text style={[s.emptyTitle, { color: colors.text }]}>
        Không tìm thấy môn học
      </Text>
      <Text style={[s.emptyText, { color: colors.muted }]}>
        {keyword
          ? `Không có kết quả nào phù hợp với từ khóa "${keyword}"`
          : 'Không có môn học nào trong mục này'}
      </Text>
      {(keyword.length > 0 || activeFilter !== 'all') && (
        <Pressable
          onPress={() => {
            setKeyword('');
            setActiveFilter('all');
          }}
          style={({ pressed }) => [
            s.resetBtn,
            { backgroundColor: colors.primarySoft },
            pressed && s.pressed,
          ]}
        >
          <Text style={[s.resetBtnText, { color: colors.primary }]}>
            Đặt lại bộ lọc
          </Text>
        </Pressable>
      )}
    </View>
  );

  return (
    <View
      style={[
        s.root,
        {
          backgroundColor: colors.bg,
          paddingTop: Math.max(insets.top, 10),
        },
      ]}
    >
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* d. Danh sách môn học hiển thị bằng FlatList */}
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHomeHeader}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
            onPress={() => setSelectedCourse(item)}
          />
        )}
        contentContainerStyle={s.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyList}
      />

      {/* e. Thanh điều hướng phía dưới (04 chức năng: Trang chủ, Môn học, Bài tập, Cá nhân - Chỉ dựng giao diện, không chuyển màn hình) */}
      <BottomNav active={activeTab} onChange={setActiveTab} />

      {/* Hiệu ứng khi nhấn vào môn học (Course Detail Modal) */}
      <CourseDetailModal
        course={selectedCourse}
        visible={selectedCourse !== null}
        onClose={() => setSelectedCourse(null)}
      />

      {/* Hộp thoại thông báo khi nhấn icon chuông */}
      <NotificationModal
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAllAsRead={markAllNotificationsRead}
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  sectionCount: {
    fontSize: 13,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 36,
    paddingHorizontal: 20,
  },
  emptyIconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  resetBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  resetBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
});
