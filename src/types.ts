export interface StatItem {
  id: string;
  icon: string;
  value: number;
  label: string;
}

export interface Course {
  id: string;
  name: string;
  icon: string;
  lessons: number;
  progress: number;
}

export interface NavItem {
  id: string;
  icon: string;
  label: string;
  active?: boolean;
}
