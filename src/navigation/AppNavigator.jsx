import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import SplashScreen from '../screens/splash/SplashScreen';
import Dashboard from '../screens/dashboard/Dashboard';
import AddExpense from '../screens/dashboard/AddExpense';
import HomeScreen from '../screens/dashboard/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={Signup} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="AddExpense" component={AddExpense} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}