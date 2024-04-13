import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
const account = {
  email: 'myaccount@gmail.com',
  password: '123456789',
};
const LoginScreen = ({navigation}: {navigation: any}) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#eBecf4'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../asset/7677205.jpg')}
            style={styles.img}
            alt="Logo"
          />
          <Text style={styles.title}>Sign in to MediConnect</Text>
          <Text style={styles.subtitle}>Welcome to the Medic App!</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              id="email"
              style={styles.inputControl}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              value={form.email}
              placeholder="email@gmail.com"
              placeholderTextColor="#6b7280"
              onChangeText={email => setForm({...form, email})}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              id="password"
              style={styles.inputControl}
              secureTextEntry
              value={form.password}
              placeholder="Password"
              placeholderTextColor="#6b7280"
              onChangeText={password => setForm({...form, password})}
            />
            <TouchableOpacity style={{marginTop: 'auto'}} onPress={() => {}}>
              <Text style={{textDecorationLine: 'underline', color: '#3349FF'}}>
                Forgot password
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={() => {
                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                if (reg.test(form.email) === true) {
                  if (
                    form.email === account.email &&
                    form.password === account.password
                  ) {
                    navigation.navigate('HomeScreen');
                  } else {
                    Alert.alert('Wrong email or password');
                  }
                } else {
                  Alert.alert('Invalid email');
                }
                navigation.navigate('BottomTabNavigator');
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign in</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginTop: 'auto'}}
              onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.formFooter}>
                Don't have account?{' '}
                <Text style={{textDecorationLine: 'underline'}}>Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  header: {
    marginVertical: 36,
  },
  img: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 36,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#1e1e1e',
    marginBottom: 6,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
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
    fontWeight: '500',
    color: '#222',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
    flex: 1,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  btn: {
    backgroundColor: '#075eec',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#075eec',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
