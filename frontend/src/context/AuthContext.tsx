import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import api from "../services/api";

interface AuthContextType {
    user: User;
    loading: boolean;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    refetchUser: () => Promise<void>;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const initialUser: User = {
    id: "",
    email: "",
    name: "",
    address: "",
    phone: "",
    role: "USER",
};

const AuthContext = createContext<AuthContextType>({
    user: initialUser,
    loading: false,
    setUser: () => {},
    refetchUser: async () => {},
});

export const AuthProvider=  ({ children }: AuthProviderProps)=> {
    const [user, setUser] = useState<User>(initialUser);
    const [loading, setLoading] = useState<boolean>(true);

    
    const fetchUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            setUser(initialUser);
            return;
        }
        
        try {
            setLoading(true);
            const response = await api.get('/users/me',{withCredentials:true});
            setUser(response.data);
        } catch (err) {
            console.error("Failed to fetch user data", err);
            setUser(initialUser);
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
        refetchUser();
    }, []);

    const refetchUser = async () => {
        await fetchUser();
    };

    return (
        <AuthContext.Provider value={{ user, loading, setUser, refetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);