import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
});

export const register = async ({ email, password }) => {
    const res = await instance.post('/auth/register', { email, password, confirmPassword: password });
    return res.data;
};

export const login = async ({ email, password }) => {
    const res = await instance.post('/auth/login', { email, password });
    return res.data;
};

export const logout = async () => {
    const res = await instance.post('/auth/logout');
    return res.data;
};
