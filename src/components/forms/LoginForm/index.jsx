import { useState } from 'react';
// @mui
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, InputAdornment, Link, Stack } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import Iconify from '~/components/iconify';
import InputField from '~/components/modules/form/InputField';
import {
    ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY,
    RE_CAPCHA_SITEKEY,
    ROLE_ADMIN,
    ROLE_CUSTOMER,
    ROLE_EMPLOYEE,
    ROLE_KEY,
} from '~/constant';
import { routesConfig } from '~/config/routesConfig';
import { authAPI } from '~/api/authAPI';
import { useDispatch } from 'react-redux';
import { actGetAuthInfo } from '~/store/action/authActions';

const schema = yup.object().shape({
    email: yup.string().email('Email sai định dạng').required('Email không được bỏ trống'),
    password: yup.string().required('Mật khẩu không được bỏ trống').min(5, 'Mật khẩu cần ít nhất 5 kí tự'),
});
export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [capchaValue, setCapchaValue] = useState('');
    const { control, handleSubmit } = useForm({
        defaultValues: { email: '', password: '' },
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const getAccountInfo = async () => {
        try {
            const res = await authAPI.getInfo();
            dispatch(actGetAuthInfo(res));
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (!capchaValue) {
                return toast.error('Capcha không đúng');
            }
            const { email, password } = data;
            const res = await authAPI.login({ email, password });

            if (res) {
                localStorage.setItem(ACCESS_TOKEN_KEY, res?.accessToken);
                localStorage.setItem(REFRESH_TOKEN_KEY, res?.refreshToken);
                if (res?.role === ROLE_CUSTOMER) {
                    localStorage.setItem(ROLE_KEY, ROLE_CUSTOMER);
                    navigate(routesConfig.home);
                } else if (res?.role === ROLE_EMPLOYEE) {
                    localStorage.setItem(ROLE_KEY, ROLE_EMPLOYEE);
                    navigate(routesConfig.employeeListCustomer);
                } else if (res?.role === ROLE_ADMIN) {
                    localStorage.setItem(ROLE_KEY, ROLE_ADMIN);
                    navigate(routesConfig.employees);
                }
                await getAccountInfo();
                toast.success('Đăng nhập thành công');
            }
        } catch (error) {
            toast.error(error.message || 'Đăng nhập thất bại');
        }
    };

    function recapchaOnChange(value) {
        setCapchaValue(value);
    }

    return (
        <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <InputField name="email" label={'Email'} placeholder="Nhập vào email" control={control} />

                <InputField
                    label={'Mật khẩu'}
                    control={control}
                    name="password"
                    placeholder="Nhập vào mật khẩu"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                <Link variant="subtitle2" underline="hover" style={{ cursor: 'pointer' }} href="/forgot-password">
                    Quên mật khẩu?
                </Link>
            </Stack>

            <ReCAPTCHA hl="vi" sitekey={RE_CAPCHA_SITEKEY} onChange={recapchaOnChange} style={{ width: '100%' }} />
            <div style={{ marginTop: '20px' }}>
                <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Đăng nhập
                </LoadingButton>
            </div>
        </Box>
    );
}
