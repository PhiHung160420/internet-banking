import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROLE_EMPLOYEE, ROLE_KEY } from '~/constant';

function EmployeeRoutes() {
    const currRole = localStorage.getItem(ROLE_KEY);
    return currRole === ROLE_EMPLOYEE ? <Outlet /> : <Navigate to="/login" />;
}

export default EmployeeRoutes;
