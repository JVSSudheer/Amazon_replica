import api from "./api";

interface RegisterData {
    email: string;
    password: string;
    phone: string;
    name: string;
}
export const regiser = async (registerData: RegisterData) => {
    try {
        const respnse = await api.post("/auth/register", {
            email: registerData.email,
            password: registerData.password,
            name: registerData.name,
            phone: registerData.phone
        }, { withCredentials: true });
        localStorage.setItem("token", respnse.data.token);
        return respnse.data;
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
}

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post("/auth/login", { email, password }, { withCredentials: true });
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}

export const logout = async () => {
    
    localStorage.removeItem("token");
}