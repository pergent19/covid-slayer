import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage'
import GamePage from "./pages/GamePage";
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <GamePage />
            </>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
