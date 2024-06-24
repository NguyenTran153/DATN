import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Text, useTheme, SegmentedButtons, Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import CustomAppbar from '../../components/CustomAppbar';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import NotificationService from '../../services/NotificationService';
import UserService from '../../services/UserService';
import axios from 'axios';

const NotificationScreen = ({navigation}: any) => {
  const theme = useTheme();
  const token = useSelector((state: any) => state.token?.accessToken);

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [type, setType] = useState<string>('');

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
    const fetchNotifications = async () => {
      const notifications = await getNotifications(type);
      setData(notifications);
    };

    fetchNotifications();
  }, [token, type]);

  const translateMessage = (message: string): string => {
    if (message === 'You have a new friend request!') {
      return 'Bạn có một lời mời kết bạn mới!';
    }
    if (message.startsWith('You have a new appointment request from')) {
      const name = message
        .replace('You have a new appointment request from', '')
        .trim();
      return `Bạn có lịch hẹn từ ${name}`;
    }
    return message;
  };

  const acceptFriend = async (
    friendRequestId: string,
    notificationId: string,
  ) => {
    try {
      console.log('Notification I: ' + notificationId);
      console.log('FriendId' + friendRequestId);
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
      await UserService.acceptFriend(token, friendRequestId);
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Kết bạn thành công',
        button: 'Đóng',
      });

      // Cập nhật trạng thái của thông báo trong danh sách
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
      console.log('Notification I: ' + notificationId);
      console.log(appointmentId);
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
      await UserService.acceptAppointment(token, appointmentId);
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Chấp nhận lịch hẹn thành công',
        button: 'Đóng',
      });

      // Cập nhật trạng thái của thông báo trong danh sách
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
                  {type === 'add_friend' && (
                    <Button
                      icon="account-check"
                      mode="contained"
                      onPress={() => acceptFriend(referenceId, id)}
                      disabled={isRead}
                      style={{alignSelf: 'flex-end', marginTop: 10}}>
                      {isRead ? 'Đã kết bạn' : 'Kết bạn'}
                    </Button>
                  )}
                  {type === 'appointment' && (
                    <Button
                      icon="account-check"
                      mode="contained"
                      onPress={() => acceptAppointment(referenceId, id)}
                      disabled={isRead}
                      style={{alignSelf: 'flex-end', marginTop: 10}}>
                      {isRead ? 'Đã hẹn' : 'Đồng ý'}
                    </Button>
                  )}
                </View>
              </View>
            );
          }}
        />
      )}
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
});
