import axiosConfig from '../axiosConfig';

const URL = '/auth';

export const authAPI = {
    refreshToken: async (data) => {
        const response = await axiosConfig.post(`${URL}/token/refresh`, data);
        return response;
    },
    login: async (data) => {
        const response = await axiosConfig.post(`${URL}/login`, data);
        return response;
    },
};
