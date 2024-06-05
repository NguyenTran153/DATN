import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {DoctorRoutes} from '../Routes/Route';
import DoctorListScreen from '../screens/Doctor/DoctorListScreen';
import ConnectDoctorScreen from '../screens/Doctor/ConnectDoctorScreen';
import CreateAccountScreen from '../screens/Doctor/CreateAccountScreen';
import PatientDetailScreen from '../screens/PatientList/PatientDetailScreen';

const Stacks = createNativeStackNavigator<DoctorRoutes>();

const DoctorNavigator = () => {
  return (
    <Stacks.Navigator>
      <Stacks.Screen
        name={'DoctorListScreen'}
        component={DoctorListScreen}
        options={{headerShown: false}}
      />
      <Stacks.Screen
        name={'ConnectDoctorScreen'}
        component={ConnectDoctorScreen}
        options={{headerShown: false}}
      />
      <Stacks.Screen
        name={'CreateAccountScreen'}
        component={CreateAccountScreen}
        options={{headerShown: false}}
      />
      <Stacks.Screen
        name={'PatientDetailScreen'}
        component={PatientDetailScreen}
        options={{headerShown: false}}
      />
    </Stacks.Navigator>
  );
};

export default DoctorNavigator;
