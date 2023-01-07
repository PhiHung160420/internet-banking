import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import HeaderAction from '~/components/HeaderAction';
import { menuTransfer } from '~/components/Transfer/data';
import TransferMenu from '~/components/Transfer/TransferMenu';
import TransferInfo from '~/components/Transfer/TransferInfo';
import TransferCheck from '~/components/Transfer/TransferCheck';
import TransferOTP from '~/components/Transfer/TransferOTP';
import { useDispatch } from 'react-redux';
import { actResetTransfer } from '~/store/action/transferAction';
import TransactionSuccess from '~/components/TransactionSuccess';
import TransactionError from '~/components/TransactionError';

function TransferPage() {
    const [selected, setSelected] = useState(menuTransfer[0].type);

    const [step, setStep] = useState(1);

    const resetTransfer = () => {
        setStep(1);
        dispatch(actResetTransfer());
    };

    const renderTransferComponent = () => {
        switch (step) {
            case 1:
                return <TransferInfo selected={selected} setStep={setStep} />;
            case 2:
                return <TransferCheck setStep={setStep} />;
            case 3:
                return <TransferOTP setStep={setStep} />;
            case 4:
                return <TransactionSuccess setStep={setStep} onResetTransfer={resetTransfer} />;
            case 5:
                return <TransactionError setStep={setStep} onResetTransfer={resetTransfer} />;
            default:
                break;
        }
    };

    const dispatch = useDispatch();

    useEffect(() => {
        setStep(1);
        return () => {
            dispatch(actResetTransfer());
        };
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
