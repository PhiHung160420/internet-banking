import axiosConfig from '../axiosConfig';

const URL = '/accounts';

const accountAPI = {
    findOne: async (id, params) => {
        const res = await axiosConfig.get(`${URL}/${id}`, { params });
        return res;
    },
    getList: async (params) => {
        const res = await axiosConfig.get(URL, { params });
        return res;
    },
    create: async (body) => {
        const res = await axiosConfig.post('/users', body);
        return res;
    },
    delete: async (id) => {
        const res = await axiosConfig.delete(`${URL}/${id}`);
        return res;
    },
    update: async (id, body) => {
        const res = await axiosConfig.put(`/users/${id}`, body);
        return res;
    },
};

export default accountAPI;
