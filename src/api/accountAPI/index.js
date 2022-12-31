import axiosClient from '../axiosClient';

const URL = '/accounts';

const accountAPI = {
    async findOne(id, params) {
        const res = await axiosClient.get(`${URL}/${id}`, { params });
        return res;
    },
    getList: async (params) => {
        const res = await axiosClient.get(URL, { params });
        return res;
    },
    createAccount: async (body) => {
        const res = await axiosClient.post('/users', body);
        return res;
    },
};

export default accountAPI;
