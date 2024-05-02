import React from 'react';
import {
  StyleSheet,
  View,
  ImageProps,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useTheme, Text, Icon} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

interface CartItemProps {
  id: string;
  name: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  roasted: string;
  prices: any;
  type: string;
  incrementCartItemQuantityHandler: any;
  decrementCartItemQuantityHandler: any;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  imagelink_square,
  special_ingredient,
  roasted,
  prices,
  type,
  incrementCartItemQuantityHandler,
  decrementCartItemQuantityHandler,
}) => {
  const theme = useTheme();

  return (
    <View>
      {prices.length != 1 ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[theme.colors.primary, theme.colors.onPrimary]}
          style={styles.CartItemLinearGradient}>
          <View style={styles.CartItemRow}>
            <Image source={imagelink_square} style={styles.CartItemImage} />
            <View style={styles.CartItemInfo}>
              <View>
                <Text
                  style={[
                    styles.CartItemTitle,
                    {color: theme.colors.onPrimary},
                  ]}>
                  {name}
                </Text>
                <Text
                  style={[
                    styles.CartItemSubtitle,
                    {color: theme.colors.onSecondary},
                  ]}>
                  {special_ingredient}
                </Text>
              </View>
              <View style={styles.CartItemRoastedContainer}>
                <Text style={styles.CartItemRoastedText}>{roasted}</Text>
              </View>
            </View>
          </View>
          {prices.map((data: any, index: any) => (
            <View
              key={index.toString()}
              style={styles.CartItemSizeRowContainer}>
              <View style={styles.CartItemSizeValueContainer}>
                <View style={styles.SizeBox}>
                  <Text
                    style={[
                      styles.SizeText,
                      {
                        fontSize: type == 'Bean' ? 12 : 16,
                      },
                    ]}>
                    {data.size}
                  </Text>
                </View>
                <Text style={styles.SizeCurrency}>
                  {data.currency}
                  <Text style={styles.SizePrice}> {data.price}</Text>
                </Text>
              </View>
              <View style={styles.CartItemSizeValueContainer}>
                <TouchableOpacity
                  style={styles.CartItemIcon}
                  onPress={() => {
                    decrementCartItemQuantityHandler(id, data.size);
                  }}>
                  <Icon source="minus-thick" size={10} />
                </TouchableOpacity>
                <View style={styles.CartItemQuantityContainer}>
                  <Text style={styles.CartItemQuantityText}>
                    {data.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.CartItemIcon}
                  onPress={() => {
                    incrementCartItemQuantityHandler(id, data.size);
                  }}>
                  <Icon source="plus-thick" size={10} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[theme.colors.primary, theme.colors.onPrimary]}
          style={styles.CartItemSingleLinearGradient}>
          <View>
            <Image
              source={imagelink_square}
              style={styles.CartItemSingleImage}
            />
          </View>
          <View style={styles.CartItemSingleInfoContainer}>
            <View>
              <Text
                style={[styles.CartItemTitle, {color: theme.colors.onPrimary}]}>
                {name}
              </Text>
              <Text
                style={[
                  styles.CartItemSubtitle,
                  {color: theme.colors.onSecondary},
                ]}>
                {special_ingredient}
              </Text>
            </View>
            <View style={styles.CartItemSingleSizeValueContainer}>
              <View style={styles.SizeBox}>
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize: type == 'Bean' ? 12 : 16,
                    },
                  ]}>
                  {prices[0].size}
                </Text>
              </View>
              <Text style={styles.SizeCurrency}>
                {prices[0].currency}
                <Text style={styles.SizePrice}> {prices[0].price}</Text>
              </Text>
            </View>
            <View style={styles.CartItemSingleQuantityContainer}>
              <TouchableOpacity
                style={styles.CartItemIcon}
                onPress={() => {
                  decrementCartItemQuantityHandler(id, prices[0].size);
                }}>
                <Icon
                  source="minus-thick"
                  color={theme.colors.primary}
                  size={10}
                />
              </TouchableOpacity>
              <View style={styles.CartItemQuantityContainer}>
                <Text style={styles.CartItemQuantityText}>
                  {prices[0].quantity}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.CartItemIcon}
                onPress={() => {
                  incrementCartItemQuantityHandler(id, prices[0].size);
                }}>
                <Icon source="plus-thick" color={theme.colors.primary} size={10} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  CartItemLinearGradient: {
    flex: 1,
    gap: 12,
    padding: 12,
    borderRadius: 25,
  },
  CartItemRow: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  CartItemImage: {
    height: 130,
    width: 130,
    borderRadius: 20,
  },
  CartItemInfo: {
    flex: 1,
    paddingVertical: 4,
    justifyContent: 'space-between',
  },
  CartItemTitle: {
    fontSize: 18,
  },
  CartItemSubtitle: {
    fontSize: 12,
  },
  CartItemRoastedContainer: {
    height: 50,
    width: 50 * 2 + 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CartItemRoastedText: {
    fontSize: 10,
  },
  CartItemSizeRowContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  CartItemSizeValueContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SizeBox: {
    height: 40,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SizeText: {},
  SizeCurrency: {
    fontWeight: '500',
    fontSize: 18,
  },
  SizePrice: {},
  CartItemIcon: {
    padding: 12,
    borderRadius: 10,
  },
  CartItemQuantityContainer: {
    width: 80,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    paddingVertical: 4,
  },
  CartItemQuantityText: {
    fontWeight: '500',
    fontSize: 16,
  },
  CartItemSingleLinearGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
    borderRadius: 25,
  },
  CartItemSingleImage: {
    height: 150,
    width: 150,
    borderRadius: 20,
  },
  CartItemSingleInfoContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  CartItemSingleSizeValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  CartItemSingleQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default CartItem;
