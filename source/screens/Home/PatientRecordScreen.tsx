import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import CustomAppbar from '../../components/CustomAppbar';

const PatientRecordScreen = ({navigation}: any) => {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <CustomAppbar
        title="Hồ sơ bệnh nhân"
        goBack={() => navigation.goBack()}
        iconButton={{icon: 'account-plus', onPress: () => console.log('HEllo')}}
      />

    </View>
  );
};

export default PatientRecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    flexDirection: 'column',
  },
});
