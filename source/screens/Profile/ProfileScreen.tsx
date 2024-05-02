import { Text, Button, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Screen } from 'react-native-screens';
const ProfileScreen = ({navigation}: {navigation: any}) => {
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profile}>
        <Image
          source={require('../../asset/7677205.jpg')}
          style={styles.img}
        />
        <View style={styles.patientInfo}>
          <View style={styles.editContainer}>
            <Text style={styles.patientName}>Patient name</Text>
            <Button icon='pencil' mode='text' onPress={() => { }} contentStyle={{ flexDirection: 'row-reverse' }}>edit</Button>
          </View>
          <Text>Date of birth: 1991/02/01</Text>
          <Text>Gender: Female</Text>
          <Text>Address: 68894 Caleigh Trafficway Suite 387</Text>
        </View>
      </View>
      <ScrollView>
        <List.Section>
          <List.Item
            title="Visit History"
            description="Patient's recent visits with a healthcare provider"
            left={() => <List.Icon style={styles.settingCenter} icon="hospital-building" />}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => {}}
          />
          <List.Item
            title="Medical History"
            description="Patient's medical history"
            left={() => <List.Icon style={styles.settingCenter} icon="stethoscope" />}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => {}}
          />
          <List.Item
            title="Complaint"
            description="Patient complaint or medical concern"
            left={() => <List.Icon style={styles.settingCenter} icon="comment-question" />}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => {}}
          />
          <List.Item
            title="Examination"
            description="Physical examinations performed over the past visits"
            left={() => <List.Icon style={styles.settingCenter} icon="test-tube" />}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => {}}
          />
           <List.Item
            title="Medicine"
            description="Medicine prescribed to the patient"
            left={() => <List.Icon style={styles.settingCenter} icon="pill" />}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => {}}
          />
           <List.Item
            title="Doctor"
            description="Doctor registration"
            left={() => <List.Icon style = {styles.settingCenter} icon="doctor" />}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => {}}
          />
          <List.Item
            title="Invitation link"
            description="Use QR code to add friend"
            left={() => <List.Icon style = {styles.settingCenter} icon="qrcode" />}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => navigation.navigate('ProfileNavigator', {screen: 'QRScreen'})}
          />
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    alignSelf: 'center',
    paddingVertical: 14,
    flexDirection: 'row',
    paddingHorizontal: 24,
    textAlign: 'center'
  },
  settingCenter: {
    paddingLeft:20,
  },
  editContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  patientName: {
    fontSize: 18,
    fontWeight: '800'
  },
  img: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    borderRadius: 80,
  },
  patientInfo: {
    paddingHorizontal: 10,
  }

});