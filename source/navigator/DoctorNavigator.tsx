import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {DoctorRoutes} from '../Routes/Route';
import DoctorListScreen from '../screens/Doctor/DoctorListScreen';
import ConnectDoctorScreen from '../screens/Doctor/ConnectDoctorScreen';

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
        options={{title:'Liên hệ bác sĩ'}}
      />
    </Stacks.Navigator>
  );
};

export default DoctorNavigator;
