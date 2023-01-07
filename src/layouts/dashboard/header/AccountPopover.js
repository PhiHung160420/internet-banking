import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import account from '../../../_mock/account';
import { useNavigate } from 'react-router-dom';
import CustomModal from '~/components/CustomModal';
import ChangePasswordForm from '~/components/forms/ChangePasswordForm';
import { useDispatch, useSelector } from 'react-redux';
import { actGetAuthInfo } from '~/store/action/authActions';
import { clearStorage } from '~/utils/storage';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
    {
        label: 'Trang cá nhân',
        icon: 'eva:person-fill',
    },
    {
        label: 'Đổi mật khẩu',
        icon: 'eva:settings-2-fill',
        onClick: (openModal) => {
            openModal();
        },
    },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
    const [open, setOpen] = useState(null);
    const navigate = useNavigate();

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const { authInfo } = useSelector((state) => state.authReducer);

    const dispatch = useDispatch();
    const handleClose = () => {
        clearStorage();
        dispatch(actGetAuthInfo({}));
        navigate('/login', { replace: true });
        window.location.reload();
    };

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    return (
        <>
            <IconButton
                onClick={handleOpen}
                sx={{
                    p: 0,
                    ...(open && {
                        '&:before': {
                            zIndex: 1,
                            content: "''",
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            position: 'absolute',
                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                        },
                    }),
                }}
            >
                <Avatar src={account.photoURL} alt="photoURL" />
            </IconButton>

            <Popover
                open={Boolean(open)}
                onClose={() => setOpen(false)}
                anchorEl={open}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 0,
                        mt: 1.5,
                        ml: 0.75,
                        width: 180,
                        '& .MuiMenuItem-root': {
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle2" noWrap>
                        {authInfo?.fullName}
                    </Typography>
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Stack sx={{ p: 1 }}>
                    {MENU_OPTIONS.map((option) => (
                        <MenuItem onClick={() => option.onClick(handleOpenModal)} key={option.label}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <MenuItem onClick={handleClose} sx={{ m: 1 }}>
                    Đăng xuất
                </MenuItem>
            </Popover>

            <CustomModal title={'Đổi mật khẩu'} open={openModal} setOpen={(value) => setOpenModal(value)}>
                <ChangePasswordForm closeModal={() => setOpenModal(false)} />
            </CustomModal>
        </>
    );
}
