import { useState } from 'react';
// @mui
import { Link, Stack, IconButton, InputAdornment, Checkbox, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '~/components/iconify';
import InputField from '~/components/modules/form/InputField';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// components

// ----------------------------------------------------------------------

const schema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required')
        .min(4, 'Username is required to have at least 4 characters'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password is required to have at least 4 characters'),
});
export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const { control, handleSubmit } = useForm({
        defaultValues: { username: '', password: '' },

        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    return (
        <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <InputField name="username" label="Username" control={control} />

                <InputField
                    control={control}
                    name="password"
                    label="Password"
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
                <Checkbox name="remember" label="Remember me" />
                <Link variant="subtitle2" underline="hover">
                    Forgot password?
                </Link>
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained">
                Login
            </LoadingButton>
        </Box>
    );
}
