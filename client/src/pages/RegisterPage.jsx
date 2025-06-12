import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/card/AuthCard";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "", avatar: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please check your details and try again.");
    }
  };

  return (
    <AuthCard
      title="Create an Account"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 hover:underline font-semibold">
            Sign in
          </Link>
        </>
      }
    >
      <form
        onSubmit={handleSubmit}
        className="p-8 w-96 space-y-6"
      >
        <h2 className="text-2xl font-extrabold text-center text-gray-700">Sign Up</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        <input
          name="avatar"
          placeholder="Avatar URL"
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        <button className="w-full bg-indigo-500 text-white py-3 rounded-lg font-bold tracking-wide hover:bg-indigo-600 transition">
          Register
        </button>
      </form>
    </AuthCard>
  );
}
