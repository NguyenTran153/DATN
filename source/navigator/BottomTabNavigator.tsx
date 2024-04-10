import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import type {BottomRoutes} from '../Routes/Route';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';

const BottomTabs = createMaterialBottomTabNavigator<BottomRoutes>();
const BottomTabstack = createNativeStackNavigator();

const BottomTabNavigator = ({navigation}: {navigation: any}) => {
  return (
    <BottomTabs.Navigator initialRouteName="HomeScreen">
      <BottomTabs.Screen name="HomeScreen" component={HomeScreen} />
      <BottomTabs.Screen name="ChatScreen" component={ChatScreen} />
      <BottomTabs.Screen name="ProfileScreen" component={ProfileScreen} />
    </BottomTabs.Navigator>
  );
};

export default BottomTabNavigator;
