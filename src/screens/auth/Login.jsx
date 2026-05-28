import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppButton from '../../components/AppButton';
import Input from '../../components/Input';

export default function LoginScreen() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const BASE_URL = 'https://spendwisebackend-yvnj.onrender.com';

    async function handleLogin() {

        if (!email || email.trim() === '' || !email.includes('@')) {
            Alert.alert('Warning', 'Please enter valid email');
            return;
        }

        if (!password || password.length < 6) {
            Alert.alert('Warning', 'Password must be at least 6 characters');
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                Alert.alert('Error', data.message || 'Login failed');
                return;
            }

            // SAVE TOKEN
            await AsyncStorage.setItem('token', data.token);

            // SAVE USER
            await AsyncStorage.setItem(
                'userData',
                JSON.stringify(data.user)
            );

            setEmail('');
            setPassword('');

            navigation.replace("Dashboard", {
                userId: data.user.id
            })

        } catch (error) {

            console.log(error);

            Alert.alert(
                'Error',
                'Unable to connect to server'
            );

        } finally {

            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >

                <View style={styles.innerContainer}>

                    <Text style={styles.title}>
                        Welcome Back
                    </Text>

                    <Text style={styles.subtitle}>
                        Login to continue
                    </Text>

                    <Input
                        placeholder="Email"
                        placeholderTextColor="#000000"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />

                    <Input
                        placeholder="Password"
                        placeholderTextColor="#000000"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        style={styles.input}
                    />

                    <AppButton
                        title={loading ? 'Loading...' : 'Login'}
                        onPress={handleLogin}
                        style={styles.loginButton}
                        textStyle={styles.loginButtonText}
                    />

                    <View style={styles.signupContainer}>

                        <Text style={styles.signupText}>
                            Don't have an account?
                        </Text>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignUp')}
                        >
                            <Text style={styles.signupButton}>
                                {' '}Sign Up
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#e0f7fa',
    },

    innerContainer: {
        width: '100%',
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#00796b',
        textAlign: 'center',
        marginBottom: 5,
    },

    subtitle: {
        fontSize: 16,
        color: '#004d40',
        textAlign: 'center',
        marginBottom: 20,
    },

    input: {
        backgroundColor: '#ffffff',
        color: '#000000',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 12,
        marginVertical: 10,
        fontSize: 16,
    },

    loginButton: {
        marginTop: 20,
        backgroundColor: '#00796b',
        borderRadius: 12,
        paddingVertical: 14,
    },

    loginButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },

    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },

    signupText: {
        fontSize: 14,
        color: '#004d40',
    },

    signupButton: {
        fontSize: 14,
        color: '#00796b',
        fontWeight: 'bold',
    },
});