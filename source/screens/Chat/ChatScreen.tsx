import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Text,
  Icon,
  useTheme,
  IconButton,
  Appbar,
  Menu,
} from 'react-native-paper';
import {Bubble, GiftedChat, IMessage, Send} from 'react-native-gifted-chat';

import {ChatRoutes} from '../../Routes/Route';

const ChatScreen = ({route, navigation}: any) => {
  const theme = useTheme();

  const [messages, setMessages] = useState<IMessage[]>([]);

  const userId = route.params.userId;
  const userInfo = route.params.userInfo;
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages: any[]) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View>
          <Icon source="send-circle" size={32} />
        </View>
      </Send>
    );
  };

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: theme.colors.background,
          },
        }}
        textStyle={{
          right: {
            color: theme.colors.tertiary,
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <Icon source="angle-double-down" size={22} />;
  };
  const [menuVisible, setMenuVisible] = React.useState(false);

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

  const handleMenuItemPress = (route: any) => {
    navigation.navigate(route);
    closeMenu();
  };
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Tin nhắn" />
        <Appbar.Action
          icon="phone"
          onPress={() => {
            navigation.navigate('CallingScreen', {
              userInfo: userInfo,
            });
          }}
        />
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="menu" onPress={openMenu} />}
          contentStyle={{
            marginTop: 40,
            backgroundColor: theme.colors.background,
          }}>
          <Menu.Item
            onPress={() => {
              navigation.navigate('PrescriptionScreen', {
                userInfo: userInfo,
              }),
                closeMenu();
            }}
            title="Kê đơn thuốc"
          />
          <Menu.Item
            onPress={() => {
              navigation.navigate('BookingScreen', {
                route: '',
              });
              closeMenu();
            }}
            title="Tạo lịch hẹn"
          />
        </Menu>
      </Appbar.Header>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        keyboardShouldPersistTaps="never"
        infiniteScroll
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },

  button: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});
