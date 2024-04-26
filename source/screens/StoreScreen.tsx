import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useState} from 'react';
import {useTheme, Text, Searchbar, SegmentedButtons} from 'react-native-paper';
import type {StatusBarStyle} from 'react-native';
import ProductCard from '../components/ProductCard';

const fakeData = [
  {
    id: 1,
    name: 'Paracetamol',
    type: 'Hạ sốt',
    price: 5000,
    brand: 'Hapaco',
    isOff: false,
    offPercentage: 0,
    productImage: require('../asset/7677205.jpg'),
    category: 'medicine',
    isAvailable: true,
  },
  {
    id: 2,
    name: 'Ibuprofen',
    type: 'Giảm đau',
    price: 7000,
    brand: 'Bogota',
    isOff: true,
    offPercentage: 10,
    productImage: require('../asset/7677205.jpg'),
    category: 'medicine',
    isAvailable: true,
  },
  {
    id: 3,
    name: 'Azithromycin',
    type: 'Kháng sinh',
    price: 15000,
    brand: 'US Pharma',
    isOff: false,
    offPercentage: 0,
    productImage: require('../asset/7677205.jpg'),
    category: 'medicine',
    isAvailable: true,
  },
  // ... Thêm thêm dữ liệu giả dựa trên ProductCard
];
const StoreScreen = () => {
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [value, setValue] = useState<string>('top');
  const [selectedType, setSelectedType] = useState<string>('');

  const [filteredData, setFilteredData] = useState<any>(fakeData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = fakeData.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(query.toLowerCase());
      const typeMatch = selectedType === '' || item.type === selectedType;
      return nameMatch && typeMatch;
    });
    setFilteredData(filtered);
  };

  const handleFilterByType = (type: any) => {
    setSelectedType(type);

    const filtered = fakeData.filter(item => {
      const nameMatch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const typeMatch = type === '' || item.type === type;
      return nameMatch && typeMatch;
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

      <View style={{gap: 10}}>
        <Searchbar
          placeholder="Tìm đơn thuốc"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <View>
        <View style={{gap: 10}}>
          <Text variant="titleLarge">Danh sách sản phẩm</Text>
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
        </View>
        <FlatList
          style={{height: '100%', width: '100%'}}
          data={filteredData}
          renderItem={({item}) => <ProductCard data={item} />}
          keyExtractor={item => item.id}
        />
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
  listItem: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
});
