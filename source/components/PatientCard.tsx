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

const defaultAvatar = require('../asset/7677205.jpg');

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
  const renderGender = (gender: string | undefined | null) => {
    if (gender === 'male') return 'Nam';
    if (gender === 'female') return 'Nữ';
    return gender ? gender : 'Chưa cập nhật';
  };

  return (
    <TouchableRipple
      onPress={() =>
        navigation.navigate('DoctorNavigator', {
          screen: 'PatientDetailScreen',
          params: {patient},
        })
      }
      style={[styles.card, {borderBlockColor: theme.colors.primaryContainer}]}>
      <View style={styles.cardContainer}>
        <Avatar.Image
          source={patient.avatar ? {uri: patient.avatar} : defaultAvatar}
        />
        <View style={styles.textContainer}>
          <Text variant="titleMedium">
            Bệnh nhân {patient.firstName + ' ' + patient.lastName}
          </Text>
          <Text variant="titleSmall">
            Giới tính: {renderGender(patient.gender)}
          </Text>
        </View>
        <View style={styles.infoContainer}>
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
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    marginLeft: 10,
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
