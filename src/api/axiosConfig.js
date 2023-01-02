import axios from 'axios';
import { parse, stringify } from 'qs';
import { ACCESS_TOKEN_KEY, API_SERVER_URL, REFRESH_TOKEN_KEY } from '~/constant';
import { clearStorage } from '~/utils/storage';
import { authAPI } from './authAPI';

const defaultHeader = {
    'Content-Type': 'application/json',
};
const axiosClient = axios.create({
    baseURL: API_SERVER_URL,
    headers: defaultHeader,
    paramsSerializer: {
        encode: parse,
        serialize: stringify,
    },
});

axiosClient.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (!!accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    async (error) => {
        const { response, config } = error;
        const statusCode = response?.status;
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        if (statusCode === 401) {
            try {
                const res = await authAPI.refreshToken({ refreshToken });
                localStorage.setItem(ACCESS_TOKEN_KEY, res?.accessToken);
                return axiosClient(config);
            } catch (error) {
                const errorCode = error?.status;
                if (errorCode === 400) {
                    clearStorage();
                    window.alert('Phiên làm việc hết hạn. Vui lòng đăng nhập lại!');
                    window.location = '/login';
                }
            }
        } else {
            throw response.data;
            // toast.error(response?.data?.message || 'Xử lí tác vụ thất bại');
        }

        throw error.response?.data;
    },
);
export { defaultHeader };
export default axiosClient;
