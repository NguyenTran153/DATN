import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {
  useTheme,
  List,
  IconButton,
  DataTable,
  Searchbar,
  Button,
} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const {height} = Dimensions.get('window');

const fakeMedicalHistoryData = [
  {date: '29/06/2024', symptoms: 'Ho, sốt'},
  {date: '29/06/2025', symptoms: 'Đau đầu, mệt mỏi'},
  {date: '15/07/2023', symptoms: 'Buồn nôn, chóng mặt'},
  {date: '10/08/2023', symptoms: 'Đau bụng, tiêu chảy'},
  {date: '22/09/2023', symptoms: 'Khó thở, tức ngực'},
  {date: '05/10/2023', symptoms: 'Mất ngủ, lo âu'},
  {date: '17/11/2023', symptoms: 'Đau lưng, đau cổ'},
  {date: '01/12/2023', symptoms: 'Viêm họng, đau nhức cơ'},
  {date: '14/01/2024', symptoms: 'Đau mắt, mờ mắt'},
  {date: '28/02/2024', symptoms: 'Sưng tấy, đỏ da'},
];

const ITEMS_PER_PAGE = 7;

const MedicalHistoryScreen = ({navigation, route}: any) => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const totalPages = Math.ceil(fakeMedicalHistoryData.length / ITEMS_PER_PAGE);

  const getCurrentPageData = () => {
    const filteredData = searchQuery
      ? fakeMedicalHistoryData.filter(
          item =>
            item.date.includes(searchQuery) ||
            item.symptoms.includes(searchQuery),
        )
      : fakeMedicalHistoryData;

    const startIndex = currentPage * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleConfirm = (date: Date) => {
    const formattedDate = date.toLocaleDateString('en-GB');
    setSearchQuery(formattedDate);
    setDatePickerVisibility(false);
  };

  const handleViewDetails = (item: any) => {
    navigation.navigate('MedicalDetailScreen', {item});
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
          onPress={() => setDatePickerVisibility(true)}
          style={{marginLeft: 8}}
        />
        <IconButton
          icon="plus"
          iconColor={theme.colors.primary}
          size={36}
          onPress={() =>
            navigation.navigate('DoctorNavigator', {
              screen: 'ExamineScreen',
              params: route.params,
            })
          }
          style={{marginLeft: 8}}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {getCurrentPageData().map((item, index) => (
          <List.Section key={index} style={{height: itemHeight}}>
            <List.Item
              title={item.date}
              description={item.symptoms}
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
                <Button
                  mode="outlined"
                  onPress={() => handleViewDetails(item)}
                  style={styles.viewDetailsButton}>
                  Xem chi tiết
                </Button>
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
        isVisible={isDatePickerVisible}
        style={{zIndex: 9, elevation: 9}}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );
};

export default MedicalHistoryScreen;

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
  viewDetailsButton: {
    marginRight: 8,
    alignSelf: 'center',
  },
});
