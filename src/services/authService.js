import { apiUrl, requestConfig } from '../utils/config';

// Register an user
const register = async (data) => {
    const config = requestConfig("POST", data);
    
    try {
        const res = await fetch(apiUrl + "/users/register", config);
        const response = await res.json().catch(() => null);

        if (!res.ok) {
            return response && response.errors
                ? response
                : { errors: ["Falha ao cadastrar. Tente novamente."] };
        }

        if (response && response._id) {
            localStorage.setItem("user", JSON.stringify(response));
        }

        return response;
    } catch (error) {
        return { errors: ["Erro de rede ao cadastrar. Verifique sua conexão."] };
    }
}

// Logout an user
const logout = async () => {
    localStorage.removeItem("user");
}

// Sign in an user
const login = async (data) => {
    const config = requestConfig("POST", data);

    try {
        const res = await fetch(apiUrl + "/users/login", config);
        const response = await res.json().catch(() => null);

        if (!res.ok) {
            return response && response.errors
                ? response
                : { errors: ["Falha ao entrar. Tente novamente."] };
        }

        if (response && response._id) {
            localStorage.setItem("user", JSON.stringify(response));
        }

        return response;
    } catch (error) {
        return { errors: ["Erro de rede ao entrar. Verifique sua conexão."] };
    }
}

const authService = {
    register,
    logout,
    login,
}

export default authService;