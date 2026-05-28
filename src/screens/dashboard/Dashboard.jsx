import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import StatsScreen from './StatsScreen';
import ReportScreen from './ReportScreen';

const Tab = createBottomTabNavigator();

const Dashboard = () => {

  const navigation = useNavigation();
  const route = useRoute();

  // ✅ LOGIN SE AAYI USER ID
  const { userId } = route.params || {};

  const AddButton = ({ onPress }) => (
    <TouchableOpacity
      style={styles.addButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.addText}>+</Text>
    </TouchableOpacity>
  );

  return (

    <Tab.Navigator
      lazy={false}

      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          height: 65,
          backgroundColor: '#d7e3ef',

          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,

          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,

          elevation: 5,
          borderTopWidth: 0,
        },
      }}
    >

      {/* HOME */}
      <Tab.Screen
        name="Home"

        children={() => (
          <HomeScreen userId={userId} />
        )}

        options={{
          tabBarLabel: 'Home',

          tabBarIcon: () => (
            <Image
              source={require('../../assets/home.png')}
              style={styles.icon}
            />
          ),
        }}
      />

      {/* STATS */}
      <Tab.Screen
        name="Stats"

        children={() => (
          <StatsScreen userId={userId} />
        )}

        options={{
          tabBarLabel: 'Stats',

          tabBarIcon: () => (
            <Image
              source={require('../../assets/stats.png')}
              style={styles.icon}
            />
          ),
        }}
      />

      {/* ADD */}
      <Tab.Screen
        name="Add"
        listeners={{
          tabPress: e => {
            e.preventDefault();

            navigation.navigate('AddExpense', {
              userId: userId,
            });
          },
        }}
        component={HomeScreen}
        options={{
          tabBarLabel: '',

          tabBarIcon: () => (
            <View style={styles.addButton}>
              <Text style={styles.addText}>+</Text>
            </View>
          ),
        }}
      />

      {/* REPORT */}
      <Tab.Screen
        name="Report"

        children={() => (
          <ReportScreen userId={userId} />
        )}

        options={{
          tabBarLabel: 'Report',

          tabBarIcon: () => (
            <Image
              source={require('../../assets/Report.png')}
              style={styles.icon}
            />
          ),
        }}
      />

      {/* PROFILE */}
      <Tab.Screen
        name="Profile"

        children={() => (
          <ProfileScreen userId={userId} />
        )}

        options={{
          tabBarLabel: 'Profile',

          tabBarIcon: () => (
            <Image
              source={require('../../assets/profile.png')}
              style={styles.icon}
            />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

export default Dashboard;

const styles = StyleSheet.create({

  icon: {
    width: 22,
    height: 22,
  },

  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,

    backgroundColor: '#308997',

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: -20,

    elevation: 5,
  },

  addText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },

});