// @mui
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, MenuItem, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import AccountTransform from '~/components/AccountTransform';
import InputField from '~/components/modules/form/InputField';
import SelectField from '~/components/modules/form/SelectField';
import { actSubmitTransfer } from '~/store/action/transferAction';
// components

// ----------------------------------------------------------------------

const schema = yup.object().shape({
    account: yup
        .string()
        .required('Vui lòng nhập tài khoản cần chuyển khoản')
        .min(6, 'Tài khoản phải có ít nhất 6 kí tự'),
    amount: yup
        .number()
        .required('Số tiền là bắt buộc')
        .typeError('Số tiền cần chuyển phải là một số')

        .min(10000, 'Số tiền thấp nhất là 10.000 VND'),
});
export default function TransferForm({ selected, setStep }) {
    const { authInfo } = useSelector((state) => state.authReducer);

    const dispatch = useDispatch();

    const { control, handleSubmit, watch, setValue } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        dispatch(actSubmitTransfer(data));
        setStep(2);
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

                <AccountTransform control={control} name="account" watch={watch} setValueForm={setValue} />

                <InputField name="amount" label="Số tiền VND" control={control} />

                <InputField name="note" label="Nội dung chuyển tiền" multiline rows={4} control={control} />
            </Stack>

            <LoadingButton sx={{ my: 2 }} fullWidth size="large" type="submit" variant="contained">
                Tiếp tục
            </LoadingButton>
        </Box>
    );
}
