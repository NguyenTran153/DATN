import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  useTheme,
  List,
  Text,
  TouchableRipple,
  IconButton,
  Modal,
  Avatar,
  Icon,
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
  patient: Patient;
  navigation: any;
}

const PatientCard: React.FC<PatientCardProps> = ({patient, navigation}) => {
  const theme = useTheme();

  return (
    <TouchableRipple
      onPress={() =>
        navigation.navigate('DoctorNavigator', {
          screen: 'PatientDetailScreen',
          params: { patient },
        })
        // ()=>{console.log(patient)}
      }
      style={[styles.card, {borderBlockColor: theme.colors.primaryContainer}]}>
      <View style={styles.cardContainer}>
        <Avatar.Image source={avatar} />
        <View style={styles.textContainer}>
          <Text variant="titleMedium">Bệnh nhân {patient.firstName + ' ' + patient.lastName}</Text>
          <Text variant="titleSmall">Giới tính: {patient.gender ? patient.gender:'Chưa cập nhật'}</Text>
        </View>
        <View style={styles.textContainer}>
          <Icon source={'arrow-right-bold'} size={24} />
        </View>
      </View>
    </TouchableRipple>
  );
};

export default PatientCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  infoContainer: {
    flexDirection: 'column',
    flex: 4,
  },
});
