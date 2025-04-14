"use client";
import { api } from "../../../utils/api";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ParentDashboard() {
  const [announcements, setAnnouncements] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [replies, setReplies] = useState({});
  const [newReply, setNewReply] = useState("");
  const [activeAnnouncement, setActiveAnnouncement] = useState(null);

  const handleReply = async (announcementId) => {
    if (!newReply.trim()) return;
    const token = localStorage.getItem("token");
  
    await api.replyToAnnouncement(announcementId, newReply, token);
  
    setReplies((prev) => ({
      ...prev,
      [announcementId]: [...(prev[announcementId] || []), {
        message: newReply,
        sender: "You",
        time: new Date().toLocaleTimeString(),
      }],
    }));
  
    setNewReply("");
    setActiveAnnouncement(null);
  };
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    
    api.fetchAnnouncements(token).then(
      (response) => {setAnnouncements(response);
        const newObject = {};
        response.forEach(element => {
          newObject[element._id] = element.replies;
        });
        setReplies(newObject);}).catch(console.error);
        const fetchUserMap = async () => {
          const token = localStorage.getItem("token");
          try {
            const res = await fetch("http://localhost:2300/api/users", {
              headers: { Authorization: `Bearer ${token}` },
            });
            const users = await res.json();
            const map = {};
            users.forEach((u) => {
              map[u._id] = u.name;
            });
            setUserMap(map);
          } catch (err) {
            console.error("Failed to load user map", err);
          }
        };
        fetchUserMap(); 
    
  }, []);

  useEffect(() => {
    
  }, []);
  console.log(announcements)
  return (
    <main className="min-h-screen bg-blue-50 p-6">
      <nav className="w-full max-w-6xl flex justify-between items-center py-4 px-4 bg-white rounded-2xl shadow mb-10">
        <h1 className="text-xl font-bold text-blue-800">Shwetha Primary And High School</h1>
        <div className="flex gap-4 text-sm">
          <Link href="/parent/dashboard" className="text-blue-700 hover:underline">Dashboard</Link>
          <Link href="/logout" className="text-blue-700 hover:underline">Logout</Link>
        </div>
      </nav>
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Parent Dashboard</h1>
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
                <span className="text-xs text-gray-400 whitespace-nowrap">{new Date(a.date).toLocaleString("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
})}</span>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setActiveAnnouncement(a._id)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Reply to this
                </button>

                {activeAnnouncement === a._id && (
                  <div className="mt-2 space-y-2">
                    <textarea
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      rows={3}
                      placeholder="Write your reply..."
                    ></textarea>
                    <button
                      onClick={() => handleReply(a._id)}
                      className="bg-blue-600 text-white px-4 py-1.5 rounded-xl hover:bg-blue-700 transition-all"
                    >
                      Send Reply
                    </button>
                  </div>
                )}

                {replies[a._id] && (
                  <div className="mt-4 bg-blue-50 p-3 rounded-xl border border-blue-100">
                    <h4 className="text-sm font-medium text-blue-700 mb-2">Replies:</h4>
                    <ul className="space-y-1">
                      {replies[a._id].map((r, index) => (
                        <li key={index} className="text-sm text-gray-700">
                          <strong>{r.sender.name || "Unknown"}:</strong> {r.message} <span className="text-xs text-gray-400">({new Date(r.date).toLocaleString("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
})})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
