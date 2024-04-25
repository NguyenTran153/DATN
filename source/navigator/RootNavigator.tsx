import {createNativeStackNavigator} from '@react-navigation/native-stack';

import type {RootRoutes} from '../Routes/Route';
import ChatNavigator from './ChatNavigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTabNavigator from './BottomTabNavigator';
import PrescriptionScreen from '../screens/PrescriptionScreen';

const Tabs = createNativeStackNavigator<RootRoutes>();

const RootNavigator = () => {
  return (
    <Tabs.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <Tabs.Screen name="LoginScreen" component={LoginScreen} />
      <Tabs.Screen name="RegisterScreen" component={RegisterScreen} />
      <Tabs.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Tabs.Screen name="ChatNavigator" component={ChatNavigator} />
    </Tabs.Navigator>
  );
};

export default RootNavigator;
