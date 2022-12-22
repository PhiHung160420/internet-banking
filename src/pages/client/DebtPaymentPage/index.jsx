import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderAction from '~/components/HeaderAction';
import TransferAccountInfo from '~/components/Transfer/TransferAccountInfo';
import TransferCheck from '~/components/Transfer/TransferCheck';
import TransferOTP from '~/components/Transfer/TransferOTP';

function DebtPaymentPage() {
    const params = useParams();

    const [step, setStep] = useState(1);

    const renderComponent = () => {
        switch (step) {
            case 1:
                return (
                    <Stack flexDirection={'row'} gap={1}>
                        <Box flex="1" textAlign="center">
                            <Typography variant="h5">SỐ TIỀN GIAO DỊCH</Typography>
                            <Typography variant="h5">20.000.000</Typography>
                        </Box>

                        <Stack flex={1} flexDirection={'column'} gap={2}>
                            <Card sx={{ flex: 1 }}>
                                <TransferAccountInfo
                                    transfer={{
                                        from: {
                                            fullname: 'Người nợ',
                                            account: '22424---42444-422',
                                        },
                                        to: {
                                            fullname: 'Chủ nợ',
                                            account: '252522-222',
                                        },
                                    }}
                                />
                            </Card>
                            <Button variant="contained" onClick={() => setStep(2)}>
                                Thanh toán
                            </Button>
                        </Stack>
                    </Stack>
                );
            case 2:
                return <TransferOTP setStep={setStep} />;

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
