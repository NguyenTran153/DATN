import {createNativeStackNavigator} from '@react-navigation/native-stack';

import type {Routes} from '../Routes/Route';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';

const Tabs = createNativeStackNavigator<Routes>();

const RootNavigation = () => {
  return (
    <Tabs.Navigator initialRouteName="HomeScreen">
      <Tabs.Screen name="HomeScreen" component={HomeScreen} />
      <Tabs.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
    </Tabs.Navigator>
  );
};

export default RootNavigation;
