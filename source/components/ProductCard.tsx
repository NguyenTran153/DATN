import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {useTheme, Card, Text, Icon} from 'react-native-paper';

const ProductCard = ({navigation, data}: {navigation: any; data: any}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity style={styles.container}>
      <Card style={styles.cardContainer} mode="contained">
        <Card.Cover
          style={styles.img}
          source={require('../asset/7677205.jpg')}
        />
        <View style={styles.textContainer}>
          <Text style={{flex: 1}} variant="titleMedium" ellipsizeMode="tail">
            {data.name}
          </Text>
          <Text style={{flex: 1}} variant="titleSmall">
            {data.category}
          </Text>
          <Text
            style={{flex: 1, color: theme.colors.secondary, fontWeight: 'bold'}}
            variant="titleSmall">
            {data.price} VNĐ
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: 180,
    margin: 18,
    gap: 10,
    flexWrap: 'wrap',
  },
  cardContainer: {
    borderRadius: 8,
    width: '100%',
    height: 250,
    alignItems: 'center',
    margin: 4,
  },
  img: {
    width: 180,
    height: 180,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    flexWrap: 'wrap',
  },
});
