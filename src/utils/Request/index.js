import axios from 'axios';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN_KEY, API_SERVER_URL } from '~/constant';

export const errorHandler = (error) => {
    const { response } = error;
    toast.error(response?.data?.message || 'Xử lí tác vụ thất bại');
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
