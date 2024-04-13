import {
  FlatList,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text, Searchbar, useTheme} from 'react-native-paper';
import React, {useState} from 'react';

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

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      paddingLeft: 20,
      paddingRight: 20,
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    searchBar: {
      marginVertical: 5,
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
      borderBottomColor: theme.colors.outline,
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
      color: theme.colors.secondary,
    },
    messageText: {
      fontSize: 14,
    },
  });

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search"
        onChangeText={setSearchDoctor}
        value={searchDoctor}
      />
      <FlatList
        data={filteredMessages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('ChatScreen', {userId: item.id})
            }>
            <View style={styles.userInfo}>
              <View style={styles.userImgWrapper}>
                <Image style={styles.userImg} source={item.userImg} />
              </View>
              <View style={styles.textSection}>
                <View style={styles.userInfoText}>
                  <Text style={styles.userName}>{item.userName}</Text>
                  <Text style={styles.postTime}>{item.messageTime}</Text>
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