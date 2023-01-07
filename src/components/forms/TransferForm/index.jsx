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
import { handleMaskValue, handleParseMask } from '~/utils/format';
// components

// ----------------------------------------------------------------------

// const schema = yup.object().shape({
//     account: yup
//         .string()
//         .required('Vui lòng nhập tài khoản cần chuyển khoản')
//         .min(6, 'Tài khoản phải có ít nhất 6 kí tự'),
//     amount: yup
//         .number()
//         .required('Số tiền là bắt buộc')
//         .typeError('Số tiền cần chuyển phải là một số')
//         .min(10000, 'Số tiền thấp nhất là 10.000 VND'),
// });
export default function TransferForm({ selected, setStep }) {
    const dispatch = useDispatch();

    const { control, handleSubmit, watch, setValue } = useForm();
    const onSubmit = (data) => {
        dispatch(actSubmitTransfer(data));
        setStep(2);
    };

    const onChangeAmount = (event, onChange) => {
        let temp = handleMaskValue(event.target.value);
        onChange(temp);
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

                <AccountTransform
                    control={control}
                    name="account"
                    watch={watch}
                    setValueForm={setValue}
                    rules={{
                        required: 'Vui lòng nhập tài khoản cần chuyển khoản',
                        validate: {
                            min: (value) => {
                                return value?.length > 6 || 'Tài khoản phải có ít nhất 6 kí tự';
                            },
                        },
                    }}
                />

                <InputField
                    type={'text'}
                    name="amount"
                    label="Số tiền VNĐ"
                    control={control}
                    customOnChange={onChangeAmount}
                    rules={{
                        required: 'Số tiền không được bỏ trống',
                        validate: {
                            min: (value) => {
                                return handleParseMask(value) > 10000 || 'Số tiền cần chuyển tối thiểu là 10.000 VNĐ';
                            },
                        },
                    }}
                />

                <InputField
                    name="note"
                    label="Nội dung chuyển tiền"
                    multiline
                    rows={4}
                    control={control}
                    rules={{ required: 'Nội dung không được bỏ trống' }}
                />
            </Stack>

            <LoadingButton sx={{ my: 2 }} fullWidth size="large" type="submit" variant="contained">
                Tiếp tục
            </LoadingButton>
        </Box>
    );
}
