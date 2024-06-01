import {
    StyleSheet,
    TextInput,
    SafeAreaView,
    Text,
    Image,
    View,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import AuthService from '../../services/AuthService';
const OTPResetPassword = ({ route, navigation }: any) => {
    const pinId = route.params.pinId
    const theme = useTheme();
    const [value, setValue] = useState('');
    const handleChange = (text: string) => {
        if (text.length <= 6) { // Limit to 6 characters after the prefix
            setValue(text);
        }
    };
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
        <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require('../../asset/7677205.jpg')}
                        style={styles.img}
                        alt="Logo"
                    />
                    <Text style={styles.title}>Sign up to MediConnect</Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Mã OTP</Text>
                        <TextInput
                            id="OtpNumber"
                            style={styles.inputControl}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={value}
                            inputMode='numeric'
                            placeholderTextColor={theme.colors.secondary}
                            onChangeText={number => handleChange(number)}
                        />
                    </View>
                    <View style={styles.formAction}>
                        <TouchableOpacity
                            onPress={async () => {
                                console.log(pinId)
                                if (value.length === 6) {
                                    const result = await AuthService.OTPVerification(pinId, value)
                                    if (result !== 'error') {
                                        navigation.navigate('ResetPasswordScreen',{token:result})
                                    }
                                    else{
                                        Alert.alert('Invalid OTP');
                                    }
                                    console.log(value);
                                } else {
                                    Alert.alert('Invalid OTP');
                                }
                            }}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Nhập mã OTP</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginTop: 'auto' }}
                            onPress={() => navigation.navigate('LoginScreen')}>
                            <Text
                                style={[styles.formFooter, { color: theme.colors.secondary }]}>
                                Đã có tài khoản?
                                <Text
                                    style={{
                                        textDecorationLine: 'underline',
                                        color: theme.colors.primary,
                                    }}>
                                    Đăng nhập
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default OTPResetPassword;
