import { Avatar, Card, CardHeader, IconButton, Stack, Typography } from '@mui/material';
import { MdMoreVert } from 'react-icons/md';

import TransferForm from '~/components/forms/TransferForm';

function TransferInfo({ selected, setStep }) {
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
                                07887818012
                            </Typography>
                            <Typography variant="h5">07887818012</Typography>
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
