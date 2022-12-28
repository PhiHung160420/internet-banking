// component
import { routesConfig } from '~/config/routesConfig';
import { MdHistory, MdSwitchAccount, MdOutlineFormatListBulleted } from 'react-icons/md';
import { BiTransfer, BiNotification } from 'react-icons/bi';
import { BsCardList } from 'react-icons/bs';
import { RxDashboard } from 'react-icons/rx';
import { FiUsers } from 'react-icons/fi';
import { RiExchangeBoxLine } from 'react-icons/ri';

const styledIcon = {
    size: '22px',
};

const navCustomer = [
    {
        id: 'AccoutList',
        title: 'Danh sách tài khoản',
        path: routesConfig.customerBankAcc,
        icon: <MdOutlineFormatListBulleted {...styledIcon} />,
    },
    {
        id: 'BankAccount',
        title: 'Tài khoản người nhận',
        path: routesConfig.customerRecipientAcc,
        icon: <MdSwitchAccount {...styledIcon} />,
    },
    {
        id: 'Transfer',
        title: 'Chuyển khoản',
        path: routesConfig.transfer,
        icon: <BiTransfer {...styledIcon} />,
    },
    {
        id: 'DebtManagement',
        title: 'Quản lý nợ',
        path: routesConfig.debtManagement,
        icon: <BsCardList {...styledIcon} />,
    },
    {
        id: 'DebtReminder',
        title: 'Quản lý nhắc nợ',
        path: routesConfig.debtReminder,
        icon: <BiNotification {...styledIcon} />,
    },
    {
        id: 'TransactionHistory',
        title: 'Lịch sử giao dịch',
        path: '/transaction',
        icon: <MdHistory {...styledIcon} />,
    },
];

const navAdmin = [
    {
        id: 'Dashboard',
        title: 'Tổng quan',
        path: routesConfig.dashboard,
        icon: <RxDashboard {...styledIcon} />,
    },
    {
        id: 'Customers',
        title: 'Danh sách nhân viên',
        path: routesConfig.customers,
        icon: <FiUsers {...styledIcon} />,
    },
    {
        id: 'Dashboard',
        title: 'Danh sách giao dịch',
        path: routesConfig.transactionList,
        icon: <RiExchangeBoxLine {...styledIcon} />,
    },
];

const navEmployee = [
    {
        id: 'Customers',
        title: 'Danh sách khách hàng',
        path: routesConfig.employeeListCustomer,
        icon: <FiUsers {...styledIcon} />,
    },
    {
        id: 'Recharge',
        title: 'Nạp tiền tài khoản',
        path: routesConfig.employeeTrasaction,
        icon: <RiExchangeBoxLine {...styledIcon} />,
    },
    {
        id: 'TransactionHistory',
        title: 'Lịch sử giao dịch',
        path: routesConfig.employeeRecharge,
        icon: <MdHistory {...styledIcon} />,
    },
];

export { navCustomer, navAdmin, navEmployee };
