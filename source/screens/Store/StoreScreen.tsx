import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useEffect, useState} from 'react';
import {
  useTheme,
  Text,
  Searchbar,
  SegmentedButtons,
  IconButton,
  DataTable,
  ActivityIndicator,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import {addToCart} from '../../redux/slices/medicalOrderSlice';
import ProductCard from '../../components/ProductCard';
import PrescriptionService from '../../services/PrescriptionService';

const StoreScreen = ({navigation}: {navigation: any}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.token.accessToken);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [value, setValue] = useState<string>('top');
  const [page, setPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filteredData, setFilteredData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, selectedCategory, page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await PrescriptionService.getDrug(
        token,
        searchQuery,
        page,
        10,
      );
      if (response?.result?.items) {
        setFilteredData(response.result.items);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.topbar}>
        <Searchbar
          style={styles.searchBar}
          placeholder="Tìm đơn thuốc"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <IconButton
          icon="cart"
          size={24}
          onPress={() =>
            navigation.navigate('StoreNavigator', {screen: 'CartScreen'})
          }
        />
      </View>
      <View style={{flex: 1, padding: 10, width: '100%'}}>
        <View style={styles.listContainer}>
          <View style={styles.title}>
            <Text variant="titleLarge">Danh sách sản phẩm</Text>
            <Text style={{color: theme.colors.primary}}>Thêm nữa...</Text>
          </View>

          <SegmentedButtons
            style={{width: '100%'}}
            value={value}
            onValueChange={setValue}
            buttons={[
              {
                value: 'top',
                label: 'Nổi bật',
              },
              {
                value: 'max',
                label: 'Giá cao',
              },
              {
                value: 'min',
                label: 'Giá thấp',
              },
            ]}
          />
          <FlatList
            style={styles.productList}
            contentContainerStyle={{
              alignItems: 'center',
            }}
            data={filteredData}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('StoreNavigator', {
                    screen: 'ProductScreen',
                    params: {item: item},
                  })
                }>
                <ProductCard
                  data={item}
                  addToCart={() =>
                    dispatch(
                      addToCart({
                        id: item.id,
                        name: item.tenThuoc || 'Aspirin',
                        category: item.dangBaoChe || 'Viên nén',
                        image: item.productImage || '../asset/7677205.jpg',
                        price: item.giaBanBuon || 15000,
                        quantity: 1,
                      }),
                    )
                  }
                  navigation={navigation}
                />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter}
          />
        </View>
        <DataTable.Pagination
          numberOfPages={100}
          page={page}
          onPageChange={setPage}
          label={`${page + 1} of ${Math.ceil(100)}`}
        />
      </View>
    </SafeAreaView>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    width: '100%',
  },
  searchBar: {
    width: '80%',
    marginLeft: 15,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listContainer: {
    marginHorizontal: 10,
    gap: 10,
    flex: 1,
  },
  productList: {},
  loading: {
    paddingVertical: 20,
  },
});
