import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROLE_ADMIN, ROLE_KEY } from '~/constant';

function AdminRoutes() {
    const currRole = localStorage.getItem(ROLE_KEY);
    return currRole === ROLE_ADMIN ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoutes;
