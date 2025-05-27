import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);      // null = chưa load hoặc chưa login
    const [loading, setLoading] = useState(true);

    // Hàm này sẽ gọi API /auth/me để lấy thông tin người dùng hiện tại
    const fetchCurrentUser = async () => {
        setLoading(true);
        try {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/auth/me`, { withCredentials: true }
        );
            setUser(res.data.dataUser);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Gọi hàm này khi component AuthProvider được mount
    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const login = async (credentials) => {
        setLoading(true);
        try {
            // gọi API login, server set cookie
            await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/login`,
                credentials,
                { withCredentials: true }
            );
            // sau khi login thành công, gọi /me để lấy profile đầy đủ
            await fetchCurrentUser();
        } catch (err) {
            // bạn có thể throw lỗi để component Login bắt
            throw err;
        }
    };

    const logout = () => {
        try {
            axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`, {}, { withCredentials: true })
            .finally(() => setUser(null));
        } catch (err) {
            // bạn có thể throw lỗi để component Login bắt
            throw err;
        }
        // xóa cookie ở server
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
}
