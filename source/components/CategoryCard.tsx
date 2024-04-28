import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, Text} from 'react-native-paper';

const CategoryCard = ({item}: {item: any}) => {
  console.log(item);

  const colorHash = (str: string) => {
    // Improved hash function using MurmurHash3 for better distribution
    let h1 = 0;
    let k1 = 0xcc9e2d51;
    let c1 = 0x1b873593;
    for (let i = 0; i < str.length; ++i) {
      const c = str.charCodeAt(i);
      k1 = c & 0xff000000;
      k1 = (k1 >>> 24) | (k1 << 8);
      k1 = k1 * c1;
      k1 = (k1 & 0x1fffffff) | 0x80000000;
      h1 ^= k1;
      h1 = h1 * 5 + 0xe6546b64;
    }

    // Introduce variation to hue based on string length (avoid identical hues)
    const hueShift = Math.round(str.length / 2) % 360;
    const baseHue = Math.round((Math.abs(h1) % 256) / 16);

    // Ensure non-zero values for saturation and lightness
    const saturation = Math.max(1, Math.round((Math.abs(h1 >> 8) % 256) / 16));
    const lightness = Math.max(20, Math.round((Math.abs(h1 >> 16) % 256) / 16));

    // Combine base hue with variation for more distinct colors
    return `hsl(${(baseHue + hueShift) % 360}, ${saturation}%, ${lightness}%)`;
  };

  return (
    <Card style={styles.cardContainer}>
      <View
        style={[styles.icon, {backgroundColor: colorHash(item.name)}]}></View>
      <Text style={styles.text}>{item.name}</Text>
    </Card>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: 150,
    width: 120,
    borderRadius: 70,
    margin: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    height: 54,
    width: 54,
    borderRadius: 50,
    flex: 1,
    marginTop: 20,
    alignSelf: 'center',
  },
  text: {
    flex: 1,
    fontSize: 11,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
