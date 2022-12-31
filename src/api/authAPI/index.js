import axiosClient from '../axiosClient';

const URL = '/auth';

export const authAPI = {
    refreshToken: async (data) => {
        const response = await axiosClient.post(`${URL}/token/refresh`, data);
        return response;
    },
    login: async (data) => {
        const response = await axiosClient.post(`${URL}/login`, data);
        return response;
    },
};
