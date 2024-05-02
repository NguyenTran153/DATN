import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import {ProfileRoutes} from '../Routes/Route';

const Stacks = createNativeStackNavigator<ProfileRoutes>();

const StoreNavigator = () => {
  return (
    <Stacks.Navigator>
      <Stacks.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stacks.Navigator>
  );
};

export default StoreNavigator;
