import { apiUrl, requestConfig } from '../utils/config';

// Register an user
const register = async (data) => {
    const config = requestConfig("POST", data);
    
    try {
        const response = await fetch(apiUrl + "/users/register", config)
            .then(res => res.json())
            .catch(err => err);

        if(response) {
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

const authService = {
    register,
    logout
}

export default authService;