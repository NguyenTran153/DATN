import {createNativeStackNavigator} from '@react-navigation/native-stack';

import type {RootRoutes} from '../Routes/Route';
import ChatNavigator from './ChatNavigator';
import LoginScreen from '../screens/Authorization/LoginScreen';
import RegisterScreen from '../screens/Authorization/RegisterScreen';
import BottomTabNavigator from './BottomTabNavigator';
import StoreNavigator from './StoreNavigator';
import ProfileNavigator from './ProfileNavigator';
import DoctorNavigator from './DoctorNavigator';

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
      <Tabs.Screen name="StoreNavigator" component={StoreNavigator} />
      <Tabs.Screen name="ProfileNavigator" component={ProfileNavigator} />
      <Tabs.Screen name="DoctorNavigator" component={DoctorNavigator} />
    </Tabs.Navigator>
  );
};

export default RootNavigator;
