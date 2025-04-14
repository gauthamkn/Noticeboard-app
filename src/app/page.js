"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-start p-6">
      <nav className="w-full max-w-6xl flex justify-between items-center py-4 px-4 bg-white rounded-2xl shadow mb-10">
        <h1 className="text-xl font-bold text-blue-800">Shwetha Primary And High School</h1>
        <div className="flex gap-4 text-sm">
          <Link href="/" className="text-blue-700 hover:underline">Home</Link>
          <Link href="/login" className="text-blue-700 hover:underline">Login</Link>
          <Link href="/register" className="text-blue-700 hover:underline">Register</Link>
        </div>
      </nav>

      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-blue-800 mb-4">Welcome to Shwetha Primary And High School</h1>
        <p className="text-lg text-gray-700 mb-8">
          A modern announcement and notification platform for teachers, parents, and students.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700 transition-all"
          >
            Log In
          </a>
          <a
            href="/register"
            className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-2xl shadow-md hover:bg-blue-50 transition-all"
          >
            Register
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">For Teachers</h2>
            <p className="text-gray-600 text-sm">
              Post announcements, target specific students or parents, and manage classroom communication effortlessly.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">For Parents</h2>
            <p className="text-gray-600 text-sm">
              View announcements relevant to your child and communicate directly with their teacher.
            </p>
          </div>
        </div>

        <footer className="mt-12 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} SHWETHA NURSERY HIGHER PRIMARY AND HIGH SCHOOL. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
