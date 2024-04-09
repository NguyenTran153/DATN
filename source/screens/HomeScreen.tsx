import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text, Button} from 'react-native-paper';

const HomeScreen = ({navigation}: {navigation: any}) => {
  return (
    <View>
      <Button
        onPress={() => navigation.navigate('ChatScreen')}
        mode="contained">
        Chat Screen
      </Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
