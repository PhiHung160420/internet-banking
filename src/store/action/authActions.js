import { GET_AUTH_INFO } from '../type/auth';

export const actGetAuthInfo = (data) => ({
    type: GET_AUTH_INFO,
    payload: data,
});
