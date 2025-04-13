const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const api = {
  login: async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");
    return res.json();
  },
  register: async (name,email,password,role) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (!res.ok) throw new Error("Failed to register");
    return res.json()
  },

  fetchAnnouncements: async (token) => {
    const res = await fetch(`${API_BASE_URL}/announcements`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  postAnnouncement: async (token, data) => {
    const res = await fetch(`${API_BASE_URL}/announcements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  replyToAnnouncement: async (id, message, token) => {
    const res = await fetch(`${API_BASE_URL}/announcements/${id}/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });

    return res.json();
  },
};
