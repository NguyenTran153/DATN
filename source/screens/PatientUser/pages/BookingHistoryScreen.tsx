import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {
  useTheme,
  List,
  IconButton,
  DataTable,
  Searchbar,
  Avatar,
} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const {height} = Dimensions.get('window');

const fakeMedicalHistoryData = [
  {date: '29/06/2024 14:30', name: 'Nguyễn Văn A'},
  {date: '29/06/2025 10:00', name: 'Trần Thị B'},
  {date: '15/07/2023 09:15', name: 'Lê Văn C'},
  {date: '10/08/2023 11:45', name: 'Phạm Thị D'},
  {date: '22/09/2023 08:00', name: 'Hoàng Văn E'},
  {date: '05/10/2023 13:30', name: 'Đỗ Thị F'},
  {date: '17/11/2023 15:00', name: 'Vũ Văn G'},
  {date: '01/12/2023 07:45', name: 'Bùi Thị H'},
  {date: '14/01/2024 16:15', name: 'Ngô Văn I'},
  {date: '28/02/2024 12:00', name: 'Trịnh Thị J'},
];

const ITEMS_PER_PAGE = 7;

const BookingHistoryScreen = () => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isSearchDatePickerVisible, setSearchDatePickerVisibility] =
    useState(false);
  const [newBookingDate, setNewBookingDate] = useState<Date | null>(null);
  const [newBookingTime, setNewBookingTime] = useState<Date | null>(null);

  const totalPages = Math.ceil(fakeMedicalHistoryData.length / ITEMS_PER_PAGE);

  const getCurrentPageData = () => {
    const filteredData = searchQuery
      ? fakeMedicalHistoryData.filter(
          item =>
            item.date.includes(searchQuery) || item.name.includes(searchQuery),
        )
      : fakeMedicalHistoryData;

    const startIndex = currentPage * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchDateConfirm = (date: Date) => {
    const formattedDate = date.toLocaleDateString('en-GB');
    setSearchQuery(formattedDate);
    setSearchDatePickerVisibility(false);
  };

  const handleClearDate = () => {
    setSearchQuery('');
    setCurrentPage(0);
  };

  const handleItemRemove = (item: string) => {
    console.log('Item removed:', item);
  };

  const handleItemConfirm = (item: string) => {
    console.log('Item confirmed:', item);
  };

  const handleNewBookingDateConfirm = (date: Date) => {
    setNewBookingDate(date);
    setDatePickerVisibility(false);
    setTimePickerVisibility(true);
  };

  const handleNewBookingTimeConfirm = (time: Date) => {
    if (newBookingDate) {
      const bookingTimestamp = new Date(
        newBookingDate.getFullYear(),
        newBookingDate.getMonth(),
        newBookingDate.getDate(),
        time.getHours(),
        time.getMinutes(),
      );
      console.log('New Booking Timestamp:', bookingTimestamp.toISOString());
    }
    setTimePickerVisibility(false);
  };

  const itemHeight = height / 10;

  return (
    <View style={styles.screen}>
      <View style={styles.filterContainer}>
        <Searchbar
          placeholder="Tìm kiếm"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{flex: 1}}
        />
        <IconButton
          icon="calendar"
          iconColor={theme.colors.primary}
          size={36}
          onPress={() => setSearchDatePickerVisibility(true)}
          style={{marginLeft: 8}}
        />
        <IconButton
          icon="plus"
          iconColor={theme.colors.primary}
          size={36}
          onPress={() => setDatePickerVisibility(true)}
          style={{marginLeft: 8}}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {getCurrentPageData().map((item, index) => (
          <List.Section key={index} style={{height: itemHeight}}>
            <List.Item
              title={item.name}
              description={item.date}
              left={props => (
                <Avatar.Image
                  {...props}
                  source={require('../../../asset/7677205.jpg')}
                  size={36}
                  style={{alignSelf: 'center'}}
                />
              )}
              right={props => (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconButton
                    {...props}
                    icon="close-circle-outline"
                    iconColor={theme.colors.error}
                    size={36}
                    onPress={() => handleItemRemove(item.date)}
                  />
                </View>
              )}
              style={[
                {
                  borderColor: theme.colors.primaryContainer,
                  borderBottomWidth: 1,
                  height: itemHeight - 1,
                },
              ]}
            />
          </List.Section>
        ))}
      </ScrollView>
      <DataTable.Pagination
        page={currentPage}
        numberOfPages={totalPages}
        onPageChange={handlePageChange}
        label={`${currentPage + 1} of ${totalPages}`}
        style={styles.pagination}
      />
      <DateTimePickerModal
        isVisible={isSearchDatePickerVisible}
        style={{zIndex: 9, elevation: 9}}
        mode="date"
        onConfirm={handleSearchDateConfirm}
        onCancel={() => setSearchDatePickerVisibility(false)}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        style={{zIndex: 9, elevation: 9}}
        mode="date"
        onConfirm={handleNewBookingDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        style={{zIndex: 9, elevation: 9}}
        mode="time"
        onConfirm={handleNewBookingTimeConfirm}
        onCancel={() => setTimePickerVisibility(false)}
      />
    </View>
  );
};

export default BookingHistoryScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pagination: {
    alignSelf: 'center',
    marginVertical: 10,
  },
});