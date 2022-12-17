export * from './text';

export const IS_LOGIN = true;
export const IS_ADMIN = false;

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
