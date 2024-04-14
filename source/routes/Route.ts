export type RootRoutes = {
  LoginScreen: {navigation: any};
  RegisterScreen: undefined;
  BottomTabNavigator: {navigation: any};
  ChatNavigator: undefined;
  PrescriptionScreen: undefined;
};

export type BottomRoutes = {
  HomeScreen: undefined;
  MessagesScreen: undefined;
  ProfileScreen: undefined;
};

export type ChatRoutes = {
  MessagesScreen: undefined;
  ChatScreen: {userId: string};
};
