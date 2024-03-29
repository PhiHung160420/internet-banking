import axiosConfig from '../axiosConfig';

const URL = '/debt-reminders';

export const debtRemindersAPI = {
    create: async (body) => {
        const response = await axiosConfig.post(URL, { ...body });
        return response;
    },

    getList: async (params) => {
        const response = await axiosConfig.get(URL, { params });
        return response;
    },

    cancelDebt: async (debtReminderId, body) => {
        const response = await axiosConfig.post(`${URL}/cancellation/${debtReminderId}`, { ...body });
        return response;
    },

    getDebtDetail: async (debtId) => {
        const response = await axiosConfig.get(`${URL}/${debtId}`);
        return response;
    },

    getPaymentOtp: async (debtId) => {
        const response = await axiosConfig.post(`${URL}/payment/${debtId}`);
        return response;
    },

    confirmOtp: async (otpValue) => {
        const response = await axiosConfig.post(`${URL}/payment/validate/${otpValue}`)
        return response
    }
};
