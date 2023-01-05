import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import HeaderAction from '~/components/HeaderAction';
import { menuTransfer } from '~/components/Transfer/data';
import TransferMenu from '~/components/Transfer/TransferMenu';
import TransferInfo from '~/components/Transfer/TransferInfo';
import TransferCheck from '~/components/Transfer/TransferCheck';
import TransferOTP from '~/components/Transfer/TransferOTP';
import { useLocation } from 'react-router-dom';

function TransferPage() {
    const [selected, setSelected] = useState(menuTransfer[0].type);

    const location = useLocation();

    const accountInfo = location?.state?.accountInfo;

    console.log('accountInfo: ', accountInfo);

    const [step, setStep] = useState(1);

    const renderTransferComponent = () => {
        switch (step) {
            case 1:
                return <TransferInfo selected={selected} setStep={setStep} />;
            case 2:
                return <TransferCheck setStep={setStep} />;
            case 3:
                return <TransferOTP setStep={setStep} />;
            default:
                break;
        }
    };

    useEffect(() => {
        setStep(1);
    }, [selected]);

    return (
        <>
            <Container>
                <HeaderAction text={{ label: 'Chuyển khoản' }} />

                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        {renderTransferComponent()}
                    </Grid>
                    <Grid item xs={4}>
                        <TransferMenu selected={selected} setSelected={setSelected} />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default TransferPage;
