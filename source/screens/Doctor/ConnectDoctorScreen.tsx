import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';

const ConnectDoctorScreen = () => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.colors.background},
      ]}></View>
  );
};

export default ConnectDoctorScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
});
