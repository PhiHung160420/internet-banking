import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, ROLE_KEY } from '~/constant';

export const clearStorage = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
};
