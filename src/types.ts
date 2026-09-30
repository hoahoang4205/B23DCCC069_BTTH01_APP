export interface StatItem {
  id: string;
  icon: string;
  value: number;
  label: string;
  subLabel?: string;
  type?: 'courses' | 'assignments' | 'completed';
}

export interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  instructor: string;
  schedule: string;
  room: string;
  icon: string;
  lessons: number;
  completedLessons: number;
  progress: number; // 0.0 to 1.0
  color?: string;
  category?: string;
}

export interface Assignment {
  id: string;
  courseName: string;
  courseCode: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  score?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  content: string;
  time: string;
  read: boolean;
  type: 'urgent' | 'grade' | 'info';
}

export interface StudentProfile {
  name: string;
  studentId: string;
  class: string;
  major: string;
  faculty: string;
  school: string;
  email: string;
  avatar: string;
  gpa: number;
  completedCredits: number;
  totalCredits: number;
  academicYear: string;
}

export interface NavItem {
  id: string;
  icon: string;
  label: string;
  badge?: number;
}
