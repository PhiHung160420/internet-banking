import { Box, Button, Card, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { actResetTransfer } from '~/store/action/transferAction';
import { handleMaskValue } from '~/utils/format';
import TransferAccountInfo from '../TransferAccountInfo';

function TransferCheck({ setStep }) {
    const { transfer, account_info } = useSelector((state) => state.transferReducer);
    const { authInfo } = useSelector((state) => state.authReducer);

    const handleSubmitCheck = () => {
        setStep(3);
    };

    const dispatch = useDispatch();
    return (
        <Stack flexDirection={'row'}>
            <Box flex={1} textAlign="center">
                <Typography variant="h5">SỐ TIỀN GIAO DỊCH</Typography>
                <Typography variant="h5">{handleMaskValue(transfer.amount)} VND</Typography>
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
