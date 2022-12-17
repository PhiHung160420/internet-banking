import axiosClient from '../axiosClient';

const URL = '/account';

const accountAPI = {
    async findOne(id, params) {
        const res = await axiosClient.get(`${URL}/${id}`, { params });
        return res;
    },
};

export default accountAPI;
