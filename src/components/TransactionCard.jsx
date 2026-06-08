import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const categoryIcons = {
  Food: require('../assets/food.png'),
  Transport: require('../assets/transport.png'),
  Shopping: require('../assets/shopping.png'),
  Bills: require('../assets/bills.png'),
  Entertainment: require('../assets/entertainment.png'),
  Health: require('../assets/health.png'),
  Education: require('../assets/education.png'),
  Other: require('../assets/other.png'),
};

const ExpenseCard = ({ title, date, amount, category, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>

        {/* LEFT — icon + text */}
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <Image
              source={categoryIcons[category] || categoryIcons.Other}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>

        {/* RIGHT — amount + actions */}
        <View style={styles.rightSection}>
          <Text style={styles.amount}>₹ {amount}</Text>
          <View style={styles.divider} />
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.editButton} onPress={onEdit}>
              <Text style={styles.iconText}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Text style={styles.iconText}>❌</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  );
};

export default ExpenseCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 6,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // LEFT
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,          // rounded square, not full circle
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  image: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  textContainer: {
    flexShrink: 1,
    gap: 3,
  },
  title: {
    color: '#F1F5F9',
    fontSize: 15,
    fontWeight: '600',
  },
  date: {
    color: '#64748B',
    fontSize: 12,
  },

  // RIGHT
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 0,
  },
  amount: {
    color: '#22D3EE',
    fontSize: 16,
    fontWeight: '800',
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: '#334155',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  editButton: {
    backgroundColor: '#334155',
    width: 32,
    height: 32,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#7F1D1D',
    width: 32,
    height: 32,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 14,
  },
});
