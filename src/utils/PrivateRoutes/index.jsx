import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { routesConfig } from '~/config/routesConfig';
import { IS_LOGIN } from '~/constant';

function PrivateRoutes() {
    return IS_LOGIN ? <Outlet /> : <Navigate to={routesConfig.login} />;
}

export default PrivateRoutes;
