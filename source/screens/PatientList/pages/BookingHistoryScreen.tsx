import React, {useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useTheme, List, TextInput, IconButton} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const {height} = Dimensions.get('window');

const fakeMedicalHistoryData = [
  '29/06/2024',
  '29/06/2025',
  '15/07/2023',
  '10/08/2023',
  '22/09/2023',
  '05/10/2023',
  '17/11/2023',
  '01/12/2023',
  '14/01/2024',
  '28/02/2024',
];

const BookingHistoryScreen = () => {
  const theme = useTheme();
  const [displayedData, setDisplayedData] = useState(
    fakeMedicalHistoryData.slice(0, 7),
  );
  const [currentEndIndex, setCurrentEndIndex] = useState(7);
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  const itemHeight = height / 10;

  const loadMoreData = () => {
    if (loading || allDataLoaded) return; // Kiểm tra nếu đang tải hoặc đã hết dữ liệu
    setLoading(true);

    setTimeout(() => {
      try {
        if (!selectedDate) {
          const newEndIndex = currentEndIndex + 7;
          const moreData = fakeMedicalHistoryData.slice(
            currentEndIndex,
            newEndIndex,
          );
          if (moreData.length === 0) {
            setAllDataLoaded(true); // Đánh dấu đã hết dữ liệu
          } else {
            setDisplayedData([...displayedData, ...moreData]);
            setCurrentEndIndex(newEndIndex);
          }
        }
      } catch (error) {
        console.error('Error in setTimeout:', error);
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const filterDataByDate = (date: string) => {
    const filteredData = fakeMedicalHistoryData.filter(item => item === date);
    setDisplayedData(filteredData);
    setAllDataLoaded(true); // Đánh dấu đã hết dữ liệu khi lọc theo ngày
  };

  const handleConfirm = (date: Date) => {
    const formattedDate = date.toLocaleDateString('en-GB');
    setSelectedDate(formattedDate);
    filterDataByDate(formattedDate);
    setDatePickerVisibility(false);
  };

  const handleClearDate = () => {
    setSelectedDate(null);
    setDisplayedData(fakeMedicalHistoryData.slice(0, 7));
    setCurrentEndIndex(7);
    setAllDataLoaded(false); // Reset lại trạng thái khi xóa bộ lọc
  };

  return (
    <View style={styles.screen}>
      <View style={styles.filterContainer}>
        <TextInput
          mode="outlined"
          label="Chọn ngày"
          value={selectedDate || ''}
          right={
            selectedDate ? (
              <TextInput.Icon icon="close" onPress={handleClearDate} />
            ) : (
              <TextInput.Icon
                icon="calendar"
                onPress={() => setDatePickerVisibility(true)}
              />
            )
          }
          editable={false}
        />
      </View>
      <FlatList
        data={displayedData}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item.toString()}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : null
        }
        renderItem={({item}) => (
          <List.Section
            style={{
              height: itemHeight,
            }}>
            <List.Item
              title="Lịch hẹn"
              description={item}
              style={[
                {
                  borderColor: theme.colors.primaryContainer,
                  borderBottomWidth: 1,
                  height: itemHeight - 1,
                },
              ]}
              left={props => (
                <IconButton
                  {...props}
                  icon="calendar"
                  iconColor={theme.colors.primary}
                  style={{alignSelf: 'center'}}
                  size={36}
                />
              )}
              right={props => (
                <IconButton
                  {...props}
                  icon="close-circle-outline"
                  iconColor={theme.colors.error}
                  size={36}
                  style={{alignSelf: 'center'}}
                  onPress={() => {}}
                />
              )}
            />
          </List.Section>
        )}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        style={{zIndex: 9, elevation: 9}}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
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
    marginBottom: 10,
  },
});
