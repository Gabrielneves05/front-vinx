import { apiUrl, requestConfig } from '../utils/config';

// Register an user
const register = async (data) => {
    const config = requestConfig("POST", data);
    
    try {
        const response = await fetch(apiUrl + "/users/register", config)
            .then(res => res.json())
            .catch(err => err);

        if(response._id) {
            localStorage.setItem("user", JSON.stringify(response));
        }

        return response;
    } catch (error) {
        console.log(error);
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
        const response = await fetch(apiUrl + "/users/login", config)
            .then(response => response.json())
            .catch(err => err);

        if(response._id) {
            localStorage.setItem("user", JSON.stringify(response));
        }

        return response;
    } catch (error) {
        console.log(error);
    }
}

const authService = {
    register,
    logout,
    login,
}

export default authService;