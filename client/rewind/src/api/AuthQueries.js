import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    withCredentials: true,
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

export const getTimesheetsForUser = async ({ cursor, limit }) => {
    const res = await instance.get(`/timesheets`, { params: { page: cursor, size: limit } });
    return res.data;
};

export const fetchProjects = async () => {
    const res = await instance.get('/projects');
    return res.data;
};
