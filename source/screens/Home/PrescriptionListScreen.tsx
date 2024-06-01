import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomAppbar from '../../components/CustomAppbar';

const PrescriptionListScreen = ({navigation}: any) => {
  return (
    <View>
      <CustomAppbar
        title="Danh sách đơn thuốc"
        goBack={() => navigation.goBack()}
      />
    </View>
  );
};

export default PrescriptionListScreen;

const styles = StyleSheet.create({});
