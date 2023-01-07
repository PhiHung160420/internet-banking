import { Cancel } from '@material-ui/icons';
import { Button, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useSelector } from 'react-redux';
import { handleMaskValue } from '~/utils/format';

function TransactionError({ onResetTransfer }) {
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
                <Cancel color="success" style={{ fontSize: '150px', color: 'red' }} />

                <Typography variant="h4">Giao dịch thất bại!</Typography>

                <Typography variant="h4">{handleMaskValue(transfer?.amount)} VND</Typography>

                <Button variant="contained" onClick={onResetTransfer}>
                    Thực hiện giao dịch khác
                </Button>
            </Stack>
        </Paper>
    );
}

export default TransactionError;
