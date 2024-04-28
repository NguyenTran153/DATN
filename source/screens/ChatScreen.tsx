import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, Icon, useTheme} from 'react-native-paper';
import {Bubble, GiftedChat, IMessage, Send} from 'react-native-gifted-chat';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {ChatRoutes} from '../Routes/Route';
import {RootRoutes} from '../Routes/Route';

type Props = NativeStackScreenProps<ChatRoutes, 'ChatScreen'>;

const ChatScreen = ({route, navigation}: Props) => {
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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('PrescriptionScreen', {
            userInfo: userInfo,
          })
        }>
        <Icon source="plus" size={24} color="black" />
      </TouchableOpacity>
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
  button: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});
