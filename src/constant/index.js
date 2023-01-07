import moment from 'moment';

export * from './text';
export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';
export const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN_KEY';
export const ROLE_KEY = 'ROLE_KEY';
export const ROLE_EMPLOYEE = 'ROLE_EMPLOYEE';
export const ROLE_CUSTOMER = 'ROLE_CUSTOMER';
export const ROLE_ADMIN = 'ROLE_ADMIN';

// export const IS_LOGIN = localStorage.getItem(ROLE_KEY) ? true : false;
// export const IS_ADMIN = localStorage.getItem(ROLE_KEY) === ROLE_ADMIN ? true : false;
// export const IS_EMPLOYEE = localStorage.getItem(ROLE_KEY) === ROLE_EMPLOYEE ? true : false;

export const TRANSACTION_LIST = [
    {
        value: 'DEPOSIT',
        title: 'Giao dịch nhận tiền',
    },
    {
        value: 'TRANSFER',
        title: 'Giao dịch chuyển khoản',
    },
    {
        value: 'TRANSFER',
        title: 'Giao dịch thanh toán nhắc nợ',
    },
];

export const DATE_FILTER_LIST = [
    {
        start_from: moment().utc().startOf('day').valueOf(),
        end_from: moment().utc().endOf('day').valueOf(),
        title: 'Hôm nay',
    },
    {
        start_from: moment().utc().subtract(1, 'days').startOf('day').valueOf(),
        end_from: moment().utc().subtract(1, 'days').endOf('day').valueOf(),
        title: 'Hôm qua',
    },
    {
        start_from: moment().utc().subtract(7, 'days').startOf('day').valueOf(),
        end_from: moment().utc().endOf('day').valueOf(),
        title: '7 ngày qua',
    },
    {
        start_from: moment().utc().subtract(30, 'days').startOf('day').valueOf(),
        end_from: moment().utc().endOf('day').valueOf(),
        title: '30 ngày qua',
    },
];

export const REGEX_VNPHONE = /(03|05|02|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
export const API_SERVER_URL = 'http://8.219.120.205/internet-banking/api';
export const PLACEHOLDER_AVATAR = '/static/images/avatars/avatar_6.png';
export const RE_CAPCHA_SITEKEY = '6LciuJYjAAAAAKJ4gm2cS0BveAdBZ6rjIy05Z29d';
export const RE_CAPCHA_SECRET_KEY = '6LciuJYjAAAAAD23jVq_f5xor1DmDWKrpwwPC0Mh';
export const FORGOT_PW_STATE = {
    SEND_EMAIL: 'SEND_EMAIL',
    ENTER_OTP: 'ENTER_OTP',
    ENTER_NEW_PASSWORD: 'ENTER_NEW_PASSWORD',
};
export const FORMAT_NUMBER = new Intl.NumberFormat();
