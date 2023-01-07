import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, InputAdornment } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import accountAPI from '~/api/accountAPI';
import Iconify from '~/components/iconify';
import { REGEX_VNPHONE } from '~/constant';
import InputField from '../modules/form/InputField';

export const AccountProfileDetails = (props) => {
    const { user, setUserInfo, role, redirectUrl, isUpdate } = props;
    const schema = yup.object().shape({
        fullName: yup
            .string()
            .required('Họ tên không được bỏ trống')
            .min(10, 'Họ tên không được bỏ trống và có ít nhất 10 kí tự'),
        email: yup.string().email('Email sai định dạng').required('Email không được bỏ trống'),
        birthday: yup.string().required('Ngày sinh không được bỏ trống'),
        address: yup
            .string()
            .required('Địa chỉ không được bỏ trống')
            .min(4, 'Địa chỉ không được bỏ trống và có ít nhất 4 kí tự'),
        phoneNumber: yup
            .string()
            .matches(REGEX_VNPHONE, 'Số điên thoại sai định dạng')
            .required('Số điện thoại không được bỏ trống'),
        password: isUpdate
            ? undefined
            : yup
                  .string()
                  .required('Mật khẩu không được bỏ trống')
                  .min(6, 'Mật khẩu không được bỏ trống và có ít nhất 6 kí tự'),
        confirmPassword: isUpdate
            ? undefined
            : yup
                  .string()
                  .required('Mật khẩu nhập lại không được bỏ trống')
                  .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không chính xác'),
    });

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { control, handleSubmit, watch, setError } = useForm({
        defaultValues: user,
        resolver: yupResolver(schema),
    });

    const handleChange = (event) => {
        setUserInfo({
            [event.target.name]: event.target.value,
        });
    };

    const onSubmit = async (value) => {
        try {
            const { fullName, birthday, email, phoneNumber, address, password, confirmPassword } = value;

            if (password !== confirmPassword) {
                return setError('confirmPassword', { message: 'Mật khẩu nhập lại không chính xác' });
            }
            const dataRequest = {
                fullName,
                birthday,
                email,
                phoneNumber,
                address,
                password,
                roleCode: role,
            };
            let result;

            if (isUpdate) {
                result = await accountAPI.update(user?.userId, dataRequest);
            } else {
                result = await accountAPI.create(dataRequest);
            }
            if (result) {
                navigate(redirectUrl);
                let message = isUpdate ? 'Cập nhật tài khoản thành công' : 'Tạo tài khoản thành công';
                toast.success(message);
            }
        } catch (error) {
            let msgError = isUpdate ? 'Cập nhật tài khoản thất bại' : 'Tạo tài khoản thất bại';
            toast.error(error?.message || msgError);
        }
    };

    useEffect(() => {
        const subscription = watch((value, { name, type }) => (name === 'fullName' ? setUserInfo(value) : ''));
        return () => subscription.unsubscribe();
    }, [watch]);

    return (
        <Card>
            <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
                <CardHeader title="Thông tin chi tiết" />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                            <InputField
                                fullWidth
                                label="Họ tên"
                                name="fullName"
                                onChange={handleChange}
                                control={control}
                                value={user?.fullName}
                                variant="outlined"
                                inputProps={{
                                    autocomplete: 'new-fullname',
                                    form: {
                                        autocomplete: 'off',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <InputField
                                fullWidth
                                label="Ngày sinh"
                                name="birthday"
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                control={control}
                                value={user?.birthday}
                                variant="outlined"
                                type="date"
                                inputProps={{
                                    autocomplete: 'new-birthday',
                                    form: {
                                        autocomplete: 'off',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <InputField
                                fullWidth
                                label="Email"
                                name="email"
                                onChange={handleChange}
                                control={control}
                                value={user?.email}
                                variant="outlined"
                                inputProps={{
                                    autocomplete: 'new-email',
                                    form: {
                                        autocomplete: 'off',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <InputField
                                fullWidth
                                label="Số điện thoại"
                                name="phoneNumber"
                                onChange={handleChange}
                                value={user?.phoneNumber}
                                variant="outlined"
                                control={control}
                                inputProps={{
                                    autocomplete: 'new-phone',
                                    form: {
                                        autocomplete: 'off',
                                    },
                                    maxLength: 10,
                                }}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <InputField
                                fullWidth
                                label="Địa chỉ"
                                name="address"
                                onChange={handleChange}
                                control={control}
                                value={user.address}
                                variant="outlined"
                                inputProps={{
                                    autocomplete: 'new-address',
                                    form: {
                                        autocomplete: 'off',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <InputField
                                fullWidth
                                label="Mật khẩu"
                                name="password"
                                onChange={handleChange}
                                control={control}
                                value={user.password}
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
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <InputField
                                fullWidth
                                label="Nhập lại mật khẩu"
                                name="confirmPassword"
                                onChange={handleChange}
                                control={control}
                                value={user.confirmPassword}
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
                                                <Iconify
                                                    icon={showConfirmPassword ? 'eva:eye-off-fill' : 'eva:eye-fill'}
                                                />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2,
                    }}
                >
                    <Button color="primary" variant="contained" type="submit">
                        Lưu
                    </Button>
                </Box>
            </Box>
        </Card>
    );
};
