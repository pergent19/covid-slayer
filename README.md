# 🧪 Covid Slayer App

A full-stack authentication and game system built with **React (Vite)** for the frontend and **Express + MongoDB** for the backend. This app allows users to register, login, and play a game.

---

## 🛠 Tech Stack

- Frontend: React, Tailwind CSS, Vite
- Backend: Express.js, MongoDB
- Deployment: Netlify (frontend), Render (backend)

---

## 📦 Folder Structure

covid-slayer/
├── client/ 
└── server/ 

---

## ⚙️ Setup Instructions

### ✅ Prerequisites

Make sure you have the following installed:

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or Atlas)
- Git

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/pergent19/covid-slayer.git
cd covid-slayer
```
#### 🔙 Backend Setup (/server)

##### 1. Navigate to server folder and install dependencies
```bash
cd server
npm install
```

##### 2. Create .env file
`PORT=5000`

`MONGO_URI=your_mongodb_connection_string`

`JWT_SECRET=your_secret_here`

##### 3. Run the server 
```bash
npm run dev
```

#### 🔙 Frontend Setup (/client)

##### 1. Navigate to server folder and install dependencies
```bash
cd client
npm install
```

##### 2. Create .env file

`VITE_API_URL=http://localhost:5000`

##### 3. Run the server 
```bash
npm run dev
```

