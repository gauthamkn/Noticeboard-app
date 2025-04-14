"use client";

import { useState } from "react";
import Link from "next/link";
import { api } from "../../utils/api";


export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("parent");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.register(name, email, password, role);
      alert("Registration successful! You can now log in.");
      setName("");
      setEmail("");
      setPassword("");
      setRole("parent");
    } catch (err) {
      alert("Registration failed.");
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      {/* Top Navbar */}
      <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-700">SHWETHA NURSERY HIGHER PRIMARY AND HIGH SCHOOL</Link>
        <div className="space-x-4 text-sm">
          <Link href="/" className="text-blue-700 hover:underline">Home</Link>
          <Link href="/login" className="text-blue-700 hover:underline">Login</Link>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Register for SchoolLink</h2>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 text-gray-800"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 text-gray-800"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 text-gray-800"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Registering As</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 text-gray-800"
              >
                <option value="parent">Parent</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all font-semibold"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} SchoolLink. All rights reserved.
      </footer>
    </main>
  );
}
