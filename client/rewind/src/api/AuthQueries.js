import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    withCredentials: false,
});

export const register = async ({ email, password }) => {
    const res = await instance.post('/auth/register', { email, password, confirmPassword: password });
    return res.data;
};

export const login = async ({ email, password }) => {
    const res = await instance.post('/auth/login', { email, password });
    console.log(res.data);
    const { token, user } = res.data;
    instance.defaults.headers['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
    return res.data;
};

export const logout = async () => {
    const res = await instance.post('/auth/logout');
    localStorage.clear();
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

export const getMe = async () => {
    const res = await instance.get('/auth/me');
    return res.data;
}


const token = localStorage.getItem('token');
if (token) {
    instance.defaults.headers['Authorization'] = `Bearer ${token}`;
}
