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
import { LoadingProvider } from './providers/LoadingProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider>
                    <ConfirmProvider
                        defaultOptions={{
                            confirmationButtonProps: { autoFocus: true },
                            ...confirmConfig,
                        }}
                    >
                        <SnackbarProvider {...notistackConfig}>
                            <LoadingProvider>
                                <App />
                            </LoadingProvider>
                        </SnackbarProvider>
                    </ConfirmProvider>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);

reportWebVitals();
