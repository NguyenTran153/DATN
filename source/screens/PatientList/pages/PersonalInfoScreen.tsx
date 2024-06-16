import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { Avatar, List, Text, useTheme } from 'react-native-paper';

const PersonalInfoScreen = ({ route }: any) => {
  const temp = {
    id: 1,
    createdAt: "2024-06-15T21:29:25.581Z",
    updatedAt: "2024-06-15T21:29:25.581Z",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    avatar: "https://example.com/avatar1.jpg",
    gender: "male",
    birthdate: "1985-08-20",
    address: "123 Main St, Anytown, USA",
    height: 180,
    weight: 75,
    firstName: "John",
    lastName: "Doe",
    role: "patient",
  }
  const patient = (route.params.patient as Patient) !== undefined ? (route.params.patient as Patient) : (temp as Patient)
  useEffect(() => { console.log(patient) })

  const theme = useTheme();
  return (
    <ScrollView>
      <View style={[styles.screen, { backgroundColor: theme.colors.background }]}>
        <View style={styles.header}>
          <Avatar.Image
            size={100}
            source={require('../../../asset/7677205.jpg')}
            style={styles.avatar}
          />
          <Text style={styles.headerText}>Thông tin cá nhân</Text>
        </View>
        <List.Section>
          <List.Item
            title="Họ"
            description={patient.firstName}
            left={() => <List.Icon icon="account-outline" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Tên"
            description={patient.lastName}
            left={() => <List.Icon icon="account-outline" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Giới tính"
            description={patient.gender ? patient.gender : "Chưa cập nhật"}
            left={() => <List.Icon icon="gender-male" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Ngày sinh"
            description={patient.birthdate ? patient.birthdate : "Chưa cập nhật"}
            left={() => <List.Icon icon="calendar" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Cân nặng"
            description={patient.weight ? patient.weight : "Chưa cập nhật"}
            left={() => <List.Icon icon="weight" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Chiều cao"
            description={patient.height ? patient.height : "Chưa cập nhật"}
            left={() => <List.Icon icon="ruler" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Địa chỉ"
            description="123 Đường ABC, Quận 1, TP.HCM"
            left={() => <List.Icon icon="home-outline" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
        </List.Section>
      </View>
    </ScrollView>
  );
};

export default PersonalInfoScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItemDescription: {
    fontSize: 16,
    color: 'gray',
  },
});
