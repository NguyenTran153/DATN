import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MessagesScreen from '../screens/Chat/MessagesScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import BookingScreen from '../screens/BookingScreen';
import {ChatRoutes} from '../Routes/Route';
import PrescriptionScreen from '../screens/PrescriptionScreen';
import NotificationScreen from '../screens/NotificationScreen';
import CallingScreen from '../screens/Chat/CallingScreen';

const Tabs = createNativeStackNavigator<ChatRoutes>();

const ChatNavigator = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{headerShown: false}}
      />
      <Tabs.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <Tabs.Screen
        name="BookingScreen"
        component={BookingScreen}
        options={{
          title: 'Đặt lịch khám',
        }}
      />
      <Tabs.Screen
        name="PrescriptionScreen"
        component={PrescriptionScreen}
        options={{
          title: 'Đơn thuốc',
        }}
      />
      <Tabs.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          title: 'Thông báo',
        }}
      />
      <Tabs.Screen
        name="CallingScreen"
        component={CallingScreen}
        options={{
          title: 'Hội thoại',
        }}
      />
    </Tabs.Navigator>
  );
};

export default ChatNavigator;
