import {FlatList, StyleSheet, View, TextInput} from 'react-native';
import {useState, useEffect} from 'react';
import {
  useTheme,
  Card,
  Avatar,
  IconButton,
  Appbar,
  Text,
  Modal,
  Button,
  Searchbar,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import AppointmentService from '../../services/AppointmentService';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';

const ScheduleScreen = ({navigation}: any) => {
  const theme = useTheme();
  const token = useSelector((state: any) => state.token.accessToken);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [sortedAppointments, setSortedAppointments] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [cancelReason, setCancelReason] = useState<string>('');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    number | null
  >(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchAppointments();
  }, [isFocused]);

  useEffect(() => {
    sortAppointments(appointments, sortOrder);
  }, [appointments, sortOrder]);

  const fetchAppointments = async () => {
    try {
      const response = await AppointmentService.getAppointment(token);
      console.log('API Response:', response);

      const convertedList = response.map((item: any) => {
        const beginTimestamp = item.beginTimestamp;
        const date = new Date(beginTimestamp * 1000);
        const formattedDate = moment(date).format('DD/MM/YYYY HH:mm');

        const user =
          item.requestUser.role === 'patient'
            ? item.requestUser
            : item.confirmUser;

        const userFirstName = user ? user.firstName : '';
        const userLastName = user ? user.lastName : '';
        const userAvatar = user ? user.avatar : '';
        const userAddress = user ? user.address : '';
        const birthday = moment(user?.birthdate).format('DD/MM/YYYY');
        const gender = user?.gender === 'male' ? 'Nam' : 'Nữ';

        return {
          id: item.id,
          date: formattedDate,
          userFirstName: userFirstName,
          userLastName: userLastName,
          userAvatar: userAvatar,
          userAddress: userAddress,
          birthday: birthday,
          gender,
          status: item.status,
        };
      });

      console.log('Converted List:', convertedList);

      const upcomingAppointments = convertedList.filter(
        app => app.status === 'ongoing',
      );

      console.log('Upcoming Appointments:', upcomingAppointments);
      setAppointments(upcomingAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const sortAppointments = (appointments: any[], order: 'asc' | 'desc') => {
    const sorted = [...appointments].sort((a, b) => {
      const dateA = moment(a.date, 'DD/MM/YYYY HH:mm').valueOf();
      const dateB = moment(b.date, 'DD/MM/YYYY HH:mm').valueOf();
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setSortedAppointments(sorted);
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleCancel = (id: number) => {
    setSelectedAppointmentId(id);
    setModalVisible(true);
  };

  const confirmCancel = async () => {
    if (selectedAppointmentId !== null) {
      try {
        if (cancelReason === '') {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Thông báo',
            textBody: 'Không được để trống lí do',
            button: 'Đóng',
          });
        } else {
          await AppointmentService.cancelAppointment(
            selectedAppointmentId,
            cancelReason,
            token,
          );
          setModalVisible(false);
          setCancelReason('');
          fetchAppointments();
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Thông báo',
            textBody: 'Đã huỷ lịch hẹn',
            button: 'Đóng',
          });
        }
      } catch (error) {
        setModalVisible(false);
        setCancelReason('');
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Thông báo',
          textBody: 'Huỷ lịch hẹn thất bại',
          button: 'Đóng',
        });
        console.error('Error cancelling appointment:', error);
      }
    }
  };

  const filteredAppointments = sortedAppointments.filter(appointment => {
    const searchLower = searchQuery.toLowerCase();
    return (
      appointment.userFirstName.toLowerCase().includes(searchLower) ||
      appointment.userLastName.toLowerCase().includes(searchLower) ||
      appointment.date.includes(searchQuery)
    );
  });

  const renderItem = ({item}: {item: any}) => (
    <Card style={styles.card}>
      <Card.Title
        title={`Họ tên: ${item.userFirstName} ${item.userLastName}`}
        subtitle={`Ngày hẹn: ${item.date || 'Chưa có thông tin'}`}
        left={props => (
          <Avatar.Image {...props} size={50} source={{uri: item.userAvatar}} />
        )}
        right={props => (
          <IconButton
            {...props}
            iconColor={theme.colors.error}
            icon="cancel"
            onPress={() => handleCancel(item.id)}
          />
        )}
      />
      <Card.Content>
        <Text>Giới tính: {item.gender}</Text>
        <Text>Địa chỉ: {item.userAddress}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Appbar.Header>
        <Appbar.Content title="Danh sách lịch hẹn sắp tới" />
        <IconButton
          icon={sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'}
          onPress={toggleSortOrder}
        />
      </Appbar.Header>
      <Searchbar
        style={[styles.searchBar, {color: theme.colors.onBackground}]}
        placeholder="Tìm kiếm theo tên hoặc ngày hẹn"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredAppointments}
        contentContainerStyle={{marginHorizontal: 10}}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={renderItem}
      />

      {/* Modal for cancel reason */}
      <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
        <View
          style={[
            styles.modalContainer,
            {backgroundColor: theme.colors.background},
          ]}>
          <Text style={styles.modalTitle}>Nhập lí do huỷ</Text>
          <TextInput
            style={[styles.input, {color: theme.colors.onBackground}]}
            placeholder="Lí do huỷ"
            value={cancelReason}
            onChangeText={setCancelReason}
          />
          <View style={styles.buttonContainer}>
            <Button onPress={() => setModalVisible(false)}>Đóng</Button>
            <Button
              style={{backgroundColor: theme.colors.error}}
              mode="contained"
              onPress={async () => await confirmCancel()}>
              Huỷ
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    flexDirection: 'column',
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
  },
  searchBar: {
    margin: 10,
  },
  modalContainer: {
    padding: 20,
    borderRadius: 8,
    margin: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ScheduleScreen;
