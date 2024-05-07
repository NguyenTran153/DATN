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
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from 'react-native-paper';

const account = {
  email: 'myaccount@gmail.com',
  password: '123456789',
};

const LoginScreen = ({navigation}: {navigation: any}) => {
  const theme = useTheme();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
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
      color: theme.colors.primary,
      marginBottom: 6,
      textAlign: 'center',
    },
    input: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 17,
      fontWeight: '600',
      color: theme.colors.primary,
      marginBottom: 8,
    },
    inputControl: {
      borderColor: theme.colors.tertiary,
      height: 44,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 16,
      borderRadius: 12,
      fontSize: 15,
      fontWeight: '500',
      color: theme.colors.tertiary,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderTopWidth: 1,
    },
    subtitle: {
      fontSize: 15,
      fontWeight: '500',
      color: theme.colors.secondary,
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
      color: theme.colors.secondary,
      textAlign: 'center',
      letterSpacing: 0.15,
    },
    btn: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    btnText: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.background,
    },
  });

  return (
    <ScrollView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../asset/7677205.jpg')}
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
              placeholderTextColor={theme.colors.secondary}
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
              placeholderTextColor={theme.colors.secondary}
              onChangeText={password => setForm({...form, password})}
            />
            <TouchableOpacity style={{marginTop: 'auto'}} onPress={() => {}}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: theme.colors.primary,
                }}>
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
                    navigation.navigate('BottomTabNavigator');
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
    </ScrollView>
  );
};

export default LoginScreen;
