import { Box, Button, Card, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useSelector } from 'react-redux';
import TransferAccountInfo from '../TransferAccountInfo';

function TransferCheck({ setStep }) {
    const { transfer } = useSelector((state) => state.transferReducer);

    const handleSubmitCheck = () => {
        setStep(3);
    };
    return (
        <Stack flexDirection={'row'}>
            <Box flex={1} textAlign="center">
                <Typography variant="h5">SỐ TIỀN GIAO DỊCH</Typography>
                <Typography variant="h5">{transfer.amount}</Typography>
            </Box>

            <Box flex={1} gap={1}>
                <Card>
                    <TransferAccountInfo
                        transfer={{
                            from: {
                                fullname: 'Phan Phi Hùng',
                                account: '22192-22-455-22',
                            },
                            to: {
                                fullname: 'Hy Quỳnh',
                                account: '242444-5255',
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
                    <Button sx={{ flex: 1 }} variant="outlined" onClick={() => setStep(1)}>
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
