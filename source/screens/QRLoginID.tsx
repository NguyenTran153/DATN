import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import React, {useState} from 'react';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';

const account = {
  email: 'myaccount@gmail.com',
  password: '123456789',
  id: '123',
};

const QRGenerate = () => {
  const user = useSelector((state: any) => state.user);
  return <QRCode value={`${user.phoneNumber}`} size={150} />;
};

export default QRGenerate;
