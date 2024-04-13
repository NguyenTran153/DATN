import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MessagesScreen from '../screens/MessagesScreen';
import ChatScreen from '../screens/ChatScreen';
import {ChatRoutes} from '../Routes/Route';

const Tabs = createNativeStackNavigator<ChatRoutes>();

const ChatNavigator = () => {
  return (
    <Tabs.Navigator initialRouteName="MessagesScreen">
      <Tabs.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{headerShown: false}}
      />
      <Tabs.Screen name="ChatScreen" component={ChatScreen} />
    </Tabs.Navigator>
  );
};

export default ChatNavigator;
