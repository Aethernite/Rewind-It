import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
});

export const fetchProjects = async ({ page, size }) => {
    const res = await instance.get('/projects', { params: {page, size}});
    return res.data;
};

export const fetchProjectById = async (id) => {
    console.log(id);
    const res = await instance.get(`/projects/${id}`);
    return res.data;
};
