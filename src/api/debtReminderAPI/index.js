import axiosConfig from '../axiosConfig';

const URL = '/debt-reminders';

export const debtRemindersAPI = {
    create: async (body) => {
        const response = await axiosConfig.post(URL, { ...body });
        return response;
    },
};
