import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { transactionAPI } from '~/api/transactionAPI';
import InputField from '~/components/modules/form/InputField';
import { handleMaskValue, handleParseMask } from '~/utils/format';
import { validateEmail } from '~/utils/util';

export default function EmployeeRechargeMoney() {
    const location = useLocation();

    const dataUser = location?.state?.dataUser;

    const [accountInfo, setAccountInfo] = useState('ACCOUNT_NUMBER');

    const { control, handleSubmit, setError, reset } = useForm({
        defaultValues: useMemo(() => {
            return {
                account: dataUser?.accountNumber || '',
            };
        }, [dataUser]),
    });

    useEffect(() => {
        if (dataUser) {
            reset({
                account: accountInfo === 'ACCOUNT_NUMBER' ? dataUser?.accountNumber + '' : dataUser?.email,
            });
        }
    }, [accountInfo, dataUser]);

    const onChangeAmount = (event, onChange) => {
        let temp = handleMaskValue(event.target.value);
        onChange(temp);
    };

    const onSubmit = async (value) => {
        try {
            const { account, money, content } = value;
            if (accountInfo === 'ACCOUNT_NUMBER' && !/^[0-9]+$/.test(account)) {
                return setError('account', { message: 'Số tài khoản chỉ chứa kí tự số' });
            }

            if (accountInfo === 'ACCOUNT' && !validateEmail(account)) {
                return setError('account', { message: 'Email sai định dạng' });
            }

            const transactionData = {
                email: accountInfo === 'ACCOUNT_NUMBER' ? '' : account,
                recipientAccountNumber: accountInfo === 'ACCOUNT' ? 0 : account,
                amount: handleParseMask(money),
                content: content,
                type: 'DEPOSIT',
            };

            if (accountInfo === 'ACCOUNT_NUMBER') {
                delete transactionData.email;
            } else {
                delete transactionData.recipientAccountNumber;
            }

            const result = await transactionAPI.create(transactionData);

            if (result?.status === 'DONE') {
                return toast.success('Nạp tiền vào tài khoản thành công');
            }

            return toast.error('Nạp tiền thất bại');
        } catch (error) {
            return toast.error(error?.message || 'Nạp tiền thất bại');
        }
    };

    return (
        <Card>
            <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
                <CardHeader title="Thông tin nạp tiền" />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Thông tin tài khoản</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                    row={true}
                                    value={accountInfo}
                                    onChange={(event, value) => setAccountInfo(value)}
                                >
                                    <FormControlLabel value="ACCOUNT_NUMBER" control={<Radio />} label="Số tài khoản" />
                                    <FormControlLabel value="ACCOUNT" control={<Radio />} label="Email" />
                                </RadioGroup>
                            </FormControl>
                            <InputField
                                fullWidth
                                label={accountInfo === 'ACCOUNT_NUMBER' ? 'Số tài khoản' : 'Email'}
                                name="account"
                                control={control}
                                variant="outlined"
                                inputProps={{
                                    autocomplete: 'new-account',
                                    form: {
                                        autocomplete: 'off',
                                    },
                                }}
                                rules={{ required: 'Thông tin tài khoản không được bỏ trống' }}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <InputField
                                type={'text'}
                                fullWidth
                                label="Số tiền"
                                name="money"
                                control={control}
                                variant="outlined"
                                customOnChange={onChangeAmount}
                                rules={{
                                    required: 'Số tiền không được bỏ trống',
                                    validate: {
                                        min: (value) => {
                                            return handleParseMask(value) > 10000 || 'Số tiền nạp tối thiểu là 10.000đ';
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <InputField
                                fullWidth
                                label="Nội dung chuyển tiền"
                                name="content"
                                control={control}
                                variant="outlined"
                                inputProps={{
                                    autocomplete: 'new-content',
                                    form: {
                                        autocomplete: 'off',
                                    },
                                }}
                                rules={{ required: 'Nội dung không được bỏ trống' }}
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
}
