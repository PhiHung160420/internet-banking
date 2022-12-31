import { routesConfig } from '~/config/routesConfig';
// Public Page
import LoginPage from '~/pages/LoginPage';
// Private Page
import AddEmployee from '~/pages/Admin/AddEmployeePage';
import ListEmployee from '~/pages/Admin/ListEmployeePage';
import ListTransaction from '~/pages/Admin/ListTransactionPage';
import UpdateEmployee from '~/pages/Admin/UpdateCustomerPage';
import AdminPage from '~/pages/AdminPage';
import BankAccountPage from '~/pages/Client/BankAccountPage';
import RecipientAccount from '~/pages/Client/RecipientAccountPage';
import TransferPage from '~/pages/Client/TransferPage';
import DebtReminderPage from '~/pages/Client/DebtReminderPage';
import DebtManagementPage from '~/pages/Client/DebtManagementPage';
import DebtPaymentPage from '~/pages/Client/DebtPaymentPage';
import TransactionPage from '~/pages/Client/TransactionPage';
import ForgotPasswordPage from '~/pages/ForgotPasswordPage';
import EmployeeListCustomer from '~/pages/Employee/ListCustomer';
import EmployeeAddCustomer from '~/pages/Employee/AddCustomer';
import EmployeeTransactionHistory from '~/pages/Employee/TransactionHistory';
import EmployeeRechargeMoney from '~/pages/Employee/RechargeMoney ';

// Layout = null mean EmptyLayout
// Layout = undefined mean DefaultLayout
// All customize Layout is layout key
export const publicRoutes = [
    { path: routesConfig.login, element: LoginPage, layout: null },
    { path: routesConfig.forgotPassword, element: ForgotPasswordPage, layout: null },
];

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
    { path: routesConfig.employees, element: ListEmployee },
    { path: routesConfig.addEmployee, element: AddEmployee },
    { path: routesConfig.updateEmployee, element: UpdateEmployee },
    { path: routesConfig.transactionList, element: ListTransaction },
];

export const employeeRoutes = [
    { path: routesConfig.employeeListCustomer, element: EmployeeListCustomer },
    { path: routesConfig.employeeAddCustomer, element: EmployeeAddCustomer },
    { path: routesConfig.employeeTransaction, element: EmployeeTransactionHistory },
    { path: routesConfig.employeeRecharge, element: EmployeeRechargeMoney },
];
