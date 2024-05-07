import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';

const CallingScreen = () => {
  const [videoCall, setVideoCall] = useState(true);
  const connectionData = {
    appId: '9f0ac2e11ab14a6c8e3e8079617d6f7c',
    channel: 'test',
  };
  const rtcCallbacks = {
    EndCall: () => setVideoCall(false),
  };
  return videoCall ? (
    <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
  ) : (
    <Text onPress={() => setVideoCall(true)}>Start Call</Text>
  );
};

export default CallingScreen;

const styles = StyleSheet.create({});
