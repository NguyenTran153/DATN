import {ImageProps, StyleSheet, View, Image} from 'react-native';
import {useTheme, Text, IconButton} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../redux/slices/medicalOrderSlice';

interface CartItemProps {
  id: number;
  name: string;
  category: string;
  image: ImageProps;
  price: number;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  category,
  image,
  price,
  quantity,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: theme.colors.surfaceVariant,
      }}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image style={styles.image} source={require('../asset/7677205.jpg')} />
      </View>
      <View style={styles.inforContainer}>
        <Text variant="titleLarge">{name}</Text>
        <Text variant="titleMedium">{category}</Text>
        <Text variant="bodyLarge">{price}</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={[
            styles.changeQuantity,
            {backgroundColor: theme.colors.surfaceVariant},
          ]}>
          <View
            style={[
              styles.iconButton,
              {backgroundColor: theme.colors.secondary},
            ]}>
            <IconButton
              icon="minus-thick"
              size={30}
              onPress={() => dispatch(decreaseQuantity(id))}
            />
          </View>
          <Text>{quantity}</Text>
          <View
            style={[
              styles.iconButton,
              {backgroundColor: theme.colors.primary},
            ]}>
            <IconButton
              icon="plus-thick"
              size={30}
              onPress={() => dispatch(increaseQuantity(id))}
            />
          </View>
        </View>
      </View>
      <View style={{flex: 0.4}} />
      <View style={styles.closeButton}>
        <IconButton
          icon="close-circle"
          iconColor={theme.colors.error}
          size={24}
          onPress={() => dispatch(removeFromCart(id))}
        />
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  inforContainer: {
    flexDirection: 'column',
    marginHorizontal: 10,
    flex: 2,
  },
  changeQuantity: {
    width: 100,
    height: 20,
    borderRadius: 20,
    justifyContent: 'space-between',
    marginBottom: 10,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignContent: 'flex-end',
    position: 'absolute',
    top: -18,
    right: -30,
  },
});
