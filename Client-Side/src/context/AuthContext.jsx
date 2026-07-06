import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const AuthContext = createContext();

const API = import.meta.env.VITE_BACKEND_BASE_URL || import.meta.env.VITE_API_URL;
const TOKEN_KEY = "accessToken";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null);
  const [loading, setLoading] = useState(true);

  const authAxios = axios.create({
    baseURL: API,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const { data } = await authAxios.get("/auth/me", {
        headers,
      });
      setUser(data);
    } catch (err) {
      console.error("Auth check failed", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const { data } = await authAxios.post("/auth/login", {
        email,
        password,
        role: "USER",
      });

      const receivedToken = data?.accessToken || data?.token || data?.data?.accessToken || null;
      toast.success("Login successful!");
      setUser(data?.user || null);
      setToken(receivedToken);
      return true;
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Login failed");
      return false;
    }
  };

  const logout = async () => {
    try {
      await authAxios.post("/auth/logout");
      setUser(null);
      setToken(null);
      toast.success("Logged out successfully");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
