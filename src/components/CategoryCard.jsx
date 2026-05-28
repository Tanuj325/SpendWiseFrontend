import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function CategoryCard({ icon, category, amount }) {
  return (
    <View style={styles.card}>

      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.image} />
      </View>

      <Text style={styles.category} numberOfLines={1}>
        {category}
      </Text>

      <Text style={styles.amount}>₹ {amount}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 120,
    flexShrink: 0,
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingVertical: 18,
    borderRadius: 20,
    marginRight: 12,
    elevation: 6,
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  image: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },

  category: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
    textAlign: 'center',
  },

  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22D3EE',
  },
})