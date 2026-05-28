import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import DatePicker from 'react-native-date-picker';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function AddExpense() {

  const navigation = useNavigation();
  const route = useRoute();

  // ✅ USER ID FROM NAVIGATION PARAMS
  const { userId } = route.params;

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const addExpense = async () => {

    try {

      if (!amount || !category) {
        Alert.alert("Error", "Please fill required fields");
        return;
      }

      const response = await fetch(
        `https://spendwisebackend-yvnj.onrender.com/expenses/${userId}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            description: description,
            amount: Number(amount),
            category: category,
            date: date,
          }),
        }
      );

      if (!response.ok) {
        Alert.alert("Error", "Failed to add expense");
        return;
      }

      Alert.alert(
        "Success",
        "Expense added successfully!"
      );

      setAmount("");
      setCategory("");
      setDescription("");

      navigation.replace("Dashboard");

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "Failed to add expense. Please try again."
      );
    }
  };

  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        <Text style={styles.heading}>
          Add Expense
        </Text>

        {/* Amount */}
        <Text style={styles.label}>
          Amount
        </Text>

        <TextInput
          placeholder="₹ 0"
          placeholderTextColor="#999"
          keyboardType="numeric"
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
        />

        {/* Category */}
        <Text style={styles.label}>
          Category
        </Text>

        <View style={styles.categoryWrapper}>

          {[
            {
              category: "Food",
              icon: require("../../assets/food.png")
            },
            {
              category: "Transport",
              icon: require("../../assets/transport.png")
            },
            {
              category: "Shopping",
              icon: require("../../assets/shopping.png")
            },
            {
              category: "Bills",
              icon: require("../../assets/bills.png")
            },
            {
              category: "Entertainment",
              icon: require("../../assets/entertainment.png")
            },
            {
              category: "Health",
              icon: require("../../assets/health.png")
            },
            {
              category: "Education",
              icon: require("../../assets/education.png")
            },
            {
              category: "Other",
              icon: require("../../assets/other.png")
            },

          ].map((item, index) => (

            <TouchableOpacity

              key={index}

              style={{
                ...styles.categoryBox,
                borderWidth: category === item.category ? 2 : 0,
                borderColor:
                  category === item.category
                    ? "green"
                    : null,

                backgroundColor:
                  category === item.category
                    ? "green"
                    : null
              }}

              onPress={() => setCategory(item.category)}
            >

              <View style={styles.iconCircle}>
                <Image
                  source={item.icon}
                  style={styles.icon}
                />
              </View>

              <Text
                numberOfLines={1}
                style={styles.categoryText}
              >
                {item.category}
              </Text>

            </TouchableOpacity>
          ))}

        </View>

        {/* Description */}
        <Text style={styles.label}>
          Description (Optional)
        </Text>

        <TextInput
          placeholder="What was this for?"
          placeholderTextColor="#999"
          style={[styles.input, { height: 80 }]}
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {/* Date */}
        <Text style={styles.label}>
          Date
        </Text>

        <TouchableOpacity
          style={styles.input}
          onPress={() => setOpen(true)}
        >
          <Text>
            {date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"

          onConfirm={(selectedDate) => {
            setOpen(false);
            setDate(selectedDate);
          }}

          onCancel={() => {
            setOpen(false);
          }}
        />

        {/* Save Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={addExpense}
        >

          <Text style={styles.buttonText}>
            Add Expense
          </Text>

        </TouchableOpacity>

      </ScrollView>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingHorizontal: 20,
  },

  heading: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 30,
  },

  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
  },

  categoryWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  categoryBox: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 18,
    padding: 5,
    borderRadius: 10,
  },

  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },

  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },

  categoryText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#22D3EE',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});