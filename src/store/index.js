import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducer';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// ==============================|| REDUX - MAIN STORE ||============================== //

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Create store with thunk and persiter
const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(thunk)));

let persistor = persistStore(store);

export { store, persistor };
