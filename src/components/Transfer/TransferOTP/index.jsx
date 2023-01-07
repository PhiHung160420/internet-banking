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
