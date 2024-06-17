import moment from 'moment';
import {ScrollView, StyleSheet, View} from 'react-native';
import {DataTable, Divider, Text, useTheme} from 'react-native-paper';

const EntryItem = ({entry}: {entry: any}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 16,
      padding: 16,
      backgroundColor: theme.colors.background,
      width: '100%',
    },
    listContainer: {
      padding: 16,
      alignItems: 'center',
    },
    entryContainer: {
      marginBottom: 20,
    },
    entryTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      alignSelf: 'center',
    },
    fieldContainer: {
      flexDirection: 'row',
      marginBottom: 5,
      width: '100%',
      justifyContent: 'space-between',
    },
    fieldLabel: {
      fontWeight: 'bold',
    },
    tableCell: {
      paddingHorizontal: 8,
      justifyContent: 'center',
    },
  });
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.entryTitle}>{entry.data.time}</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={styles.tableCell}>Hoạt động</DataTable.Title>
          <DataTable.Title style={styles.tableCell}>Kết quả</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell style={styles.tableCell}>Thức ăn</DataTable.Cell>
          <DataTable.Cell style={styles.tableCell}>
            {entry.data.food}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={styles.tableCell}>Huyết áp</DataTable.Cell>
          <DataTable.Cell style={styles.tableCell}>
            {entry.data.bloodPressure}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={styles.tableCell}>Đường huyết</DataTable.Cell>
          <DataTable.Cell style={styles.tableCell}>
            {entry.data.bloodSugar}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={styles.tableCell}>Tập thể dục</DataTable.Cell>
          <DataTable.Cell style={styles.tableCell}>
            {entry.data.exercise}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={styles.tableCell}>Ghi chú</DataTable.Cell>
          <DataTable.Cell style={styles.tableCell}>
            {entry.data.note}
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      <Divider />
    </ScrollView>
  );
};
export default EntryItem;
