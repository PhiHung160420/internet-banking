import axios from 'axios';
import queryString from 'query-string';

const defaultHeader = {
    'Content-Type': 'application/json',
};
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: defaultHeader,
    paramsSerializer: (params) => queryString.stringify(params),
});

// axios.defaults.baseURL = process.env.REACT_APP_API;

axiosClient.interceptors.request.use(async (config) => {
    //   const employeeInfo = JSON.parse(localStorage.getItem("employeeInfo"));

    //   if (!!employeeInfo) {
    //     config.headers.Authorization = `Bearer ${employeeInfo.token}`;
    //   }

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
        //Kiểm tra nếu lỗi token thì trở về trang đâng nhập

        // Handle errors
        throw error.response?.data;
    },
);
export { defaultHeader };
export default axiosClient;
