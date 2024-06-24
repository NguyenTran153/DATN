import {
  ImageBackground,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {Icon, Text, useTheme, Appbar} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';

import {addToCart} from '../../redux/slices/medicalOrderSlice';
import CustomAppbar from '../../components/CustomAppbar';

const ProductScreen = ({navigation, route}: any) => {
  const theme = useTheme();
  const {item} = route.params;

  const dispatch = useDispatch();

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <CustomAppbar title={item.name} goBack={() => navigation.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <ImageBackground
          style={styles.imageBackgroundContainer}
          source={require('../../asset/7677205.jpg')}
        />
        <View style={{margin: 10}}>
          <Text variant="titleMedium">{item.tenThuoc}</Text>
          <View style={{flexGrow: 1, flexWrap: 'nowrap'}}>
            <Text variant="titleSmall">Dạng thuốc: {item.dangBaoChe}</Text>
            <Text variant="titleSmall">
              Doanh nghiệp sản xuất: {item.doanhNghiepSanXuat}
            </Text>
          </View>
          <View style={styles.paymentContainer}>
            <Text style={{color: theme.colors.tertiary, fontWeight: '800'}}>
              Giá tiền: {item.giaBanBuon} VNĐ
            </Text>

            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => {
                dispatch(
                  addToCart({
                    id: item.id,
                    name: item.tenThuoc,
                    category: item.dangBaoChe,
                    image: item.image,
                    price: item.price,
                    quantity: 1,
                  }),
                );
              }}>
              <Icon
                source={'plus-box-outline'}
                size={24}
                color={theme.colors.primary}
              />
              <Text style={{color: theme.colors.primary, fontWeight: '800'}}>
                Thêm vào giỏ hàng
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inforContainer}>
            <Text style={{fontWeight: 'bold'}} variant="titleLarge">
              Quy cách đóng gói
            </Text>
            <Text variant="bodyMedium">{item.quyCachDongGoi}</Text>
          </View>
          <View style={styles.inforContainer}>
            <Text style={{fontWeight: 'bold'}} variant="titleLarge">
              Đơn vị kê khai
            </Text>
            <Text variant="bodyMedium">{item.donViKeKhai}</Text>
          </View>
          <View style={styles.inforContainer}>
            <Text style={{fontWeight: 'bold'}} variant="titleLarge">
              Hoạt chất
            </Text>
            <Text variant="bodyMedium">{item.hoatChat}</Text>
          </View>
          <View style={styles.inforContainer}>
            <Text style={{fontWeight: 'bold'}} variant="titleLarge">
              Hàm lượng
            </Text>
            <Text variant="bodyMedium">{item.hamLuong}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  ScrollViewFlex: {
    flexGrow: 1,
    gap: 10,
  },
  imageBackgroundContainer: {
    width: '100%',
    aspectRatio: 5 / 4,
    justifyContent: 'space-between',
  },
  paymentContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  inforContainer: {
    marginBottom: 10,
  },
});
