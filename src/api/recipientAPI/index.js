import axiosConfig from '../axiosConfig';

const URL = '/recipient-accounts';

export const recipientAPI = {
    create: async (account, name) => {
        const response = await axiosConfig.post(URL, {
            recipientAccountNumber: account,
            reminiscentName: name,
        });
        return response;
    },
    update: async (id, account, name) => {
        const response = await axiosConfig.put(`${URL}/${id}`, {
            recipientAccountNumber: account,
            reminiscentName: name,
        });
        return response;
    },
    delete: async (id) => {
        const response = await axiosConfig.delete(`${URL}/${id}`);
        return response;
    },
    getList: async () => {
        const response = await axiosConfig.get(URL);
        return response;
    },
};
