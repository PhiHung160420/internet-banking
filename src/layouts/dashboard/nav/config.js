// component
import { routesConfig } from '~/config/routesConfig';
import SvgColor from '../../../components/svg-color';
import { RiBankCard2Line } from 'react-icons/ri';
import { MdOutlineAccountBalance } from 'react-icons/md';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const styledIcon = {
    size: '22px',
};

const navCustomer = [
    {
        id: 'BankAccount',
        title: 'Danh sách tài khoản',
        path: routesConfig.customerBankAcc,
        icon: <RiBankCard2Line {...styledIcon} />,
    },
    {
        id: 'BankAccount',

        title: 'Tài khoản người nhận',
        path: routesConfig.customerRecipientAcc,
        icon: <MdOutlineAccountBalance {...styledIcon} />,
    },
    {
        title: 'product',
        path: '/dashboard/products',
        icon: icon('ic_cart'),
    },
    {
        title: 'blog',
        path: '/dashboard/blog',
        icon: icon('ic_blog'),
    },
    {
        title: 'login',
        path: '/login',
        icon: icon('ic_lock'),
    },
    {
        title: 'Not found',
        path: '/404',
        icon: icon('ic_disabled'),
    },
];

const navAdmin = [];

export { navCustomer, navAdmin };
