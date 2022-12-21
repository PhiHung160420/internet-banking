import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// mock
import account from '../../../_mock/account';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
import { navAdmin, navCustomer, navEmployee } from './config';
import { ROLE_ADMIN, ROLE_EMPLOYEE, ROLE_KEY } from '~/constant';

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

Nav.propTypes = {
    openNav: PropTypes.bool,
    onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
    const { pathname } = useLocation();
    const isDesktop = useResponsive('up', 'lg');
    const currentRole = localStorage.getItem(ROLE_KEY);

    useEffect(() => {
        if (openNav) {
            onCloseNav();
        }
    }, [pathname]);

    const renderContent = (
        <Scrollbar
            sx={{
                height: 1,
            }}
        >
            <Box sx={{ px: 2, py: 2, display: 'inline-flex' }}>
                {currentRole === ROLE_ADMIN ? (
                    <Typography variant="h5" gutterBottom style={{ color: '#08ACCD' }}>
                        Admin Dashboard
                    </Typography>
                ) : currentRole === ROLE_EMPLOYEE ? (
                    <Typography variant="h5" gutterBottom style={{ color: '#08ACCD' }}>
                        Teller Dashboard
                    </Typography>
                ) : null}
            </Box>

            <Box sx={{ mb: 5, mx: 2.5 }}>
                <Link underline="none">
                    <StyledAccount>
                        <Avatar src={account.photoURL} alt="photoURL" />

                        <Box sx={{ ml: 2 }}>
                            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                                {account.displayName}
                            </Typography>

                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {currentRole === ROLE_ADMIN
                                    ? 'Admin'
                                    : currentRole === ROLE_EMPLOYEE
                                    ? 'Giao dịch viên'
                                    : 'Khách hàng'}
                            </Typography>
                        </Box>
                    </StyledAccount>
                </Link>
            </Box>

            <NavSection
                data={currentRole === ROLE_ADMIN ? navAdmin : currentRole === ROLE_EMPLOYEE ? navEmployee : navCustomer}
            />

            <Box sx={{ flexGrow: 1 }} />
        </Scrollbar>
    );

    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV_WIDTH },
            }}
        >
            {isDesktop ? (
                <Drawer
                    open
                    variant="permanent"
                    PaperProps={{
                        sx: {
                            width: NAV_WIDTH,
                            bgcolor: 'background.default',
                            borderRightStyle: 'dashed',
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            ) : (
                <Drawer
                    open={openNav}
                    onClose={onCloseNav}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    PaperProps={{
                        sx: { width: NAV_WIDTH },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </Box>
    );
}
