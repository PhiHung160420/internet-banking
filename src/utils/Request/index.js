import axios from 'axios';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN_KEY, API_SERVER_URL, REFRESH_TOKEN_KEY } from '~/constant';
import { clearStorage } from '~/utils/storage';

export const errorHandler = (error) => {
    const { response, config } = error;
    const statusCode = response?.status;
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (statusCode === 401) {
        axios
            .post(`${API_SERVER_URL}/auth/token/refresh`, { refreshToken })
            .then((res) => {
                localStorage.setItem(ACCESS_TOKEN_KEY, res?.data?.accessToken);
                config.headers.Authorization = `Bearer ${res?.data?.accessToken}`;
                return axios(config);
                // window.location.reload();
            })
            .catch((error) => {
                const errorCode = error?.response?.status;
                if (errorCode === 400) {
                    clearStorage();
                    toast.error('Phiên làm việc hết hạn. Vui lòng đăng nhập lại!', {
                        onClose: () => {
                            window.location = '/login';
                        },
                    });
                }
            });
    } else {
        toast.error(response?.data?.message || 'Xử lí tác vụ thất bại');
    }
    return error;
};

export function request(initialRequest) {
    const options = {
        method: initialRequest.method,
        data: initialRequest.body,
    };

    const params = {
        ...initialRequest.params,
    };

    return axios(
        `${API_SERVER_URL}${initialRequest.url}${
            Object.keys(params)?.length > 0 ? `?${new URLSearchParams(params).toString()}` : ''
        }`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY) || ''}`,
                ...initialRequest.headers,
            },
            ...options,
        },
    )
        .then((response) => response)
        .catch((error) => errorHandler(error));
}
