import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeNavigator from './HomeNavigator';
import LoginScreen from '../screens/Authorization/LoginScreen';
import RegisterScreen from '../screens/Authorization/RegisterScreen';
import MainNavigator from './MainNavigator';
import StoreNavigator from './StoreNavigator';
import ProfileNavigator from './ProfileNavigator';
import DoctorNavigator from './DoctorNavigator';
import PhoneNumber from '../screens/Authorization/PhoneNumberScreen';
import OTPScreen from '../screens/Authorization/OtpScreen';
import ResetPasswordScreen from '../screens/Authorization/ResetPasswordScreen';
import OTPResetPassword from '../screens/Authorization/OTPResetPassword';
import ForgotPasswordScreen from '../screens/Authorization/ForgotPasswordScreen';
import PatientUserScreen from '../screens/PatientUser/PatientUserScreen';
import CameraScreen from '../screens/Profile/CameraScreen';
import UpdatePersonalInfoScreen from '../screens/Profile/UpdatePersonalInfoScreen';
import ChangePasswordScreen from '../screens/Profile/ChangePasswordScreen';

const Tabs = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Tabs.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <Tabs.Screen name="LoginScreen" component={LoginScreen} />
      <Tabs.Screen name="RegisterScreen" component={RegisterScreen} />
      <Tabs.Screen name="MainNavigator" component={MainNavigator} />
      <Tabs.Screen name="HomeNavigator" component={HomeNavigator} />
      <Tabs.Screen name="CameraScreen" component={CameraScreen} />
      <Tabs.Screen name="StoreNavigator" component={StoreNavigator} />
      <Tabs.Screen name="ProfileNavigator" component={ProfileNavigator} />
      <Tabs.Screen name="DoctorNavigator" component={DoctorNavigator} />
      <Tabs.Screen name="PhoneNumberScreen" component={PhoneNumber} />
      <Tabs.Screen name="OtpScreen" component={OTPScreen} />
      <Tabs.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
      <Tabs.Screen name="OTPResetPassword" component={OTPResetPassword} />
      <Tabs.Screen name="PatientUserScreen" component={PatientUserScreen} />
      <Tabs.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />
      <Tabs.Screen
        name="UpdatePersonalInfoScreen"
        component={UpdatePersonalInfoScreen}
      />
      <Tabs.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
    </Tabs.Navigator>
  );
};

export default RootNavigator;
