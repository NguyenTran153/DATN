import {StyleSheet, View} from 'react-native';
import {Text, Icon, useTheme} from 'react-native-paper';
import React, {useCallback, useEffect, useState} from 'react';
import {Bubble, GiftedChat, IMessage, Send} from 'react-native-gifted-chat';

const ChatScreen = () => {
  const theme = useTheme();

  const [messages, setMessages] = useState<IMessage[]>([]);

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
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
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
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
