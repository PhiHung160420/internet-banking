// @mui
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Stack } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { authAPI } from '~/api/authAPI';
import InputField from '~/components/modules/form/InputField';
import { FORGOT_PW_STATE } from '~/constant';

export default function ForgotPasswordForm() {
    const [formState, setFormState] = useState(FORGOT_PW_STATE.SEND_EMAIL);

    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().email('Email sai định dạng').required('Email không được bỏ trống'),
        otp: formState !== FORGOT_PW_STATE.ENTER_OTP ? undefined : yup.string().required('OTP không được bỏ trống'),
        password:
            formState !== FORGOT_PW_STATE.ENTER_NEW_PASSWORD
                ? undefined
                : yup
                      .string()
                      .required('Mật khẩu không được bỏ trống')
                      .min(6, 'Mật khẩu không được bỏ trống và có ít nhất 6 kí tự'),
        confirmPassword:
            formState !== FORGOT_PW_STATE.ENTER_NEW_PASSWORD
                ? undefined
                : yup
                      .string()
                      .required('Mật khẩu nhập lại không được bỏ trống')
                      .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không chính xác'),
    });

    const { control, handleSubmit } = useForm({
        defaultValues: { email: '', password: '' },
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const {email, otp, password, confirmPassword} = data

            if (formState === FORGOT_PW_STATE.SEND_EMAIL) {
                const result = await authAPI.sendOtpForgotPw(email)
                console.log('result >>> ', result);
            }
        } catch (error) {
            toast.error(error?.data?.message || 'Xử lí tác vụ thất bại');
        }
    };

    return (
        <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <InputField name="email" label={'Email'} placeholder="Nhập vào email" control={control} />
                {formState === FORGOT_PW_STATE.ENTER_OTP ? (
                    <InputField name="otp" label={'OTP'} placeholder="Nhập vào OTP" control={control} />
                ) : (
                    ''
                )}
            </Stack>
            <div style={{ marginTop: '20px' }}>
                <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Xác nhận
                </LoadingButton>
            </div>
        </Box>
    );
}
