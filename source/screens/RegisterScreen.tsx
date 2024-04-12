import {StyleSheet, TextInput, SafeAreaView,Text, Image, View, TouchableOpacity, Alert} from 'react-native';
import React, { useState } from 'react';

const RegisterScreen = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmpassword: ''
  })
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#eBecf4" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../asset/7677205.jpg')} style={styles.img}
            alt='Logo'
          />
          <Text style={styles.title}>Sign up to MediConnect</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput id="email" style={styles.inputControl}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              value={form.email}
              placeholder='email@gmail.com'
              placeholderTextColor="#6b7280"
              onChangeText={email => setForm({ ...form, email })}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput id="password" style={styles.inputControl}
              secureTextEntry
              value={form.password}
              placeholder='Password'
              placeholderTextColor="#6b7280"
              onChangeText={password => setForm({ ...form, password })}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput id="confirm_password" style={styles.inputControl}
              secureTextEntry
              value={form.confirmpassword}
              placeholder='Confirm password'
              placeholderTextColor="#6b7280"
              onChangeText={confirmpassword => setForm({ ...form, confirmpassword })}
            />
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity onPress={() => {
               let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
               if (reg.test(form.email) === true) {
                if(form.password === form.confirmpassword)
                {
                  Alert.alert("Sign up successfuly")
                }
                else{
                  Alert.alert("Wrong email or password")
                }}
                else{
                  Alert.alert("Invalid email")
                }
            }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign up</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  header: {
    marginVertical: 36
  },
  img: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 36
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: "#1e1e1e",
    marginBottom: 6,
    textAlign: "center"
  },
  input: {
    marginBottom: 16
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: '#222',
    marginBottom: 8
  },
  inputFocused: {
    borderColor: 'blue',
  },
  inputControl: {
    borderColor: 'black',
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: "#929292",
    textAlign: "center"
  },
  form: {
    marginBottom: 24,
    flex: 1
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15
  },
  btn: {
    backgroundColor: "#075eec",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#075eec",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff"
  }
});
