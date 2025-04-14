"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function LogoutPage() {
  useEffect(() => {
    // Clear auth token from localStorage
    localStorage.removeItem("token");
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">You&apos;ve been logged out</h1>
        <p className="text-gray-600 mb-6">
          Thanks for using <span className="font-medium text-blue-700">Shwetha Primary And High School </span>! You&apos;re safely signed out.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all font-semibold"
          >
            Log In Again
          </Link>

          <Link
            href="/"
            className="w-full border border-blue-600 text-blue-700 py-2 rounded-xl hover:bg-blue-50 transition-all font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
