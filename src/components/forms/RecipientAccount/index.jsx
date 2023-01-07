// @mui
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Checkbox, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '~/components/modules/form/InputField';
import { SUBMIT, UPDATE } from '~/constant';
// components

// ----------------------------------------------------------------------

export default function RecipientAccountForm({ dataForm, isUpdate, handleCreateRecipient, handleUpdateRecipient }) {
    const initValue = { account: '', account_name: '' };
    console.log(dataForm);
    const updateValue = {
        ...initValue,
        account: dataForm.recipientAccountNumber,
        account_name: dataForm.reminiscentName,
    };
    const [useReminderName, setUserReminderName] = useState(true);

    const schema = yup.object().shape({
        account: yup
            .string()
            .required('Số tài khoản không được bỏ trống')
            .matches(/^[0-9]+$/, 'Số tài khoản chỉ chứa kí tự số'),
        account_name: !useReminderName
            ? yup.string().required('Tên gợi nhớ không được bỏ trống').min(2, 'Tên gợi nhớ phải có ít nhất 2 kí tự')
            : undefined,
    });

    const { control, handleSubmit } = useForm({
        defaultValues: isUpdate ? updateValue : initValue,
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        const { account, account_name } = data;
        if (!isUpdate) {
            return handleCreateRecipient(account, account_name);
        }
        if (dataForm?.id) {
            handleUpdateRecipient(dataForm?.id, account, account_name);
        }
    };

    return (
        <Box my={2} component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <InputField name="account" label="Số tài khoản" control={control} />

                {!useReminderName || isUpdate ? (
                    <InputField control={control} name="account_name" label="Tên gợi nhớ" />
                ) : null}

                {!isUpdate ? (
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <Checkbox
                            checked={useReminderName}
                            onChange={(e) => setUserReminderName(e.target.checked)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Typography variant="subtitle1">Sử dụng tên đăng ký làm tên gợi nhớ</Typography>
                    </Box>
                ) : null}
            </Stack>

            <LoadingButton type="submit" sx={{ my: 2 }} fullWidth size="large" variant="contained">
                {isUpdate ? UPDATE : SUBMIT}
            </LoadingButton>
        </Box>
    );
}
