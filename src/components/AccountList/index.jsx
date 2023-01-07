import { Box, Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import accountAPI from '~/api/accountAPI';
import { LoadingContext } from '~/providers/LoadingProvider';
import { handleMaskValue } from '~/utils/format';
import CardAccount from '../CardAccount';

function AccountList({ onSelectAccount }) {
    const [accounts, setAccounts] = useState([]);

    const { showLoading, hideLoading } = useContext(LoadingContext);

    const fetchAccounts = async () => {
        showLoading();
        try {
            const res = await accountAPI.getMyAccounts();

            setAccounts([{ ...res }]);
        } catch (error) {
            console.log(error);
        } finally {
            hideLoading();
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    return (
        <Stack>
            {accounts.map((item) => (
                <Box
                    sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            bgcolor: 'action.selected',
                            ml: -3,
                            mr: -3,
                            pl: 3,
                            pr: 3,
                        },
                    }}
                    onClick={() => onSelectAccount(item)}
                >
                    <CardAccount
                        sx={{ p: 2 }}
                        fullname={
                            <Box>
                                <Typography variant="subtitle1">{`${item?.accountNumber} - ${item?.fullName}`}</Typography>
                                <Typography variant="subtitle1" color={'tomato'}>{`${
                                    item?.type === 'PAYMENT' ? 'Tài khoản thanh toán' : 'Tài khoản thường'
                                }`}</Typography>
                            </Box>
                        }
                        account={
                            <Typography variant="subtitle1" color={'primary'}>{`Số dư khả dụng: ${handleMaskValue(
                                item?.balance,
                            )}`}</Typography>
                        }
                    />
                </Box>
            ))}
        </Stack>
    );
}

export default AccountList;
