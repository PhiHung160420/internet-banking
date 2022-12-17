import { routesConfig } from '~/config/routesConfig';
// Public Page
import LoginPage from '~/pages/LoginPage';
// Private Page
import AddCustomer from '~/pages/admin/AddCustomerPage';
import ListCustomer from '~/pages/admin/ListCustomerPage';
import ListTransaction from '~/pages/admin/ListTransactionPage';
import UpdateCustomer from '~/pages/admin/UpdateCustomerPage';
import AdminPage from '~/pages/AdminPage';
import BankAccountPage from '~/pages/Client/BankAccountPage';
import RecipientAccount from '~/pages/Client/RecipientAccountPage';
import TransferPage from '~/pages/Client/TransferPage';
import DebtReminderPage from '~/pages/Client/DebtReminderPage';
import DebtManagementPage from '~/pages/Client/DebtManagementPage';
import DebtPaymentPage from '~/pages/Client/DebtPaymentPage';
import TransactionPage from '~/pages/Client/TransactionPage';

// Layout = null mean EmptyLayout
// Layout = undefined mean DefaultLayout
// All customize Layout is layout key
export const publicRoutes = [{ path: routesConfig.login, element: LoginPage, layout: null }];

export const privateRoutes = [
    // { path: routesConfig.home, element: HomePage },
    { path: routesConfig.customerBankAcc, element: BankAccountPage },
    { path: routesConfig.customerRecipientAcc, element: RecipientAccount },
    { path: routesConfig.transfer, element: TransferPage },
    { path: routesConfig.debtReminder, element: DebtReminderPage },
    { path: routesConfig.debtManagement, element: DebtManagementPage },
    { path: routesConfig.debtPayment(), element: DebtPaymentPage },
    { path: routesConfig.transaction, element: TransactionPage },
];

export const adminRoutes = [
    { path: routesConfig.dashboard, element: AdminPage },
    { path: routesConfig.customers, element: ListCustomer },
    { path: routesConfig.addCustomer, element: AddCustomer },
    { path: routesConfig.updateCustomer, element: UpdateCustomer },
    { path: routesConfig.transactionList, element: ListTransaction },
];
