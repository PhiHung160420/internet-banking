import { combineReducers } from 'redux';
import AuthReducer from './reducers/AuthReducer';
import TransferReducer from './reducers/TransferReducer';

const rootReducer = combineReducers({
    //Reducer
    transferReducer: TransferReducer,
    authReducer: AuthReducer,
});

export { rootReducer };
