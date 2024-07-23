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
  Appbar,
  ActivityIndicator,
  SegmentedButtons,
} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AppointmentService from '../../../services/AppointmentService';
import { useIsFocused } from '@react-navigation/native';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import LottieView from 'lottie-react-native';

const {height} = Dimensions.get('window');
const ITEMS_PER_PAGE = 7;

const BookingHistoryScreen = ({route}: any) => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [newBookingDate, setNewBookingDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState('completed');
  const patient = route.params.patient;
  const token = useSelector((state: any) => state.token);

  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        let fetchedAppointments;
        if (selectedSegment === 'upcoming') {
          fetchedAppointments = await AppointmentService.getAppointment(
            token.accessToken,
          );
          fetchedAppointments = fetchedAppointments.filter(
            item => item.confirmUser.id === patient.id,
          );
        } else {
          fetchedAppointments = await AppointmentService.getAppointmentHistory(
            patient.id,
            token.accessToken,
          );
        }
        setAppointments(fetchedAppointments);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
        Alert.alert('Error', 'Failed to fetch appointment history.');
      } finally {
        setLoading(false);
      }
    };
    fetchAPI();
  }, [isFocused]);

  const filterAppointments = (appointments: any[], query: string) => {
    if (!query.trim()) return appointments;

    const formattedQuery = moment(
      query,
      ['DD/MM/YYYY', 'DD-MM-YYYY', 'DD/MM', 'DD-MM', 'DD'],
      true,
    );

    return appointments.filter(item => {
      const appointmentDate = moment(
        new Date(item.beginTimestamp * 1000),
      ).format('DD/MM/YYYY');
      return formattedQuery.isValid()
        ? appointmentDate.includes(
            formattedQuery.format('DD/MM/YYYY').slice(0, query.length),
          )
        : false;
    });
  };

  const filteredAppointments = filterAppointments(appointments, searchQuery);

  const convertedList = filteredAppointments.map(item => {
    const beginTimestamp = item.beginTimestamp;
    const date = new Date(beginTimestamp * 1000); // Convert to milliseconds

    const formattedDate = moment(date).format('DD/MM/YYYY HH:mm');
    const name = `${patient.firstName} ${patient.lastName}`; // Update to display patient's name

    return {
      date: formattedDate,
      name: name,
    };
  });

  const totalPages = Math.ceil(convertedList.length / ITEMS_PER_PAGE);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
    try {
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
      }
      setTimePickerVisibility(false);
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Thất bại',
        textBody: 'Đã có lỗi xảy ra! Vui lòng thử lại',
        button: 'Đóng',
      });
    }
  };

  const itemHeight = height / 10;

  return (
    <View style={[styles.screen, {backgroundColor: theme.colors.background}]}>
      <Appbar.Header>
        <Appbar.Content title="Lịch hẹn" />
      </Appbar.Header>
      <View style={styles.filterContainer}>
        <Searchbar
          placeholder="Tìm kiếm..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{flex: 1}}
        />
        <IconButton
          icon="plus"
          iconColor={theme.colors.primary}
          size={36}
          onPress={() => setDatePickerVisibility(true)}
          style={{marginLeft: 8}}
        />
      </View>
      <SegmentedButtons
        value={selectedSegment}
        onValueChange={setSelectedSegment}
        buttons={[
          {value: 'upcoming', label: 'Sắp tới'},
          {value: 'completed', label: 'Hoàn tất'},
        ]}
        style={{marginVertical: 10}}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {appointments.length ? (
            appointments
              .slice(
                currentPage * ITEMS_PER_PAGE,
                (currentPage + 1) * ITEMS_PER_PAGE,
              )
              .map((item, index) => (
                <List.Section key={index} style={{height: itemHeight}}>
                  <List.Item
                    title={item.name}
                    description={item.date}
                    left={props => (
                      <Avatar.Image
                        {...props}
                        source={
                          patient.avatar
                            ? {uri: patient.avatar}
                            : require('../../../asset/7677205.jpg')
                        }
                        size={36}
                        style={{alignSelf: 'center'}}
                      />
                    )}
                    right={props => (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
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
      )}
      {/* <DataTable.Pagination
        page={currentPage}
        numberOfPages={totalPages}
        onPageChange={handlePageChange}
        label={`${currentPage + 1} of ${totalPages}`}
        style={styles.pagination}
      /> */}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
