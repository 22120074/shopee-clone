import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);      // null = chưa load hoặc chưa login
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Khi app mount, gọi API /me để check cookie và lấy user
        axios.get(`${process.env.REACT_APP_API_URL}/auth/me`, { withCredentials: true })
        .then(res => {
            setUser(res.data.user);   //{ userId, phone, name, avatar, … }
        })
        .catch(() => {
            setUser(null);
        })
        .finally(() => setLoading(false));
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        // xóa cookie ở server
        axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`, {}, { withCredentials: true })
        .finally(() => setUser(null));
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
}
