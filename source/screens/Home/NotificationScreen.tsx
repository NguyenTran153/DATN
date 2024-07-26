import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  useTheme,
  SegmentedButtons,
  Button,
  TextInput,
  Modal as RNModal,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import CustomAppbar from '../../components/CustomAppbar';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import NotificationService from '../../services/NotificationService';
import UserService from '../../services/UserService';
import {useIsFocused} from '@react-navigation/native';
import AppointmentService from '../../services/AppointmentService';
import {baseURL} from '../../utils/constant';

const NotificationScreen = ({navigation}: any) => {
  const theme = useTheme();
  const token = useSelector((state: any) => state.token?.accessToken);
  const isFocused = useIsFocused();
  const user = useSelector((state: any) => state.user);

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [type, setType] = useState<string>('');
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [cancelVisible, setCancelVisible] = useState<boolean>(false);

  const [cancelReason, setCancelReason] = useState('');

  const getNotifications = async (type: string) => {
    try {
      setLoading(true);
      const data = await NotificationService.getNotifications(token, type);
      return data;
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cancelVisible) {
      setModalVisible(false);
    }
  }, [modalVisible, cancelVisible]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const notifications = await getNotifications(type);
      setData(notifications);
    };

    fetchNotifications();
  }, [token, type, isFocused]);

  const translateMessage = (message: string): string => {
    if (message === 'You have a new friend request!') {
      return 'Bạn có một lời mời kết bạn mới!';
    }
    if (message === 'Your friend request has been accepted')
      return 'Lời mời kết bạn đã được chấp nhận';
    if (message === 'Your friend request has been declined')
      return 'Lời mời kết bạn đã bị từ chối';
    if (message.startsWith('You have a new appointment request from')) {
      const name = message
        .replace('You have a new appointment request from', '')
        .trim();
      return `Bạn có lịch hẹn từ ${name}`;
    }
    return message;
  };

  const handleAccept = async () => {
    if (selectedNotification) {
      const {type, referenceId, id} = selectedNotification;
      if (type === 'add_friend') {
        await acceptFriend(referenceId, id);
      } else if (type === 'appointment') {
        await acceptAppointment(referenceId, id);
      }
    }
    setModalVisible(false);
    setSelectedNotification(null);
  };

  const handleDecline = async () => {
    if (selectedNotification) {
      const {type, referenceId, id} = selectedNotification;
      if (type === 'add_friend') {
        await declineFriend(referenceId, id);
      } else if (type === 'appointment') {
        await declineAppointment(referenceId, id);
      }
    }
    setModalVisible(false);
    setSelectedNotification(null);
  };

  const acceptFriend = async (
    friendRequestId: string,
    notificationId: string,
  ) => {
    try {
      await fetch(`${baseURL}notifications/${notificationId}/mark-as-read`, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
        body: '',
      });
      await UserService.acceptFriend(token, friendRequestId, 'accepted');
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Kết bạn thành công',
        button: 'Đóng',
      });

      setData(prevData =>
        prevData.map(notification =>
          notification.id === notificationId
            ? {...notification, isRead: true}
            : notification,
        ),
      );
    } catch (error) {
      console.log(error);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Lỗi',
        textBody: 'Bạn đã kết bạn rồi hoặc đối tượng không tồn tại',
        button: 'Đóng',
      });
    }
  };

  const declineFriend = async (
    friendRequestId: string,
    notificationId: string,
  ) => {
    try {
      await fetch(
        `http://10.0.2.2:8080/notifications/${notificationId}/mark-as-read`,
        {
          method: 'POST',
          headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
          body: '',
        },
      );
      await UserService.acceptFriend(token, friendRequestId, 'declined');
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Từ chối kết bạn thành công',
        button: 'Đóng',
      });

      setData(prevData =>
        prevData.map(notification =>
          notification.id === notificationId
            ? {...notification, isRead: true}
            : notification,
        ),
      );
    } catch (error) {
      console.log(error);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Lỗi',
        textBody: 'Bạn đã kết bạn rồi hoặc đối tượng không tồn tại',
        button: 'Đóng',
      });
    }
  };

  const acceptAppointment = async (
    appointmentId: string,
    notificationId: string,
  ) => {
    try {
      await fetch(
        `http://10.0.2.2:8080/notifications/${notificationId}/mark-as-read`,
        {
          method: 'POST',
          headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
          body: '',
        },
      );
      await UserService.acceptAppointment(token, appointmentId, 'accept');
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Chấp nhận lịch hẹn thành công',
        button: 'Đóng',
      });

      setData(prevData =>
        prevData.map(notification =>
          notification.id === notificationId
            ? {...notification, isRead: true}
            : notification,
        ),
      );
    } catch (error) {
      console.log(error);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Lỗi',
        textBody: 'Đã quá thời hạn để chấp nhận lịch hẹn',
        button: 'Đóng',
      });
    }
  };

  const declineAppointment = async (
    appointmentId: string,
    notificationId: string,
  ) => {
    try {
      if (cancelReason === '') {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Thông báo',
          textBody: 'Không được để trống lí do',
          button: 'Đóng',
        });
      } else {
        await fetch(
          `http://10.0.2.2:8080/notifications/${notificationId}/mark-as-read`,
          {
            method: 'POST',
            headers: {
              Accept: '*/*',
              Authorization: `Bearer ${token}`,
            },
            body: '',
          },
        );
        await AppointmentService.cancelAppointment(
          Number(appointmentId),
          cancelReason,
          token,
        );
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Từ chối lịch hẹn thành công',
          button: 'Đóng',
        });

        setData(prevData =>
          prevData.map(notification =>
            notification.id === notificationId
              ? {...notification, isRead: true}
              : notification,
          ),
        );
      }
    } catch (error) {
      console.log(error);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Lỗi',
        textBody: 'Đã quá thời hạn để từ chối lịch hẹn',
        button: 'Đóng',
      });
    } finally {
      setCancelVisible(false);
    }
  };

  return (
    <View
      style={[
        {backgroundColor: theme.colors.background},
        styles.notificationContainer,
      ]}>
      <CustomAppbar title="Thông báo" goBack={() => navigation.goBack()} />
      <View style={styles.segmentContainer}>
        <SegmentedButtons
          value={type}
          onValueChange={setType}
          buttons={[
            {
              value: '',
              label: 'Tất cả',
              style: type === '' ? {backgroundColor: theme.colors.primary} : {},
            },
            {
              value: 'add_friend',
              label: 'Kết bạn',
              style:
                type === 'add_friend'
                  ? {backgroundColor: theme.colors.primary}
                  : {},
            },
            {
              value: 'appointment',
              label: 'Lịch hẹn',
              style:
                type === 'appointment'
                  ? {backgroundColor: theme.colors.primary}
                  : {},
            },
          ]}
        />
      </View>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      ) : data.length === 0 ? (
        <View style={styles.lottie}>
          <LottieView
            source={require('../../asset/lottie/nonotification.json')}
            autoPlay
            loop
            style={{width: 200, height: 200}}
          />
          <Text variant="titleLarge">Chưa có thông báo</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            const {
              createdBy,
              createdAt,
              message,
              type,
              referenceId,
              isRead,
              id,
            } = item;
            const firstName = createdBy?.firstName || '';
            const lastName = createdBy?.lastName || '';
            const messageText = translateMessage(message || '');

            const formattedDate = createdAt
              ? new Date(createdAt).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })
              : '';
            const formattedTime = createdAt
              ? new Date(createdAt).toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '';

            return (
              <View style={styles.container}>
                <View style={styles.headerLeftImageView}>
                  <Image
                    style={styles.headerLeftImage}
                    source={require('../../asset/icon/notification-bell.png')}
                  />
                </View>

                <View style={{flexDirection: 'row', marginLeft: 10, flex: 1}}>
                  <View style={{flex: 1}}>
                    <Text
                      variant="labelLarge"
                      style={{color: theme.colors.primary}}>
                      {firstName} {lastName}
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                      {formattedDate} {formattedTime}
                    </Text>
                    <Text>{messageText}</Text>
                  </View>
                  {(type === 'add_friend' ||
                    (type === 'appointment' && user.role !== 'patient')) &&
                    ![
                      'Your friend request has been accepted',
                      'Your friend request has been declined',
                    ].includes(message) && (
                      <Button
                        icon="account-check"
                        mode="contained"
                        onPress={() => {
                          setSelectedNotification(item);
                          setModalVisible(true);
                        }}
                        disabled={isRead}
                        style={{alignSelf: 'flex-end', marginTop: 10}}>
                        {isRead ? 'Đã phản hồi' : 'phản hồi'}
                      </Button>
                    )}
                </View>
              </View>
            );
          }}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setSelectedNotification(null);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Bạn có muốn phản hồi thông báo này không?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonAccept]}
                onPress={handleAccept}>
                <Text style={styles.textStyle}>Đồng ý</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonDecline]}
                onPress={() => setCancelVisible(true)}>
                <Text style={styles.textStyle}>Từ chối</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <RNModal
        visible={cancelVisible}
        onDismiss={() => setCancelVisible(false)}>
        <View
          style={[
            {
              padding: 20,
              borderRadius: 8,
              margin: 20,
              backgroundColor: theme.colors.background,
            },
          ]}>
          <Text style={styles.modalTitle}>Nhập lí do huỷ</Text>
          <TextInput
            style={[styles.input, {color: theme.colors.onBackground}]}
            placeholder="Lí do huỷ"
            value={cancelReason}
            onChangeText={setCancelReason}
          />
          <View style={styles.buttonContainer}>
            <Button onPress={() => setCancelVisible(false)}>Đóng</Button>
            <Button
              style={{backgroundColor: theme.colors.error}}
              mode="contained"
              onPress={async () => await handleDecline()}>
              Huỷ
            </Button>
          </View>
        </View>
      </RNModal>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  notificationContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  headerLeftImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  headerLeftImageView: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 15,
  },
  lottie: {
    justifyContent: 'center',
    flex: 0.5,
    alignItems: 'center',
  },
  segmentContainer: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    height: 200,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    justifyContent: 'space-between',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonAccept: {
    backgroundColor: '#2196F3',
  },
  buttonDecline: {
    backgroundColor: '#F44336',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
