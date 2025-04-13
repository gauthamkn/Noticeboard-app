"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";

// Replace with your actual import path
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export default function TeacherDashboard() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("students");
  const [announcements, setAnnouncements] = useState([]);
  const [visibleReplies, setVisibleReplies] = useState({});

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${API_BASE}/announcements`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setAnnouncements(data);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };

    fetchAnnouncements();
  }, []);

  const handlePostAnnouncement = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE}/announcements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, message, audience }),
      });

      const newAnnouncement = await res.json();
      setAnnouncements([newAnnouncement, ...announcements]);

      setTitle("");
      setMessage("");
      setAudience("students");
    } catch (err) {
      console.error("Failed to post announcement:", err);
    }
  };

  return (
    <main className="min-h-screen bg-blue-50 p-6">
      {/* Navbar */}
      <nav className="w-full max-w-6xl flex justify-between items-center py-4 px-4 bg-white rounded-2xl shadow mb-10">
        <h1 className="text-xl font-bold text-blue-800">SchoolLink</h1>
        <div className="flex gap-4 text-sm">
          <Link href="/teacher/dashboard" className="text-blue-700 hover:underline">Dashboard</Link>
          <Link href="/logout" className="text-blue-700 hover:underline">Logout</Link>
        </div>
      </nav>

      <h1 className="text-3xl font-bold text-blue-800 mb-6">Teacher Dashboard</h1>

      {/* Announcement Form */}
      <section className="bg-white p-6 rounded-xl shadow mb-10 max-w-3xl">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Post Announcement</h2>
        <form onSubmit={handlePostAnnouncement} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            >
              <option value="students">All Students</option>
              <option value="parents">All Parents</option>
              <option value="both">All Students & Parents</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
          >
            Post Announcement
          </button>
        </form>
      </section>

      {/* Announcements */}
      <section>
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Posted Announcements</h2>
        <div className="space-y-4">
          {announcements.map((a) => (
            <div key={a._id} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-blue-800">{a.title}</h3>
                  <p className="text-sm text-gray-600">{a.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Audience: <span className="capitalize">{a.audience}</span>
                  </p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {format(new Date(a.date), "PPpp")}
                </span>
              </div>

              {/* Toggle Replies */}
              {a.replies?.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={() =>
                      setVisibleReplies((prev) => ({
                        ...prev,
                        [a._id]: !prev[a._id],
                      }))
                    }
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {visibleReplies[a._id] ? "Hide Replies" : `Show Replies (${a.replies.length})`}
                  </button>

                  {visibleReplies[a._id] && (
                    <div className="mt-3 bg-blue-50 p-3 rounded-xl border border-blue-100">
                      <h4 className="text-sm font-medium text-blue-700 mb-2">Replies:</h4>
                      <ul className="space-y-1">
                        {a.replies.map((r, index) => (
                          <li key={index} className="text-sm text-gray-700">
                            <strong>{r.sender?.name || "Unknown"}:</strong> {r.message}{" "}
                            <span className="text-xs text-gray-400">
                              ({format(new Date(r.date), "PPpp")})
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
