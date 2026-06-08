import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from 'react-native';

import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditExpenseModal({
  visible,
  onClose,
  expense,
  onUpdated,
}) {

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());

  const [open, setOpen] = useState(false);

  useEffect(() => {

    if (expense) {

      setDescription(expense.description || '');
      setAmount(expense.amount?.toString() || '');
      setCategory(expense.category || '');
      setDate(new Date(expense.date));
    }

  }, [expense]);

  const updateExpense = async () => {

    try {

      const savedUser =
        await AsyncStorage.getItem('userData');

      const token =
        await AsyncStorage.getItem('token');

      const user = JSON.parse(savedUser);

      console.log(
        'PATCH URL',
        `https://spendwisebackend-yvnj.onrender.com/expenses/${user.id}/${expense.id}`
      );

      const response = await fetch(
        `https://spendwisebackend-yvnj.onrender.com/expenses/${user.id}/${expense.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            description,
            amount: Number(amount),
            category,
            date,
          }),
        }
      );

      console.log(
        'PATCH STATUS',
        response.status
      );

      if (!response.ok) {

        Alert.alert(
          'Error',
          'Update failed'
        );

        return;
      }

      Alert.alert(
        'Success',
        'Expense updated successfully'
      );

      await onUpdated();

      onClose();

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Error',
        'Unable to update expense'
      );
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
    >
      <ScrollView
        style={styles.container}
      >

        <Text style={styles.heading}>
          Edit Expense
        </Text>

        {/* Amount */}

        <Text style={styles.label}>
          Amount
        </Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        {/* Category */}

        <Text style={styles.label}>
          Category
        </Text>

        <View style={styles.categoryWrapper}>

          {[
            { category: 'Food', icon: require('../assets/food.png') },
            { category: 'Transport', icon: require('../assets/transport.png') },
            { category: 'Shopping', icon: require('../assets/shopping.png') },
            { category: 'Bills', icon: require('../assets/bills.png') },
            { category: 'Entertainment', icon: require('../assets/entertainment.png') },
            { category: 'Health', icon: require('../assets/health.png') },
            { category: 'Education', icon: require('../assets/education.png') },
            { category: 'Other', icon: require('../assets/other.png') },
          ].map((item, index) => (

            <TouchableOpacity
              key={index}
              style={{
                ...styles.categoryBox,
                borderWidth:
                  category === item.category
                    ? 2
                    : 0,
                borderColor:
                  category === item.category
                    ? 'green'
                    : undefined,
                backgroundColor:
                  category === item.category
                    ? 'green'
                    : undefined,
              }}
              onPress={() =>
                setCategory(item.category)
              }
            >

              <View style={styles.iconCircle}>
                <Image
                  source={item.icon}
                  style={styles.icon}
                />
              </View>

              <Text
                style={styles.categoryText}
              >
                {item.category}
              </Text>

            </TouchableOpacity>
          ))}

        </View>

        {/* Description */}

        <Text style={styles.label}>
          Description
        </Text>

        <TextInput
          style={[
            styles.input,
            { height: 80 }
          ]}
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
          onCancel={() => setOpen(false)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={updateExpense}
        >
          <Text style={styles.buttonText}>
            Update Expense
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onClose}
        >
          <Text style={styles.buttonText}>
            Cancel
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </Modal>
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
    marginBottom: 10,
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
  },

  cancelButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});