import { useEffect, useState } from 'react';

import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import OtpInput from 'react-otp-input';
import { transactionAPI } from '~/api/transactionAPI';
import { useSelector } from 'react-redux';

function TransferOTP({ setStep }) {
    const [otpValue, setOtpValue] = useState();

    const handleChange = (otp) => {
        setOtpValue(otp);
    };

    const { transfer } = useSelector((state) => state.transferReducer);

    const { authInfo } = useSelector((state) => state.authReducer);
    console.log(authInfo);

    console.log(transfer);

    const transactionSubmit = async () => {
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
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        transactionSubmit();
    }, []);

    return (
        <Stack justifyContent={'center'} alignItems="center">
            <Stack textAlign={'center'}>
                <Typography variant="h6" my={2}>
                    Nhập mã OTP
                </Typography>
                <OtpInput
                    inputStyle={{
                        width: '40px',
                        height: '40px',
                        mr: 2,
                    }}
                    containerStyle={{
                        gap: 10,
                    }}
                    value={otpValue}
                    onChange={handleChange}
                    numInputs={6}
                />

                <Stack flexDirection={'row'} gap={2} my={2}>
                    <Button sx={{ flex: 2 }} variant="contained">
                        Xác thực
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default TransferOTP;
