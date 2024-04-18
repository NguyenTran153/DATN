import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import React from 'react';
import DropDown from 'react-native-paper-dropdown';
import { List, TextInput, Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';

const MyDropdownComponent = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [medicine, setMedicine] = useState("");
  const [Dosage, setDosage] = useState("");
  const [morning, setMorning] = useState("");
  const [afternoon, setAfternoon] = useState("");
  const [evening, setEvening] = useState("");
  const [night, setNight] = useState("");
  const medicineList = [
    {
      label: "Paracetamol",
      value: "Paracetamol",
    },
    {
      label: "Aspirin",
      value: "Aspirin",
    },
    {
      label: "Prospan",
      value: "Prospan",
    },
  ];
  const styles = StyleSheet.create({
    textInput: {
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      marginHorizontal: 10,
      width: 'auto',
      height: 50
    },
    cell: {
      marginHorizontal: 5,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      width: 'auto',
    }
  })

  return (
    <View style={{ marginHorizontal: 10 }}>
      <View style={{ flexDirection: 'row', margin: 10 }}>
        <DropDown
          label={"Medicine"}
          mode={"outlined"}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={medicine}
          setValue={setMedicine}
          list={medicineList}
        />

        <View style={{ alignSelf: 'center' }}>
          <TextInput
            style={styles.textInput}
            label={'Dosage'}
            onChangeText={text => setDosage(text)}
            value={Dosage}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput
          label={'Morning'}
          style={styles.cell}
          onChangeText={text => setMorning(text)}
          value={morning}
        />
        <TextInput
          label={'Afternoon'}
          style={styles.cell}
          onChangeText={text => setAfternoon(text)}
          value={afternoon}
        />
        <TextInput
          label={'Evening'}
          style={styles.cell}
          onChangeText={text => setEvening(text)}
          value={evening}
        />
        <TextInput
          label={'Night'}
          style={styles.cell}
          onChangeText={text => setNight(text)}
          value={night}
        />
      </View>
    </View>
  );
};

const PrescriptionScreen = () => {
  const patientName = "John Doe";
  const patientAge = "35";
  const patientGender = "Male";
  const patientAddress = "123 Main Street, City, Country";
  const patientHeight = "180";
  const patientWeight = "75";
  const [components, setComponents] = useState<{ id: number, component: React.ReactNode }[]>([]);
  const [idCounter, setIdCounter] = useState(0);
  const[prescription, setPrescription] = useState('');
  const addComponent = () => {
    const newId = idCounter + 1;
    setIdCounter(newId);
    setComponents(prevComponents => [
      ...prevComponents,
      { id: newId, component: <MyDropdownComponent key={newId} /> }
    ]);
    
  };

  const removeComponent = (idToRemove: number) => {
    setComponents(prevComponents => prevComponents.filter(comp => comp.id !== idToRemove));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'center', marginBottom:10}}>
        <Text style={{fontSize:26, fontWeight:'bold'}}>Prescription</Text>
      </View>
      <View>
        <View style={styles.row}>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Name: </Text>
            <Text style={styles.value}>{patientName}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Gender: </Text>
            <Text style={styles.value}>{patientGender}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Age: </Text>
            <Text style={styles.value}>{patientAge}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Address: </Text>
            <Text style={styles.value}>{patientAddress}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Height (cm): </Text>
            <Text style={styles.value}>{patientHeight}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Weight (kg): </Text>
            <Text style={styles.value}>{patientWeight}</Text>
          </View>
        </View>
      </View>
      <TextInput
          label={'Prescription'}
          style={styles.prescriptionInput}
          onChangeText={text => setPrescription(text)}
          value={prescription}
        />
      <View style={{ marginHorizontal: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Button mode='contained' onPress={addComponent}>Add</Button>
        <Button mode='contained' onPress={() => removeComponent(components[components.length - 1]?.id)}>Remove</Button>
      </View>
      <SafeAreaView>
        {components.map(({ id, component }) => (
          <View key={id} style={{ flexDirection: 'row' }}>
            {component}
          </View>
        ))}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  prescriptionInput:{
    height:100,
    margin:10
  },
  row: {
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingHorizontal:10
  },
  infoContainer: {
    flexDirection: 'row',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize:15
  },
  value: {
    marginBottom: 10,
    fontSize:15
  },
})
export default PrescriptionScreen;
