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
  prefixes: ['datn://', 'https://datn.com.vn', 'http://datn.com.vn'],
  config,
};

export default linking;
