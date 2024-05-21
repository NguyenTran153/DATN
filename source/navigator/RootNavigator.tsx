import {createNativeStackNavigator} from '@react-navigation/native-stack';

import type {RootRoutes} from '../Routes/Route';
import HomeNavigator from './HomeNavigator';
import LoginScreen from '../screens/Authorization/LoginScreen';
import RegisterScreen from '../screens/Authorization/RegisterScreen';
import BottomTabNavigator from './BottomTabNavigator';
import StoreNavigator from './StoreNavigator';
import ProfileNavigator from './ProfileNavigator';
import DoctorNavigator from './DoctorNavigator';
import OtpScreen from '../screens/Authorization/PhoneNumberScreen';
import PhoneNumber from '../screens/Authorization/PhoneNumberScreen';
import OTPScreen from '../screens/Authorization/OtpScreen';

const Tabs = createNativeStackNavigator<RootRoutes>();

const RootNavigator = () => {
  return (
    <Tabs.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <Tabs.Screen name="LoginScreen" component={LoginScreen} />
      <Tabs.Screen name="RegisterScreen" component={RegisterScreen} />
      <Tabs.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Tabs.Screen name="HomeNavigator" component={HomeNavigator} />
      <Tabs.Screen name="StoreNavigator" component={StoreNavigator} />
      <Tabs.Screen name="ProfileNavigator" component={ProfileNavigator} />
      <Tabs.Screen name="DoctorNavigator" component={DoctorNavigator} />
      <Tabs.Screen name="PhoneNumberScreen" component={PhoneNumber}/>
      <Tabs.Screen name="OtpScreen" component={OTPScreen}/>
    </Tabs.Navigator>
  );
};

export default RootNavigator;
