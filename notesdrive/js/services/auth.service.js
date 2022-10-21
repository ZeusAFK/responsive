const authenticate = async (request) => {
    try {
        return await api.post("/auth/authenticate", request);
    } catch (error) {
        throw error;
    }
};

const validateToken = async () => {
    return await axios.get("/auth/check", { validateStatus: (status) => status === 200, headers: authHeader() });
};

const authHeader = () => {
    const token = getToken();

    if (token) {
        return { Authorization: 'Bearer ' + token };
    } else {
        return {};
    }
}

const checkUserSession = () => {
    return getToken() !== null;
}

const getUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

const getToken = () => {
    return localStorage.getItem('token') || null;
}

const removeUserSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

const setUserSession = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}