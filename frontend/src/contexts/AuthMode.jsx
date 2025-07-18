import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser, login as loginService, logout as logoutService} from '../services/user.service';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Hàm này sẽ gọi API /auth/me để lấy thông tin người dùng hiện tại
    const fetchCurrentUser = async () => {
        setLoading(true);
        try {
            const res = await getCurrentUser();
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
            const res = await loginService(credentials);
            // sau khi login thành công, gọi /me để lấy profile đầy đủ
            await fetchCurrentUser();
        } catch (err) {
            // bạn có thể throw lỗi để component Login bắt
            throw err;
        }
    };

    const logout = () => {
        try {
            logoutService();
        } catch (err) {
            // bạn có thể throw lỗi để component Login bắt
            throw err;
        } finally {
            setUser(null);
        }
        // xóa cookie ở server
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
}
