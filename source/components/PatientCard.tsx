import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  useTheme,
  List,
  Text,
  TouchableRipple,
  IconButton,
  Modal,
} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import {UserInfo} from 'react-native-agora';
import {useSelector} from 'react-redux';

const avatar = require('../asset/7677205.jpg');

interface ListItemProps {
  icon: string;
  text: string;
  onPress: () => void;
}

interface PatientCardProps {
  patientId: number;
  navigation: any;
}

const PatientCard: React.FC<PatientCardProps> = ({patientId, navigation}) => {
  const theme = useTheme();
  const userData = useSelector((state: any) => state.user);
  const [expanded, setExpanded] = useState(false);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);

  const handleConfirmBooking = (datetime: any) => {
    setBookingModalVisible(false);
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Thành công',
      textBody: 'Đã đặt lịch hẹn thành công',
      button: 'Đóng',
    });
  };

  const listItems = [
    {
      icon: 'clipboard-list-outline',
      text: 'Nhật ký',
      onPress: () =>
        navigation.navigate('ProfileNavigator', {
          screen: 'DiaryRecordScreen',
        }),
    },
    {
      icon: 'pencil-plus',
      text: 'Viết nhật ký',
      onPress: () =>
        navigation.navigate('ProfileNavigator', {
          screen: 'PatientDiaryScreen',
          params: {id: userData.id},
        }),
    },
    {
      icon: 'stethoscope',
      text: 'Danh sách đơn thuốc',
      onPress: () =>
        navigation.navigate('HomeNavigator', {
          screen: 'PrescriptionListScreen',
        }),
    },
    {
      icon: 'clipboard-list-outline',
      text: 'Kê đơn thuốc',
      onPress: () =>
        navigation.navigate('HomeNavigator', {
          screen: 'PrescriptionScreen',
          params: {patientId: patientId},
        }),
    },
    {
      icon: 'calendar',
      text: 'Đặt lịch hẹn',
      onPress: () => setBookingModalVisible(true),
    },
  ];

  const ListItem: React.FC<ListItemProps> = ({icon, text, onPress}) => {
    return (
      <TouchableRipple onPress={onPress}>
        <View style={styles.listItem}>
          <IconButton icon={icon} size={24} />
          <Text style={styles.listItemText}>{text}</Text>
        </View>
      </TouchableRipple>
    );
  };

  return (
    <View style={styles.card}>
      <List.AccordionGroup>
        <List.Accordion
          title={`Bệnh nhân ${patientId}`}
          titleStyle={{fontWeight: '600', fontSize: 18}}
          id={patientId.toString()}
          left={props => <Image source={avatar} style={styles.avatar} />}
          expanded={expanded}
          onPress={() => setExpanded(!expanded)}>
          <View style={styles.buttonContainer}>
            {listItems.map((item, index) => (
              <ListItem
                key={index}
                icon={item.icon}
                text={item.text}
                onPress={item.onPress}
              />
            ))}
          </View>
        </List.Accordion>
      </List.AccordionGroup>
      <DateTimePickerModal
        isVisible={bookingModalVisible}
        mode="datetime"
        onConfirm={handleConfirmBooking}
        onCancel={() => setBookingModalVisible(false)}
      />
    </View>
  );
};

export default PatientCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '100%',
    gap: 10,
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '400',
  },
});
