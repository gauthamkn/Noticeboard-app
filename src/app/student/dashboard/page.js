"use client";

import { api } from "../../../utils/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const [announcements, setAnnouncements] = useState([]);
  const router = useRouter();

  useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) router.push("/login");
    
      api.fetchAnnouncements(token).then(setAnnouncements).catch(console.error);
    }, []);

  return (
    <main className="min-h-screen bg-blue-50 p-6 flex flex-col justify-between">
      <div>
        <nav className="w-full max-w-6xl flex justify-between items-center py-4 px-4 bg-white rounded-2xl shadow mb-10">
          <h1 className="text-xl font-bold text-blue-800">Shwetha Primary And High School</h1>
          <div className="flex gap-4 text-sm">
            <Link href="/student/dashboard" className="text-blue-700 hover:underline">Dashboard</Link>
            <Link href="/logout" className="text-blue-700 hover:underline">Logout</Link>
          </div>
        </nav>

        <h1 className="text-3xl font-bold text-blue-800 mb-6">Student Dashboard</h1>

        <section>
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Announcements</h2>
          <div className="space-y-4">
            {announcements.map((a) => (
              <div key={a._id} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-blue-800">{a.title}</h3>
                    <p className="text-sm text-gray-600">{a.message}</p>
                    <p className="text-xs text-gray-500 mt-1">From: {a.teacher?.name}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{a.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Shwetha Primary And High School. All rights reserved.
      </footer>
    </main>
  );
}
