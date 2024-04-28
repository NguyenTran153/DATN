import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {useState} from 'react';
import {
  useTheme,
  Text,
  Searchbar,
  SegmentedButtons,
  IconButton,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';

const fakeCategory = [
  {
    id: 1,
    name: 'Thuốc giảm đau',
    description: 'Dùng để giảm đau',
    examples: ['Paracetamol', 'Ibuprofen', 'Aspirin'],
  },
  {
    id: 2,
    name: 'Thuốc hạ sốt',
    description: 'Dùng để hạ sốt',
    examples: ['Paracetamol', 'Ibuprofen', 'Acetaminophen'],
  },
  {
    id: 3,
    name: 'Thuốc kháng sinh',
    description: 'Dùng để điều trị nhiễm trùng do vi khuẩn',
    examples: ['Amoxicillin', 'Penicillin', 'Azithromycin'],
  },
  {
    id: 4,
    name: 'Thuốc tim mạch',
    description: 'Dùng để điều trị các bệnh tim mạch',
    examples: ['Aspirin', 'Atenolol', 'Lisinopril'],
  },
  {
    id: 5,
    name: 'Thuốc cao huyết áp',
    description: 'Dùng để điều trị cao huyết áp',
    examples: ['Losartan', 'Amlodipine', 'Hydrochlorothiazide'],
  },
];

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
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle="dark-content"
      />

      <View style={{gap: 10, flexDirection: 'row'}}>
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
      <View>
        <View style={styles.listContainer}>
          <View style={styles.title}>
            <Text variant="titleLarge">Danh mục</Text>
            <Text style={{color: theme.colors.primary}}>Thêm nữa...</Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={fakeCategory}
            renderItem={({item}) => <CategoryCard item={item} />}
            keyExtractor={item => item.id.toString()}
          />
        </View>
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
            data={filteredData}
            renderItem={({item}) => (
              <ProductCard data={item} navigation={navigation} />
            )}
            keyExtractor={item => item.id}
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
    flex: 1,
    padding: 10,
    gap: 10,
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
    margin: 10,
    gap: 10,
  },
  productList: {
    width: '100%',
  },
});
