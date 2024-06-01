import {StyleSheet, View, ScrollView} from 'react-native';
import {useTheme, Text, DataTable} from 'react-native-paper';
import React from 'react';
import CustomAppbar from '../../components/CustomAppbar';

const PrescriptionListScreen = ({navigation}: any) => {
  const theme = useTheme();

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <CustomAppbar
        title="Danh sách đơn thuốc"
        goBack={() => navigation.goBack()}
      />
      <View>
        <ScrollView></ScrollView>
      </View>
    </View>
  );
};

export default PrescriptionListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
