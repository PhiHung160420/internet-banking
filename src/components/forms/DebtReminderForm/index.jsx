// @mui
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Stack } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { debtRemindersAPI } from '~/api/debtReminderAPI';
import { recipientAPI } from '~/api/recipientAPI';
import AccountTransform from '~/components/AccountTransform';
import InputField from '~/components/modules/form/InputField';
import { SUBMIT, UPDATE } from '~/constant';
import { actGetAccountInfo } from '~/store/action/transferAction';
// components

// ----------------------------------------------------------------------

const schema = yup.object().shape({
    account: yup
        .string()
        .required('Số tài khoản không được bỏ trống')
        .matches(/^[0-9]+$/, 'Số tài khoản chỉ chứa kí tự số'),
    amount: yup
        .number()
        .required('Số tiền là bắt buộc')
        .typeError('Số tiền cần chuyển phải là một số')
        .min(10000, 'Số tiền thấp nhất là 10.000 VND'),
});

export default function DebtReminderForm({ dataForm, isUpdate, openModal, handleCloseModal, handleLoadData }) {
    const initValue = { account: '', account_name: '' };
    const updateValue = {
        ...initValue,
        account: dataForm.name,
    };
    const { control, handleSubmit, watch, setValue } = useForm({
        defaultValues: isUpdate ? updateValue : initValue,
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const { account, amount, note } = data;
            const submitData = {
                amount,
                content: note || '',
                debtAccountNumber: account,
            };
            const result = await debtRemindersAPI.create(submitData);
            if (result?.id) {
                handleCloseModal();
                handleLoadData?.()
                return toast.success('Tạo nhắc nợ thành công');
            }
            return toast.error('Tạo nhắc nợ thất bại');
        } catch (error) {
            return toast.error('Tạo nhắc nợ thất bại');
        }
    };

    const dispatch = useDispatch();

    useEffect(() => {
        if (!openModal) {
            dispatch(actGetAccountInfo({}));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openModal]);

    return (
        <Box my={2} component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <AccountTransform
                    isUpdate={isUpdate}
                    openModal={openModal}
                    control={control}
                    name="account"
                    watch={watch}
                    setValueForm={(name, account) => {
                        setValue('account', account);
                        setValue('account_name', name);
                    }}
                />

                <InputField name="amount" label="Số tiền VND" control={control} />

                <InputField name="note" label="Nội dung nhắc nợ" multiline rows={4} control={control} />
            </Stack>

            <LoadingButton sx={{ my: 2 }} fullWidth size="large" type="submit" variant="contained">
                {isUpdate ? UPDATE : SUBMIT}
            </LoadingButton>
        </Box>
    );
}
