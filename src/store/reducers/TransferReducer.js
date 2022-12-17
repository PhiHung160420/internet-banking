import { GET_ACCOUNT_INFO, SUBMIT_TRANSFER } from '../type/transfer';

const initialState = {
    transfer: {},
    account_info: {},
};

const TransferReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SUBMIT_TRANSFER:
            return { ...state, transfer: payload };
        case GET_ACCOUNT_INFO:
            return { ...state, account_info: payload };
        default:
            return state;
    }
};

export default TransferReducer;
