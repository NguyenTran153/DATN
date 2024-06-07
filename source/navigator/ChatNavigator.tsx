import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MessagesScreen from '../screens/Chat/MessagesScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import BookingScreen from '../screens/Home/BookingScreen';
import {ChatRoutes} from '../Routes/Route';
import PrescriptionScreen from '../screens/Home/PrescriptionScreen';
import NotificationScreen from '../screens/Home/NotificationScreen';
import CallingScreen from '../screens/Chat/CallingScreen';
import ExamineScreen from '../screens/Home/ExamineScreen';

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
        options={{headerShown: false}}
      />
     
      <Tabs.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
      <Tabs.Screen
        name="CallingScreen"
        component={CallingScreen}
        options={{headerShown: false}}
      />
      
    </Tabs.Navigator>
  );
};

export default ChatNavigator;
