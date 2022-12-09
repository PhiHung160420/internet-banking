import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { IS_LOGIN } from '~/constant';

function PrivateRoutes() {
    return IS_LOGIN ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
