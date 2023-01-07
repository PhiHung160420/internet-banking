import { CheckCircle } from '@material-ui/icons';
import { Button, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { handleMaskValue } from '~/utils/format';

function TransactionSuccess({ setStep, onResetTransfer }) {
    const { transfer, account_info } = useSelector((state) => state.transferReducer);

    return (
        <Paper
            elevation={3}
            variant="outlined"
            sx={{
                my: 4,
                py: 15,
            }}
        >
            <Stack flexDirection={'column'} gap={2} alignItems="center">
                <CheckCircle color="success" style={{ fontSize: '150px', color: 'green' }} />

                <Typography variant="h4">Giao dịch thành công!</Typography>

                <Typography variant="h4">{handleMaskValue(transfer?.amount)} VNĐ</Typography>

                <Button variant="contained" onClick={onResetTransfer}>
                    Thực hiện giao dịch khác
                </Button>
            </Stack>
        </Paper>
    );
}

export default TransactionSuccess;
