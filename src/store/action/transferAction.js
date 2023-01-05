import { GET_ACCOUNT_INFO, SUBMIT_TRANSFER } from '../type/transfer';

export const actSubmitTransfer = (data) => ({
    type: SUBMIT_TRANSFER,
    payload: data,
});

export const actGetAccountInfo = (data) => ({
    type: GET_ACCOUNT_INFO,
    payload: data,
});

export const actResetTransfer = () => ({
    type: GET_ACCOUNT_INFO,
    payload: {},
});
