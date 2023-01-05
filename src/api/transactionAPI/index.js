import axiosConfig from '../axiosConfig';

const URL = '/transactions';

export const transactionAPI = {
    create: async (data) => {
        const response = await axiosConfig.post(URL, data);
        return response;
    },
    findById: async (id, params) => {
        const response = await axiosConfig.get(`${URL}/history/${id}`, { params });
        return response;
    },
};
