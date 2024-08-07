import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeRoutes} from '../Routes/Route';
import BookingScreen from '../screens/Home/BookingScreen';
import PrescriptionScreen from '../screens/Home/PrescriptionScreen';
import PrescriptionListScreen from '../screens/Home/PrescriptionListScreen';
import NotificationScreen from '../screens/Home/NotificationScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import ScheduleScreen from '../screens/Home/ScheduleScreen';
import PatientRecordScreen from '../screens/Home/PatientRecordScreen';
import ExamineScreen from '../screens/Home/ExamineScreen';
import PatientSelectionScreen from '../screens/Home/PatientSelectionScreen';

const Tabs = createNativeStackNavigator<HomeRoutes>();

const HomeNavigator = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tabs.Screen
        name="BookingScreen"
        component={BookingScreen}
        options={{headerShown: false}}
      />
      <Tabs.Screen
        name="PrescriptionScreen"
        component={PrescriptionScreen}
        options={{headerShown: false}}
      />
      <Tabs.Screen
        name="PrescriptionListScreen"
        component={PrescriptionListScreen}
        options={{headerShown: false}}
      />
      <Tabs.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
      <Tabs.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={{headerShown: false}}
      />
      <Tabs.Screen
        name="PatientRecordScreen"
        component={PatientRecordScreen}
        options={{headerShown: false}}
      />
      <Tabs.Screen
        name="ExamineScreen"
        component={ExamineScreen}
        options={{headerShown: false}}
      />
      <Tabs.Screen
        name="PatientSelectionScreen"
        component={PatientSelectionScreen}
        options={{headerShown: false}}
      />
    </Tabs.Navigator>
  );
};

export default HomeNavigator;
