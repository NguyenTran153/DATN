import {StyleSheet, View, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text, useTheme} from 'react-native-paper';
import CustomAppbar from '../../components/CustomAppbar';
import {useSelector} from 'react-redux';
import NotificationService from '../../services/NotificationService';
import LottieView from 'lottie-react-native';

const fakeData = [
  {
    id: 1,
    isRead: false,
    message: 'Your appointment is confirmed',
    referenceId: 123,
    type: 'APPOINTMENT',
    createdBy: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      avatar: '../../asset/7677205.jpg',
    },
    belongTo: {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
    },
    createdAt: '2024-06-04T10:50:00Z',
  },
  // Thêm các đối tượng giả khác tương tự ở đây
];

const NotificationScreen = ({navigation}: any) => {
  const theme = useTheme();
  const token = useSelector((state: any) => state.token.accessToken);

  const [data, setData] = useState<any[]>([]);

  const getNotifications = async () => {
    try {
      const data = await NotificationService.getNotifications(token);
      return data;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const notifications = await getNotifications();
      if (notifications.length > 0) {
        setData(notifications);
      }
    };

    fetchNotifications();
  }, [token]);

  return (
    <View
      style={[
        {backgroundColor: theme.colors.background},
        styles.notificationContainer,
      ]}>
      <CustomAppbar title="Thông báo" goBack={() => navigation.goBack()} />
      {data.length === 0 ? (
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
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({item}) => {
            return (
              <View style={styles.container}>
                <View style={styles.headerLeftImageView}>
                  <Image
                    style={styles.headerLeftImage}
                    source={require('../../asset/7677205.jpg')}
                  />
                </View>

                <View style={{flexDirection: 'row', marginLeft: 10}}>
                  <View>
                    <Text
                      variant="labelLarge"
                      style={{color: theme.colors.primary}}>
                      {item.createdBy.firstName} {item.createdBy.lastName}
                    </Text>
                    <Text>{new Date(item.createdAt).toLocaleTimeString()}</Text>
                  </View>
                  <View>
                    <Text> {item.message}</Text>
                  </View>
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
    alignItems: 'center',
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
    marginLeft: 15,
  },
  lottie: {
    justifyContent: 'center',
    flex: 0.5,
    alignItems: 'center',
  },
});
