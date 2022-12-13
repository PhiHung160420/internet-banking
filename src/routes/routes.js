import { routesConfig } from '~/config/routesConfig';
//Public Page
import LoginPage from '~/pages/LoginPage';
//Private Page
import HomePage from '~/pages/HomePage';
import AdminPage from '~/pages/AdminPage';
import BankAccountPage from '~/pages/client/BankAccountPage';
import RecipientAccount from '~/pages/client/RecipientAccountPage';

//layout = null mean EmptyLayout
//layout = undefined mean DefaultLayout
//All customize Layout is layout key
export const publicRoutes = [{ path: routesConfig.login, element: LoginPage, layout: null }];

export const privateRoutes = [
    { path: routesConfig.home, element: HomePage },
    { path: routesConfig.customerBankAcc, element: BankAccountPage },
    { path: routesConfig.customerRecipientAcc, element: RecipientAccount },
];

export const adminRoutes = [{ path: routesConfig.dashboard, element: AdminPage }];
