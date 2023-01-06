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
    getMyAccounts: async () => {
        const res = await axiosConfig.get(`${URL}/info`);
        return res;
    },
    getInfoAccountByAccountNumber: async (accountNum) => {
        const res = await axiosConfig.get(`${URL}/${accountNum}`);
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
    lockById: async (id) => {
        const res = await axiosConfig.post(`${URL}/lock/${id}`);
        return res;
    },
    unLockById: async (id) => {
        const res = await axiosConfig.post(`${URL}/unlock/${id}`);
        return res;
    },
};

export default accountAPI;
