import React from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Avatar, List, Text, useTheme, IconButton} from 'react-native-paper';
import {useSelector} from 'react-redux';

const PersonalInfoScreen = ({navigation}: any) => {
  const theme = useTheme();
  const user = useSelector((state: any) => state.user); // Adjusted state slice name
  console.log('USER: ' + JSON.stringify(user));

  const handleUpdatePress = () => {
    navigation.navigate('UpdatePersonalInfoScreen');
  };

  const personalInfo = {
    firstName: user.firstName || 'Chưa cập nhật',
    lastName: user.lastName || 'Chưa cập nhật',
    birthdate: user.birthdate
      ? new Date(user.birthdate).toLocaleDateString()
      : 'Chưa cập nhật',
    gender:
      user.gender === 'male'
        ? 'Nam'
        : user.gender === 'female'
        ? 'Nữ'
        : 'Chưa cập nhật',
    address: user.address || 'Chưa cập nhật',
    height: user.height ? `${user.height} cm` : 'Chưa cập nhật',
    weight: user.weight ? `${user.weight} kg` : 'Chưa cập nhật',
    avatar: user.avatar,
  };

  return (
    <View style={[styles.screen, {backgroundColor: theme.colors.background}]}>
      <View style={styles.header}>
        <Avatar.Image
          size={100}
          source={
            personalInfo.avatar
              ? {uri: personalInfo.avatar}
              : require('../../../asset/7677205.jpg')
          }
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editButton} onPress={handleUpdatePress}>
          <IconButton icon="pencil" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Thông tin cá nhân</Text>
      </View>
      <ScrollView>
        <List.Section>
          <List.Item
            title="Họ"
            description={personalInfo.firstName}
            left={() => <List.Icon icon="account-outline" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Tên"
            description={personalInfo.lastName}
            left={() => <List.Icon icon="account-outline" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Giới tính"
            description={personalInfo.gender}
            left={() => (
              <List.Icon
                icon={
                  personalInfo.gender === 'Nam'
                    ? 'gender-male'
                    : personalInfo.gender === 'Nữ'
                    ? 'gender-female'
                    : 'gender-non-binary'
                }
              />
            )}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Ngày sinh"
            description={personalInfo.birthdate}
            left={() => <List.Icon icon="calendar" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Cân nặng"
            description={personalInfo.weight}
            left={() => <List.Icon icon="weight" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Chiều cao"
            description={personalInfo.height}
            left={() => <List.Icon icon="ruler" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Địa chỉ"
            description={personalInfo.address}
            left={() => <List.Icon icon="home-outline" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
        </List.Section>
      </ScrollView>
    </View>
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
    position: 'relative',
  },
  avatar: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  editButton: {
    position: 'absolute',
    top: 0,
    right: 0,
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
