import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {
  useTheme,
  List,
  IconButton,
  DataTable,
  Searchbar,
  Avatar,
  Text,
  Appbar,
} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AppointmentService from '../../../services/AppointmentService';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import LottieView from 'lottie-react-native';

const {height} = Dimensions.get('window');

const ITEMS_PER_PAGE = 7;

const BookingHistoryScreen = ({navigation}: any) => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isSearchDatePickerVisible, setSearchDatePickerVisibility] =
    useState(false);
  const [newBookingDate, setNewBookingDate] = useState<Date | null>(null);
  const [newBookingTime, setNewBookingTime] = useState<Date | null>(null);
  const [searchDate, setSearchDate] = useState<Date | null>(null);
  const patient = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.token);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointments = await AppointmentService.getAppointment(
          token.accessToken,
        );

        // Lọc và chuyển đổi danh sách lịch hẹn
        const convertedList = appointments.map(item => {
          const beginTimestamp = item.beginTimestamp;
          const date = new Date(beginTimestamp * 1000); // Chuyển đổi thành mili giây
          const formattedDate = moment(date).format('DD/MM/YYYY HH:mm');

          // Xác định thông tin của bác sĩ từ requestUser hoặc confirmUser
          const doctorUser =
            item.requestUser.role === 'doctor'
              ? item.requestUser
              : item.confirmUser;

          // Lấy thông tin từ doctorUser nếu tồn tại
          const doctorFirstName = doctorUser ? doctorUser.firstName : '';
          const doctorLastName = doctorUser ? doctorUser.lastName : '';
          const doctorAvatar = doctorUser ? doctorUser.avatar : '';

          return {
            id: item.id,
            date: formattedDate,
            doctorFirstName: doctorFirstName,
            doctorLastName: doctorLastName,
            doctorAvatar: doctorAvatar,
          };
        });

        setAppointments(convertedList);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        // Xử lý lỗi khi fetch dữ liệu nếu cần
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(item => {
    const matchesName = item.doctorFirstName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const dateFormats = [
      'DD/MM/YYYY',
      'MM/DD/YYYY',
      'YYYY/MM/DD',
      'DD-MM-YYYY',
      'DD',
    ];

    const matchesDate =
      !searchDate ||
      dateFormats.some(format =>
        moment(item.date, 'DD/MM/YYYY HH:mm')
          .format(format)
          .includes(moment(searchDate).format(format)),
      );

    return matchesName && matchesDate;
  });

  const totalPages = Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchDateConfirm = (date: Date) => {
    setSearchDate(date);
    setSearchDatePickerVisibility(false);
  };

  const handleItemRemove = (id: number) => {
    // Xử lý logic xóa item theo id
    console.log('Item removed with id:', id);
  };

  const handleNewBookingDateConfirm = (date: Date) => {
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
      const beginTimestamp = Math.floor(bookingTimestamp.getTime() / 1000);
      const now = new Date();
      const nowTimestamp = Math.floor(now.getTime() / 1000);
      const oneDayInMilliseconds = 24 * 60 * 60;
      if (
        beginTimestamp &&
        beginTimestamp - nowTimestamp >= oneDayInMilliseconds
      ) {
        try {
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
        } catch (error) {
          console.error('Error sending appointment:', error);
          // Xử lý lỗi khi gửi lịch hẹn nếu cần
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Thất bại',
            textBody: 'Đặt lịch hẹn thất bại',
            button: 'Đóng',
          });
        }
      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Thất bại',
          textBody: 'Đặt lịch hẹn thất bại',
          button: 'Đóng',
        });
      }
    }
    setTimePickerVisibility(false);
  };

  const start = currentPage * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentItems = filteredAppointments.slice(start, end);

  const itemHeight = height / 10;

  return (
    <View style={[styles.screen, {backgroundColor: theme.colors.background}]}>
      <Appbar.Header>
        <Appbar.Content title="Lịch hẹn" />
      </Appbar.Header>
      <View style={styles.filterContainer}>
        <Searchbar
          placeholder="Tìm kiếm"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{flex: 1}}
        />
        <IconButton
          icon="plus"
          iconColor={theme.colors.primary}
          size={36}
          onPress={() => {
            navigation.navigate('HomeNavigator', {
              screen: 'BookingScreen',
            });
          }}
          style={{marginLeft: 8}}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {currentItems.length !== 0 ? (
          currentItems.map((item, index) => (
            <List.Section key={index} style={{height: itemHeight}}>
              <List.Item
                title={`${item.doctorFirstName} ${item.doctorLastName}`}
                description={item.date}
                left={props => (
                  <Avatar.Image
                    {...props}
                    source={{uri: item.doctorAvatar}}
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
                      onPress={() => handleItemRemove(item.id)}
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
    alignSelf: 'center',
  },
});
