import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import AppButton from '../../components/AppButton';
import Input from '../../components/Input';

export default function SignUpScreen() {

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const BASE_URL = 'https://spendwisebackend-yvnj.onrender.com';

  async function handleSignUp() {

    if (!name || name.trim() === '') {
      Alert.alert('Warning', 'Please enter name');
      return;
    }

    if (!email || !email.includes('@')) {
      Alert.alert('Warning', 'Please enter valid email');
      return;
    }

    if (!password || password.length < 6) {
      Alert.alert(
        'Warning',
        'Password must be at least 6 characters'
      );
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          'Error',
          data.message || 'Signup failed'
        );
        return;
      }

      Alert.alert(
        'Success',
        'Account created successfully'
      );

      setName('');
      setEmail('');
      setPassword('');

      navigation.navigate('Login');

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
            Create Account
          </Text>

          <Text style={styles.subtitle}>
            Sign up to get started
          </Text>

          <Input
            placeholder="Name"
            placeholderTextColor="#000000"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

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
            title={loading ? 'Loading...' : 'Sign Up'}
            onPress={handleSignUp}
            style={styles.signupButton}
            textStyle={styles.signupButtonText}
          />

          <View style={styles.loginContainer}>

            <Text style={styles.loginText}>
              Already have an account?
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginButtonText}>
                {' '}Login
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
    backgroundColor: '#e8f5e9',
  },

  innerContainer: {
    width: '100%',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    color: '#1b5e20',
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

  signupButton: {
    marginTop: 20,
    backgroundColor: '#2e7d32',
    borderRadius: 12,
    paddingVertical: 14,
  },

  signupButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  loginText: {
    fontSize: 14,
    color: '#1b5e20',
  },

  loginButtonText: {
    fontSize: 14,
    color: '#2e7d32',
    fontWeight: 'bold',
  },
});