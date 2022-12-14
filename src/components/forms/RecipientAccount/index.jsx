// @mui
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '~/components/modules/form/InputField';
import { SUBMIT, UPDATE } from '~/constant';
// components

// ----------------------------------------------------------------------

const schema = yup.object().shape({
    account: yup.string().required('Username is required').min(4, 'Username is required to have at least 4 characters'),
    account_name: yup
        .string()
        .required('Password is required')
        .min(6, 'Password is required to have at least 4 characters'),
});
export default function RecipientAccountForm({ dataForm, isUpdate }) {
    const initValue = { account: '', account_name: '' };
    const updateValue = {
        ...initValue,
        account: dataForm.name,
        account_name: dataForm.balance,
    };
    const { control, handleSubmit } = useForm({
        defaultValues: isUpdate ? updateValue : initValue,
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        console.log(data);
        alert(JSON.stringify(data));
    };

    return (
        <Box my={2} component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <InputField name="account" label="Số tài khoản" control={control} />
                <InputField control={control} name="account_name" label="Tên gợi nhớ" />
            </Stack>

            <LoadingButton type="submit" sx={{ my: 2 }} fullWidth size="large" variant="contained">
                {isUpdate ? UPDATE : SUBMIT}
            </LoadingButton>
        </Box>
    );
}
