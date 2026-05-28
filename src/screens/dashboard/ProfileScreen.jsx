import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native'

import React, { useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { launchImageLibrary } from 'react-native-image-picker'

import { useNavigation } from '@react-navigation/native'

export default function ProfileScreen() {

  const navigation = useNavigation()

  const BASE_URL = 'https://spendwisebackend-yvnj.onrender.com'

  const [profileImage, setProfileImage] = useState(null)

  const [userData, setUserData] = useState(null)

  const [totalExpense, setTotalExpense] = useState(0)

  const [yearExpense, setYearExpense] = useState(0)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProfile()
  }, [])

  // =========================
  // LOAD PROFILE
  // =========================
  const loadProfile = async () => {

    try {

      setLoading(true)

      // LOAD SAVED IMAGE
      const savedImage = await AsyncStorage.getItem('profileImage')

      if (savedImage) {
        setProfileImage(savedImage)
      }

      // LOAD USER
      const savedUser = await AsyncStorage.getItem('userData')

      if (!savedUser) {

        navigation.replace('Login')

        return
      }

      const parsedUser = JSON.parse(savedUser)

      setUserData(parsedUser)

      // FETCH EXPENSES
      const expenseResponse = await fetch(
        `${BASE_URL}/expenses/${parsedUser.id}`
      )

      const expenses = await expenseResponse.json()

      if (Array.isArray(expenses)) {

        // TOTAL EXPENSE
        const total = expenses.reduce(
          (acc, item) => acc + item.amount,
          0
        )

        setTotalExpense(total)

        // YEAR EXPENSE
        const currentYear = new Date().getFullYear()

        const yearlyTotal = expenses
          .filter(item => {

            if (!item.date) return false

            return (
              new Date(item.date).getFullYear() === currentYear
            )
          })
          .reduce(
            (acc, item) => acc + item.amount,
            0
          )

        setYearExpense(yearlyTotal)
      }

    } catch (error) {

      console.log('Profile Error:', error)

      Alert.alert(
        'Error',
        'Unable to load profile'
      )

    } finally {

      setLoading(false)
    }
  }

  // =========================
  // PERMISSION
  // =========================
  const requestGalleryPermission = async () => {

    try {

      if (Platform.OS === 'android') {

        if (Platform.Version >= 33) {
          return true
        }

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        )

        return granted === PermissionsAndroid.RESULTS.GRANTED
      }

      return true

    } catch (err) {

      console.log(err)

      return false
    }
  }

  // =========================
  // PICK IMAGE
  // =========================
  const pickImage = async () => {

    try {

      const permission = await requestGalleryPermission()

      if (!permission) {

        Alert.alert(
          'Permission Denied',
          'Gallery permission required'
        )

        return
      }

      launchImageLibrary(
        {
          mediaType: 'photo',
          selectionLimit: 1,
          quality: 0.8,
        },

        async (response) => {

          if (response.didCancel) {
            return
          }

          if (response.errorCode) {

            Alert.alert(
              'Error',
              response.errorMessage || 'Image Picker Error'
            )

            return
          }

          if (
            response.assets &&
            response.assets.length > 0
          ) {

            const imageUri = response.assets[0].uri

            setProfileImage(imageUri)

            await AsyncStorage.setItem(
              'profileImage',
              imageUri
            )

            Alert.alert(
              'Success',
              'Profile photo updated'
            )
          }
        }
      )

    } catch (error) {

      console.log(error)

      Alert.alert(
        'Error',
        'Unable to open gallery'
      )
    }
  }

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = async () => {

    try {

      await AsyncStorage.removeItem('token')

      await AsyncStorage.removeItem('userData')

      await AsyncStorage.removeItem('profileImage')

      navigation.replace('Login')

    } catch (error) {

      console.log(error)
    }
  }

  // =========================
  // LOADING
  // =========================
  if (loading) {

    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#22D3EE"
        />
      </View>
    )
  }

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
    >

      <StatusBar barStyle="light-content" />

      {/* PROFILE IMAGE */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.imageContainer}
        onPress={pickImage}
      >

        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require('../../assets/profile.png')
          }
          style={styles.profileImage}
        />

        <Text style={styles.changePhotoText}>
          Change Photo
        </Text>

      </TouchableOpacity>

      {/* USER DETAILS */}
      <View style={styles.detailsCard}>

        <View style={styles.detailRow}>

          <Text style={styles.detailLabel}>
            Name
          </Text>

          <Text style={styles.detailValue}>
            {userData?.name || 'No Name'}
          </Text>

        </View>

        <View style={styles.divider} />

        <View style={styles.detailRow}>

          <Text style={styles.detailLabel}>
            Email
          </Text>

          <Text style={styles.detailValue}>
            {userData?.email || 'No Email'}
          </Text>

        </View>

      </View>

      {/* STATS */}
      <View style={styles.statsContainer}>

        <View style={styles.statsCard}>

          <Text style={styles.statsLabel}>
            Total Expense
          </Text>

          <Text style={styles.statsValue}>
            ₹ {totalExpense.toLocaleString()}
          </Text>

        </View>

        <View style={styles.statsCard}>

          <Text style={styles.statsLabel}>
            This Year
          </Text>

          <Text style={styles.statsValue}>
            ₹ {yearExpense.toLocaleString()}
          </Text>

        </View>

      </View>

      {/* LOGOUT BUTTON */}
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.logoutButton}
        onPress={handleLogout}
      >

        <Text style={styles.logoutText}>
          Logout
        </Text>

      </TouchableOpacity>

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  loadingContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    paddingTop: 40,
  },

  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 30,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#22D3EE',
  },

  changePhotoText: {
    color: '#22D3EE',
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
  },

  detailsCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    elevation: 6,
  },

  detailRow: {
    paddingVertical: 18,
  },

  detailLabel: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 6,
  },

  detailValue: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: '#334155',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },

  statsCard: {
    backgroundColor: '#1E293B',
    width: '48%',
    borderRadius: 20,
    paddingVertical: 22,
    alignItems: 'center',
    elevation: 5,
  },

  statsLabel: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 8,
  },

  statsValue: {
    color: '#22D3EE',
    fontSize: 20,
    fontWeight: 'bold',
  },

  logoutButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 18,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    elevation: 5,
  },

  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
})