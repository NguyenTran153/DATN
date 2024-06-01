import {ScrollView, StyleSheet, View} from 'react-native';
import {useTheme, Text, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import {clearOrder} from '../../redux/slices/medicalOrderSlice';

import CartItem from '../../components/CartItem';
import Horizon from '../../components/Horizon';
import CustomAppbar from '../../components/CustomAppbar';

// Fake

const CartScreen = ({navigation, route}: any) => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const cartData = useSelector((state: any) => state.medicalOrder);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <CustomAppbar title={'Giỏ hàng'} goBack={() => navigation.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={[styles.ScrollViewInnerView]}>
          <View style={{flex: 1}}>
            {cartData.orderList.length === 0 ? (
              <View style={{flex: 1, justifyContent: 'center'}}>
                <LottieView
                  style={{height: 300}}
                  source={require('../../asset/lottie/cart.json')}
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
                    {cartData.orderList.length} đơn thuốc trong giỏ hàng
                  </Text>
                  <Button
                    icon="basket-remove"
                    mode="text"
                    textColor={theme.colors.error}
                    onPress={() => dispatch(clearOrder())}>
                    Dọn hết
                  </Button>
                </View>
                <View style={styles.ListItemContainer}>
                  {cartData.orderList.map((data: any) => (
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
                      <Text variant="titleSmall">{cartData.orderPrice}</Text>
                    </View>
                    <View style={styles.paymentTextContainer}>
                      <Text variant="titleSmall">Phí ship:</Text>
                      <Text variant="titleSmall">0VNĐ</Text>
                    </View>
                    <Horizon />
                    <View
                      style={[styles.paymentTextContainer, {marginTop: 20}]}>
                      <Text variant="titleMedium">Tổng tiền:</Text>
                      <Text variant="titleMedium">
                        {cartData.orderPrice} VNĐ
                      </Text>
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
