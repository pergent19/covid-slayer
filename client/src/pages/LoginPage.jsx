import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import AuthCard from "../components/card/AuthCard";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <AuthCard
      title="Welcome Back!"
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-500 hover:underline font-semibold">
            Sign up
          </Link>
        </>
      }
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto px-4 py-8 space-y-6"
      >
        <h2 className="text-2xl font-extrabold text-center text-gray-700">Sign In</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="w-full bg-indigo-500 text-white py-3 rounded-lg font-bold tracking-wide hover:bg-indigo-600 transition">
          Login
        </button>

        <p className="text-center text-sm text-gray-500 hover:text-gray-700">
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
      </form>
    </AuthCard>
  );
}
