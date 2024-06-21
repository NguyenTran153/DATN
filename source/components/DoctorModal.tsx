import React from 'react';
import {
  Modal,
  Portal,
  Text,
  Button,
  Avatar,
  Title,
  Paragraph,
  useTheme,
} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

// Function to format date to dd/mm/yyyy
const formatDate = (dateString: any) => {
  if (!dateString) return 'Chưa cập nhật';
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const DoctorModal = ({visible, doctor, onClose}: any) => {
  const theme = useTheme();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={[
          styles.modalContainer,
          {backgroundColor: theme.colors.background},
        ]}>
        <View
          style={[
            styles.modalContent,
            {backgroundColor: theme.colors.background},
          ]}>
          <View style={styles.header}>
            <Avatar.Image
              size={80}
              source={
                doctor?.avatar
                  ? {uri: doctor.avatar}
                  : require('../asset/7677205.jpg')
              }
            />
            <View style={styles.headerText}>
              <Title>
                {`${doctor?.firstName} ${doctor?.lastName}` || 'Chưa cập nhật'}
              </Title>
            </View>
          </View>
          <View style={styles.details}>
            <Paragraph>Email: {doctor?.email || 'Chưa cập nhật'}</Paragraph>
            <Paragraph>
              Số điện thoại: {doctor?.phoneNumber || 'Chưa cập nhật'}
            </Paragraph>
            <Paragraph>
              Giới tính: {doctor?.gender || 'Chưa cập nhật'}
            </Paragraph>
            <Paragraph>Ngày sinh: {formatDate(doctor?.birthdate)}</Paragraph>
            <Paragraph>Địa chỉ: {doctor?.address || 'Chưa cập nhật'}</Paragraph>
            <Paragraph>
              Chiều cao: {doctor?.height || 'Chưa cập nhật'}
            </Paragraph>
            <Paragraph>Cân nặng: {doctor?.weight || 'Chưa cập nhật'}</Paragraph>
          </View>
          <Button mode="contained" onPress={onClose} style={styles.closeButton}>
            Đóng
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    marginLeft: 10,
  },
  details: {
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
  },
});

export default DoctorModal;
