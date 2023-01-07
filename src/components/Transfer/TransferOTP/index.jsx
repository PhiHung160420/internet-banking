import { useEffect, useState } from 'react';

import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import OtpInput from 'react-otp-input';
import { transactionAPI } from '~/api/transactionAPI';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import useGetInfo from '~/hooks/useGetInfo';
import OtpStepButton from '~/components/OtpStepButton';

function TransferOTP({ setStep }) {
    const [otpValue, setOtpValue] = useState();

    const handleChange = (otp) => {
        setOtpValue(otp);
    };

    const { transfer } = useSelector((state) => state.transferReducer);

    const { authInfo } = useSelector((state) => state.authReducer);

    const [loadingResend, setLoadingResend] = useState(false);

    const transactionSubmit = async () => {
        setLoadingResend(true);
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
            setLoadingResend(false);
        } catch (error) {
            console.log(error);
            setLoadingResend(false);
        }
    };

    const getInfo = useGetInfo();

    const [loadingOTP, setLoadingOTP] = useState(false);

    const [countOTPValid, setCountOTPValid] = useState(0);

    const submitOTP = async () => {
        setLoadingOTP(true);
        try {
            await transactionAPI.validateOTP(otpValue);
            setLoadingOTP(false);
            await getInfo();
            setStep(4); //Transfer Success
        } catch (error) {
            console.log(error);
            if (error?.message === 'OTP không hợp lệ!' && error?.status === 400) {
                toast.error(error?.message || 'Có lỗi xảy ra, vui lòng thử lại');
                setCountOTPValid((prev) => prev + 1);
            } else {
                setStep(5); // Transfer Failed Page
            }
            setLoadingOTP(false);
        }
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
                    <OtpStepButton
                        isDisabledSubmit={otpValue?.length !== 6}
                        submitOTP={submitOTP}
                        loadingOTP={loadingOTP}
                        resendOTP={transactionSubmit}
                        loadingResend={loadingResend}
                        otpValid={{
                            count: countOTPValid,
                            maxCount: 5,
                            resetOtp: () => {
                                setCountOTPValid(0);
                            },
                        }}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
}

export default TransferOTP;
