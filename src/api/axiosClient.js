import axios from 'axios';
import { parse } from 'qs';
import { stringify } from 'qs';
import queryString from 'query-string';
import { toast } from 'react-toastify';
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

// axios.defaults.baseURL = process.env.REACT_APP_API;

axiosClient.interceptors.request.use(async (config) => {
    console.log(config);
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (!!accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        console.log(response);
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    async (error) => {
        console.log(error);

        //Kiểm tra nếu lỗi token thì trở về trang đâng nhập
        const { response, config } = error;
        const statusCode = response?.status;
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        if (statusCode === 401) {
            try {
                const res = await authAPI.refreshToken({ refreshToken });
                localStorage.setItem(ACCESS_TOKEN_KEY, res?.accessToken);
                return axiosClient(config);
            } catch (error) {
                console.warn('err', error);
                const errorCode = error?.status;
                if (errorCode === 400) {
                    clearStorage();
                    toast.error('Phiên làm việc hết hạn. Vui lòng đăng nhập lại!', {
                        onClose: () => {
                            window.location = '/login';
                        },
                    });
                }
            }
        } else {
            toast.error(response?.data?.message || 'Xử lí tác vụ thất bại');
        }

        // Handle errors
        throw error.response?.data;
    },
);
export { defaultHeader };
export default axiosClient;
