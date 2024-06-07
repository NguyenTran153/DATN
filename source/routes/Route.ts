import {NavigatorScreenParams} from '@react-navigation/native';

export type RootRoutes = {
  LoginScreen: {navigation: any};
  RegisterScreen: {token: string};
  ResetPasswordScreen: {token: string};
  PhoneNumberScreen: undefined;
  ForgotPasswordScreen: undefined;
  OtpScreen: {pinId: string};
  OTPResetPassword: {pinId: string};
  CameraScreen: any;
  BottomTabNavigator: NavigatorScreenParams<BottomRoutes>;
  HomeNavigator: NavigatorScreenParams<HomeRoutes>;
  StoreNavigator: NavigatorScreenParams<StoreRoutes>;
  ProfileNavigator: NavigatorScreenParams<ProfileRoutes>;
  DoctorNavigator: NavigatorScreenParams<DoctorRoutes>;
};

export type BottomRoutes = {
  StoreScreen: undefined;
  HomeScreen: any;
  ProfileScreen: undefined;
  DoctorListScreen: any;
  PatientListScreen: any;
};

export type ChatRoutes = {
  MessagesScreen: undefined;
  ChatScreen: {userId: string; userInfo: any};
  BookingScreen: {route: any};
  PrescriptionScreen: {userInfo: any};
  NotificationScreen: any;
  CallingScreen: any;
};

export type StoreRoutes = {
  StoreScreen: any;
  CartScreen: any;
  ProductScreen: any;
};

export type ProfileRoutes = {
  ProfileScreen: any;
  QRScreen: any;
  BecomeDoctorScreen: any;
  PatientDiaryScreen: any;
  DiaryRecordScreen: any;
};

export type DoctorRoutes = {
  DoctorListScreen: any;
  ConnectDoctorScreen: any;
  CreateAccountScreen: any;
  PatientDetailScreen: any;
};

export type HomeRoutes = {
  HomeScreen: any;
  BookingScreen: {route: any};
  PrescriptionScreen: any;
  PrescriptionListScreen: any;
  NotificationScreen: any;
  CallingScreen: any;
  ScheduleScreen: any;
  PatientRecordScreen: any;
};
