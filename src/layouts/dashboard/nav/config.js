// component
import { routesConfig } from '~/config/routesConfig';
import SvgColor from '../../../components/svg-color';
import { MdHistory, MdSwitchAccount, MdOutlineFormatListBulleted } from 'react-icons/md';
import { BiTransfer, BiNotification } from 'react-icons/bi';
import { BsCardList } from 'react-icons/bs';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

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
        path: '/dashboard/products',
        icon: <BiTransfer {...styledIcon} />,
    },
    {
        id: 'DebtManagement',
        title: 'Quản lý nợ',
        path: '/dashboard/blog',
        icon: <BsCardList {...styledIcon} />,
    },
    {
        id: 'DebtReminder',
        title: 'Quản lý nhắc nợ',
        path: '/login',
        icon: <BiNotification {...styledIcon} />,
    },
    {
        id: 'TransactionHistory',
        title: 'Lịch sử giao dịch',
        path: '/404',
        icon: <MdHistory {...styledIcon} />,
    },
];

const navAdmin = [];

export { navCustomer, navAdmin };
