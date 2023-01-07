import { Box, Button, Card, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { transactionAPI } from '~/api/transactionAPI';
import { actResetTransfer } from '~/store/action/transferAction';
import { handleMaskValue } from '~/utils/format';
import TransferAccountInfo from '../TransferAccountInfo';

function TransferCheck({ setStep }) {
    const { transfer, account_info } = useSelector((state) => state.transferReducer);
    const { authInfo } = useSelector((state) => state.authReducer);

    const handleSubmitCheck = async () => {
        const body = {
            email: authInfo.email,
            recipientAccountNumber: transfer.account,
            amount: transfer.amount,
            content: transfer.note,
            internal: true,
            type: 'TRANSFER',
        };
        try {
            const res = await transactionAPI.transfer(body);
            if (res) {
                toast.success('Mã OTP đã được gửi đến email');
                return setStep(3);
            }
            return toast.error(res?.message || 'Chuyển khoản thất bại');
        } catch (error) {
            toast.error(error?.message || 'Chuyển khoản thất bại');
        }
    };

    const dispatch = useDispatch();
    return (
        <Stack flexDirection={'row'}>
            <Box flex={1} textAlign="center">
                <Typography variant="h5">SỐ TIỀN GIAO DỊCH</Typography>
                <Typography variant="h5">{handleMaskValue(transfer.amount)} VNĐ</Typography>
            </Box>

            <Box flex={1} gap={1}>
                <Card>
                    <TransferAccountInfo
                        transfer={{
                            from: {
                                fullname: authInfo.fullName,
                                account: authInfo.accountNumber,
                            },
                            to: {
                                fullname: account_info.fullname,
                                account: transfer.account,
                            },
                        }}
                    />
                    <Divider variant="middle" />
                    <Box p={3}>
                        <Typography variant="body2">Nội dung chuyển tiền</Typography>
                        <Typography variant="h6">{transfer.note || ' '} </Typography>
                    </Box>
                    <Divider variant="middle" />

                    <Box p={3}>
                        <Typography variant="body2">Cách thức chuyển tiền</Typography>
                        <Typography variant="h6">Chuyển tiền nội bộ</Typography>
                    </Box>
                </Card>

                <Stack flexDirection={'row'} gap={2} my={2}>
                    <Button
                        sx={{ flex: 1 }}
                        variant="outlined"
                        onClick={() => {
                            setStep(1);
                            dispatch(actResetTransfer());
                        }}
                    >
                        Hủy bỏ
                    </Button>
                    <Button sx={{ flex: 2 }} variant="contained" onClick={handleSubmitCheck}>
                        Xác nhận giao dịch
                    </Button>
                </Stack>
            </Box>
        </Stack>
    );
}

export default TransferCheck;
