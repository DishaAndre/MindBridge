# MindBridge

A comprehensive mental health support platform designed for individuals with cognitive disabilities and their caregivers. Built with modern React architecture and serverless backend services.

## 🚀 Features

- **Emotion Tracking** - Simple emoji-based mood check-ins with intensity ratings
- **AI Companion** - 24/7 supportive chat with crisis detection capabilities
- **Caregiver Dashboard** - Real-time monitoring and alert system for caregivers
- **Calming Activities** - Guided breathing exercises and mindfulness activities
- **Mood Analytics** - Visual journey tracking with insights and patterns
- **Crisis Support** - Immediate access to mental health resources and hotlines
- **Accessibility First** - Designed specifically for cognitive disabilities
- **Privacy Focused** - Secure data handling with user-controlled sharing

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mindbridge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Add your API keys to .env file
   ```
   
4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser


## 🏗️ Architecture

### Frontend (React SPA)
- **React 18** with modern hooks and context
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling
- **React Router** for client-side routing

### Backend (Serverless)
- **Supabase** for database and authentication
- **Service layer** for business logic
- **External APIs**: Gemini AI, Resend Email
- **Smart fallbacks** for offline/demo functionality

### Data Storage
- **Production**: Supabase PostgreSQL database
- **Demo**: localStorage for immediate functionality
- **Hybrid approach** allows seamless switching

