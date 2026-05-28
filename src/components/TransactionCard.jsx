import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function TransactionCard({
    title,
    date,
    amount,
    category
}) {
  const categoryIcons = {
    Food: require('../assets/food.png'),
    Transport: require('../assets/transport.png'),
    Shopping: require('../assets/shopping.png'),
    Bills: require('../assets/bills.png'),
    Entertainment: require('../assets/entertainment.png'),
    Health: require('../assets/health.png'),
    Education: require('../assets/education.png'),
    Other: require('../assets/other.png'),
  }

    return (
        <View style={styles.card}>

            {/* Left: Icon */}
            <View style={styles.iconContainer}>
                <Image
                    source={categoryIcons[category] || categoryIcons.Other}
                    style={styles.image}
                />
            </View>

            {/* Middle: Description */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.date}>{date}</Text>
            </View>

            {/* Right: Amount */}
            <Text
                style={[
                    styles.amount
                ]}
            >
                ₹ {amount}
            </Text>

        </View>
    )
}
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 16,
    marginVertical: 8,
    borderRadius: 18,
    elevation: 4,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  image: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  date: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
  },

  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22D3EE',
  },
});
