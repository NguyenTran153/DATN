import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import {
  useTheme,
  Text,
  Searchbar,
  SegmentedButtons,
  IconButton,
} from 'react-native-paper';
import {useDispatch} from 'react-redux';

import {addToCart} from '../../redux/slices/medicalOrderSlice';
import ProductCard from '../../components/ProductCard';

const fakeData = [
  {
    id: 1,
    name: 'Paracetamol',
    category: 'Hạ sốt',
    price: 5000,
    brand: 'Hapaco',
    isOff: false,
    offPercentage: 0,
    productImage: '../asset/7677205.jpg',
    isAvailable: true,
  },
  {
    id: 2,
    name: 'Ibuprofen',
    category: 'Giảm đau',
    price: 7000,
    brand: 'Bogota',
    isOff: true,
    offPercentage: 10,
    productImage: '../asset/7677205.jpg',
    isAvailable: true,
  },
  {
    id: 3,
    name: 'Azithromycin',
    category: 'Kháng sinh',
    price: 15000,
    brand: 'US Pharma',
    isOff: false,
    offPercentage: 0,
    productImage: '../asset/7677205.jpg',
    isAvailable: true,
  },
  {
    id: 4,
    name: 'Azithromycinqdfwefsadqwdasdqwfwfwefewfew',
    category: 'Kháng sinh',
    price: 14000,
    brand: 'US Pharma',
    isOff: false,
    offPercentage: 0,
    productImage: '../asset/7677205.jpg',
    isAvailable: true,
  },
  {
    id: 5,
    name: 'Azithromycin',
    category: 'Kháng sinh',
    price: 15000,
    brand: 'US Pharma',
    isOff: false,
    offPercentage: 0,
    productImage: '../asset/7677205.jpg',
    isAvailable: true,
  },
  {
    id: 6,
    name: 'Azithromycin',
    category: 'Kháng sinh',
    price: 15000,
    brand: 'US Pharma',
    isOff: false,
    offPercentage: 0,
    productImage: '../asset/7677205.jpg',
    isAvailable: true,
  },
  {
    id: 7,
    name: 'Azithromycin',
    category: 'Kháng sinh',
    price: 15000,
    brand: 'US Pharma',
    isOff: false,
    offPercentage: 0,
    productImage: '../asset/7677205.jpg',
    isAvailable: true,
  },
  {
    id: 8,
    name: 'Azithromycin',
    category: 'Kháng sinh',
    price: 15000,
    brand: 'US Pharma',
    isOff: false,
    offPercentage: 0,
    productImage: '../asset/7677205.jpg',
    isAvailable: true,
  },
];
const StoreScreen = ({navigation}: {navigation: any}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [value, setValue] = useState<string>('top');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const [filteredData, setFilteredData] = useState<any>(fakeData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = fakeData.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(query.toLowerCase());
      const CategoryMatch =
        selectedCategory === '' || item.category === selectedCategory;
      return nameMatch && CategoryMatch;
    });
    setFilteredData(filtered);
  };

  const handleFilterByCategory = (category: any) => {
    setSelectedCategory(category);

    const filtered = fakeData.filter(item => {
      const nameMatch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const CategoryMatch = category === '' || item.category === category;
      return nameMatch && CategoryMatch;
    });
    setFilteredData(filtered);
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
      <View style={{flex: 1, padding: 10}}>
        <View style={styles.listContainer}>
          <View style={styles.title}>
            <Text variant="titleLarge">Danh sách sản phẩm</Text>
            <Text style={{color: theme.colors.primary}}>Thêm nữa...</Text>
          </View>

          <SegmentedButtons
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
            data={fakeData}
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
                        name: item.name,
                        category: item.category,
                        image: item.productImage,
                        price: item.price,
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
          />
        </View>
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
});
