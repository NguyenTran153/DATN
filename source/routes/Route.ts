import {NavigatorScreenParams} from '@react-navigation/native';

export type RootRoutes = {
  LoginScreen: {navigation: any};
  RegisterScreen: undefined;
  BottomTabNavigator: NavigatorScreenParams<BottomRoutes>;
  ChatNavigator: NavigatorScreenParams<ChatRoutes>;
 
};

export type BottomRoutes = {
  HomeScreen: undefined;
  MessagesScreen: undefined;
  ProfileScreen: undefined;
}

export type ChatRoutes = {
  MessagesScreen: undefined;
  ChatScreen: {userId: string, userInfo: any};
  BookingScreen: {route: any};
  PrescriptionScreen:{userInfo:any}
};
