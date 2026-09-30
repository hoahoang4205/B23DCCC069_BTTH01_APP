import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, Platform } from 'react-native';

import Header from '../components/Header';
import StatCard from '../components/StatCard';
import SearchBar from '../components/SearchBar';
import CourseCard from '../components/CourseCard';
import BottomNav from '../components/BottomNav';

import { COLORS } from '../theme';
import { STATS, COURSES } from '../data';
import { IMAGES } from '../assets/images';
import { StatItem, Course } from '../types';

export default function HomeScreen() {
  const [keyword, setKeyword] = useState('');
  const [tab, setTab] = useState('home');

  const filtered: Course[] = COURSES.filter((c) =>
    c.name.toLowerCase().includes(keyword.toLowerCase()),
  );

  const ListHeader = () => (
    <>
      <Header />

      <View style={s.statsRow}>
        {STATS.map((st: StatItem) => (
          <StatCard
            key={st.id}
            icon={st.icon as keyof typeof IMAGES}
            value={st.value}
            label={st.label}
          />
        ))}
      </View>

      <SearchBar value={keyword} onChangeText={setKeyword} />

      <Text style={s.section}>Môn học của tôi</Text>
    </>
  );

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" />

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        ListHeaderComponent={ListHeader}
        renderItem={({ item }) => (
          <CourseCard course={item} onPress={() => console.log(item.name)} />
        )}
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={s.empty}>Không tìm thấy môn học</Text>}
      />

      <BottomNav active={tab} onChange={setTab} />
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  list: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 24 },
  statsRow: { flexDirection: 'row', gap: 12 },
  section: { fontSize: 17, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  empty: { textAlign: 'center', color: COLORS.muted, marginTop: 20 },
});
