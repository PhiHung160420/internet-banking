import React, { createContext, useState } from 'react';
import LoadingComponent from '~/components/Loading';

const LoadingContext = createContext();

function LoadingProvider({ children }) {
    const [loading, setLoading] = useState(false);

    const value = {
        loading: loading,
        showLoading: () => setLoading(true),
        hideLoading: () => setLoading(false),
    };

    return (
        <LoadingContext.Provider value={value}>
            <>
                {loading && <LoadingComponent />}
                {children}
            </>
        </LoadingContext.Provider>
    );
}

export { LoadingContext, LoadingProvider };
