import { Avatar, Card, CardHeader, IconButton, Stack, Typography } from '@mui/material';
import { MdMoreVert } from 'react-icons/md';
import { useSelector } from 'react-redux';

import TransferForm from '~/components/forms/TransferForm';
import { handleMaskValue } from '~/utils/format';

function TransferInfo({ selected, setStep }) {
    const { authInfo } = useSelector((state) => state.authReducer);
    return (
        <Stack gap={2} p={4}>
            <Card>
                <CardHeader
                    sx={{ p: 3 }}
                    avatar={<Avatar aria-label="recipe">R</Avatar>}
                    action={
                        <IconButton sx={{ display: 'flex' }} aria-label="settings">
                            <MdMoreVert sx={{ alignItems: 'center' }} />
                        </IconButton>
                    }
                    title={
                        <Stack>
                            <Typography sx={{ fontWeight: 500 }} variant="subtitle1" component={'p'}>
                                Nguồn tiền
                            </Typography>
                            <Typography sx={{ fontWeight: 500 }} variant="subtitle2">
                                {authInfo.accountNumber}
                            </Typography>
                            <Typography variant="h5">{handleMaskValue(authInfo.balance.toString())} VND</Typography>
                        </Stack>
                    }
                />
            </Card>

            <Typography ml={2} variant="h5" component="h5">
                CHUYỂN TIỀN ĐẾN
            </Typography>

            <Card sx={{ p: 3 }}>
                <TransferForm selected={selected} setStep={setStep} />
            </Card>
        </Stack>
    );
}

export default TransferInfo;
