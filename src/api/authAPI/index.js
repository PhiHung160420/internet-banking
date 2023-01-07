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
    changePassword: async (data) => {
        const response = await axiosConfig.post(`/users/change-password`, data);
        return response;
    },

    getInfo: async () => {
        const response = await axiosConfig.get(`/accounts/info`);
        return response;
    },

    sendOtpForgotPw: async (email) => {
        const response = await axiosConfig.post(`/users/forgot-password?email=${email}`);
        return response;
    },

    submitForgotPw: async (otpValue, body) => {
        const response = await axiosConfig.post(`/users/forgot-password/validate?otpValue=${otpValue}`, { ...body });
        return response;
    },
};
