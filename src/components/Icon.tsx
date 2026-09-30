import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';
import { IMAGES } from '../assets/images';

interface Props {
  name: keyof typeof IMAGES;
  size?: number;
  color?: string;
  style?: StyleProp<ImageStyle>;
}

export default function Icon({ name, size = 22, color = '#000', style }: Props) {
  return (
    <Image
      source={IMAGES[name]}
      style={[{ width: size, height: size, tintColor: color }, style]}
      resizeMode="contain"
    />
  );
}
