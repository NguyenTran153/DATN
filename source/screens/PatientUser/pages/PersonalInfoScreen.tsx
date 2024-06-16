import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { Avatar, List, Text, useTheme } from 'react-native-paper';
import { ScrollView } from 'react-native';

const PersonalInfoScreen = ({ route }: any) => {
  const patient = route.params
  useEffect(() => {
    console.log(patient)
  })
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
            description="Nguyễn"
            left={() => <List.Icon icon="account-outline" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Tên"
            description="Văn A"
            left={() => <List.Icon icon="account-outline" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Giới tính"
            description="Nam"
            left={() => <List.Icon icon="gender-male" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Ngày sinh"
            description="01/01/1990"
            left={() => <List.Icon icon="calendar" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Cân nặng"
            description="70 kg"
            left={() => <List.Icon icon="weight" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Chiều cao"
            description="175 cm"
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
