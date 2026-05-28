import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native'

import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { PieChart, BarChart } from 'react-native-gifted-charts'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function StatsScreen() {

  const [currentMonth, setCurrentMonth] = useState('')
  const [pieData, setPieData] = useState([])
  const [dayData, setDayData] = useState([])
  const [monthlyData, setMonthlyData] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [loading, setLoading] = useState(true)

  const BASE_URL = 'https://spendwisebackend-yvnj.onrender.com'

  useEffect(() => {
    setCurrentMonth(dayjs().format('MMMM YYYY'))
    loadStats()
  }, [])

  const loadStats = async () => {

    try {

      setLoading(true)

      const userDataString = await AsyncStorage.getItem('userData')

      if (!userDataString) {
        setLoading(false)
        return
      }

      const userData = JSON.parse(userDataString)

      const userId = userData.id

      const [categoryRes, monthlyRes] = await Promise.all([

        fetch(`${BASE_URL}/expenses/category/${userId}`),

        fetch(`${BASE_URL}/expenses/monthly/${userId}`)
      ])

      const categoryData = await categoryRes.json()

      const monthlyRaw = await monthlyRes.json()

      const colors = {
        Food: '#f70909',
        Health: '#34D399',
        Shopping: '#fd19ee',
        Bills: '#FBBF24',
        Education: '#A78BFA',
        Transport: '#3B82F6',
        Entertainment: '#22D3EE',
        Other: '#94A3B8',
      }

      // ================= PIE DATA =================

      const pie = Object.keys(categoryData || {})
        .filter(key => Number(categoryData[key]) > 0)
        .map(key => ({
          value: Number(categoryData[key]),
          text: key,
          color: colors[key] || '#94A3B8',
        }))

      setPieData(pie)

      // ================= CATEGORY BAR =================

      const categoryBar = Object.keys(categoryData || {})
        .filter(key => Number(categoryData[key]) > 0)
        .map(key => ({
          value: Number(categoryData[key]),
          label: key.substring(0, 4),
          frontColor: colors[key] || '#94A3B8',
        }))

      setDayData(categoryBar)

      // ================= TOTAL =================

      const total = Object.values(categoryData || {})
        .reduce((acc, val) => acc + Number(val || 0), 0)

      setTotalAmount(total)

      // ================= LAST 6 MONTHS =================

      if (monthlyRaw && typeof monthlyRaw === 'object') {

        const keys = Object.keys(monthlyRaw)

        const monthly = keys.map(key => {

          const [month, year] = key.split(' ')

          return {
            value: Number(monthlyRaw[key] || 0),

            frontColor: '#22D3EE',

            labelComponent: () => (
              <View
                style={{
                  alignItems: 'center',
                  width: 70,
                }}
              >
                <Text
                  style={{
                    color: '#CBD5E1',
                    fontSize: 11,
                    fontWeight: '600',
                  }}
                >
                  {month}
                </Text>

                <Text
                  style={{
                    color: '#94A3B8',
                    fontSize: 10,
                  }}
                >
                  {year}
                </Text>
              </View>
            )
          }
        })

        setMonthlyData(monthly)
      }

    } catch (error) {

      console.log('Stats Error:', error)

      setPieData([])
      setDayData([])
      setMonthlyData([])
      setTotalAmount(0)

    } finally {

      setLoading(false)
    }
  }

  // ================= LOADING =================

  if (loading) {

    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#22D3EE" />
      </View>
    )
  }

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >

      {/* TOTAL CARD */}

      <View style={styles.totalCard}>

        <Text style={styles.totalTitle}>
          Total Expense of {currentMonth}
        </Text>

        <Text style={styles.totalAmount}>
          ₹ {totalAmount.toLocaleString()}
        </Text>

      </View>

      {/* PIE CHART */}

      <Text style={styles.sectionTitle}>
        Spending Breakdown
      </Text>

      <View style={styles.card}>

        {pieData.length > 0 ? (

          <>

            <View style={styles.center}>

              <PieChart
                data={pieData}
                donut
                radius={100}
                innerRadius={60}
                showText
                textColor="white"
                textSize={12}
                focusOnPress
                backgroundColor="#1E293B"

                centerLabelComponent={() => (
                  <View style={styles.center}>

                    <Text style={styles.centerAmount}>
                      ₹ {totalAmount.toLocaleString()}
                    </Text>

                    <Text style={styles.centerLabel}>
                      Total
                    </Text>

                  </View>
                )}
              />

            </View>

            {pieData.map((item, index) => (

              <View
                key={index}
                style={styles.row}
              >

                <View style={styles.left}>

                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: item.color }
                    ]}
                  />

                  <Text style={styles.text}>
                    {item.text}
                  </Text>

                </View>

                <Text style={styles.amount}>
                  ₹ {item.value.toLocaleString()}
                </Text>

              </View>
            ))}

          </>

        ) : (

          <Text style={styles.emptyText}>
            No expense data available
          </Text>
        )}

      </View>

      {/* CATEGORY BAR */}

      <Text style={styles.sectionTitle}>
        Category Trend
      </Text>

      <View style={styles.card}>

        {dayData.length > 0 ? (

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>

            <BarChart
              data={dayData}

              barWidth={40}
              spacing={20}

              roundedTop

              xAxisThickness={1}
              yAxisThickness={1}

              xAxisColor="#334155"
              yAxisColor="#334155"

              yAxisTextStyle={{
                color: '#94A3B8',
                fontSize: 10,
              }}

              xAxisLabelTextStyle={{
                color: '#94A3B8',
                fontSize: 9,
              }}

              noOfSections={4}

              maxValue={
                Math.max(...dayData.map(d => d.value), 1) * 1.2
              }

              isAnimated
            />

          </ScrollView>

        ) : (

          <Text style={styles.emptyText}>
            No category data
          </Text>
        )}

      </View>

      {/* MONTHLY BAR */}

      <Text style={styles.sectionTitle}>
        Last 6 Months
      </Text>

      <View style={styles.card}>

        {monthlyData.length > 0 ? (

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>

            <BarChart
              data={monthlyData}

              barWidth={45}
              spacing={25}

              roundedTop

              xAxisThickness={1}
              yAxisThickness={1}

              xAxisColor="#334155"
              yAxisColor="#334155"

              yAxisTextStyle={{
                color: '#94A3B8',
                fontSize: 10,
              }}

              xAxisLabelTextStyle={{
                color: '#94A3B8',
                fontSize: 9,
              }}

              noOfSections={4}

              maxValue={
                Math.max(...monthlyData.map(d => d.value), 1) * 1.2
              }

              isAnimated
            />

          </ScrollView>

        ) : (

          <Text style={styles.emptyText}>
            No monthly history
          </Text>
        )}

      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  loading: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    paddingTop: 50,
  },

  // ================= TOTAL CARD =================

  totalCard: {
    backgroundColor: '#1E293B',
    padding: 22,
    borderRadius: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#334155',
  },

  totalTitle: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 6,
  },

  totalAmount: {
    color: '#22D3EE',
    fontSize: 32,
    fontWeight: 'bold',
  },

  // ================= SECTION =================

  sectionTitle: {
    color: '#E2E8F0',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 10,
  },

  // ================= CARD =================

  card: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#334155',
  },

  // ================= PIE CENTER =================

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerAmount: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  centerLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },

  // ================= LEGEND =================

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },

  text: {
    color: '#E2E8F0',
    fontSize: 14,
  },

  amount: {
    color: '#94A3B8',
    fontSize: 13,
  },

  // ================= EMPTY =================

  emptyText: {
    color: '#64748B',
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 14,
  },

})