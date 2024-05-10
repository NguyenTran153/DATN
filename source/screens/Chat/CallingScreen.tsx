import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';

const CallingScreen = () => {
  const connectionData = {
    appId: 'f0c995576e8b4e39987c992d5becf7c6',
    channel: 'test',
    token: null,
  };
  return <AgoraUIKit connectionData={connectionData} />;
};

export default CallingScreen;

const styles = StyleSheet.create({});
