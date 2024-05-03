import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {useTheme, Text, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';

import CartItem from '../../components/CartItem';
import Horizon from '../../components/Horizon';

// Fake
const CartList: any[] = [
  {
    id: '1',
    name: 'T-shirt',
    category: 'Clothing',
    image: require('../../asset/7677205.jpg'),
    price: 19.99,
    quantity: 2,
  },
  {
    id: '2',
    name: 'Jeans',
    category: 'Clothing',
    image: require('../../asset/7677205.jpg'),
    price: 39.99,
    quantity: 1,
  },
  {
    id: '3',
    name: 'Book',
    category: 'Books',
    image: require('../../asset/7677205.jpg'),
    price: 15.99,
    quantity: 3,
  },
  {
    id: '4',
    name: 'Laptop',
    category: 'Electronics',
    image: require('../../asset/7677205.jpg'),
    price: 799.99,
    quantity: 1,
  },
  {
    id: '5',
    name: 'Headphones',
    category: 'Electronics',
    image: require('../../asset/7677205.jpg'),
    price: 99.99,
    quantity: 1,
  },
];

const CartScreen = ({navigation, route}: any) => {
  const theme = useTheme();

  const dispatch = useDispatch();

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <StatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={[styles.ScrollViewInnerView]}>
          <View style={{flex: 1}}>
            {CartList.length === 0 ? (
              <View style={{flex: 1, justifyContent: 'center'}}>
                <LottieView
                  style={{height: 300}}
                  source={require('../../lottie/cart.json')}
                  autoPlay
                  loop
                />
                <Text style={{alignSelf: 'center'}} variant="titleLarge">
                  Giỏ hàng đang trống
                </Text>
              </View>
            ) : (
              <>
                <View style={styles.headerTitle}>
                  <Text variant="bodyMedium">
                    {CartList.length} đơn thuốc trong giỏ hàng
                  </Text>
                  <Text
                    variant="titleMedium"
                    style={{color: theme.colors.primary}}>
                    Thêm nữa...
                  </Text>
                </View>
                <View style={styles.ListItemContainer}>
                  {CartList.map((data: any) => (
                    <CartItem
                      key={data.id}
                      id={data.id}
                      name={data.name}
                      category={data.category}
                      image={data.image}
                      price={data.price}
                      quantity={data.quantity}
                    />
                  ))}
                </View>
                <View style={styles.paymentContainer}>
                  <View style={{flexDirection: 'column', marginBottom: 30}}>
                    <Text variant="titleLarge">Tổng thanh toán</Text>
                    <View style={styles.paymentTextContainer}>
                      <Text variant="titleSmall">Tổng giá trị:</Text>
                      <Text variant="titleSmall">70.000VNĐ</Text>
                    </View>
                    <View style={styles.paymentTextContainer}>
                      <Text variant="titleSmall">Phí ship:</Text>
                      <Text variant="titleSmall">30.000VNĐ</Text>
                    </View>
                    <Horizon />
                    <View
                      style={[styles.paymentTextContainer, {marginTop: 20}]}>
                      <Text variant="titleMedium">Tổng tiền:</Text>
                      <Text variant="titleMedium">100.000VNĐ</Text>
                    </View>
                  </View>

                  <Button style={{width: 330, height: 45}} mode="contained">
                    Mua hàng
                  </Button>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  ListItemContainer: {
    paddingHorizontal: 20,
    gap: 20,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  paymentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  paymentTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    flexWrap: 'nowrap',
  },
});
