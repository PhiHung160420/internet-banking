import { ROLE_ADMIN, ROLE_EMPLOYEE, ROLE_KEY } from '~/constant';

export const routesConfig = {
    // Public routes
    login: '/login',
    forgotPassword: '/forgot-password',

    // Private routes

    // Customer Page
    home: '/',
    customerBankAcc: '/bank-account',
    customerRecipientAcc: '/recipient-account',
    transfer: '/transfer',
    debtManagement: '/debt-management',
    debtReminder: '/debt-reminder',
    debtPayment: (id = ':debtId') => {
        return `/debt-payment/${id}`;
    },
    transaction: '/transaction',

    // Admin Page
    dashboard: '/admin/dashboard',
    employees: '/admin/employees',
    addEmployee: '/admin/employee/add',
    updateEmployee: '/admin/employee/update',
    transactionList: '/admin/transactions',

    // Employee Page
    employeeListCustomer: '/employee/list-customer',
    employeeAddCustomer: '/employee/add-customer',
    employeeRecharge: '/employee/recharge',
    employeeTransaction: '/employee/transaction',

    // Page Not Found
    PageNotFound: '/*',
};

export const DEFAULT_ROUTES =
    localStorage.getItem(ROLE_KEY) === ROLE_ADMIN
        ? routesConfig.dashboard
        : localStorage.getItem(ROLE_KEY) === ROLE_EMPLOYEE
        ? routesConfig.employeeListCustomer
        : routesConfig.customerBankAcc;
