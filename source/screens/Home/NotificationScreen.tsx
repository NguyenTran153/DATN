import {StyleSheet, View, FlatList, Image} from 'react-native';
import React from 'react';
import {Text, useTheme} from 'react-native-paper';
import CustomAppbar from '../../components/CustomAppbar';

const data = [
  {
    id: 1,
    post_title: 'best things',
    postimage: '../../asset/7677205.jpg',
    post_city: 'HCM',
    username: 'Doraemon',
    notification: 'link your post',
    time: '10:50',
  },
  {
    id: 2,
    post_title: 'another post',
    postimage: '../../asset/7677205.jpg',
    post_city: 'Hanoi',
    username: 'Nobita',
    notification: 'comment on your post',
    time: '15:20',
  },
  {
    id: 3,
    post_title: 'yet another post',
    postimage: '../../asset/7677205.jpg',
    post_city: 'Da Nang',
    username: 'Suneo',
    notification: 'liked your post',
    time: '08:30',
  },
  {
    id: 4,
    post_title: 'random stuff',
    postimage: '../../asset/7677205.jpg',
    post_city: 'Ho Chi Minh City',
    username: 'Gian',
    notification: 'shared your post',
    time: '19:45',
  },
  {
    id: 5,
    post_title: 'interesting topic',
    postimage: '../../asset/7677205.jpg',
    post_city: 'Hue',
    username: 'Shizuka',
    notification: 'tagged you in a post',
    time: '12:15',
  },
];

const NotificationScreen = ({navigation}: any) => {
  const theme = useTheme();
  return (
    <View
      style={[
        {backgroundColor: theme.colors.background},
        styles.notificationContainer,
      ]}>
      <CustomAppbar title="Thông báo" goBack={() => navigation.goBack()} />
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
                    {item.username}
                  </Text>
                  <Text>{item.time}</Text>
                </View>
                <View>
                  <Text> {item.notification}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
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
});
