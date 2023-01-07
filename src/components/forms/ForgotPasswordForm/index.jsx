// @mui
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { authAPI } from '~/api/authAPI';
import InputField from '~/components/modules/form/InputField';
import { FORGOT_PW_STATE } from '~/constant';
import Iconify from '~/components/iconify';

export default function ForgotPasswordForm() {
    const [formState, setFormState] = useState(FORGOT_PW_STATE.SEND_EMAIL);
    const [otpValue, setOtpValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().email('Email sai định dạng').required('Email không được bỏ trống'),
        password:
            formState !== FORGOT_PW_STATE.ENTER_OTP
                ? undefined
                : yup
                      .string()
                      .required('Mật khẩu không được bỏ trống')
                      .min(6, 'Mật khẩu không được bỏ trống và có ít nhất 6 kí tự'),
        confirmPassword:
            formState !== FORGOT_PW_STATE.ENTER_OTP
                ? undefined
                : yup
                      .string()
                      .required('Mật khẩu nhập lại không được bỏ trống')
                      .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không chính xác'),
    });

    const { control, handleSubmit, getValues } = useForm({
        defaultValues: { email: '', password: '' },
        resolver: yupResolver(schema),
    });

    const sendOTP = async (email) => {
        try {
            const result = await authAPI.sendOtpForgotPw(email);
            if (result) {
                toast.success('Mã OTP đã được gửi đến Email');
                return setFormState(FORGOT_PW_STATE.ENTER_OTP);
            } else {
                toast.error(result?.message || 'Xử lí tác vụ thất bại');
            }
        } catch (error) {
            toast.error(error?.message || 'Gửi OTP thất bại');
        }
    };

    const onSubmit = async (data) => {
        try {
            const { email, password } = data;
            if (formState === FORGOT_PW_STATE.SEND_EMAIL) {
                await sendOTP(email);
            }

            if (formState === FORGOT_PW_STATE.ENTER_OTP) {
                const result = await authAPI.submitForgotPw(otpValue, { newPassword: password, email });
                if (result) {
                    toast.success('Đổi mật khẩu thành công');
                    return navigate('/login');
                } else {
                    toast.error(result?.message || 'Xử lí tác vụ thất bại');
                }
            }
        } catch (error) {
            toast.error(error?.message || 'Xử lí tác vụ thất bại');
        }
    };

    const displayField = () => {
        switch (formState) {
            case FORGOT_PW_STATE.SEND_EMAIL:
                return <InputField name="email" label={'Email'} placeholder="Nhập vào email" control={control} />;
            case FORGOT_PW_STATE.ENTER_OTP:
                return (
                    <>
                        <Typography variant="h6" my={2}>
                            Nhập mã OTP
                        </Typography>
                        <OtpInput
                            inputStyle={{
                                width: '40px',
                                height: '40px',
                                mr: 2,
                            }}
                            containerStyle={{
                                gap: 10,
                            }}
                            value={otpValue}
                            onChange={(value) => setOtpValue(value)}
                            name="otp"
                            numInputs={6}
                        />
                        <div
                            style={{ textAlign: 'right', color: '#2165D1', cursor: 'pointer' }}
                            onClick={() => sendOTP(getValues('email'))}
                        >
                            Gửi lại OTP
                        </div>
                        <InputField
                            fullWidth
                            label="Mật khẩu"
                            name="password"
                            control={control}
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            inputProps={{
                                autocomplete: 'new-password',
                                form: {
                                    autocomplete: 'off',
                                },
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            <Iconify icon={showPassword ? 'eva:eye-off-fill' : 'eva:eye-fill'} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <InputField
                            fullWidth
                            label="Nhập lại mật khẩu"
                            name="confirmPassword"
                            control={control}
                            variant="outlined"
                            type={showConfirmPassword ? 'text' : 'password'}
                            inputProps={{
                                autocomplete: 'new-confirmPassword',
                                form: {
                                    autocomplete: 'off',
                                },
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            edge="end"
                                        >
                                            <Iconify icon={showConfirmPassword ? 'eva:eye-off-fill' : 'eva:eye-fill'} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </>
                );
            default:
                break;
        }
    };
    return (
        <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>{displayField()}</Stack>
            <div style={{ marginTop: '20px' }}>
                <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Xác nhận
                </LoadingButton>
            </div>
        </Box>
    );
}
