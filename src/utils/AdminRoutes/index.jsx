import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { IS_ADMIN, IS_LOGIN } from '~/constant';

function AdminRoutes() {
    return IS_ADMIN ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoutes;
