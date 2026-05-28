import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'

import React, { useEffect, useState } from 'react'

import DatePicker from 'react-native-date-picker'
import { PieChart, BarChart } from 'react-native-gifted-charts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import dayjs from 'dayjs'

export default function ReportScreen() {

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [pieData, setPieData] = useState([])
  const [barData, setBarData] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  // =========================
  // API URL
  // =========================
  const BASE_URL = 'https://spendwisebackend-yvnj.onrender.com'

  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ]

  const colors = {
    Food: '#EF4444',
    Health: '#22C55E',
    Shopping: '#EC4899',
    Bills: '#FBBF24',
    Education: '#A855F7',
    Transport: '#3B82F6',
    Entertainment: '#06B6D4',
    Other: '#94A3B8',
  }

  useEffect(() => {
    fetchReport(date)
  }, [date])

  // =========================
  // FETCH REPORT
  // =========================
  const fetchReport = async (selectedDate) => {

    try {

      setLoading(true)

      // USER DATA STORAGE SE
      const savedUser = await AsyncStorage.getItem('userData')

      if (!savedUser) {
        return
      }

      const user = JSON.parse(savedUser)

      const userId = user.id

      const token = await AsyncStorage.getItem('token')

      // MONTH & YEAR
      const month = dayjs(selectedDate).month()
      const year = dayjs(selectedDate).year()

      const response = await fetch(
        `${BASE_URL}/expenses/report/${userId}?month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      const categoryWise = data?.categoryWise || {}
      const dayWise = data?.dayWise || {}

      // =========================
      // TOTAL
      // =========================
      setTotalAmount(Number(data?.total || 0))

      // =========================
      // PIE DATA
      // =========================
      const pie = Object.keys(categoryWise)
        .filter(key => Number(categoryWise[key]) > 0)
        .map(key => ({
          value: Number(categoryWise[key]),
          text: key,
          color: colors[key] || '#94A3B8',
        }))

      setPieData(pie)

      // =========================
      // BAR DATA
      // =========================
      const bar = Array.from({ length: 31 }, (_, i) => {

        const day = i + 1

        return {
          value: Number(dayWise[day] || 0),
          label: `${day}`,
          frontColor: '#22D3EE',
        }
      })

      setBarData(bar)

    } catch (error) {

      console.log('Report Error:', error)

      setPieData([])
      setBarData([])
      setTotalAmount(0)

    } finally {

      setLoading(false)
    }
  }

  // =========================
  // LOADING
  // =========================
  if (loading) {

    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color="#22D3EE"
        />
      </View>
    )
  }

  // =========================
  // UI
  // =========================
  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 80 }}
      showsVerticalScrollIndicator={false}
    >

      {/* DATE PICKER */}
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={(d) => {
          setOpen(false)
          setDate(d)
        }}
        onCancel={() => setOpen(false)}
      />

      {/* MONTH SELECT */}
      <TouchableOpacity
        style={styles.monthCard}
        activeOpacity={0.8}
        onPress={() => setOpen(true)}
      >

        <Text style={styles.monthLabel}>
          Selected Month ▼
        </Text>

        <Text style={styles.monthValue}>
          {months[date.getMonth()]} {date.getFullYear()}
        </Text>

      </TouchableOpacity>

      {/* TOTAL */}
      <View style={styles.summaryCard}>

        <Text style={styles.summaryLabel}>
          Total Expenses
        </Text>

        <Text style={styles.summaryValue}>
          ₹ {totalAmount.toLocaleString()}
        </Text>

      </View>

      {/* PIE CHART */}
      <Text style={styles.sectionTitle}>
        Category Report
      </Text>

      <View style={styles.card}>

        {pieData.length > 0 ? (

          <>

            <View style={styles.center}>

              <PieChart
                data={pieData}
                donut
                radius={110}
                innerRadius={70}
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

            {/* LEGEND */}
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
            No data available
          </Text>

        )}

      </View>

      {/* BAR CHART */}
      <Text style={styles.sectionTitle}>
        Day Wise Breakdown
      </Text>

      <View style={[styles.card, { paddingLeft: 0 }]}>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >

          <BarChart
            data={barData}
            barWidth={24}
            spacing={12}
            roundedTop
            roundedBottom
            hideRules
            xAxisThickness={1}
            yAxisThickness={1}
            xAxisColor="#334155"
            yAxisColor="#334155"
            yAxisTextStyle={{
              color: '#94A3B8',
              fontSize: 10
            }}
            xAxisLabelTextStyle={{
              color: '#94A3B8',
              fontSize: 9
            }}
            noOfSections={4}
            maxValue={
              Math.max(
                ...barData.map(i => i.value),
                1
              ) * 1.2
            }
            isAnimated
          />

        </ScrollView>

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
    paddingHorizontal: 20,
    paddingTop: 50,
    marginBottom: 50,
  },

  monthCard: {
    backgroundColor: '#1E293B',
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },

  monthLabel: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 4,
  },

  monthValue: {
    color: '#4ADE80',
    fontSize: 16,
    fontWeight: '600',
  },

  summaryCard: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 20,
    marginBottom: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },

  summaryLabel: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 6,
  },

  summaryValue: {
    color: '#22D3EE',
    fontSize: 28,
    fontWeight: 'bold',
  },

  sectionTitle: {
    color: '#E2E8F0',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 10,
  },

  card: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#334155',
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerAmount: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  centerLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    alignItems: 'center',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
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

  emptyText: {
    color: '#94A3B8',
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 14,
  },

})