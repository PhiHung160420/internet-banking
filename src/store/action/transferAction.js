import { SUBMIT_TRANSFER } from '../type/transfer';

export const actSubmitTransfer = (data) => ({
    type: SUBMIT_TRANSFER,
    payload: data,
});
