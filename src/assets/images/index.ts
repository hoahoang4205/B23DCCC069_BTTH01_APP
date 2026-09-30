import { ImageSourcePropType } from 'react-native';

const icon = (name: string) =>
  ({ uri: `https://img.icons8.com/ios-filled/100/000000/${name}.png` } as ImageSourcePropType);

export const IMAGES = {
  bell: icon('bell'),
  books: icon('books'),
  task: icon('todo-list'),
  check: icon('checkmark'),
  home: icon('home'),
  user: icon('user'),
  search: icon('search'),
  code: icon('source-code'),
  database: icon('database'),
  algo: icon('mind-map'),
  java: icon('coffee-to-go'),
  network: icon('network'),
  ai: icon('artificial-intelligence'),
  moon: icon('moon'),
  sun: icon('sun'),
  close: icon('multiply'),
  calendar: icon('calendar'),
  clock: icon('clock'),
  school: icon('graduation-cap'),
  award: icon('trophy'),
  chevronRight: icon('forward'),
  filter: icon('filter'),
  avatar: { uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' } as ImageSourcePropType,
};

export type IconName = keyof typeof IMAGES;
