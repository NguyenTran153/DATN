import React from 'react';
import {View, ScrollView, StyleSheet, Linking} from 'react-native';
import {
  useTheme,
  Text,
  TextInput,
  List,
  Provider as PaperProvider,
  DataTable,
  Button,
} from 'react-native-paper';
import CustomAppbar from '../../../components/CustomAppbar';

const MedicalDetailScreen = ({navigation, route}: any) => {
  const theme = useTheme();
  const {item} = route.params;
  const {prescription, diagnosis} = item;

  const convertString = (inputString: string): string => {
    if (inputString.startsWith('"') && inputString.endsWith('"')) {
      return inputString.slice(1, -1).replace(/\\"/g, '"');
    }
    return inputString.replace(/\\"/g, '"');
  };

  const handleDownload = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <PaperProvider
      theme={{
        ...theme,
        roundness: 10, // Set the roundness value for all Paper components
      }}>
      <View style={[styles.screen, {backgroundColor: theme.colors.background}]}>
        <CustomAppbar
          title="Thông tin khám bệnh"
          goBack={() => navigation.goBack()}
        />
        <ScrollView
          style={{padding: 16}}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chi tiết khám bệnh</Text>
            <TextInput
              label="Ngày khám bệnh"
              mode="outlined"
              value={prescription.date}
              style={styles.input}
              editable={false}
              theme={{roundness: 10}}
            />
            <TextInput
              label="Kết quả"
              mode="outlined"
              value={convertString(diagnosis.problem)}
              multiline
              numberOfLines={4}
              style={styles.input}
              editable={false}
              theme={{roundness: 10}}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Xét nghiệm</Text>
            {diagnosis.images.map((image: string, index: number) => (
              <List.Item
                key={index}
                title={`File ${index + 1}`}
                description={image}
                right={props => (
                  <Button
                    {...props}
                    onPress={() => handleDownload(image)}
                    mode="outlined"
                    style={styles.downloadButton}>
                    Tải xuống
                  </Button>
                )}
              />
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Đơn thuốc</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={{flex: 3}}>Thuốc</DataTable.Title>
                <DataTable.Title style={{flex: 1}}>Buổi</DataTable.Title>
                <DataTable.Title numeric style={{flex: 1}}>
                  Số viên
                </DataTable.Title>
              </DataTable.Header>
              {prescription.data.medicines.map(
                (medicine: any, index: number) => (
                  <React.Fragment key={index}>
                    <DataTable.Row>
                      <DataTable.Cell style={{flex: 3}}>
                        {medicine.name}
                      </DataTable.Cell>
                      <DataTable.Cell style={{flex: 1}}>Sáng</DataTable.Cell>
                      <DataTable.Cell numeric style={{flex: 1}}>
                        {medicine.schedule.morning}
                      </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Cell style={{flex: 3}}>.</DataTable.Cell>
                      <DataTable.Cell style={{flex: 1}}>Trưa</DataTable.Cell>
                      <DataTable.Cell numeric style={{flex: 1}}>
                        {medicine.schedule.afternoon}
                      </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Cell style={{flex: 3}}>.</DataTable.Cell>
                      <DataTable.Cell style={{flex: 1}}>Chiều</DataTable.Cell>
                      <DataTable.Cell numeric style={{flex: 1}}>
                        {medicine.schedule.evening}
                      </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Cell style={{flex: 3}}>.</DataTable.Cell>
                      <DataTable.Cell style={{flex: 1}}>Tối</DataTable.Cell>
                      <DataTable.Cell numeric style={{flex: 1}}>
                        {medicine.schedule.night}
                      </DataTable.Cell>
                    </DataTable.Row>
                  </React.Fragment>
                ),
              )}
            </DataTable>
          </View>
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

export default MedicalDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
  },
  downloadButton: {
    alignSelf: 'center',
  },
  medicineContainer: {
    marginBottom: 16,
  },
});
