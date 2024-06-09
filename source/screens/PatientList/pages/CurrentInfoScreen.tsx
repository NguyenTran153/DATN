import {StyleSheet, SafeAreaView, ScrollView, View} from 'react-native';
import React from 'react';
import {Text, useTheme, Card, IconButton} from 'react-native-paper';

const CurrentInfoScreen = () => {
  const theme = useTheme();

  // Sample data
  const nextAppointment = null;
  const recentDietLog =
    '14/06/2024 - Ăn sáng: Bánh mì và trứng, Ăn trưa: Cơm gà, Ăn tối: Phở';
  const recentDiagnosis = '13/06/2024 - Viêm họng';
  const recentPrescription =
    '13/06/2024 - Paracetamol 500mg, 2 viên/ngày, uống sau khi ăn';

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Title
            title="Lịch khám tiếp theo"
            left={props => <IconButton {...props} icon="calendar" />}
            titleStyle={styles.cardTitle}
          />
          <Card.Content>
            <Text style={styles.cardContent}>
              {nextAppointment
                ? nextAppointment
                : 'Không có lịch khám tiếp theo'}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title
            title="Nhật ký ăn uống gần nhất"
            left={props => <IconButton {...props} icon="food" />}
            titleStyle={styles.cardTitle}
          />
          <Card.Content>
            <Text style={styles.cardContent}>{recentDietLog}</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title
            title="Chẩn đoán và kết quả gần nhất"
            left={props => <IconButton {...props} icon="file-find" />}
            titleStyle={styles.cardTitle}
          />
          <Card.Content>
            <Text style={styles.cardContent}>{recentDiagnosis}</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title
            title="Đơn thuốc gần nhất"
            left={props => <IconButton {...props} icon="pill" />}
            titleStyle={styles.cardTitle}
          />
          <Card.Content>
            <Text style={styles.cardContent}>{recentPrescription}</Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CurrentInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    fontSize: 16,
    marginTop: 8,
  },
});
