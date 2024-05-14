import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';

import CustomAppbar from '../../components/CustomAppbar';

const BecomeDoctorScreen = ({navigation}: any) => {
  const theme = useTheme();
  return (
    <View style={{backgroundColor: theme.colors.background, flex: 1}}>
      <CustomAppbar
        title="Đăng ký tài khoản Bác sĩ"
        goBack={() => navigation.goBack()}
      />
    </View>
  );
};

export default BecomeDoctorScreen;

const styles = StyleSheet.create({});
