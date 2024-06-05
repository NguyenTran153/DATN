import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useState} from 'react';
import {useTheme, SegmentedButtons, DataTable} from 'react-native-paper';
import CustomAppbar from '../../components/CustomAppbar';
import ScheduleCard from '../../components/ScheduleCard';

const fakeSchedules = [
  {
    id: 1,
    doctorName: 'Dr. John Doe',
    timeStamp: 1629889200000,
    address: '123 Main St, Cityville',
  },
  {
    id: 2,
    doctorName: 'Dr. Jane Smith',
    timeStamp: 1629975600000,
    address: '456 Elm St, Townsville',
  },
  {
    id: 3,
    doctorName: 'Dr. Emma Brown',
    timeStamp: 1630062000000,
    address: '789 Oak St, Villageville',
  },
  {
    id: 4,
    doctorName: 'Dr. Emma Brown',
    timeStamp: 1630062000000,
    address: '789 Oak St, Villageville',
  },
  {
    id: 5,
    doctorName: 'Dr. Emma Brown',
    timeStamp: 1630062000000,
    address: '789 Oak St, Villageville',
  },
  {
    id: 6,
    doctorName: 'Dr. Emma Brown',
    timeStamp: 1630062000000,
    address: '789 Oak St, Villageville',
  },
  {
    id: 7,
    doctorName: 'Dr. Emma Brown',
    timeStamp: 1630062000000,
    address: '789 Oak St, Villageville',
  },
];

const itemsPerPage = 10;

const ScheduleScreen = ({navigation}: any) => {
  const theme = useTheme();

  const [value, setValue] = useState<string>('active');
  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState(fakeSchedules.slice(0, itemsPerPage));
  const [schedules, setSchedules] = useState(fakeSchedules);

  const handleCancel = (id: number) => {
    const updatedSchedules = schedules.filter(schedule => schedule.id !== id);
    setSchedules(updatedSchedules);
    const newPage = Math.min(
      page,
      Math.ceil(updatedSchedules.length / itemsPerPage) - 1,
    );
    setPage(newPage);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const start = newPage * itemsPerPage;
    const end = start + itemsPerPage;
    setData(fakeSchedules.slice(start, end));
  };

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <CustomAppbar
        title="Danh sách lịch hẹn"
        goBack={() => navigation.goBack()}
      />
      <SegmentedButtons
        style={{width: '90%', alignSelf: 'center'}}
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'active',
            label: 'Sắp tới',
          },
          {
            value: 'past',
            label: 'Đã kết thúc',
          },
          {
            value: 'cancel',
            label: 'Đã huỷ',
          },
        ]}
      />
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({item}) => (
          <ScheduleCard
            doctorName={item.doctorName}
            timeStamp={item.timeStamp}
            address={item.address}
            onCancel={() => handleCancel(item.id)}
          />
        )}
      />
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(fakeSchedules.length / itemsPerPage)}
        onPageChange={handlePageChange}
        label={`${page * itemsPerPage + 1}-${Math.min(
          (page + 1) * itemsPerPage,
          fakeSchedules.length,
        )} of ${fakeSchedules.length}`}
      />
    </View>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    flexDirection: 'column',
  },
});
