import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { IS_ADMIN } from '~/constant';

function AdminRoutes() {
    return IS_ADMIN ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoutes;
