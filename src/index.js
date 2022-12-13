import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import reportWebVitals from './reportWebVitals';
import ThemeProvider from './theme';
import { ConfirmProvider } from 'material-ui-confirm';
import { confirmConfig, notistackConfig } from './config/configProvider';
import { SnackbarProvider } from 'notistack';

//Import Lib

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider>
                    <ConfirmProvider
                        defaultOptions={{
                            confirmationButtonProps: { autoFocus: true },
                            ...confirmConfig
                        }}
                    >
                        <SnackbarProvider {...notistackConfig}>
                            <App />
                        </SnackbarProvider>
                    </ConfirmProvider>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
