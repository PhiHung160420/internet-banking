import { GET_AUTH_INFO } from '../type/auth';

const initialState = {
    authInfo: {},
};

const AuthReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_AUTH_INFO:
            return { ...state, authInfo: payload };

        default:
            return state;
    }
};
export default AuthReducer;
