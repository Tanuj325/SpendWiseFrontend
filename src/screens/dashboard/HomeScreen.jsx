import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    FlatList,
    ScrollView,
    ActivityIndicator,
} from 'react-native'

import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import AsyncStorage from '@react-native-async-storage/async-storage'

import CategoryCard from '../../components/CategoryCard'
import TransactionCard from '../../components/TransactionCard'

export default function HomeScreen() {

    const [currentMonth, setCurrentMonth] = useState('')
    const [amount, setAmount] = useState(0)
    const [transactions, setTransactions] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    // =========================
    // API URL
    // =========================
    const BASE_URL = 'https://spendwisebackend-yvnj.onrender.com'

    useEffect(() => {
        setCurrentMonth(dayjs().format('MMMM YYYY'))
        loadData()
    }, [])

    // =========================
    // LOAD DATA
    // =========================
    const loadData = async () => {

        try {

            setLoading(true)

            // USER DATA STORAGE SE
            const savedUser = await AsyncStorage.getItem('userData')

            if (!savedUser) {
                return
            }

            const user = JSON.parse(savedUser)

            const userId = user.id

            const [totalAmount, recentTransactions, categoryData] =
                await Promise.all([
                    handleSetAmount(userId),
                    handleRecentTransactions(userId),
                    handleCategoryData(userId)
                ])

            setAmount(totalAmount || 0)
            setTransactions(recentTransactions || [])
            setCategories(categoryData || [])

        } catch (error) {

            console.log('Home Screen Error:', error)

        } finally {

            setLoading(false)
        }
    }

    // =========================
    // CATEGORY DATA
    // =========================
    const handleCategoryData = async (userId) => {

        try {

            const token = await AsyncStorage.getItem('token')

            const response = await fetch(
                `${BASE_URL}/expenses/category/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const data = await response.json()

            const categoriesWithIcons = [
                { category: "Food", icon: require("../../assets/food.png") },
                { category: "Transport", icon: require("../../assets/transport.png") },
                { category: "Shopping", icon: require("../../assets/shopping.png") },
                { category: "Bills", icon: require("../../assets/bills.png") },
                { category: "Entertainment", icon: require("../../assets/entertainment.png") },
                { category: "Health", icon: require("../../assets/health.png") },
                { category: "Education", icon: require("../../assets/education.png") },
                { category: "Other", icon: require("../../assets/other.png") }
            ]

            return categoriesWithIcons.map(item => ({
                name: item.category,
                icon: item.icon,
                amount: data[item.category] || 0
            }))

        } catch (error) {

            console.log(error)

            return []
        }
    }

    // =========================
    // RECENT TRANSACTIONS
    // =========================
    const handleRecentTransactions = async (userId) => {

        try {

            const token = await AsyncStorage.getItem('token')

            const response = await fetch(
                `${BASE_URL}/expenses/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const data = await response.json()

            if (!Array.isArray(data)) return []

            const currentMonth = dayjs().month()
            const currentYear = dayjs().year()

            return data
                .filter(item => {
                    const d = dayjs(item.date)
                    return d.month() === currentMonth &&
                        d.year() === currentYear
                })
                .sort((a, b) =>
                    new Date(b.date) - new Date(a.date)
                )

        } catch (error) {

            console.log(error)

            return []
        }
    }

    // =========================
    // TOTAL AMOUNT
    // =========================
    const handleSetAmount = async (userId) => {

        try {

            const token = await AsyncStorage.getItem('token')

            const response = await fetch(
                `${BASE_URL}/expenses/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const data = await response.json()

            if (!Array.isArray(data)) return 0

            const currentMonth = dayjs().month()
            const currentYear = dayjs().year()

            return data
                .filter(e => {
                    const d = dayjs(e.date)
                    return d.month() === currentMonth &&
                        d.year() === currentYear
                })
                .reduce((acc, e) => acc + e.amount, 0)

        } catch (error) {

            console.log(error)

            return 0
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

    // =========================
    // UI
    // =========================
    return (

        <View style={styles.container}>

            <StatusBar barStyle="light-content" />

            {/* TOP SECTION */}
            <View style={styles.topSection}>

                <View style={styles.headerCard}>

                    <Text style={styles.monthText}>
                        {currentMonth}
                    </Text>

                    <Text style={styles.totalAmount}>
                        ₹ {amount}
                    </Text>

                    <Text style={styles.subText}>
                        Total Expenses
                    </Text>

                </View>

                <Text style={styles.sectionTitle}>
                    Categories
                </Text>

                <ScrollView
                    horizontal
                    nestedScrollEnabled={true}
                    scrollEventThrottle={16}
                    disableIntervalMomentum={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryList}
                >

                    {categories.map((item, index) => (

                        <CategoryCard
                            key={index}
                            icon={item.icon}
                            category={item.name}
                            amount={item.amount}
                        />
                    ))}

                </ScrollView>

            </View>

            {/* BOTTOM SECTION */}
            <View style={styles.bottomSection}>

                <Text style={styles.sectionTitle}>
                    Recent Expenses
                </Text>

                <FlatList
                    data={transactions}
                    keyExtractor={(item, index) =>
                        index.toString()
                    }
                    renderItem={({ item }) => (

                        <TransactionCard
                            title={item.description}
                            amount={item.amount}
                            date={dayjs(item.date)
                                .format('DD MMM YYYY')}
                            category={item.category}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 100
                    }}
                />

            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    loadingContainer: {
        flex: 1,
        backgroundColor: "#0F172A",
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        flex: 1,
        backgroundColor: "#0F172A",
        paddingHorizontal: 10,
        paddingTop: 40,
    },

    topSection: {
        flexShrink: 0,
    },

    bottomSection: {
        flex: 1,
        marginTop: 10,
    },

    headerCard: {
        backgroundColor: "#1E293B",
        padding: 24,
        borderRadius: 20,
        alignItems: "center",
        marginBottom: 15,
    },

    monthText: {
        fontSize: 16,
        color: "#94A3B8",
    },

    totalAmount: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#22D3EE",
    },

    subText: {
        fontSize: 14,
        color: "#94A3B8",
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#FFFFFF",
        marginVertical: 10,
    },

    categoryList: {
        paddingHorizontal: 5,
        paddingBottom: 5,
    },
})