import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import React from 'react';
import DropDown from '../components/DropDown'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { List, TextInput, Button, useTheme, Icon } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatRoutes } from '../Routes/Route';
import moment from 'moment';
import AutocompleteTextInput from '../components/AutoComplete';
const MyDropdownComponent = () => {
  const theme = useTheme();
  const [showDropDown, setShowDropDown] = useState(false);
  const [medicine, setMedicine] = useState("");
  const [Dosage, setDosage] = useState("");
  const [morning, setMorning] = useState("");
  const [afternoon, setAfternoon] = useState("");
  const [evening, setEvening] = useState("");
  const [night, setNight] = useState("");
  const medicineList = ["Paracetamol", "Aspirin", "Prospan", "Paracetamol", "Aspirin", "Prospan", "Paracetamol", "Aspirin", "Prospan"];
  const styles = StyleSheet.create({
    textInput: {
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      marginHorizontal: 10,
      height: 50
    },
    cell: {
      borderWidth: 1,
      height: 40,
      fontSize: 15,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.outline,
    },
    text:{
      fontStyle:'italic',
      fontWeight:'700',
      fontFamily:'Cochin'
    }
  })

  return (
    <View style={{ margin: 5 }}>
      <View style={{ flexDirection: 'row', marginHorizontal: 5, alignItems: 'center' }}>
        <AutocompleteTextInput suggestions={medicineList} />
        <TextInput
          style={[styles.cell, { marginLeft: 10 }]}
          placeholder={'Dosage'}
          onChangeText={text => setDosage(text)}
          value={Dosage}
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ margin: 5 }}>
          <Text style={styles.text}>Morning</Text>
          <TextInput
            placeholder='Quantity'
            style={styles.cell}
            onChangeText={text => setMorning(text)}
            value={morning}
          />
        </View>
        <View style={{ margin: 5 }}>
          <Text style={styles.text}>Afternoon</Text>
          <TextInput
            placeholder='Quantity'
            style={styles.cell}
            onChangeText={text => setAfternoon(text)}
            value={afternoon}
          />
        </View>
        <View style={{ margin: 5 }}>
          <Text style={styles.text}>Evening</Text>
          <TextInput
            placeholder='Quantity'
            style={styles.cell}
            onChangeText={text => setEvening(text)}
            value={evening}
          />
        </View>
        <View style={{ margin: 5 }}>
          <Text style={styles.text}>Night</Text>
          <TextInput
            placeholder='Quantity'
            style={styles.cell}
            onChangeText={text => setNight(text)}
            value={night}
          />
        </View>
      </View>
    </View>
  );
};
type Props = NativeStackScreenProps<ChatRoutes, 'PrescriptionScreen'>;
const PrescriptionScreen = ({ route }: Props) => {
  var date = new Date();
  const userInfo = route.params.userInfo;
  const [components, setComponents] = useState<{ id: number, component: React.ReactNode }[]>([]);
  const [idCounter, setIdCounter] = useState(0);
  const [prescription, setPrescription] = useState('');
  const [note, setNote] = useState('');
  const theme = useTheme();
  const addComponent = () => {
    const newId = idCounter + 1;
    setIdCounter(newId);
    setComponents(prevComponents => [
      ...prevComponents,
      { id: newId, component: <MyDropdownComponent key={newId} /> }
    ]);
    console.log(userInfo)
  };

  const removeComponent = (idToRemove: number) => {
    setComponents(prevComponents => prevComponents.filter(comp => comp.id !== idToRemove));
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background
    },

    prescriptionInput: {
      height: 100,
      margin: 10
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10
    },
    infoContainer: {
      flexDirection: 'row',
    },
    label: {
      fontWeight: 'bold',
      marginBottom: 5,
      fontSize: 15
    },
    value: {
      marginBottom: 10,
      fontSize: 15
    },
  })
  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Prescription</Text>
      </View>
      <View>
        <View style={styles.row}>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Name: </Text>
            <Text style={styles.value}>{userInfo.userName}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Gender: </Text>
            <Text style={styles.value}>{userInfo.Gender}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Age: </Text>
            <Text style={styles.value}>{userInfo.Age}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Address: </Text>
            <Text style={styles.value}>{userInfo.Address}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Height (cm): </Text>
            <Text style={styles.value}>{userInfo.Height}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Weight (kg): </Text>
            <Text style={styles.value}>{userInfo.Weight}</Text>
          </View>
        </View>
      </View>
      <TextInput
        label={'Prescription'}
        style={styles.prescriptionInput}
        onChangeText={text => setPrescription(text)}
        value={prescription}
      />
      <View style={{ marginHorizontal: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'flex-start' }}>
        <TouchableOpacity style={{marginRight:10}} onPress={() => removeComponent(components[components.length - 1]?.id)}>
          <Icon source="minus" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={addComponent}>
          <Icon source="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <SafeAreaView>
        {components.map(({ id, component }) => (
          <View key={id} style={{ flexDirection: 'row' }}>
            {component}
          </View>
        ))}
      </SafeAreaView>
      <TextInput
        label={'Note'}
        onChangeText={text => setNote(text)}
        value={note}
        style={{ margin: 10 }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <View style={{ margin: 20 }}>
          <Text>{moment(date).format('DD/MM/YYYY')}</Text>
          <Text style={{ alignSelf: 'center', fontSize: 15, fontWeight: 'bold' }}>Signature</Text>
          <View style={{ height: 50, width: 50 }}></View>
        </View>
      </View>
      <Text style={{ margin: 10 }}>*Please keep it till the next appointment</Text>
    </ScrollView>
  );
};


export default PrescriptionScreen;
