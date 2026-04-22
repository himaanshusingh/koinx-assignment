# KoinX Tax Harvesting Dashboard

A premium, interactive cryptocurrency tax management application designed to help users visualize their capital gains and optimize their tax positions through strategic harvesting.

![KoinX Dashboard](https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200&auto=format&fit=crop)

## 🚀 Key Features

- **Interactive Holdings Management**: Browse your entire portfolio with a high-performance, filterable holdings table.
- **Real-time Tax Harvesting**: Select specific assets to immediately see how harvesting gains or losses impacts your "After Harvesting" position.
- **Automated Tax Reduction Note**: A smart notification logic that identifies when you've successfully offset capital gains with harvested losses.
- **Dynamic Summaries**: Comparative view between "Pre Harvesting" and "After Harvesting" states with detailed short-term and long-term breakdowns.
- **Premium Aesthetics**:
    - **Dark Mode First**: Sleek, cinematic dark theme optimized for financial data.
    - **Glassmorphism**: Modern UI elements with subtle transparency and border-glows.
    - **Responsive Design**: Fluid layouts that work seamlessly across desktop, tablet, and mobile.
- **Lightweight Architecture**: built with React Context API for high performance without heavy external state libraries.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: React Context API
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd koinx
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 📈 How It Works

1. **View Holdings**: The table at the bottom shows all your current cryptocurrency assets along with their Short-Term (STCG) and Long-Term (LTCG) capital gains.
2. **Select for Harvesting**: Click the checkboxes next to any asset.
3. **Analyze Impact**: The "After Harvesting" card at the top will dynamically update to show your new Effective Capital Gains.
4. **Tax Savings**: If you select assets that are in a loss, the dashboard will display a special note highlighting exactly how much your taxable gains have been reduced.

## 📄 License

This project is licensed under the MIT License.
