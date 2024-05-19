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

const account = {
  email: 'myaccount@gmail.com',
  password: '123456789',
  id: '123',
};

const QRGenerate = () => {
  return <QRCode value={`datn://users/${account.id}`} size={150} />;
};

export default QRGenerate;
