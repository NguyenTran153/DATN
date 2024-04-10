import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';

const LoginScreen = ({navigation}: {navigation: any}) => {
  return (
    <View>
      <Text>LoginScreen</Text>
      <Button
        title="Home"
        onPress={() => navigation.replace('BottomTabNavigator')}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
