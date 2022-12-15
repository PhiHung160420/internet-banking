import { SUBMIT_TRANSFER } from '../type/transfer';

const initialState = {
    transfer: {},
};

const TransferReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SUBMIT_TRANSFER:
            return { ...state, transfer: payload };

        default:
            return state;
    }
};

export default TransferReducer;
