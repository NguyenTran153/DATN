import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme, Avatar, Text, IconButton} from 'react-native-paper';
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');

interface ScheduleCardProps {
  doctorName: string;
  timeStamp: number;
  address: string;
  onCancel: () => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  doctorName,
  timeStamp,
  address,
  onCancel,
}) => {
  const theme = useTheme();
  const formattedTime = moment(timeStamp).format('LLL'); // Use LLL for a more natural date format

  return (
    <View
      style={[styles.container, {borderColor: theme.colors.surfaceVariant}]}>
      <Avatar.Icon size={80} icon="clock-time-eight-outline" />
      <View style={styles.inforContainer}>
        <Text variant="titleMedium">Bác sĩ: {doctorName}</Text>
        <Text variant="titleSmall">Thời gian: {formattedTime}</Text>
        <Text variant="titleSmall">Địa chỉ: {address}</Text>
      </View>
      <IconButton
        style={{top: -10, right: -20}}
        icon="close-circle"
        iconColor={theme.colors.error}
        onPress={onCancel}
      />
    </View>
  );
};

export default ScheduleCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 1,
  },
  inforContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});
