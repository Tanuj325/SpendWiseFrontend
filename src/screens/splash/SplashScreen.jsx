import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function SplashScreen() {

  const navigation = useNavigation();

  const logoAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.sequence([

      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),

      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),

    ]).start();

    checkLogin();

  }, []);

  const checkLogin = async () => {

    try {

      const token = await AsyncStorage.getItem('token');

      setTimeout(() => {

        if (token) {

          navigation.replace('Dashboard');

        } else {

          navigation.replace('Login');
        }

      }, 3000);

    } catch (error) {

      navigation.replace('Login');
    }
  };

  return (

    <View style={styles.container}>

      <Animated.View
        style={{
          opacity: logoAnim,
          transform: [
            {
              scale: logoAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
              }),
            },
          ],
        }}
      >

        <Image
          source={require('../../assets/SpendWise.png')}
          style={styles.logo}
          resizeMode="contain"
        />

      </Animated.View>

      <Animated.Text
        style={[
          styles.title,
          {
            opacity: titleAnim,
            transform: [
              {
                translateY: titleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        SpendWise
      </Animated.Text>

      <Text style={styles.subtitle}>
        Smart Expense Tracker
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: (width * 0.35) / 2,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00796b',
    marginTop: 20,
  },

  subtitle: {
    fontSize: 16,
    color: '#004d40',
    marginTop: 8,
  },

});