import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MessagesScreen from '../screens/MessagesScreen';
import ChatScreen from '../screens/ChatScreen';
import BookingScreen from '../screens/BookingScreen';
import {ChatRoutes} from '../Routes/Route';

const Tabs = createNativeStackNavigator<ChatRoutes>();

const ChatNavigator = ({navigation}: {navigation: any}) => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{headerShown: false, title: 'Danh sách tin nhắn'}}
      />
      <Tabs.Screen name="ChatScreen" component={ChatScreen} />
      <Tabs.Screen
        name="BookingScreen"
        component={BookingScreen}
        options={{
          title: 'Đặt lịch khám',
        }}
      />
    </Tabs.Navigator>
  );
};

export default ChatNavigator;
