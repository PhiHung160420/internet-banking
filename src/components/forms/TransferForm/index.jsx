import { useState } from 'react';
// @mui
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, MenuItem, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FaAddressBook } from 'react-icons/fa';
import * as yup from 'yup';
import InputField from '~/components/modules/form/InputField';
import SelectField from '~/components/modules/form/SelectField';
// components

// ----------------------------------------------------------------------

const schema = yup.object().shape({
    account: yup.string().required('Username is required').min(4, 'Username is required to have at least 4 characters'),
    amount: yup.string().required('Password is required').min(6, 'Password is required to have at least 4 characters'),
});
export default function TransferForm({ selected }) {
    const [showPassword, setShowPassword] = useState(false);

    const { control, handleSubmit } = useForm({
        defaultValues: { account: '', amount: '' },

        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    return (
        <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {selected === 'INTERBANK' && (
                    <SelectField name="bank_name" label="Ngân hàng" control={control}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </SelectField>
                )}
                <InputField
                    control={control}
                    name="account"
                    label="Số tài khoản"
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                <FaAddressBook fontSize={'18px'} />
                            </IconButton>
                        ),
                    }}
                />
                <InputField name="amount" label="Số tiền VND" control={control} />

                <InputField name="note" label="Nội dung chuyển tiền" multiline rows={4} control={control} />
            </Stack>

            <LoadingButton sx={{ my: 2 }} fullWidth size="large" type="submit" variant="contained">
                Chuyển khoản
            </LoadingButton>
        </Box>
    );
}
