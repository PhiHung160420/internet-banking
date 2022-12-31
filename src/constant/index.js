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
        value: 'TRANSACTION_RECEIVE_MONEY',
        title: 'Giao dịch nhận tiền',
    },
    {
        value: 'TRANSFER_TRANSACTION',
        title: 'Giao dịch chuyển khoản',
    },
    {
        value: 'TRANSACTION_REMINDER_DEBT',
        title: 'Giao dịch thanh toán nhắc nợ',
    },
];

export const REGEX_VNPHONE = /(03|05|02|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
export const API_SERVER_URL = 'http://8.219.120.205/internet-banking/api';
export const PLACEHOLDER_AVATAR = '/static/images/avatars/avatar_6.png';
export const RE_CAPCHA_SITEKEY = '6LciuJYjAAAAAKJ4gm2cS0BveAdBZ6rjIy05Z29d';
export const RE_CAPCHA_SECRET_KEY = '6LciuJYjAAAAAD23jVq_f5xor1DmDWKrpwwPC0Mh';
