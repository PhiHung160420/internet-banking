import { routesConfig } from '~/config/routesConfig';
// Public Page
import LoginPage from '~/pages/LoginPage';
// Private Page
import HomePage from '~/pages/HomePage';
import AdminPage from '~/pages/AdminPage';
import BankAccountPage from '~/pages/Client/BankAccountPage';
import RecipientAccount from '~/pages/Client/RecipientAccountPage';
import ListCustomer from '~/pages/Admin/ListCustomerPage';
import AddCustomer from '~/pages/Admin/AddCustomerPage';
import UpdateCustomer from '~/pages/Admin/UpdateCustomerPage';
import ListTransaction from '~/pages/Admin/ListTransactionPage';
import TransferPage from '~/pages/Client/TransferPage';
import TransactionPage from '~/pages/Client/TransactionPage';

// Layout = null mean EmptyLayout
// Layout = undefined mean DefaultLayout
// All customize Layout is layout key
export const publicRoutes = [{ path: routesConfig.login, element: LoginPage, layout: null }];

export const privateRoutes = [
    { path: routesConfig.home, element: HomePage },
    { path: routesConfig.customerBankAcc, element: BankAccountPage },
    { path: routesConfig.customerRecipientAcc, element: RecipientAccount },
    { path: routesConfig.transaction, element: TransactionPage },
];

export const adminRoutes = [
    { path: routesConfig.dashboard, element: AdminPage },
    { path: routesConfig.customers, element: ListCustomer },
    { path: routesConfig.addCustomer, element: AddCustomer },
    { path: routesConfig.updateCustomer, element: UpdateCustomer },
    { path: routesConfig.transactionList, element: ListTransaction },
];
