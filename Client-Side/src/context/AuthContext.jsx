import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const AuthContext = createContext();

const API = import.meta.env.VITE_BACKEND_BASE_URL || import.meta.env.VITE_API_URL;
let refreshRequest = null;

const refreshAccessToken = async () => {
  if (!refreshRequest) {
    refreshRequest = axios
      .post(`${API}/auth/refresh`, {}, { withCredentials: true, skipAuthRefresh: true })
      .finally(() => { refreshRequest = null; });
  }
  return refreshRequest;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const authAxios = useMemo(() => axios.create({
    baseURL: API,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  }), []);

  useEffect(() => {
    // Remove tokens left by the previous implementation; authentication now uses httpOnly cookies only.
    localStorage.removeItem("accessToken");
  }, []);

  useEffect(() => {
    const interceptorId = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response?.status !== 401
          || originalRequest?._retry
          || originalRequest?.skipAuthRefresh
          || originalRequest?.url?.includes("/auth/refresh")
        ) {
          return Promise.reject(error);
        }

        originalRequest._retry = true;
        try {
          const { data } = await refreshAccessToken();
          setToken(data.accessToken);
          return axios(originalRequest);
        } catch (refreshError) {
          setToken(null);
          setUser(null);
          return Promise.reject(refreshError);
        }
      }
    );
    return () => axios.interceptors.response.eject(interceptorId);
  }, []);

  const fetchUser = async (retried = false) => {
    try {
      const { data } = await authAxios.get("/auth/me");
      setUser(data);
    } catch (err) {
      if (err.response?.status === 401 && !retried) {
        try {
          const { data } = await refreshAccessToken();
          setToken(data.accessToken);
          return fetchUser(true);
        } catch {
          // The refresh token is missing, expired, or revoked; the user must log in again.
        }
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
