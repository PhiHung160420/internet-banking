import { routesConfig } from '~/config/routesConfig';
// Public Page
import LoginPage from '~/pages/LoginPage';
// Private Page
import HomePage from '~/pages/HomePage';
import AdminPage from '~/pages/AdminPage';
import BankAccountPage from '~/pages/Client/BankAccountPage';
import RecipientAccount from '~/pages/Client/RecipientAccountPage';
import ListCustomer from '~/pages/admin/ListCustomerPage';
import AddCustomer from '~/pages/admin/AddCustomerPage';
import UpdateCustomer from '~/pages/admin/UpdateCustomerPage';
import ListTransaction from '~/pages/admin/ListTransactionPage';

// Layout = null mean EmptyLayout
// Layout = undefined mean DefaultLayout
// All customize Layout is layout key
export const publicRoutes = [{ path: routesConfig.login, element: LoginPage, layout: null }];

export const privateRoutes = [
    { path: routesConfig.home, element: HomePage },
    { path: routesConfig.customerBankAcc, element: BankAccountPage },
    { path: routesConfig.customerRecipientAcc, element: RecipientAccount },
];

export const adminRoutes = [
    { path: routesConfig.dashboard, element: AdminPage },
    { path: routesConfig.customers, element: ListCustomer },
    { path: routesConfig.addCustomer, element: AddCustomer },
    { path: routesConfig.updateCustomer, element: UpdateCustomer },
    { path: routesConfig.transactionList, element: ListTransaction },
];
