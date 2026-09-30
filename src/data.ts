import { StatItem, Course, NavItem } from './types';

export const STATS: StatItem[] = [
  { id: '1', icon: 'books', value: 6, label: 'Môn học' },
  { id: '2', icon: 'task', value: 12, label: 'Bài tập' },
  { id: '3', icon: 'check', value: 3, label: 'Hoàn thành' },
];

export const COURSES: Course[] = [
  { id: '1', name: 'Lập trình React Native', icon: 'code', lessons: 24, progress: 0.75 },
  { id: '2', name: 'Cơ sở dữ liệu', icon: 'database', lessons: 18, progress: 1 },
  { id: '3', name: 'Cấu trúc dữ liệu', icon: 'algo', lessons: 30, progress: 0.4 },
  { id: '4', name: 'Lập trình Java', icon: 'java', lessons: 20, progress: 0.1 },
];

export const NAV: NavItem[] = [
  { id: 'home', icon: 'home', label: 'Trang chủ' },
  { id: 'course', icon: 'books', label: 'Môn học' },
  { id: 'task', icon: 'task', label: 'Bài tập' },
  { id: 'profile', icon: 'user', label: 'Cá nhân' },
];
