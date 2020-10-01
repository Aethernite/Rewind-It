import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    withCredentials: true
});

export const register = async ({ email, password }) => {
    const res = await instance.post('/auth/register', { email, password });
    return res.data;
};
