import axiosClient from '../axiosClient';

const URL = '/recipient-accounts';

export const recipientAPI = {
    create: async (account, name) => {
        const response = await axiosClient.post(URL, {
            recipientAccountNumber: account,
            reminiscentName: name,
        });
        return response;
    },
    update: async (id, account, name) => {
        const response = await axiosClient.put(`${URL}/${id}`, {
            recipientAccountNumber: account,
            reminiscentName: name,
        });
        return response;
    },
    delete: async (id) => {
        const response = await axiosClient.delete(`${URL}/${id}`);
        return response;
    },
    getList: async () => {
        const response = await axiosClient.get(URL);
        return response;
    },
};
