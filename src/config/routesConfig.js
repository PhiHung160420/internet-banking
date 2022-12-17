import { IS_ADMIN } from '~/constant';

export const routesConfig = {
    // Public routes
    login: '/login',

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

    // Admin Page
    dashboard: '/admin/dashboard',
    customers: '/admin/customers',
    addCustomer: '/admin/customer/add',
    updateCustomer: '/admin/customer/update',
    transactionList: '/admin/transactions',

    // Page Not Found
    PageNotFound: '/*',
};

export const DEFAULT_ROUTES = IS_ADMIN ? routesConfig.dashboard : routesConfig.customerBankAcc;
