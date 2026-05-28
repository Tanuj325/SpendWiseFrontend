<div align="center">

# 💸 SpendWise

### A Smart Personal Finance Tracker — Built with React Native

Track expenses, manage budgets, and understand your spending habits — all in one beautifully designed mobile app.

[

![React Native](https://img.shields.io/badge/React%20Native-0.83.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)

](https://reactnative.dev/)
[

![JavaScript](https://img.shields.io/badge/JavaScript-JSX-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[

![Node](https://img.shields.io/badge/Node.js-%3E%3D20-339933?style=for-the-badge&logo=node.js&logoColor=white)

](https://nodejs.org/)
[

![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-lightgrey?style=for-the-badge&logo=android)

](https://reactnative.dev/)

</div>

---

## 📱 About

**SpendWise** is a cross-platform mobile application built with React Native that helps users take control of their personal finances. Log transactions, visualize spending trends with charts.

This is the **frontend** repository. It connects to a Spring Boot backend for data persistence and user authentication.

---

## ✨ Features

- 📊 **Expense Charts** — Beautiful bar, line, and pie charts powered by `react-native-gifted-charts`
- 🗓️ **Date Filtering** — Filter transactions by date range using a native date picker
- 🗂️ **Category Management** — Organize transactions by custom categories
- 💾 **Offline Storage** — AsyncStorage-backed local data persistence
- 🧭 **Smooth Navigation** — Bottom tabs + drawer + stack navigation via React Navigation v7
- 🎨 **Gradient UI** — Linear gradients for polished, modern aesthetics

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React Native 0.83.1 |
| Language | JavaScript (JSX) + TypeScript |
| Navigation | React Navigation v7 (Stack, Bottom Tabs, Drawer) |
| Charts | react-native-gifted-charts |
| Storage | @react-native-async-storage/async-storage |
| Date Handling | dayjs + react-native-date-picker |
| Animations | react-native-reanimated v4 + react-native-worklets |
| Image Picker | react-native-image-picker |
| Gradients | react-native-linear-gradient |
| Gestures | react-native-gesture-handler |
| SVG | react-native-svg |
| Linting | ESLint + Prettier |
| Testing | Jest |

---

## 📁 Project Structure

SpendWiseFrontend/
├── android/              # Android native project
├── ios/                  # iOS native project
├── src/
│   ├── navigation/       # AppNavigator & route configuration
│   ├── screens/          # All app screens
│   ├── components/       # Reusable UI components
│   └── ...
├── tests/            # Jest test files
├── App.jsx               # Root component
├── index.js              # Entry point
├── package.json
├── tsconfig.json
└── babel.config.js

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20
- **React Native CLI** environment set up → [Official Guide](https://reactnative.dev/docs/set-up-your-environment)
- **Android Studio** (for Android) or **Xcode** (for iOS, macOS only)

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/Tanuj325/SpendWiseFrontend.git
cd SpendWiseFrontend

# 2. Install dependencies
npm install

# 3. (iOS only) Install CocoaPods
bundle install
bundle exec pod install

### Running the App
```bash
# Step 1 — Start Metro bundler
npm start

# Step 2 — Run on Android
npm run android

# Step 2 — Run on iOS
npm run ios

### Linting & Formatting

```bash
# Lint
npm run lint

# Format (Prettier)
npx prettier --write "src/**/*.{js,jsx,ts,tsx}"

### 🔗 Backend
This app is paired with a Spring Boot backend. Make sure the backend server is running and update the base URL in the API config before running the app.
Backend repo: https://github.com/Tanuj325/SpendWiseBackend

### 📦 Key Dependencies
{
  "@react-navigation/bottom-tabs": "^7.10.1",
  "@react-navigation/drawer": "^7.7.13",
  "@react-navigation/native-stack": "^7.16.0",
  "react-native-gifted-charts": "^1.4.77",
  "react-native-reanimated": "^4.2.1",
  "react-native-image-picker": "^7.1.2",
  "react-native-linear-gradient": "^2.8.3",
  "@react-native-async-storage/async-storage": "^2.2.0",
  "dayjs": "^1.11.19"
}

### 🤝 Contributing
1. Fork the repository
2. Create your feature branch: git checkout -b feature/your-feature
3. Commit your changes: git commit -m 'Add some feature'
4. Push to the branch: git push origin feature/your-feature
5. Open a Pull Request

### 👤 Author
Tanuj — @Tanuj325

###📄 License
This project is for academic and educational purposes.