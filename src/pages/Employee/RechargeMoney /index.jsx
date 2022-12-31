import { yupResolver } from '@hookform/resolvers/yup';
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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { transactionAPI } from '~/api/transactionAPI';
import InputField from '~/components/modules/form/InputField';
import { validateEmail } from '~/utils/util';

const schema = yup.object().shape({
    account: yup.string().required('Thông tin tài khoản không được bỏ trống'),
    money: yup.number().required('Số tiền không được bỏ trống').min(10000, 'Số tiền phải lớn hơn 10.000vnđ'),
    content: yup.string().required('Nội dung không được bỏ trống'),
});

export default function EmployeeRechargeMoney() {
    const [accountInfo, setAccountInfo] = useState('ACCOUNT_NUMBER');
    const { control, handleSubmit, watch, setError } = useForm({
        defaultValues: {},
        resolver: yupResolver(schema),
    });

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
                amount: money,
                content: content,
                type: 'DEPOSIT',
            };

            if (accountInfo === 'ACCOUNT_NUMBER') {
                delete transactionData.email;
            } else {
                delete transactionData.recipientAccountNumber;
            }

            const result = await transactionAPI.create(transactionData);

            console.log('result: ', result);

            if (result?.status === 'DONE') {
                return toast.success('Nạp tiền vào tài khoản thành công');
            }

            return toast.error('Nạp tiền thất bại');
        } catch (error) {
            return toast.error('Nạp tiền thất bại hoặc sai thông tin tài khoản');
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
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <InputField
                                type={'number'}
                                fullWidth
                                label="Số tiền"
                                name="money"
                                control={control}
                                variant="outlined"
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
