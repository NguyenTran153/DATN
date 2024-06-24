import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {useTheme, Card, Text, IconButton} from 'react-native-paper';

const ProductCard = ({data, addToCart}: any) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Card style={styles.cardContainer} mode="contained">
        <Card.Cover
          style={styles.img}
          source={require('../asset/7677205.jpg')}
        />
        <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
          <View style={styles.textContainer}>
            <Text
              style={{flex: 1, maxWidth: '80%'}}
              variant="titleMedium"
              ellipsizeMode="tail">
              {data.tenThuoc}
            </Text>
            <Text
              style={{flex: 1, maxWidth: '80%'}}
              numberOfLines={1}
              ellipsizeMode="tail"
              variant="titleSmall">
              {data.dangBaoChe || "Chưa cập nhật"}
            </Text>
            <Text
              style={{
                flex: 1,
                color: theme.colors.secondary,
                fontWeight: 'bold',
              }}
              variant="titleSmall">
              {data.giaBanBuon} VNĐ
            </Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <IconButton icon="plus-box" size={36} onPress={addToCart} />
          </View>
        </View>
      </Card>
    </View>
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
