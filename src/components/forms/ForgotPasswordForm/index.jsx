import { useState } from 'react';
// @mui
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '~/components/modules/form/InputField';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    email: yup.string().email('Email sai định dạng').required('Email không được bỏ trống'),
});
export default function ForgotPasswordForm() {
    const { control, handleSubmit } = useForm({
        defaultValues: { email: '', password: '' },
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
        } catch (error) {
            toast.error(error?.data?.message || 'Xử lí tác vụ thất bại');
        }
    };

    return (
        <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <InputField name="email" label={'Email'} placeholder="Nhập vào email" control={control} />
            </Stack>
            <div style={{ marginTop: '20px' }}>
                <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Xác nhận
                </LoadingButton>
            </div>
        </Box>
    );
}
