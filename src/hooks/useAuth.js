import { ROLE_EMPLOYEE, ROLE_KEY, ROLE_ADMIN } from '~/constant';

export const useAuth = () => {
    const IS_LOGIN = localStorage.getItem(ROLE_KEY) ? true : false;
    const IS_ADMIN = localStorage.getItem(ROLE_KEY) === ROLE_ADMIN ? true : false;
    const IS_EMPLOYEE = localStorage.getItem(ROLE_KEY) === ROLE_EMPLOYEE ? true : false;
    return { IS_LOGIN, IS_ADMIN, IS_EMPLOYEE };
};
