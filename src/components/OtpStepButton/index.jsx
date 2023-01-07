import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useCountdown from '~/hooks/useCountdown';

function OtpStepButton({
    isDisabledSubmit,
    submitOTP,
    loadingOTP,

    resendOTP,
    loadingResend,

    otpValid = {
        count: 0,
        maxCount: 5,
        resetOtp: () => {
            return;
        },
    },
}) {
    const [step, setStep] = useState(1);
    const { seconds, reCountdown } = useCountdown(10);

    const handleResendOTP = async () => {
        try {
            await resendOTP();
            otpValid?.resetOtp();
            setStep(1);
            reCountdown();
        } catch (error) {
            console.log(error);
        }
    };

    const renderFooterButton = () => {
        switch (step) {
            case 1:
                return (
                    <Stack flexDirection={'column'} flex={1}>
                        {otpValid?.count !== 0 && (
                            <Typography flex={1} my={1} variant="h6" component="p" color={'error'}>
                                Số lần nhập sai: {otpValid?.count}/{otpValid?.maxCount}
                            </Typography>
                        )}
                        <LoadingButton
                            disabled={isDisabledSubmit}
                            onClick={submitOTP}
                            loading={loadingOTP}
                            sx={{ flex: 1 }}
                            variant="contained"
                        >
                            Xác thực
                        </LoadingButton>
                    </Stack>
                );

            case 2:
                return (
                    <Stack flexDirection={'column'} flex={1}>
                        {otpValid?.count !== 0 && (
                            <Typography flex={1} my={1} variant="h6" component="p" color={'error'}>
                                Số lần nhập sai: {otpValid?.count}/{otpValid?.maxCount}
                            </Typography>
                        )}
                        <LoadingButton
                            disabled={seconds !== 0}
                            loading={loadingResend}
                            onClick={handleResendOTP}
                            sx={{ flex: 1 }}
                            variant="contained"
                        >
                            Gửi lại mã OTP {seconds !== 0 && `(sau ${seconds} giây)`}
                        </LoadingButton>
                    </Stack>
                );
            default:
                break;
        }
    };

    useEffect(() => {
        if (otpValid.count >= otpValid.maxCount) {
            setStep(2);
        }
    }, [otpValid.count]);

    return <>{renderFooterButton()}</>;
}

export default OtpStepButton;
