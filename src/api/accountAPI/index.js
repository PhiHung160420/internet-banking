import axiosClient from '../axiosClient';

const URL = '/accounts';

const accountAPI = {
    findOne: async (id, params) => {
        const res = await axiosClient.get(`${URL}/${id}`, { params });
        return res;
    },
    getList: async (params) => {
        const res = await axiosClient.get(URL, { params });
        return res;
    },
    create: async (body) => {
        const res = await axiosClient.post('/users', body);
        return res;
    },
};

export default accountAPI;
