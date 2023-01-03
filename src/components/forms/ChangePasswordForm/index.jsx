import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, IconButton, InputAdornment, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '~/components/modules/form/InputField';
import * as yup from 'yup';
import Iconify from '~/components/iconify';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { authAPI } from '~/api/authAPI';

const schema = yup.object().shape({
    oldPassword: yup
        .string()
        .required('Mật khẩu cũ không được bỏ trống')
        .min(6, 'Mật khẩu cũ không được bỏ trống và có ít nhất 6 kí tự'),
    newPassword: yup
        .string()
        .required('Mật khẩu mới không được bỏ trống')
        .min(6, 'Mật khẩu mới không được bỏ trống và có ít nhất 6 kí tự'),

    confirmPassword: yup
        .string()
        .required('Mật khẩu nhập lại không được bỏ trống')
        .oneOf([yup.ref('newPassword')], 'Mật khẩu nhập lại không chính xác'),
});

function ChangePasswordForm({closeModal}) {
    const { control, handleSubmit } = useForm({
        defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' },
        resolver: yupResolver(schema),
    });
    const [showPw, setShowPw] = useState({
        oldPw: false,
        newPw: false,
        confirmPw: false,
    });

    const [loading, setLoading] = useState(false);

    const handleTriggerShowPw = (key) => {
        setShowPw((prev) => ({
            ...prev,
            [key]: !showPw?.[key],
        }));
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await authAPI.changePassword(data);
            toast.success('Đổi mật khẩu thành công');
            setLoading(false);
            closeModal()
        } catch (error) {
            toast.error(error?.message || 'Đổi mật khẩu thất bại');
            setLoading(false);
        }
    };
    return (
        <Stack my={2} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                    <InputField
                        fullWidth
                        label="Mật khẩu cũ"
                        name="oldPassword"
                        control={control}
                        variant="outlined"
                        type={showPw.oldPw ? 'text' : 'password'}
                        inputProps={{
                            autocomplete: 'new-password',
                            form: {
                                autocomplete: 'off',
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => handleTriggerShowPw('oldPw')} edge="end">
                                        <Iconify icon={showPw.oldPw ? 'eva:eye-off-fill' : 'eva:eye-fill'} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <InputField
                        fullWidth
                        label="Mật khẩu mới"
                        name="newPassword"
                        control={control}
                        variant="outlined"
                        type={showPw.newPw ? 'text' : 'password'}
                        inputProps={{
                            autocomplete: 'new-confirmPassword',
                            form: {
                                autocomplete: 'off',
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => handleTriggerShowPw('newPw')} edge="end">
                                        <Iconify icon={showPw.newPw ? 'eva:eye-off-fill' : 'eva:eye-fill'} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <InputField
                        fullWidth
                        label="Xác nhận mật khẩu mới"
                        name="confirmPassword"
                        control={control}
                        variant="outlined"
                        type={showPw.confirmPw ? 'text' : 'password'}
                        inputProps={{
                            autocomplete: 'new-confirmPassword',
                            form: {
                                autocomplete: 'off',
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => handleTriggerShowPw('confirmPw')} edge="end">
                                        <Iconify icon={showPw.confirmPw ? 'eva:eye-off-fill' : 'eva:eye-fill'} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>
            <LoadingButton loading={loading} sx={{ mt: 2 }} color="primary" variant="contained" type="submit">
                Lưu
            </LoadingButton>
        </Stack>
    );
}

export default ChangePasswordForm;
