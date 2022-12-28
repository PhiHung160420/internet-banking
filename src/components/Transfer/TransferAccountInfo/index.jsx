import { Box, Stack } from '@mui/material';
import ArrowDown from '~/assets/svg/ArrowDown';
import CardAccount from '~/components/CardAccount';

function TransferAccountInfo({ transfer }) {
    const { from, to } = transfer;
    return (
        <Box>
            <CardAccount fullname={from.fullname} account={from.account} />

            <Stack p={'0 24px'} flexDirection={'row'} alignItems="center">
                <Box mr={2}>
                    <ArrowDown />
                </Box>
                <Box flex={1} height={'1px'} bgcolor={'rgba(145, 158, 171, 0.24)'}></Box>
            </Stack>
            <CardAccount fullname={to?.fullname} account={to?.account} />
        </Box>
    );
}

export default TransferAccountInfo;
