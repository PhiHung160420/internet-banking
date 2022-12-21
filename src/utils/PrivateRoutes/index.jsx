import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { routesConfig } from '~/config/routesConfig';
import { ROLE_KEY } from '~/constant';

function PrivateRoutes() {
    const currRole = localStorage.getItem(ROLE_KEY);

    return currRole ? <Outlet /> : <Navigate to={routesConfig.login} />;
}

export default PrivateRoutes;
