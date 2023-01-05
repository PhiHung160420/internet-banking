import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducer';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AuthReducer from './reducers/AuthReducer';
import createTransform from 'redux-persist/es/createTransform';

// ==============================|| REDUX - MAIN STORE ||============================== //

const SetTransform = createTransform(
    // transform state trước khi nó được serialize và lưu
    (inboundState, key) => {
        // convert mySet thành một mảng.
        return { ...inboundState, mySet: [...inboundState.mySet] };
    },

    // transform state đang được phục hồi
    (outboundState, key) => {
        // convert mySet trở lại thành Set.
        return { ...outboundState, mySet: new Set(outboundState.mySet) };
    },

    // định nghĩa reducer nào sẽ áp dụng transform này.
    { whitelist: ['authReducer'], blacklist: ['transferReducer'] },
);

const persistConfig = {
    key: 'root',
    storage,
    transforms: [SetTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Create store with thunk and persiter
const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(thunk)));

let persistor = persistStore(store);

export { store, persistor };
