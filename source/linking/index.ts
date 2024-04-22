const config = {
  screens: {
    BottomTabNavigator: {
      screens: {
        ProfileScreen: 'users/:id',
      },
    },
  },
};

const linking = {
  prefixes: ['datn://'],
  config,
};

export default linking;
