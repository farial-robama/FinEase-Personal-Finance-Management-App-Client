
# 💰 FinEase - Personal Finance Management App

<div align="center">

**Take Control of Your Financial Future**

</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Usage Guide](#usage-guide)
- [Contact](#contact)

---

## 🎯 About The Project

**FinEase** is a modern personal finance management web application designed to help users take control of their financial lives. Track income and expenses, visualize spending patterns with interactive charts, and achieve your financial goals with real-time insights and personalized reporting.

### Why FinEase?

- 🔍 **Real-time Insights** - Track every transaction and see where your money goes
- 📊 **Visual Reports** - Beautiful charts and graphs to understand your finances at a glance
- 🎯 **Goal Tracking** - Set and monitor financial milestones to stay motivated
- 🔒 **Secure & Private** - Your financial data is encrypted and protected with Firebase
- 📱 **Responsive Design** - Access your finances from any device, anywhere

---

## ✨ Key Features

### 🔐 Authentication & Security
- **Secure User Authentication** powered by Firebase
  - Email/Password registration and login
  - Google OAuth integration for quick sign-in
  - Password recovery and reset functionality
  - Secure session management and logout
- **Protected Routes** ensuring only authenticated users can access financial data

### 💳 Transaction Management
- **Full CRUD Operations** for complete transaction control
  - ➕ Add new transactions (Income/Expense)
  - 👁️ View detailed transaction information with category statistics
  - ✏️ Edit existing transactions with validation
  - 🗑️ Delete unwanted transactions with confirmation
- **Smart Categorization** with 15+ predefined categories
  - Income: Salary, Business, Investment, Freelance, Gift, Bonus, Others
  - Expense: Food, Transport, Rent, Shopping, Bills, Entertainment, Healthcare, Education, Others
- **Transaction History** with advanced search and filter capabilities
- **Similar Transactions** feature for pattern recognition

### 📊 Financial Reporting
- **Interactive Charts & Visualizations**
  - Income vs Expense comparison (Bar Charts)
  - Category-wise breakdown (Pie Charts)
  - Monthly trend analysis (Line Charts)
  - Net balance tracking with percentage changes
- **Monthly Filtering** to analyze specific time periods
- **Category Statistics** showing total, count, and average amounts
- **Toggle Views** between Overview and Detailed reports
- **Top Categories** displaying top 5 spending/earning categories

### 👤 User Profile Management
- Update display name and profile photo URL
- View complete account information and statistics
- Personalized dashboard with user-specific insights
- Recent transaction activity tracking

### 🎨 User Experience
- **Light/Dark Mode** toggle for comfortable viewing
- **Responsive Design** optimized for mobile, tablet, and desktop
- **Smooth Animations** using Framer Motion
- **Toast Notifications** for real-time feedback (React Hot Toast)
- **Modal Dialogs** with SweetAlert2 for confirmations
- **Loading States** with spinners for better UX
- **Error Handling** with user-friendly messages
- **Modern Icons** using Lucide React

### 🚀 Performance & Navigation
- **Fast Routing** with React Router v7
- **Dynamic Routes** for seamless navigation
- **404 Page** for invalid routes
- **Persistent Navbar & Footer** across all pages
- **Optimized Bundle Size** with Vite build tool
- **Lazy Loading** for improved performance

---

## 🛠️ Tech Stack

### Frontend Technologies

| Technology | Version | Description |
|-----------|---------|-------------|
| ⚛️ **React.js** | 18.3+ | UI library for building interactive interfaces |
| ⚡ **Vite** | 5.0+ | Next-generation frontend build tool |
| 🎨 **Tailwind CSS** | 3.4+ | Utility-first CSS framework |
| 🎭 **Framer Motion** | 11.0+ | Animation library for React |
| 🧭 **React Router** | 7.0+ | Declarative routing for React |
| 📊 **Chart.js** | 4.4+ | JavaScript charting library with react-chartjs-2 |
| 🔥 **Firebase** | 11.0+ | Authentication and hosting service |
| 🔔 **React Hot Toast** | 2.4+ | Beautiful notification toasts |
| 🍬 **SweetAlert2** | 11.0+ | Customizable alert dialogs |
| 🎯 **Lucide React** | Latest | Beautiful & consistent icon set |
| 🎨 **DaisyUI** | 4.0+ | Tailwind CSS component library |

### Backend Technologies

| Technology | Description |
|-----------|-------------|
| 🟢 **Node.js** | JavaScript runtime environment |
| 🚂 **Express.js** | Fast, minimalist web framework |
| 🍃 **MongoDB** | NoSQL database for flexible data storage |
| 🔌 **Mongoose** | MongoDB object modeling for Node.js |
| 🌐 **CORS** | Cross-origin resource sharing middleware |
| 🔒 **dotenv** | Environment variable management |
| ☁️ **Vercel** | Serverless deployment platform |

---

## 📖 Usage Guide

### Adding a Transaction

1. Navigate to **Add Transaction** page from the navbar
2. Select transaction type: **Income** or **Expense**
3. Choose appropriate category from dropdown
4. Enter the amount (must be greater than 0)
5. Add description (optional but recommended)
6. Select transaction date
7. Click **Save Transaction** button
8. Success toast notification will appear

### Viewing Transaction Details

1. Go to **My Transactions** page
2. Click on any transaction card or **View Details** button
3. See complete transaction information including:
   - Amount and type
   - Category with color coding
   - Description and date
   - Category statistics (total, count, average)
   - Similar transactions in the same category
4. Use **Edit** or **Delete** buttons to manage the transaction

### Analyzing Financial Reports

1. Click on **Reports** in the navbar
2. Use the month filter dropdown to select specific period or view all months
3. Toggle between two view modes:
   - **Overview**: Shows trends and comparisons
     - Monthly Net Balance Trend (Line Chart)
     - Income vs Expense Comparison (Bar Chart)
   - **Detailed**: Shows category breakdowns
     - Income by Category (Pie Chart)
     - Expense by Category (Pie Chart)
     - Top 5 Income Categories
     - Top 5 Expense Categories
4. View summary cards at the top:
   - Total Income with transaction count
   - Total Expense with transaction count
   - Net Balance (surplus or deficit)

### Managing Your Profile

1. Click on your profile picture in the navbar
2. Navigate to **Profile** page
3. View your account information
4. Update display name or photo URL
5. Changes reflect immediately across the application

### Using Light/Dark Mode

1. Click the theme toggle button (Sun/Moon icon) in the navbar
2. Theme preference is saved in local storage
3. Persists across browser sessions

---


## 📧 Contact

**Farial Robama**
- Email: farial.robama@example.com
- GitHub: [@farial-robama](https://github.com/farial-robama)
- LinkedIn: [Farial Robama](https://linkedin.com/in/farial-robama)

**Project Links**:
- Frontend: [https://github.com/farial-robama/FinEase-Personal-Finance-Management-App-Client](https://github.com/farial-robama/FinEase-Personal-Finance-Management-App-Client)
- Backend: [https://github.com/farial-robama/FinEase-Personal-Finance-Management-App-Server](https://github.com/farial-robama/FinEase-Personal-Finance-Management-App-Server)

**Live Demo**: [https://finease-client.web.app/](https://finease-client.web.app/)

---

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

<div align="center">

**Built with ❤️ by Farial Robama**

© 2026 FinEase. All rights reserved.

[⭐ Star on GitHub](https://github.com/farial-robama/FinEase-Personal-Finance-Management-App-Client) | [📝 Documentation](https://github.com/farial-robama/FinEase-Personal-Finance-Management-App-Client#readme) | [🐛 Report Bug](https://github.com/farial-robama/FinEase-Personal-Finance-Management-App-Client/issues)

</div>