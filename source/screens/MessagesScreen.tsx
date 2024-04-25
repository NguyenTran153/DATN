import {
  FlatList,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text, Searchbar, useTheme, Icon, IconButton} from 'react-native-paper';
import React, {useState} from 'react';
import {Screen} from 'react-native-screens';

//Fake data
const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../asset/7677205.jpg'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../asset/7677205.jpg'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../asset/7677205.jpg'),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../asset/7677205.jpg'),
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../asset/7677205.jpg'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

const MessagesScreen = ({navigation}: {navigation: any}) => {
  const theme = useTheme();

  const [searchDoctor, setSearchDoctor] = useState<string>('');

  const filteredMessages =
    searchDoctor.length > 0
      ? Messages.filter(message =>
          message.userName.toLowerCase().includes(searchDoctor.toLowerCase()),
        )
      : Messages;

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.topbar}>
        <Searchbar
          style={styles.searchBar}
          placeholder="Search"
          onChangeText={setSearchDoctor}
          value={searchDoctor}
        />
        <IconButton
          icon="calendar"
          size={24}
          onPress={() =>
            navigation.navigate('ChatNavigator', {
              screen: 'BookingScreen',
              params: {
                userId: '123',
              },
            })
          }
        />
      </View>
      <FlatList
        data={filteredMessages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('ChatNavigator', {
                screen: 'ChatScreen',
                params: {userId: item.id},
              })
            }>
            <View style={styles.userInfo}>
              <View style={styles.userImgWrapper}>
                <Image style={styles.userImg} source={item.userImg} />
              </View>
              <View
                style={[
                  styles.textSection,
                  {borderBottomColor: theme.colors.outline},
                ]}>
                <View style={styles.userInfoText}>
                  <Text style={styles.userName}>{item.userName}</Text>
                  <Text style={[styles.postTime]}>{item.messageTime}</Text>
                </View>
                <Text style={styles.messageText}>{item.messageText}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 10,
    width: '100%',
  },
  searchBar: {
    width: '80%',
    marginLeft: 15,
  },
  card: {
    width: '100%',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userImgWrapper: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: '80%',
    borderBottomWidth: 1,
  },
  userInfoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: 12,
    // color: theme.colors.secondary,
  },
  messageText: {
    fontSize: 14,
  },
});
