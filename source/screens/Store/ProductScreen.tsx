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
          <View style={{flexGrow: 1, flexWrap: 'nowrap'}}>
            <Text variant="titleMedium">Phân loại: {item.category}</Text>
            <Text style={{color: theme.colors.primary}} variant="titleMedium">
              Thương hiệu: {item.brand}
            </Text>
          </View>
          <View style={styles.paymentContainer}>
            <Text style={{color: theme.colors.tertiary, fontWeight: '800'}}>
              Giá tiền: {item.price}VNĐ
            </Text>

            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => {
                dispatch(
                  addToCart({
                    id: item.id,
                    name: item.name,
                    category: item.category,
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
              Mô tả sản phẩm
            </Text>
            <Text variant="bodyMedium">
              Bạn muốn cải thiện sức khỏe, tăng cường tuần hoàn máu não thì thực
              phẩm bảo vệ sức khỏe Pharmacity Hoạt Huyết là lựa chọn tối ưu cho
              bạn. Sản phẩm được nhiều khách hàng quan tâm vì có nhiều công dụng
              giúp bạn có sức khỏe tốt hơn.
            </Text>
          </View>
          <View style={styles.inforContainer}>
            <Text style={{fontWeight: 'bold'}} variant="titleLarge">
              Công dụng
            </Text>
            <Text variant="bodyMedium">
              Viên uống Pharmacity Hoạt Huyết giúp nuôi dưỡng hệ thần kinh với
              thành phần được chiết xuất 100% từ thực vật. Công dụng chính của
              sản phẩm này là giúp lưu thông khí huyết và nuôi dưỡng trí não.
              Đặc biệt, nguyên liệu sản xuất viên nén bao phim sẽ không chứa
              thêm đường nên rất phù hợp với những người thực hiện chế độ ăn
              không đường như người béo phì, người tiểu đường,…
            </Text>
          </View>
          <View style={styles.inforContainer}>
            <Text style={{fontWeight: 'bold'}} variant="titleLarge">
              Thành phần
            </Text>
            <Text variant="bodyMedium">
              Trong 1 viên chứa 680 mg hỗn hợp thuốc tương đương với: Đương quy
              1500mg; Dịch Mường 1500mg; Ngưu Tất 1500mg; Thúc Địa 1500mg; Thược
              Dược Đỏ 750mg; Xuyên Khương 750mg; Chiết Xuất Bạch Quả 50mg Thành
              phần bổ sung: Lactose, tinh bột, talc, magie stearat, PVP K30
              (polyvinylpyrrolidone K30), HPMC (hydroxypropyl methylcellulose),
              PEG 6000 (polyethylene glycol 6000), TiO2 vừa đủ 1 viên. Trọng
              lượng viên 750mg ± 7,5%
            </Text>
          </View>
          <View style={styles.inforContainer}>
            <Text style={{fontWeight: 'bold'}} variant="titleLarge">
              Cách sử dụng
            </Text>
            <Text variant="bodyMedium">
              Đối với người trưởng thành và trẻ em &gt; 12 tuổi, nên uống từ 2 -
              3 lần/ngày, mỗi lần 2 - 3 viên.
            </Text>
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
