import {createNativeStackNavigator} from '@react-navigation/native-stack';

import type {RootRoutes} from '../Routes/Route';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Tabs = createNativeStackNavigator<RootRoutes>();

const RootNavigator = () => {
  return (
    <Tabs.Navigator initialRouteName="LoginScreen">
      <Tabs.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Tabs.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Tabs.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    </Tabs.Navigator>
  );
};

export default RootNavigator;
