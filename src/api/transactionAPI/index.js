import axiosClient from '../axiosClient';

const URL = '/transactions';

export const transactionAPI = {
    create: async (data) => {
        const response = await axiosClient.post(URL, data);
        return response;
    },
};
