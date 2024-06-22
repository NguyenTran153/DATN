import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Dimensions, Alert} from 'react-native';
import {
  useTheme,
  List,
  IconButton,
  DataTable,
  Searchbar,
  Avatar,
  Text,
} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AppointmentService from '../../../services/AppointmentService';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import LottieView from 'lottie-react-native';

const {height} = Dimensions.get('window');
const ITEMS_PER_PAGE = 7;

const BookingHistoryScreen = ({route}: any) => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isSearchDatePickerVisible, setSearchDatePickerVisibility] =
    useState(false);
  const [newBookingDate, setNewBookingDate] = useState<Date | null>(null);
  const [newBookingTime, setNewBookingTime] = useState<Date | null>(null);
  const patient = route.params.patient;
  const token = useSelector((state: any) => state.token);

  const [app, setApp] = useState<any[]>([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const appointments = await AppointmentService.getAppointmentHistory(
        patient.id,
        token.accessToken,
      );
      setApp(appointments);
    };
    fetchAPI();
  }, []);
  const convertedList = app.map(item => {
    const beginTimestamp = item.beginTimestamp;
    const date = new Date(beginTimestamp * 1000); // Convert to milliseconds

    const formattedDate = moment(date).format('DD/MM/YYYY HH:mm');
    const name = `${item.requestUser.firstName} ${item.requestUser.lastName}`;

    return {
      date: formattedDate,
      name: name,
    };
  });
  const totalPages = Math.ceil(convertedList.length / ITEMS_PER_PAGE);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchDateConfirm = (date: Date) => {
    const formattedDate = date.toLocaleDateString('en-GB');
    setSearchQuery(formattedDate);
    setSearchDatePickerVisibility(false);
  };

  const handleItemRemove = (item: string) => {
    console.log('Item removed:', item);
  };

  const handleNewBookingDateConfirm = (date: Date) => {
    console.log('Selected date: ' + date);
    setNewBookingDate(date);
    setDatePickerVisibility(false);
    setTimePickerVisibility(true);
  };

  const handleNewBookingTimeConfirm = async (time: Date) => {
    if (newBookingDate) {
      const bookingTimestamp = new Date(
        newBookingDate.getFullYear(),
        newBookingDate.getMonth(),
        newBookingDate.getDate(),
        time.getHours(),
        time.getMinutes(),
      );
      console.log(newBookingDate);
      const beginTimestamp = Math.floor(bookingTimestamp.getTime() / 1000);
      const now = new Date();
      const nowTimestamp = Math.floor(now.getTime() / 1000);
      const oneDayInMilliseconds = 24 * 60 * 60;
      console.log(beginTimestamp - nowTimestamp);
      if (
        beginTimestamp &&
        beginTimestamp - nowTimestamp >= oneDayInMilliseconds
      ) {
        console.log('API call with beginTimestamp:', beginTimestamp);
        await AppointmentService.sendAppointment(
          token.accessToken,
          patient.id,
          {
            beginTimestamp: beginTimestamp,
          },
        );
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Đăng ký',
          textBody: 'Đã đặt lịch hẹn',
          button: 'Đóng',
        });
      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Thất bại',
          textBody: 'Lưu ý người dùng chỉ có thể đặt lịch trước 1 ngày',
          button: 'Đóng',
        });
      }
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
        {convertedList.length ? (
          convertedList.map((item, index) => (
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
          ))
        ) : (
          <View style={styles.lottie}>
            <LottieView
              source={require('../../../asset/lottie/notfound.json')}
              autoPlay
              loop
              style={{width: 200, height: 200}}
            />
            <Text variant="titleLarge">Chưa có lịch hẹn nào</Text>
          </View>
        )}
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
  lottie: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
