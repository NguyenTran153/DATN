import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import {ProfileRoutes} from '../Routes/Route';
import QRScreen from '../screens/QRScreen';
import BecomeDoctorScreen from '../screens/Profile/BecomeDoctorScreen';
import PatientDiaryScreen from '../screens/Profile/PatientDiaryScreen';
import DiaryRecordScreen from '../screens/Profile/DiaryRecordScreen';
const Stacks = createNativeStackNavigator<ProfileRoutes>();

const ProfileNavigator = () => {
  return (
    <Stacks.Navigator>
      <Stacks.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stacks.Screen name="QRScreen" component={QRScreen} />
      <Stacks.Screen
        name="BecomeDoctorScreen"
        component={BecomeDoctorScreen}
        options={{headerShown: false}}
      />
      <Stacks.Screen
        name="PatientDiaryScreen"
        component={PatientDiaryScreen}
      />
      <Stacks.Screen
        name="DiaryRecordScreen"
        component={DiaryRecordScreen}
      />
    </Stacks.Navigator>
  );
};

export default ProfileNavigator;
