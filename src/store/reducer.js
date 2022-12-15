import { combineReducers } from 'redux';
import TransferReducer from './reducers/TransferReducer';

const rootReducer = combineReducers({
    //Reducer
    transferReducer: TransferReducer,
});

export { rootReducer };
