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
  avatar: { uri: 'https://i.pravatar.cc/150?img=12' } as ImageSourcePropType,
};

export type IconName = keyof typeof IMAGES;
