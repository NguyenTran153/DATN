import {NavigatorScreenParams} from '@react-navigation/native';

export type RootRoutes = {
  LoginScreen: {navigation: any};
  RegisterScreen: undefined;
  BottomTabNavigator: NavigatorScreenParams<BottomRoutes>;
  ChatNavigator: NavigatorScreenParams<ChatRoutes>;
  StoreNavigator: NavigatorScreenParams<StoreRoutes>;
  ProfileNavigator: NavigatorScreenParams<ProfileRoutes>;
};

export type BottomRoutes = {
  StoreScreen: undefined;
  MessagesScreen: undefined;
  ProfileScreen: undefined;
};

export type ChatRoutes = {
  MessagesScreen: undefined;
  ChatScreen: {userId: string; userInfo: any};
  BookingScreen: {route: any};
  PrescriptionScreen: {userInfo: any};
  NotificationScreen: any;
};

export type StoreRoutes = {
  StoreScreen: any;
  CartScreen: any;
  ProductScreen: any;
};

export type ProfileRoutes = {
  ProfileScreen: any;
  QRScreen: any;
};
