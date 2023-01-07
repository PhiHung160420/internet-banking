import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { debtRemindersAPI } from '~/api/debtReminderAPI';
import HeaderAction from '~/components/HeaderAction';
import TransferAccountInfo from '~/components/Transfer/TransferAccountInfo';
import { FORMAT_NUMBER } from '~/constant';

function DebtPaymentPage() {
    const params = useParams();
    const { debtId } = params;
    const [step, setStep] = useState(1);
    const [debtDetail, setDebtDetail] = useState({});
    const [otpValue, setOtpValue] = useState('');
    const navigate = useNavigate();

    const getDebtDetail = async () => {
        try {
            const result = await debtRemindersAPI.getDebtDetail(debtId);
            if (result?.id) {
                setDebtDetail(result);
            }
        } catch (error) {
            console.log('get debt detail error >>> ', error);
        }
    };

    useEffect(() => {
        if (debtId) {
            getDebtDetail();
        }
    }, []);

    const handleGetOtp = async () => {
        try {
            const res = await debtRemindersAPI.getPaymentOtp(debtId);
            if (res) {
                toast.success('Mã OTP đã được gửi đến mail');
                return setStep(2);
            }
            return toast.error('Thanh toán thất bại');
        } catch (error) {
            toast.error(error?.message || 'Thanh toán thất bại');
        }
    };

    const handleConfirmOtp = async () => {
        try {
            const res = await debtRemindersAPI.confirmOtp(otpValue);
            if (res) {
                toast.success('Thanh toán thành công');
                return navigate('/debt-management');
            }
            return toast.error(res?.message || 'Xác thực OTP thất bại');
        } catch (error) {
            toast.error(error?.message || 'Xác thực OTP thất bại');
        }
    };

    const renderComponent = () => {
        switch (step) {
            case 1:
                return (
                    <Stack flexDirection={'row'} gap={1}>
                        <Box flex="1" textAlign="center">
                            <Typography variant="h5">SỐ TIỀN GIAO DỊCH</Typography>
                            <Typography variant="h5">{FORMAT_NUMBER.format(debtDetail?.amount)} VNĐ</Typography>
                        </Box>

                        <Stack flex={1} flexDirection={'column'} gap={2}>
                            <Card sx={{ flex: 1 }}>
                                <TransferAccountInfo
                                    transfer={{
                                        from: {
                                            fullname: 'Người nợ',
                                            account: debtDetail?.debtAccountNumber,
                                        },
                                        to: {
                                            fullname: 'Chủ nợ',
                                            account: debtDetail?.accountNumber,
                                        },
                                    }}
                                />
                            </Card>
                            <Button variant="contained" onClick={() => handleGetOtp()}>
                                Thanh toán
                            </Button>
                        </Stack>
                    </Stack>
                );
            case 2:
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
                                onChange={(value) => setOtpValue(value)}
                                numInputs={6}
                            />

                            <Stack flexDirection={'row'} gap={2} my={2}>
                                <Button sx={{ flex: 2 }} variant="contained" onClick={() => handleConfirmOtp()}>
                                    Xác thực
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                );

            default:
                break;
        }
    };
    return (
        <Container>
            <HeaderAction
                text={{
                    label: 'Thanh toán nợ',
                }}
            />
            {renderComponent()}
        </Container>
    );
}

export default DebtPaymentPage;
